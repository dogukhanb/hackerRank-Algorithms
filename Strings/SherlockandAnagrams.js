Two strings are anagrams of each other if the letters of one string can be rearranged to form the other string. Given a string, find the number of pairs of substrings of the string that are anagrams of each other.

Example

The list of all anagrammatic pairs is  at positions  respectively.

Function Description

Complete the function sherlockAndAnagrams in the editor below.

sherlockAndAnagrams has the following parameter(s):

string s: a string
Returns

int: the number of unordered anagrammatic pairs of substrings in 
Input Format

The first line contains an integer , the number of queries.
Each of the next  lines contains a string  to analyze.

Constraints



 contains only lowercase letters in the range ascii[a-z].

Sample Input 0

2
abba
abcd
Sample Output 0

4
0
Explanation 0

The list of all anagrammatic pairs is  and  at positions  and  respectively.

No anagrammatic pairs exist in the second query as no character repeats.

Sample Input 1

2
ifailuhkqq
kkkk
Sample Output 1

3
10
Explanation 1

For the first query, we have anagram pairs  and  at positions  and  respectively.

For the second query:
There are 6 anagrams of the form  at positions  and .
There are 3 anagrams of the form  at positions  and .
There is 1 anagram of the form  at position .

Sample Input 2

1
cdcd
Sample Output 2

5
Explanation 2

There are two anagrammatic pairs of length :  and .
There are three anagrammatic pairs of length :  at positions  respectively.


/* ------------------------------------------ */
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
 * Complete the 'sherlockAndAnagrams' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */
function sherlockAndAnagrams(s) {
    const map = new Map();
    const n = s.length;

    // Generate all substrings
    for (let i = 0; i < n; i++) {
        const charCount = Array(26).fill(0); // Array to hold character counts
        for (let j = i; j < n; j++) {
            charCount[s[j].charCodeAt(0) - 'a'.charCodeAt(0)]++; // Update character count
            
            // Convert character count to a string (or use a tuple)
            const key = charCount.join('#'); // Using a delimiter to create a unique key
            // Update the count of this key in the map
            if (map.has(key)) {
                map.set(key, map.get(key) + 1);
            } else {
                map.set(key, 1);
            }
        }
    }

    // Calculate the number of anagrammatic pairs
    let count = 0;
    for (let value of map.values()) {
        if (value > 1) {
            count += (value * (value - 1)) / 2; // Combination C(n, 2)
        }
    }

    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const s = readLine().trim();

        const result = sherlockAndAnagrams(s);

        ws.write(result + '\n');
    }

    ws.end();
}
