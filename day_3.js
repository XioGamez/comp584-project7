const fs = require('fs')  // load the filesystem module from the Node.js core library

const data = fs.readFileSync("input/day_3_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
    .split('\n');  // split data into string array using '\n' as separator (each string new row in map)

const width = data[0].length ; // store width (used for horizonal wrapping)
const height = data.length;  // store height (number of rows)

// starting positions
let x = 0;
let y = 0;

let count = 0;  // tree counter (#)

while (y < height) {
    if (data[y][x % width] === "#")  // if current position contains tree
        count++;  // increment tree counter

    // move according to slope (right 3, down 1)
    x += 3;
    y ++;
}
console.log("Trees encounters", count);  // print results