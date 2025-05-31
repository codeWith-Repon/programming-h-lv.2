const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {} 

const schoolBell = new SchoolBell(); 

schoolBell.on('ring', () => {
    console.log('yahoo!! class end');
});

schoolBell.on('ring', () => {
    console.log('class start');
});

schoolBell.on('broken', () => {
    console.log('finally end');
});

schoolBell.emit('ring');
schoolBell.emit('broken');