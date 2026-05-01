const fs = require('fs')  // load the filesystem module from the Node.js core library

const data = fs.readFileSync("input/day_3_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)
    .split('\n');  // split data into string array using '\n' as separator (each string new row in map)

const width = data[0].length ; // store width (used for horizonal wrapping)
const height = data.length;  // store height (number of rows)

function countTrees (dx, dy) {  // dx = steps right, dy = steps down
    let x = 0;  // horizontal
    let y = 0;  // vertical
    let count = 0;  // tree counter

    while (y < height) {
        if (data[y][x % width] === "#")  // if current position contains tree
            count++;  // increment tree counter

        // move according to slope
        x += dx;
        y += dy;
    }
    return count;
}

const slopes = [  // all slopes to test
    [1, 1],
    [3, 1],  // original slope
    [5, 1],
    [7, 1],
    [1, 2]
];

let result = 1;

for (let [dx, dy] of slopes) {  // loop through each slope
    result *= countTrees(dx, dy);  // multiply tree count for each slope
}
console.log("Trees encountered:", result);  // print results