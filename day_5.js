const fs = require('fs')  // load the filesystem module from the Node.js core library

const passes = fs.readFileSync("input/day_5_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace
    .split('\n');  // split boarding pass using '\n' as separator

function getSeatID(pass) {  // convert boarding pass to seat ID
    const binary = pass    // replace characters with binary values
        .replaceAll("F", "0") // front -> lower half
        .replaceAll("B", "1") // back -> upper half
        .replaceAll("L", "0") // left -> lower half
        .replaceAll("R", "1"); // right -> upper half

    // first 7 bits = row, last 3 bits = column (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)
    const row = parseInt(binary.slice(0, 7), 2);
    const col = parseInt(binary.slice(7), 2);

    return row * 8 + col;
}

// part 1: let maxSeatID = 0;

// part 1: for (let pass of passes) {  // loop through all boarding passes
//     const id = getSeatID(pass);
//
//     if (id > maxSeatID)
//         maxSeatID = id;
// }

const ids = passes.map(getSeatID);  // convert all boarding passes into seat IDs

ids.sort((a, b) => a - b);  // sort seat in ascending order, find the missing gap (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

let mySeat = null;

// find the missing seat ID by detecting gap in sequence
for (let i = 0; i < ids.length - 1; i++) {
    if (ids[i + 1] !== ids[i] + 1) {  // if next ID is not exactly +1, there's a gap
        mySeat = ids[i] + 1;  // missing seat is in between
        break;
    }
}
// part 1: console.log("Highest seat ID:", maxSeatID);
console.log("My seat ID:", mySeat);
