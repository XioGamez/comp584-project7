const fs = require('fs')  // load the filesystem module from the Node.js core library

const passes = fs.readFileSync("input/day_5_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace
    .split('\n');  // split boarding pass using '\n' as separator

function getSeatID(pass) {  // convert boarding pass to seat ID
    const binary = pass    // replace characters with binary values
        .replaceAll("F", "0")
        .replaceAll("B", "1")
        .replaceAll("L", "0")
        .replaceAll("R", "1");

    // first 7 bits = row, last 3 bits = column (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
    const row = parseInt(binary.slice(0, 7), 2);
    const col = parseInt(binary.slice(7), 2);

    return row * 8 + col;
}

let maxSeatID = 0;

for (let pass of passes) {  // loop through all boarding passes

    const id = getSeatID(pass);

    if (id > maxSeatID) {
        maxSeatID = id;
    }
}
console.log("Highest seat ID:", maxSeatID);
