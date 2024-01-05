// let count = 0
// const cb = () => {
//     console.log(`Processing nextTick cb ${++count}`)
//     process.nextTick(cb)
// }
// setImmediate(()=> console.log('setImmediate is called immediately'))
// setTimeout(() => console.log('setTimeout executed'), 100)
// process.nextTick(cb)
// console.log('Start');

// let count = 0
// const cb = () => {
//     console.log(`Processing setImmediate cb ${++count}`)
//     setImmediate(cb)
// }
// setImmediate(cb)
// setTimeout(() => console.log('setTimeout executed'), 50)
// console.log('Start');

// let count = 0
// const cb = () => {
//     if(count < 2000){
//         console.log(`Processing setImmediate cb ${++count}`)
//         setImmediate(cb)
//     }
// }
// setImmediate(cb)
// setTimeout(() => console.log('setTimeout executed'), 50)
// console.log('Start');

// setTimeout(()=> {
//     console.log('setTimeout executed')
// }, 0)
// setImmediate(()=> {
//     console.log('setImmediate is called immediately')
// })

const EventEmitter = require('events');

const celebrity = new EventEmitter();

celebrity.on("update post", (type) => {
    console.log(`I like this ${type} post`);
})

celebrity.on("update post", () => {
    console.log("I like it too");
})

const process = require('node:process');

process.on('beforeExit', (code) => {
  console.log('Process beforeExit event with code: ', code);
});

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

console.log('This message is displayed first.');

// Prints:
// This message is displayed first.
// Process beforeExit event with code: 0
// Process exit event with code: 0

celebrity.emit("update post", "image");

// celebrity.emit();