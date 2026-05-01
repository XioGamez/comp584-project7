const fs = require('fs')  // load the filesystem module from the Node.js core library

const lines = fs.readFileSync("day_2_input.txt", "utf8")  // read file as synchronous read
    .split('\n')  // split file into string array using '\n' as separator

let valid = 0;  // keeps track of valid passwords

for (let line of lines) {  // loop through each line
    if (!line) continue;  // skip empty line

    const [rule, pwd] = line.split(': ');  // split into rule & pwd (e.g. "1-3 a: abcde" → ["1-3 a", "abcde"])
    const [range, letter] = rule.split(' ');  // split rule into range & letter (e.g. "1-3 a" → ["1-3", "a"])
    const [min, max] = range.split('-').map(Number);  // split range into min & max numbers (e.g "1-3" → ["1", "3"])

    // count times letter appears in pwd
    const count = [...pwd].filter(char => char === letter).length;  // pwd to array (using spread syntax; https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) -> filter matching letters (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) -> get length

    if (count >= min && count <= max)  // if count is within allowed range
        valid++;  // increment count
}
console.log("Valid passwords: ", valid);  // print results