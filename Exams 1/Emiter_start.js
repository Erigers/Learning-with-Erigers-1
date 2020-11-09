const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter()
myEmitter.on('event' , () =>{
    console.log('an event occurred!')
})

myEmitter.emit('event');

//Method .emit() allows an arbitrary set of arguments

const myEmitter2 = new MyEmitter()

myEmitter2.on('event' , (a,b)=>{
    console.log(a,b,this,this === MyEmitter)
})

myEmitter2.emit('event','a','b')