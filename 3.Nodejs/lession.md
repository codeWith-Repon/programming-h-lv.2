### What is an event module?

The events module in Node.js is a built-in module that allows you to create, listen for, and respond to custom events in your application. It follows the event-driven architecture pattern, which is a core part of how Node.js works — especially since it's non-blocking and asynchronous.

### Why use the events module?

Imagine you want some code to run only after a specific action happens — like when a user logs in, a file finishes loading, or a server finishes starting. Instead of constantly checking, you just listen for an event — and when that event happens, Node.js emits it, and your listener reacts.

### Basic Usage Example

```bash
#  Import the events module
const EventEmitter = require('node:events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();
myEmitter.on('event', () => {
  console.log('an event occurred!');
});
myEmitter.emit('event');

```

output:

```bash
an event occurred!
```

🔄 Explanation

- EventEmitter is a class provided by Node.js in the events module.
- .on('eventName', callback) sets up a listener — a function to run when the event happens.
- .emit('eventName') triggers the event, causing all attached listeners to run.

Real-world Example

- In a real-world Node.js app:
- When a file upload finishes → emitter.emit('uploadComplete')
- When a user signs in → emitter.emit('userLoggedIn', userData)
- When data is received from a stream → stream emits a 'data' event

### Synchronous way to read and write files

In Node.js, to read and write files synchronously, you use the built-in fs module (File System module). The synchronous methods block the execution until the file operation is complete — which can be useful for small tasks, configuration files, or scripts that run once and exit.

```bash
const fs = require('fs');
# write file
console.log('task 1');

const txt = 'Learning file system';
fs.writeFileSync('./hello.txt', txt);

console.log('task 2');

# read file
const data = fs.readFileSync('./hello.txt', { encoding: 'utf-8' });

console.log('task 3');

console.log(data);
```

### asynchronous way to read and write files

Asynchronous functions don’t block the program — they let the rest of your code run while the file task completes in the background. This is the preferred method for most real-world applications.

```bash
console.log('task 1');

fs.writeFile('./hello.txt', 'Learning node', (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('file write successfully');
});

fs.readFile('./hello.txt', { encoding: 'utf-8' }, (err, data) => {
  if (err) {
    console.log('somthing went wrong', err);
    return;
  }

  console.log(data);
});

console.log('task 3');
```

### Buffer and Streaming

Buffer: It is used to process a data piece by piece which is called buffer.

A Buffer is a temporary memory location used to store binary data (like images, files, etc.) — especially useful when dealing with streams or data coming from external sources like file systems or networks.

Example: Create and log a buffer

```bash
const buffer = Buffer.from('Hello, Buffer!');
console.log(buffer);            #Raw bytes
console.log(buffer.toString()); #Convert back to string
```

Why Use Buffers?

- Node.js deals with binary data (e.g., from files, TCP streams, etc.).
- Buffers let you process raw binary data directly.
- They're especially useful in streams when data comes in chunks.

### What is Streaming in Node.js?

Streaming means reading or writing data piece by piece (chunk by chunk) instead of loading the whole file into memory at once. This is memory-efficient and faster for large files.

Common Stream Types

- Readable: For reading data (e.g., file, HTTP request, fs.readStream)
- Writable: For writing data (e.g., file, HTTP response, fs.writeStream)
- Duplex: Both read and write
- Transform: Modify data during streaming (e.g., compression)

| Situation                            | Use `throw`                                                           | Use `console.log` or `console.error`         |
| ------------------------------------ | --------------------------------------------------------------------- | -------------------------------------------- |
| Error should **stop the program**    | ✅ Yes                                                                | ❌ No (it won’t stop the program)            |
| Error is **unexpected or critical**  | ✅ Yes                                                                | ❌ Only logging may hide the issue           |
| Error is **already being handled**   | ❌ No (throwing again could crash app)                                | ✅ Yes, log for debugging or user feedback   |
| Used in **callbacks or async code**  | ❌ Avoid raw throw in async — use `return next(err)` or `reject(err)` | ✅ Yes                                       |
| Used in **middleware / server code** | ❌ Usually avoid `throw` (let framework handle)                       | ✅ Use logger or `console.error`             |
| Informational messages               | ❌ Never                                                              | ✅ Yes (`console.log`, `console.warn`, etc.) |
