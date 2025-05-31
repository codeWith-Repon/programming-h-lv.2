//1. synchoronous
//  file read /I/o intensive task -> not go thread pool

const fs = require('fs');
// //write file
// console.log('task 1');

// const txt = 'Learning file system';
// fs.writeFileSync('./hello.txt', txt);

// console.log('task 2');

// //read file
// const data = fs.readFileSync('./hello.txt', { encoding: 'utf-8' });

// console.log('task 3');

// console.log(data);

//2. asynchoronous
// file read -> single thread -> event loop -> thread pool -> task complited

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
