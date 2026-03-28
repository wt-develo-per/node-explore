/**
 * NODE.JS FUNDAMENTALS: DEEP DIVE
 * 
 * This file is designed to build a STRONG FOUNDATION in Node.js internals.
 * It moves beyond "what" and explains "how" and "why".
 * 
 * TABLE OF CONTENTS:
 * 1. Architecture: V8 & Libuv (The Heart & Soul)
 * 2. The Event Loop: A Granular Deep Dive
 * 3. Asynchrony: Macro-tasks vs Micro-tasks
 * 4. Memory Management: Stack, Heap & Garbage Collection
 * 5. Module System: CommonJS Internals
 */

console.log("--- NODE.JS FUNDAMENTALS DEEP DIVE ---");

/* 
================================================================================
1. ARCHITECTURE: V8 & LIBUV
================================================================================
Q: Node.js is often called "Single-Threaded". Is this technically true? Explain the architecture.

ANSWER:
Node.js is "Single-Threaded" in terms of how it executes JavaScript code, but "Multi-Threaded" in how it handles system operations.

1. THE V8 ENGINE (The Brain):
   - Developed by Google (C++).
   - Converts JavaScript code into Native Machine Code using JIT (Just-In-Time) compilation.
   - It has a SINGLE Call Stack where JS execution happens. This is why JS is single-threaded.

2. LIBUV (The Muscle):
   - A C library that gives Node.js access to the OS event notification system (epoll, kqueue, IOCP).
   - Handles the Event Loop and the Worker Thread Pool.
   - THE THREAD POOL: By default, Libuv allocates 4 threads (expandable via UV_THREADPOOL_SIZE) to handle "heavy" duties that can't be non-blocking, such as:
     - File System I/O (fs module)
     - DNS lookups
     - Compression (zlib)
     - Crypto operations (password hashing)
   
PREMIUM EXPLANATION TIP:
"Node.js uses the Main Thread for orchestration (JS code) and background threads (Libuv) for heavy lifting. It's like a restaurant with one waiter (Main Thread) but many chefs (Thread Pool)."
*/


/* 
================================================================================
2. THE EVENT LOOP: GRANULAR PHASES
================================================================================
Q: Explain the phases of the Event Loop in detail. It's not just a single queue!

ANSWER:
The Event Loop is a C program (part of Libuv) that coordinates execution. It doesn't run JS; it schedules it.
It cycles through 6 distinct phases. Each phase has a FIFO queue of callbacks to execute.

1. TIMERS Phase:
   - Executes callbacks scheduled by `setTimeout()` and `setInterval()`.
   - NOTE: The timing is not exact; it ensures execution *at least* after the specified threshold.

2. PENDING CALLBACKS Phase:
   - Executes I/O callbacks deferred from the previous loop iteration (e.g., some TCP errors).

3. IDLE, PREPARE:
   - Internal usage only.

4. POLL Phase (The Most Important):
   - Retrieves new I/O events.
   - If the queue is not empty: Synchronously iterates and executes callbacks.
   - If the queue is empty:
     - If `setImmediate` is present -> Go to Check Phase.
     - If NO `setImmediate` -> BLOCK and wait for I/O events (this is why Node doesn't eat 100% CPU when idle).

5. CHECK Phase:
   - Executes callbacks from `setImmediate()`.
   - Guaranteed to run *after* the Poll phase completes.

6. CLOSE CALLBACKS Phase:
   - Handle cleanup, e.g., `socket.on('close', ...)`.

*/


/* 
================================================================================
3. MACRO-TASKS VS MICRO-TASKS (The "Gotcha" Interview Question)
================================================================================
Q: What is the difference between process.nextTick() and setImmediate()?

ANSWER:
This is often confusing because the names are misleading.

1. process.nextTick() (Micro-task):
   - NOT technically part of the Event Loop phases.
   - It fires IMMEDIATELY after the current operation completes, *before* the Event Loop continues to the next phase.
   - Used for: Error handling cleanup, or ensuring a callback runs before any I/O.
   - DANGER: Recursive `nextTick` calls can block the Event Loop (starve I/O).

2. setImmediate() (Macro-task):
   - Runs in the CHECK phase.
   - Designed to run *after* I/O callbacks are processed.

3. Promise.then() (Micro-task):
   - Similar to `nextTick`, Promise micro-tasks run after the current operation but are lower priority than `nextTick`.

PRIORITY ORDER:
Call Stack (Sync Code) -> process.nextTick -> Promise.then -> Event Loop Phases (Timers/Check etc)
*/

// CODE DEMO: PRIORITY ORDER
function priorityDemo() {
    console.log('\n--- PRIORITY DEMO ---');

    setTimeout(() => console.log('1. setTimeout (Macrotask - Timers Phase)'), 0);
    setImmediate(() => console.log('2. setImmediate (Macrotask - Check Phase)'));

    Promise.resolve().then(() => console.log('3. Promise (Microtask)'));

    process.nextTick(() => console.log('4. nextTick (Microtask - Highest Priority)'));

    console.log('5. Main Stack (Sync Code)');
}
// Uncomment to run:
// priorityDemo();


