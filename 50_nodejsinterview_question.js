Here are ** 20 of the most frequently asked Node.js interview questions ** tailored for a ** Node.js developer with ~2 years of experience **.These are commonly asked across startups and mid - level product companies, with brief, interview - ready explanations.

---

## Core Node.js Concepts

### 1. What is Node.js ?

    Node.js is a ** runtime environment ** that allows executing JavaScript on the server side using the ** V8 engine **.It is ** non - blocking, event - driven **, and ideal for building scalable network applications.

---

### 2. How does Node.js work internally ?

    Node.js uses a ** single - threaded event loop ** with ** non - blocking I / O ** operations handled by libuv.Heavy tasks are delegated to a ** thread pool **, keeping the main thread responsive.

---

### 3. What is the Event Loop ?

    The event loop handles asynchronous operations by executing callbacks in phases like:

* Timers
    * I / O callbacks
        * Poll
        * Check
        * Close callbacks

---

### 4. Is Node.js single - threaded ?

    Yes, for JavaScript execution.
        No, internally it uses ** multiple threads ** (thread pool) for async operations like file system and crypto.

---

### 5. What are blocking vs non - blocking operations ?

* ** Blocking **: Stops execution until the task finishes
    * ** Non - blocking **: Executes asynchronously and continues execution

---

## Asynchronous Programming

### 6. What are callbacks ?

    Functions passed as arguments to be executed after an async operation completes.

---

### 7. What is callback hell ?

    Nested callbacks that make code unreadable and hard to maintain.
Solved using ** Promises ** or ** async /await **.

---

### 8. What are Promises ?

    Objects representing the eventual completion or failure of an async operation.
        States: ** pending, fulfilled, rejected **

            ---

### 9. Explain async / await.

Syntactic sugar over Promises that makes async code look synchronous and easier to read.

---

### 10. How does error handling work in async / await ?

    Using`try...catch` blocks.

---

## Express.js(Very Important)

### 11. What is Express.js ?

    A minimal and flexible Node.js web framework used to build APIs and web applications.

---

### 12. What are middleware functions ?

    Functions that have access to`req`, `res`, and`next()`.
Used for logging, authentication, validation, etc.

---

### 13. Difference between app.use() and app.get() ?

* `app.use()` → handles all HTTP methods
    * `app.get()` → handles only GET requests

---

### 14. How do you handle errors in Express ?

    Using error - handling middleware:

```js
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
```

---

## Modules & Architecture

### 15. What are modules in Node.js ?

    Reusable pieces of code.
        Types:

* Core modules(fs, path)
    * Local modules
        * Third - party modules(npm)

---

### 16. What is require vs import?

* `require()` → CommonJS
    * `import` → ES Modules

---

### 17. What is package.json ?

    Contains project metadata, dependencies, scripts, and versioning

---

## Database & API Concepts

### 18. How do you connect Node.js to a database ?

    Using drivers or ORMs like:

* MongoDB → Mongoose
    * SQL → Sequelize / TypeORM

---

### 19. What is REST API ?

    An architectural style using HTTP methods:

        * GET, POST, PUT, DELETE

---

### 20. How do you secure a Node.js application ?

* Use JWT / OAuth
    * Validate inputs
        * Use HTTPS
            * Environment variables
                * Helmet & CORS

---

## Bonus(Often Asked)

    * What is clustering ?
* What are streams ?
* How does JWT authentication work ?
* Difference between process.nextTick() and setImmediate()

---

    If you want, I can also provide:
✅ ** MCQs **
✅ ** Coding questions **
✅ ** Express + MongoDB interview questions **
✅ ** System design for Node.js **
✅ ** HR + scenario - based questions **

    Just tell me 👍
