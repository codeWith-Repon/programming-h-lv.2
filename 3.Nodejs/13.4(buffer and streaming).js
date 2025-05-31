const fs = require('fs');

// fs.readFile('./hello-world.txt', { encoding: 'utf-8' }, (err, data) => {
//   if (err) {
//     console.log('something went wrong', err);
//     return;
//   }

//   fs.writeFile('./hello-world-copy.txt', data, (err) => {
//     if (err) {
//       console.log('something went wrong', err);
//       return;
//     }
//     console.log('file copied successfully');
//   });
// });

const readStream = fs.createReadStream('./hello-world.txt', {
  encoding: 'utf-8',
});
const writeStream = fs.createWriteStream('./hello-world-copy.txt', {
  encoding: 'utf-8',
});

readStream.on('data', (chunk) => {
  console.log(chunk);

  const canWrite = writeStream.write(chunk);
  if (!canWrite) {
    readStream.pause(); // pause reading if write buffer is full
  }
});

//Handle  backpressure
writeStream.on('drain', () => {
  readStream.resume(); // resume reading when buffer is drained
});

//  Handle read errors
readStream.on('error', (err) => {
  if (err) {
    console.error('read error', err);
  }
});

//  When reading ends
readStream.on('end', () => {
  console.log('reading ended');
  writeStream.end();
});

// When writing finishes
writeStream.on('finish', () => {
  console.log('writen successfully');
});