/* 
================================================================================
4. MEMORY MANAGEMENT
================================================================================
Q: How does Node.js manage memory? What are the Stack and Heap?

ANSWER:
Since Node.js runs on V8, it follows V8's memory model.

1. STACK MEMORY:
   - Stores static data: primitive values (numbers, strings, booleans), function calls, and references to objects.
   - Fast access, automatically cleared when functions return.

2. HEAP MEMORY:
   - Stores dynamic data: Objects, Arrays, Functions (closures).
   - This is where the Garbage Collector (GC) operates.

GARBAGE COLLECTION (GC):
- V8 uses "Generational Garbage Collection".
- **New Space (Nursery)**: Where new objects are born. Small, fast GC (Scavenge algorithm). Objects that survive here move to Old Space.
- **Old Space**: Long-lived objects. Cleaned up by "Mark-Sweep-Compact" algorithm (slower, stops execution briefly).

MEMORY LEAK TIP:
Global variables, unclosed event listeners, and cached objects without expiration are common causes of leaks in Node.js.
*/


/* 
================================================================================
5. MODULE SYSTEM INTERNALS (CommonJS)
================================================================================
Q: When you write `require('./myModule')`, what actually happens?

ANSWER:
Node.js wraps every file in a function wrapper (IIFE) before execution. This is why `exports`, `require`, `module`, `__filename`, and `__dirname` exist as "globals" but are actually function arguments.

The Wrapper:
(function(exports, require, module, __filename, __dirname) {
    // Your code lives here
});

Steps of `require()`:
1. Resolving: Converts relative path `./myModule` to absolute path.
2. Loading: Reads file content based on extension (.js, .json, .node).
3. Wrapping: Wraps code in the IIFE (demonstrated above).
4. Evaluation: V8 executes the code.
5. Caching: The result `module.exports` is stored in `require.cache`. 
   *Future require calls return the cached object instantly.*
*/

console.log("\nReview the comments in this file for deep explanations of: V8, Libuv, Event Loop Phases, Microtasks, Memory, and Module Wrappers.");


/* 
================================================================================
6. WORKER THREADS VS CHILD PROCESSES VS CLUSTER
================================================================================
Q: When should you use Worker Threads vs Child Processes vs Cluster Module? (Real World Scenario)

ANSWER:
This is a critical architectural decision.

1. CLUSTER MODULE:
   - **Use Case**: Scaling a web server (HTTP) across multiple CPU cores.
   - **How it works**: Forks the entire process (memory isolation). Each fork listens on the SAME port.
   - **Pros**: Instantly increases throughput for web apps.
   - **Cons**: High memory overhead (each fork mimics the entire app).

2. WORKER THREADS (`worker_threads`):
   - **Use Case**: CPU-Intensive tasks within a single application instance (e.g., Image resizing, Video compression, JSON parsing > 50MB).
   - **How it works**: Spawns a thread that shares memory (ArrayBuffer) with the main thread.
   - **Pros**: Lighter than processes, fast messaging.
   - **Cons**: Does NOT help with I/O throughput (Node is already good at that).

3. CHILD PROCESS (`spawn`, `fork`):
   - **Use Case**: Running external commands (e.g., executing a Python script, running a shell command).
   - **How it works**: Spawns an entirely new OS process.

DECISION MATRIX:
- Need to handle more HTTP requests? -> **CLUSTER**
- Need to calculate Fibonacci(100) or resize images? -> **WORKER THREADS**
- Need to run a Python script? -> **CHILD PROCESS**
*/


/* 
================================================================================
7. PRODUCTION ERROR HANDLING & GRACEFUL SHUTDOWN
================================================================================
Q: How do you handle unhandled exceptions in production? Do you just restart?

ANSWER:
You must NEVER just restart without logging/cleaning up.

1. Process Events:
   - `uncaughtException`: Sync error not caught by try/catch.
   - `unhandledRejection`: Async Promise rejection not caught by .catch().

   **CRITICAL RULE**: If `uncaughtException` fires, the application state is corrupt. You MUST restart the process.

2. Graceful Shutdown Workflow:
   1. Catch the error (log it to Sentry/Datadog).
   2. Stop accepting NEW requests (`server.close()`).
   3. Allow existing requests to finish (with a timeout, e.g., 10s).
   4. Close database connections.
   5. Exit (`process.exit(1)`).

// CODE SNIPPET (Conceptual):
process.on('uncaughtException', (err) => {
    console.error('CRITICAL ERROR:', err);
    server.close(() => process.exit(1)); // Graceful exit
});
*/


/* 
================================================================================
8. MEMORY LEAKS IN PRACTICE
================================================================================
Q: How do you debug a memory leak in Node.js?

ANSWER:
A memory leak happens when objects are referenced but no longer needed, preventing GC from cleaning them.

COMMON CAUSES:
1. **Global Variables**: Accidentally attaching huge arrays to `global`.
2. **Closures**: Keeping references to large parent scopes.
3. **Uncleared Intervals/Timers**: `setInterval` runs forever if not cleared.
4. **Event Listeners**: `socket.on('data', user.process)` where 'user' is never removed.

DEBUGGING TOOLS:
1. **node --inspect**: Connect Chrome DevTools to the Node process.
2. **Heap Snapshots**: Take a snapshot at Time A, then Time B. Compare them.
   - Look for objects that should have been deleted (e.g., old Request objects).
3. **Allocation Timeline**: See real-time memory usage spikes.

REAL WORLD TIP:
"If your RSS memory keeps growing but Heap Used stays flat, checking for Buffer leaks or C++ addon issues is the next step."
*/
