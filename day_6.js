const fs = require('fs')  // load the filesystem module from the Node.js core library

const groups = fs.readFileSync("input/day_6_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace
    .split('\n\n');  // each group is separated by "\n\n"

let total = 0;

for (let group of groups) {  // loop through each group
    const answers = group.replaceAll('\n', '');  // remove newlines so all answers are in one string

    const uniqueAnswers = new Set(answers);  // Set automatically removes duplicates (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    total += uniqueAnswers.size;  // add number of unique "yes" answers
}
console.log("Sum of counts:", total);  // print results