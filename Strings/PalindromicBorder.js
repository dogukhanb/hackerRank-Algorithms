A border of a string is a proper prefix of it that is also a suffix. For example:

a and abra are borders of abracadabra,
kan and kankan are borders of kankankan.
de is a border of decode.
Note that decode is not a border of decode because it's not proper.

A palindromic border is a border that is palindromic. For example,

a and ana are palindromic borders of anabanana,
l, lol and lolol are palindromic borders of lololol.
Let's define  as the number of palindromic borders of string . For example, if  lololol, then .

Now, a string of length  has exactly  non-empty substrings (we count substrings as distinct if they are of different lengths or are in different positions, even if they are the same string). Given a string , consisting only of the first 8 lowercase letters of the English alphabet, your task is to find the sum of  for all the non-empty substrings  of . In other words, you need to find:

where  is the substring of  starting at position  and ending at position .
Since the answer can be very large, output the answer modulo .

Input Format

The first line contains a string consisting of  characters.

Output Format

Print a single integer: the remainder of the division of the resulting number by .

Constraints


All characters in the string can be any of the first 8 lowercase letters of the English alphabet (abcdefgh).

Sample Input 1

ababa
Sample Output 1

5
Sample Input 2

aaaa
Sample Output 2

10
Sample Input 3

abcacb
Sample Output 3

3
Explanation

 ababa has 15 substrings but only 4 substrings have palindromic borders.

 aba 
 ababa 
 bab 
 aba 

  /* ------------------- */

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
 * Complete the 'palindromicBorder' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function isPalindrome(str) {
    let left = 0;
    let right = str.length - 1;
    while (left < right) {
        if (str[left] !== str[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}

function countPalindromicBorders(substring) {
    let count = 0;
    let length = substring.length;

    // Check all possible borders
    for (let i = 1; i < length; i++) {
        let prefix = substring.slice(0, i);
        let suffix = substring.slice(length - i);
        if (prefix === suffix && isPalindrome(prefix)) {
            count++;
        }
    }

    return count;
}

function palindromicBorder(s) {
    const MOD = 1000000007;
    let totalPalindromicBorders = 0;
    let length = s.length;

    // Generate all substrings
    for (let start = 0; start < length; start++) {
        for (let end = start + 1; end <= length; end++) {
            let substring = s.slice(start, end);
            totalPalindromicBorders += countPalindromicBorders(substring);
            totalPalindromicBorders %= MOD; // Apply modulo at each step
        }
    }

    return totalPalindromicBorders;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const s = readLine().trim();
    const result = palindromicBorder(s);
    ws.write(result + '\n');
    ws.end();
}