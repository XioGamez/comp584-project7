const fs = require('fs')  // load the filesystem module from the Node.js core library

const numbers = fs.readFileSync("input/day_1_input.txt", "utf8")  // read file as synchronous read (https://nodejs.org/api/fs.html#fsreadfilesyncpath-options)
    .split('\n')  // split file into string array using '\n' as separator (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)
    .map(Number);  // convert string array -> number array (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map, https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/Number)

const seen = new Set();  // store numbers already seen (for fast lookup) (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

for (let num of numbers) {  // loop through each number in array
    const target = 2020 - num;  // calculate number needed to reach 2020

    if (seen.has(target)) {  // if Set has target value (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has)
        console.log("Answer: ", num * target);  // multiply values -> print result
        break;  // ends loop
    }
    seen.add(num);  // add number to Set
}