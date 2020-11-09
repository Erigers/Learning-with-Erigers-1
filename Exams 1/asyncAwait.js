function resolveAfter2Seconds(){
    console.log("starting slow promise");
    return new Promise(resolve => {
        setTimeout(function (){
            resolve("slow")
            console.log("Slow promise is done")
        },2000)
    })
}

function resolveAfter1Second(){
    console.log("starting fast promise")
    return new Promise(resolve => {
        setTimeout(function(){
            resolve("fast")
            console.log("fast promise is done")
        },1000)
    })
}

async function sequentialStart(){
    console.log('==SEQUENTIAL STATRT==')
    
    //The exeution gets here almost instantly
    const slow = await resolveAfter2Seconds()
    console.log(slow) // This runs 2 seconds from exeution

    const fast = await resolveAfter1Second();
    console.log(fast) // This runs 3 seconds from execution
}

async function concurrentStart(){

    console.log('==CONCURRENT START with await==');
    const slow = resolveAfter2Seconds() //Starts timer immediately
    const fast = resolveAfter1Second() //Starts timer immediately

    // 1.Execution starts here almost instantly
    console.log(await slow) //this runs 2 second after 1
    console.log(await fast) // this runs 2 second after 1 as well , since fast is already resolved

}

function concurrentPromise(){
    console.log('==CONCURRENT START with Promise.all==')

    return Promise.all([resolveAfter2Seconds(),resolveAfter1Second()])
    console.log(messages[0]) //slow
    console.log(messages[1]) //fast
}

async function parallel(){
    console.log('==PARALLEL with awit Promise.all==')

    //Start 2 'jobs' in parallel and wait for both of them to complete
    await Promise.all([
        (async () => console.log(await resolveAfter2Seconds()))
        (async() => console.log(await resolveAfter1Second()))
    ])
}


sequentialStart() //After 2 seconds, logs "slow" and after another  second logs "fast"

setTimeout (concurrentStart,4000)  // after 2 sec log "slow" then fast 

setTimeout(concurrentPromise,7000)

setTimeout(parallel,10000)  //parallel , after one second logs fast then after another sec logs "slow"