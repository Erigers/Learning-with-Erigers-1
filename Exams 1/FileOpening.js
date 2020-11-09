//Read a file Synchronously

console.log('Reading a file Synchronously')
var fss = require('fs');
console.log('Starting program...');
var fileContent = fss.readFileSync('50Words.txt','utf8');
var numberOfWords = fileContent.split(/[ ,.\n]+/).length;
console.log('These are '+ numberOfWords+' in this file');
console.log('Program finished');

//In synchronously we read the file in a sync way that stops all the proccessing
// until the V8 reads the content form the file , and then we continue to other procesess


//Read a file Asynchronously

console.log('Reading a file Asynchronously')
var fsa = require('fs');
console.log('Starting the program...');
fsa.readFile('./50words.txt','utf8', function(err,fileContents){
    if(err) throw err;
    let numberOfWords = fileContent.split(/[ ,.\n]+/).length;
    console.log('There are '+ numberOfWords+ ' words in this file')
});
console.log('Program finished');

//In Async , we read the file passing an anonymous callback function,which will be executed
//when the reading is finished , since the code runs asynchornously the line 25 gets executed
//before the 20-24 lines. **Is this the event loop part???**