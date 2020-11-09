//Async Function
//we put a time counter that will start at 0 and end in the end of the func
let starTime ,timeleft;
starTime = Number(new Date().getTime());
// this is an async function that returns a promise that resolves in 6 seconds
const startAsyncFunction = async () => new Promise( resolve => setTimeout(() => resolve("Async Done!"),6000));

//  Sync Function
const startSynchFunction = () => {
  return new Promise(resolve =>{
    setTimeout(() => {
      resolve("sync");
      console.log("Sync Done!");
      timeleft = Number((new Date().getTime()));
      const difference = Number((6) - Math.abs((starTime - timeleft) / 1000));
      console.log(`Time left of the Asynchronous func after the Synchronous func has ended is: ${difference}`);
    },4000);
  })
}

const main = async () => {
  startAsyncFunction();
  await startSynchFunction();
  return console.log({ message: 'done' });
}

main();

// const http = require('http');

// const hostname = '127.0.0.1';
// const port = 3000;

// const server = http.createServer(function(req,res){
//     res.setHeader('Content-Type', 'application/json');
//     res.end(JSON.stringify( {a:1}, null, 3));
// });

// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });