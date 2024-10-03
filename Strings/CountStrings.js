A regular expression is used to describe a set of strings. For this problem the alphabet is limited to 'a' and 'b'.

We define  to be a valid regular expression if:
1)  is "" or "".
2)  is of the form "", where  and  are regular expressions.
3)  is of the form "" where  and  are regular expressions.
4)  is of the form "" where  is a regular expression.

Regular expressions can be nested and will always have have two elements in the parentheses. ('' is an element, '' is not; basically, there will always be pairwise evaluation) Additionally, '' will always be the second element; '' is invalid.

The set of strings recognized by  are as follows:
1) If  is "", then the set of strings recognized .
2) If  is "", then the set of strings recognized .
3) If  is of the form "" then the set of strings recognized = all strings which can be obtained by a concatenation of strings  and , where  is recognized by  and  by .
4) If  is of the form "" then the set of strings recognized = union of the set of strings recognized by  and .
5) If  is of the form "" then the the strings recognized are the empty string and the concatenation of an arbitrary number of copies of any string recognized by .

Task
Given a regular expression and an integer, , count how many strings of length  are recognized by it.

Input Format

The first line contains the number of test cases .  test cases follow.
Each test case contains a regular expression, , and an integer, .

Constraints

It is guaranteed that  will conform to the definition provided above.
Output Format

Print  lines, one corresponding to each test case containing the required answer for the corresponding test case. As the answers can be very big, output them modulo .

Sample Input

3  
((ab)|(ba)) 2  
((a|b)*) 5  
((a*)(b(a*))) 100
Sample Output

2  
32  
100
Explanation

For the first case, the only strings recognized are "" and "". Of the  possible strings of length ,  of them fit that expression.
For the second case, the RegEx recognizes any string of any length containing only 's and 's. The number of strings of length  recognized by this expression is .
For the third case, the RegEx recognizes any string having one , preceeded and followed by any number of 's. There are  strings of length  which have a single  in them.

 /* ---------------------------- */



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
 * Complete the 'countStrings' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. STRING r
 *  2. INTEGER l
 */

function countStrings(r, l) {
    const MOD = 1000000007;

    // Memoization
    const memo = new Map();

    function dp(regex, length) {
        if (length < 0) return 0; // Invalid length
        if (regex === '') return length === 0 ? 1 : 0; // Valid if empty regex and length 0

        const key = `${regex}:${length}`;
        if (memo.has(key)) return memo.get(key);

        let count = 0;

        if (regex[0] === '(') {
            // Find matching closing parenthesis
            let stack = 1;
            let j = 1;
            while (stack > 0 && j < regex.length) {
                if (regex[j] === '(') stack++;
                else if (regex[j] === ')') stack--;
                j++;
            }

            const inner = regex.slice(1, j - 1); // Inner regex content
            const rest = regex.slice(j); // Remaining regex

            const options = inner.split('|'); // Split by union

            for (let option of options) {
                if (rest.startsWith('*')) {
                    // Handle Kleene star case
                    count = (count + dp(option, length) + dp(option, length - 1)) % MOD; // Include empty
                    for (let k = 1; k <= length; k++) {
                        count = (count + dp(option, k)) % MOD; // Non-empty cases
                    }
                } else {
                    // Handle concatenation
                    for (let k = 0; k <= length; k++) {
                        count = (count + dp(option, k) * dp(rest, length - k)) % MOD;
                    }
                }
            }
        } else if (regex === 'a' || regex === 'b') {
            count = length === 1 ? 1 : 0; // Valid only for length 1
        }

        memo.set(key, count);
        return count;
    }

    return dp(r, l);
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const r = firstMultipleInput[0];

        const l = parseInt(firstMultipleInput[1], 10);

        const result = countStrings(r, l);

        ws.write(result + '\n');
    }

    ws.end();
}