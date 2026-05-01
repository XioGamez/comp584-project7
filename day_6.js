const fs = require('fs')  // load the filesystem module from the Node.js core library

const groups = fs.readFileSync("input/day_6_input.txt", "utf8")  // read file as synchronous read
    .trim()  // removes whitespace
    .split('\n\n');  // each group is separated by "\n\n"

let total = 0;

for (let group of groups) {  // loop through each group
    const people = group.split('\n');  // split group into individual people

    let common = new Set(people[0]); // start with the first person's answers as a Set

    // part 1: const answers = group.replaceAll('\n', '');  // remove newlines so all answers are in one string

    for (let person of people.slice(1)) {  // intersect with every other person's answers

        const current = new Set(person);

        common = new Set([...common].filter(x => current.has(x)));  // keep only letters that exist in both sets
    }
    // part 1:const uniqueAnswers = new Set(answers);  // Set automatically removes duplicates (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    // part 1: total += uniqueAnswers.size;  // add number of unique "yes" answers
    total += common.size;  // add questions everyone agreed on
}
// part 1: console.log("Sum of counts:", total);  // print results
console.log("Sum of unanimous yes counts:", total);  // print results