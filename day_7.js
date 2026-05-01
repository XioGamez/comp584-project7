const fs = require('fs')  // load the filesystem module from the Node.js core library

// Read input file
const rules = fs.readFileSync("input/day_7_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace
    .split('\n');

const canBeInside = new Map();  // reverse adjacency list: key = inner bag color, value = array of outer bags that can contain it (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

for (let line of rules) {
    const [outer, inner] = line.split(" bags contain ");   // split into outer bag and inner bag rules

    if (inner.includes("no other bags")) continue;  // if no other bags, skip

    const parts = inner.split(",");  // split multiple contained bags

    for (let part of parts) {
        const match = part.match(/(\d+) (.+?) bag/);  // extract: number + bag color (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expression)

        if (!match) continue;

        const [, count, color] = match;

        if (!canBeInside.has(color)) {  // ensure list exists for this inner bag color
            canBeInside.set(color, []);
        }
        canBeInside.get(color).push(outer);  // store reverse relationship: child → parent
    }
}

// BFS setup starting from "shiny gold"
const target = "shiny gold";
const queue = [target];
const seen = new Set();

while (queue.length > 0) {  // breadth-first search outward through reverse graph
    const current = queue.shift();  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

    const parents = canBeInside.get(current) || [];  // get all bags that can contain current bag

    for (let p of parents) {
        if (!seen.has(p)) {
            seen.add(p);
            queue.push(p);
        }
    }
}
console.log("Bag colors that can contain shiny gold:", seen.size);  // print result