A weighted string is a string of lowercase English letters where each letter has a weight. Character weights are  to  from  to  as shown below:

image

The weight of a string is the sum of the weights of its characters. For example:

image

A uniform string consists of a single character repeated zero or more times. For example, ccc and a are uniform strings, but bcb and cd are not.
Given a string, , let  be the set of weights for all possible uniform contiguous substrings of string . There will be  queries to answer where each query consists of a single integer. Create a return array where for each query, the value is Yes if . Otherwise, append No.

Note: The  symbol denotes that  is an element of set .

Example

.

Working from left to right, weights that exist are:

string  weight
a       1
b       2
bb      4
c       3
cc      6
ccc     9
d       4
dd      8
ddd     12
dddd    16
Now for each value in , see if it exists in the possible string weights. The return array is ['Yes', 'No', 'No', 'Yes', 'No'].

Function Description

Complete the weightedUniformStrings function in the editor below.

weightedUniformStrings has the following parameter(s):
- string s: a string
- int queries[n]: an array of integers

Returns
- string[n]: an array of strings that answer the queries

Input Format

The first line contains a string , the original string.
The second line contains an integer , the number of queries.
Each of the next  lines contains an integer , the weight of a uniform subtring of  that may or may not exist.

Constraints

 will only contain lowercase English letters, ascii[a-z].
Sample Input 0

abccddde
6
1
3
12
5
9
10
Sample Output 0

Yes
Yes
Yes
Yes
No
No
Explanation 0

The weights of every possible uniform substring in the string abccddde are shown below:

image

We print Yes on the first four lines because the first four queries match weights of uniform substrings of . We print No for the last two queries because there are no uniform substrings in  that have those weights.

Note that while de is a substring of  that would have a weight of , it is not a uniform substring.

Note that we are only dealing with contiguous substrings. So ccc is not a substring of the string ccxxc.

Sample Input 1

aaabbbbcccddd
5
9
7
8
12
5
Sample Output 1

Yes
No
Yes
Yes
No

/* ---------------------------------------------------- */

'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'weightedUniformStrings' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER_ARRAY queries
 */
function weightedUniformStrings(s, queries) {
    const weights = new Set();
    const charWeight = (char) => char.charCodeAt(0) - 'a'.charCodeAt(0) + 1;

    let currentChar = '';
    let currentWeight = 0;

    for (let char of s) {
        if (char === currentChar) {
            currentWeight += charWeight(char);
        } else {
            currentChar = char;
            currentWeight = charWeight(char);
        }
        weights.add(currentWeight);
    }

    return queries.map(query => weights.has(query) ? 'Yes' : 'No');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine().trim();

    const queriesCount = parseInt(readLine().trim(), 10);

    let queries = [];

    for (let i = 0; i < queriesCount; i++) {
        const queriesItem = parseInt(readLine().trim(), 10);
        queries.push(queriesItem);
    }

    const result = weightedUniformStrings(s, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
