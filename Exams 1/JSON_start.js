
const fs = require('fs');

// Reading a JSON file sync
let rawdata = fs.readFileSync('student.json')
let student = JSON.parse(rawdata)
console.log(student)

