const fs = require('fs')  // load the filesystem module from the Node.js core library

const passports = fs.readFileSync("input/day_4_input.txt", "utf8")  // read file as synchronous read
    .split('\n\n');  // split passports by blank lines '\n\n' as separator

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];  // required

let valid = 0;

for (passport of passports) {
    const data = passport.replaceAll("\n", " ");  // newline -> space (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

    const fields = data.split(" ");  // split into "key:value" pairs
    const keys = new Set();  // create Set for fast lookup (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    for (let field of fields) {
        if (!field) continue;

        const key = field.split(":")[0];  // extract key from "key:value" pair
        keys.add(key);  // add to Set
    }

    const isValid = requiredFields.every(field => keys.has(field));  // check is all required fields exist
    if (isValid)  // if true
        valid++;  // increment counter
}
console.log("Valid passports:", valid);