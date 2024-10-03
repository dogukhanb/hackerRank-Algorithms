Consider a string, , of  lowercase English letters where each character,  (, denotes the letter at index  in . We define an  palindromic tuple of  to be a sequence of indices in  satisfying the following criteria:

    , meaning the characters located at indices  and  are the same.
    , meaning the characters located at indices  and  are the same.
    , meaning that , , , and  are ascending in value and are valid indices within string .
    Given , find and print the number of  tuples satisfying the above conditions. As this value can be quite large, print it modulo .
    
    Function Description
    Complete the function shortPalindrome in the editor below.
    
    shortPalindrome has the following paramter(s):
    - string s: a string
    
    Returns
    - int: the number of tuples, modulo 
    
    Input Format
    
    A single string, .
    
    Constraints
    
    It is guaranteed that  only contains lowercase English letters.
    Sample Input 0
    
    kkkkkkz
    Sample Output 0
    
    15
    Explanation 0
    
    The letter z will not be part of a valid tuple because you need at least two of the same character to satisfy the conditions defined above. Because all tuples consisting of four k's are valid, we just need to find the number of ways that we can choose four of the six k's. This means our answer is .
    
    Sample Input 1
    
    ghhggh
    Sample Output 1
    
    4
    Explanation 1
    
    The valid tuples are:
    
    Thus, our answer is .
    
    Sample Input 0
    
    kkkkkkz
    Sample Output 0
    
    15
    Sample Input 1
    
    abbaab
    Sample Output 1
    
    4
    Sample Input 2
    
    akakak
    Sample Output 2
    
    2
    Explanation 2
    
    Tuples possible are 

     /* -------------------------- */


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
 * Complete the 'shortPalindrome' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function shortPalindrome(s) {
    const MOD = 1000000007;
    const n = s.length;
   
    // Store positions of each character
    const positions = {};
   
    for (let i = 0; i < n; i++) {
        const char = s[i];
        if (!positions[char]) {
            positions[char] = [];
        }
        positions[char].push(i);
    }

    let totalTuples = 0;

    // Iterate over each character and their positions
    for (const char in positions) {
        const indices = positions[char];
        const len = indices.length;

        // We need at least 2 indices to form pairs
        if (len < 2) continue;

        // Count valid tuples
        for (let j = 0; j < len; j++) {
            for (let k = j + 1; k < len; k++) {
                const first = indices[j];
                const second = indices[k];
               
                // Count how many pairs can be formed between first and second
                for (let l = second + 1; l < n; l++) {
                    if (s[l] === char) {
                        totalTuples = (totalTuples + 1) % MOD;
                    }
                }
            }
        }
    }

    return totalTuples;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine().trim();
    const result = shortPalindrome(s);
    ws.write(result + '\n');
    ws.end();
}