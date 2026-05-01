const fs = require('fs')  // load the filesystem module from the Node.js core library

const passports = fs.readFileSync("input/day_4_input.txt", "utf8")  // read file as synchronous read
    .split('\n\n');  // split passports by blank lines '\n\n' as separator

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];  // required

let valid = 0;

function isValidField(key, value) {  // validate each field according to rules
    const num = Number(value);  // string -> number

    switch (key) {
        case "byr":
            return value.length === 4 && num >= 1920 && num <= 2002;

        case "iyr":
            return value.length === 4 && num >= 2010 && num <= 2020;

        case "eyr":
            return value.length === 4 && num >= 2020 && num <= 2030;

        case "hgt":
            if (value.endsWith("cm")) {
                const h = Number(value.replace("cm", ""));
                return h >= 150 && h <= 193;
            }
            if (value.endsWith("in")) {
                const h = Number(value.replace("in", ""));
                return h >= 59 && h <= 76;
            }
            return false;

        case "hcl":
            return /^#[0-9a-f]{6}$/.test(value);  // regex: # followed by exactly 6 hex chars (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions)

        case "ecl":
            return ["amb","blu","brn","gry","grn","hzl","oth"].includes(value);  // (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

        case "pid":
            return /^[0-9]{9}$/.test(value);

        default:
            return true; // ignore cid
    }
}

for (let passport of passports) {
    const data = passport.replaceAll("\n", " ");  // newline -> space (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

    const fields = data.split(" ");  // split into "key:value" pairs

    const map = {};

    // part 1: const keys = new Set();  // create Set for fast lookup (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

    for (let field of fields) {
        if (!field) continue;

        const [key, value] = field.split(":");  // extract key from "key:value" pair
        map[key] = value;
    }

    const isValid = requiredFields.every(key => map[key] && isValidField(key, map[key]));  // check is all required fields exist (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)
    if (isValid)  // if true
        valid++;  // increment counter
}
console.log("Valid passports:", valid);