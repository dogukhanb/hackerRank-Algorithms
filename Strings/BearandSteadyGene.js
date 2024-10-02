A gene is represented as a string of length  (where  is divisible by ), composed of the letters , , , and . It is considered to be steady if each of the four letters occurs exactly  times. For example,  and  are both steady genes.

Bear Limak is a famous biotechnology scientist who specializes in modifying bear DNA to make it steady. Right now, he is examining a gene represented as a string . It is not necessarily steady. Fortunately, Limak can choose one (maybe empty) substring of  and replace it with any string of the same length.

Modifying a large substring of bear genes can be dangerous. Given a string , can you help Limak find the length of the smallest possible substring that he can replace to make  a steady gene?

Note: A substring of a string  is a subsequence made up of zero or more contiguous characters of .

As an example, consider . The substring  just before or after  can be replaced with  or . One selection would create .

Function Description

Complete the  function in the editor below. It should return an integer that represents the length of the smallest substring to replace.

steadyGene has the following parameter:

gene: a string
Input Format

The first line contains an interger  divisible by , that denotes the length of a string .
The second line contains a string  of length .

Constraints

 is divisible by 
Subtask

 in tests worth  points.
Output Format

Print the length of the minimum length substring that can be replaced to make  stable.

Sample Input

8  
GAAATAAA
Sample Output

5
Explanation

One optimal solution is to replace  with  resulting in .
The replaced substring has length .

/* ------------------------------ */

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
 * Complete the 'steadyGene' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING gene as parameter.
 */
function steadyGene(gene) {
    const n = gene.length;
    const targetCount = n / 4; // Each character should appear this many times
    const charCount = { 'A': 0, 'C': 0, 'G': 0, 'T': 0 };
    
    // Count occurrences of each character in the gene
    for (const char of gene) {
        charCount[char]++;
    }
    
    // Determine how many characters exceed the target count
    const excess = {};
    let totalExcess = 0;

    for (const char of "ACGT") {
        if (charCount[char] > targetCount) {
            excess[char] = charCount[char] - targetCount; // How many we have in excess
            totalExcess += excess[char]; // Total characters we need to replace
        } else {
            excess[char] = 0; // No excess for this character
        }
    }

    // If there's no excess, we already have a steady gene
    if (totalExcess === 0) return 0;

    let left = 0;
    let minLength = n; // Start with maximum possible length
    const currentWindowCount = { 'A': 0, 'C': 0, 'G': 0, 'T': 0 }; // Count of characters in the current window

    // Sliding window approach
    for (let right = 0; right < n; right++) {
        currentWindowCount[gene[right]]++; // Add the current character to the window

        // Check if the current window can cover the excess counts
        while (canCover(currentWindowCount, excess)) {
            minLength = Math.min(minLength, right - left + 1); // Update the minimum length
            currentWindowCount[gene[left]]--; // Remove the left character from the window
            left++; // Move the left pointer to the right
        }
    }
    
    return minLength;
}

// Helper function to determine if the current window can cover the excess
function canCover(currentWindowCount, excess) {
    for (const char of "ACGT") {
        if (currentWindowCount[char] < excess[char]) {
            return false; // If we have less than the excess needed, it's not valid
        }
    }
    return true; // It's valid if we can achieve steady gene with this window
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const gene = readLine();

    const result = steadyGene(gene);

    ws.write(result + '\n');
    ws.end();
}
