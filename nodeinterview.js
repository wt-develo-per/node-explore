/**
 * NODE.JS INTERVIEW PREPARATION GUIDE (2 Years Experience)
 * 
 * This file contains both THEORY (in comments) and MACHINE CODING (runnable code) 
 * covering essential Node.js concepts.
 * 
 * TABLE OF CONTENTS:
 * 1. Event Loop & Asynchronous Behavior
 * 2. Event Emitter (Machine Coding)
 * 3. Streams & Buffers
 * 4. HTTP Server & Request Handling
 * 5. Practical Logic: Retry Mechanism
 */

const fs = require('fs');
const EventEmitter = require('events');
const http = require('http');

console.log("--- STARTING NODE.JS INTERVIEW PREP RUN ---");

// ==========================================
// 1. THEORY: THE EVENT LOOP & NON-BLOCKING I/O
// ==========================================
/**
 * Q: How does Node.js handle concurrency given it is single-threaded?
 * A: Node.js uses a single-threaded Event Loop for JavaScript execution but delegates 
 *    I/O operations (file system, network) to the system kernel or a worker pool (libuv).
 *    When an I/O operation completes, a callback is queued to the Event Loop.
 * 
 * Phases of Event Loop:
 * 1. Timers (setTimeout, setInterval)
 * 2. Pending Callbacks
 * 3. Idle, Prepare 
 * 4. Poll (I/O)
 * 5. Check (setImmediate)
 * 6. Close Callbacks
 */

// MACHINE CODING: Demonstrating Event Loop Order
function demonstrateEventLoop() {
    console.log('\n[1] Event Loop Demo:');

    console.log('1. Script Start');

    setTimeout(() => {
        console.log('2. setTimeout 0ms');
    }, 0);

    setImmediate(() => {
        console.log('3. setImmediate');
    });

    process.nextTick(() => {
        console.log('4. process.nextTick (Microtask) - Runs before next loop phase');
    });

    Promise.resolve().then(() => {
        console.log('5. Promise (Microtask) - Runs after nextTick');
    });

    console.log('6. Script End');
}
// Uncomment to run:
// demonstrateEventLoop();


// ==========================================
// 2. MACHINE CODING: CUSTOM EVENT EMITTER
// ==========================================
/**
 * Q: Implement a simple Event Emitter class.
 * Why: Tests understanding of the Observer pattern central to Node.js.
 */

class MyEmitter {
    constructor() {
        this.events = {};
    }

    on(name, listener) {
        if (!this.events[name]) {
            this.events[name] = [];
        }
        this.events[name].push(listener);
    }

    emit(name, ...args) {
        if (this.events[name]) {
            this.events[name].forEach(listener => listener(...args));
            return true;
        }
        return false;
    }

    off(name, listenerToRemove) {
        if (!this.events[name]) return;
        this.events[name] = this.events[name].filter(listener => listener !== listenerToRemove);
    }
}

// Usage Example
function testCustomEmitter() {
    console.log('\n[2] Custom Event Emitter Demo:');
    const myEmitter = new MyEmitter();

    const greet = (name) => console.log(`Hello, ${name}!`);

    myEmitter.on('greet', greet);
    myEmitter.emit('greet', 'Developer'); // Output: Hello, Developer!

    myEmitter.off('greet', greet);
    myEmitter.emit('greet', 'Ghost'); // No output
}
// Uncomment to run:
// testCustomEmitter();


// ==========================================
// 3. STREAMS (PROCESSING LARGE DATA)
// ==========================================
/**
 * Q: How do you handle large files in Node.js without running out of memory?
 * A: Use Streams. Streams read/write data chunk by chunk instead of loading 
 *    the entire content into RAM.
 * 
 * Types: Readable, Writable, Duplex, Transform.
 */

// MACHINE CODING: Efficiently copy a large file
// Note: Create a dummy 'input.txt' if testing this specifically.
function copyFileEfficiently(source, destination) {
    console.log(`\n[3] Stream Demo: Copying ${source} to ${destination}`);

    // Check if source exists for demo purposes
    if (!fs.existsSync(source)) {
        fs.writeFileSync(source, 'This is some dummy content for streams.\n'.repeat(100));
    }

    const readStream = fs.createReadStream(source);
    const writeStream = fs.createWriteStream(destination);

    // Using pipe - handles backpressure automatically
    readStream.pipe(writeStream);

    writeStream.on('finish', () => {
        console.log('File copy completed successfully using streams.');
        // Cleanup
        fs.unlinkSync(source);
        fs.unlinkSync(destination);
    });
}
// Uncomment to run:
// copyFileEfficiently('temp_input.txt', 'temp_output.txt');


// ==========================================
// 4. HTTP SERVER WITHOUT FRAMEWORKS
// ==========================================
/**
 * Q: Create a basic REST API using only the 'http' module.
 * Why: Tests understanding of the raw Node.js HTTP layer before Express.
 */

const server = http.createServer((req, res) => {
    // Basic Routing
    if (req.method === 'GET' && req.url === '/api/hello') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello from raw Node.js!' }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// To run this:
// server.listen(3000, () => console.log('Server running on port 3000'));


// ==========================================
// 5. LOGIC CHALLENGE: RETRY MECHANISM
// ==========================================
/**
 * Q: Write a function that executes an async task and retries it X times if it fails.
 */

async function retryTask(fn, retries = 3, delay = 1000) {
    try {
        return await fn();
    } catch (err) {
        if (retries <= 0) throw err;
        console.log(`Task failed. Retrying in ${delay}ms... (${retries} attempts left)`);

        await new Promise(res => setTimeout(res, delay));
        return retryTask(fn, retries - 1, delay);
    }
}

// Mock failing function
let attempts = 0;
const unstableApiCall = async () => {
    attempts++;
    if (attempts < 3) {
        throw new Error("Network Glitch");
    }
    return "Success Payload";
};

// Usage
async function testRetry() {
    console.log('\n[5] Retry Logic Demo:');
    try {
        const result = await retryTask(unstableApiCall);
        console.log('Final Result:', result);
    } catch (error) {
        console.error('All retries failed:', error.message);
    }
}
testRetry();


// ==========================================
// 6. MIDDLEWARE IMPLEMENTATION (Express Style)
// ==========================================
/**
 * Q: How does Express middleware work under the hood? Write a simple implementation.
 * Why: Tests if you understand the 'next' callback pattern.
 */

function runMiddlewareDemo() {
    console.log('\n[6] Middleware Pattern Demo:');

    // Simple Middleware Stack Container
    const middlewares = [];

    const use = (fn) => middlewares.push(fn);

    const execute = (req, res) => {
        let index = 0;

        const next = () => {
            if (index >= middlewares.length) return;
            const fn = middlewares[index++];
            // Call function with req, res, and next
            fn(req, res, next);
        };

        next(); // Start execution
    };

    // Usage
    use((req, res, next) => {
        console.log('1. Auth Middleware: Checking Token...');
        req.user = 'Admin'; // Modifying request object
        next();
    });

    use((req, res, next) => {
        console.log(`2. Logging: User is ${req.user}`);
        next();
    });

    use((req, res, next) => {
        console.log('3. Controller: Sending Response');
        console.log('Response Sent!');
        // Note: We don't call next() here, ending the chain.
    });

    // Run
    execute({ body: {} }, {});
}
// Uncomment to run:
// runMiddlewareDemo();


// ==========================================
// 7. CLUSTERING & SCALING
// ==========================================
/**
 * Q: Node.js is single-threaded. How do you scale it to use all 8 cores of a CPU?
 * A: Use the 'cluster' module to fork the main process into worker processes.
 *    Each worker has its own event loop and memory.
 */

const cluster = require('cluster');
const os = require('os');

function clusterDemo() {
    console.log('\n[7] Cluster Demo (Conceptual):');

    if (cluster.isPrimary) {
        // const numCPUs = os.cpus().length;
        const numCPUs = 2; // Limiting to 2 for demo output clarity
        console.log(`Primary ${process.pid} is running`);
        console.log(`Forking ${numCPUs} workers...`);

        for (let i = 0; i < numCPUs; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            // Real world: cluster.fork() again to replace it
        });
    } else {
        // Workers share the TCP connection in this server
        console.log(`Worker ${process.pid} started`);

        // Emulate work and exit
        setTimeout(() => process.exit(), 100);
    }
}
// Uncomment to run (Note: This might exit the main process if run directly)
// if (require.main === module) clusterDemo();


// ==========================================
// 8. SECURITY: JWT IMPLEMENTATION (Manual)
// ==========================================
/**
 * Q: How does a JSON Web Token (JWT) work? Can you implement logic to "Sign" one?
 * A: Header + Payload + Signature. Clean logic without 'jsonwebtoken' lib for understanding.
 */

const crypto = require('crypto');

function mockJwtDemo() {
    console.log('\n[8] JWT Logic Demo:');

    const secret = 'super-secret-key';
    const header = { alg: 'HS256', typ: 'JWT' };
    const payload = { userId: 123, role: 'admin' };

    // Helper to base64url encode
    const base64Url = (obj) => Buffer.from(JSON.stringify(obj)).toString('base64url');

    const encodedHeader = base64Url(header);
    const encodedPayload = base64Url(payload);

    // Create Signature
    const signatureInput = `${encodedHeader}.${encodedPayload}`;
    const signature = crypto
        .createHmac('sha256', secret)
        .update(signatureInput)
        .digest('base64url');

    const token = `${encodedHeader}.${encodedPayload}.${signature}`;

    console.log('Generated Token:', token);

    // Verify Logic
    const [h, p, s] = token.split('.');
    const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(`${h}.${p}`)
        .digest('base64url');

    console.log('Signature Valid?', s === expectedSignature);
}
// Uncomment to run:
// mockJwtDemo();

