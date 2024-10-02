Palindromes are strings that read the same from the left or right, for example madam or 0110.

You will be given a string representation of a number and a maximum number of changes you can make. Alter the string, one digit at a time, to create the string representation of the largest number possible given the limit to the number of changes. The length of the string may not be altered, so you must consider 's left of all higher digits in your tests. For example  is valid,  is not.

Given a string representing the starting number, and a maximum number of changes allowed, create the largest palindromic string of digits possible or the string '-1' if it is not possible to create a palindrome under the contstraints.

Example


Make  replacements to get .



Make  replacement to get .

Function Description

Complete the highestValuePalindrome function in the editor below.

highestValuePalindrome has the following parameter(s):

string s: a string representation of an integer
int n: the length of the integer string
int k: the maximum number of changes allowed
Returns

string: a string representation of the highest value achievable or -1
Input Format

The first line contains two space-separated integers,  and , the number of digits in the number and the maximum number of changes allowed.
The second line contains an -digit string of numbers.

Constraints

Each character  in the number is an integer where .
Output Format

Sample Input 0

STDIN   Function
-----   --------
4 1     n = 4, k = 1
3943    s = '3943'
Sample Output 0

3993
Sample Input 1

6 3
092282
Sample Output 1

992299
Sample Input 2

4 1
0011
Sample Output 2

-1
Explanation

Sample 0

There are two ways to make  a palindrome by changing no more than  digits:



 /*------------------------------------------- */
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
  * Complete the 'highestValuePalindrome' function below.
  *
  * The function is expected to return a STRING.
  * The function accepts following parameters:
  *  1. STRING s
  *  2. INTEGER n
  *  3. INTEGER k
  */
 
 function highestValuePalindrome(s, n, k) {
     let arr = s.split('');
     let changes = 0;
 
     // Step 1: Make the input a palindrome with minimum changes
     for (let i = 0; i < Math.floor(n / 2); i++) {
         if (arr[i] !== arr[n - 1 - i]) {
             const maxChar = Math.max(arr[i], arr[n - 1 - i]);
             arr[i] = maxChar;
             arr[n - 1 - i] = maxChar;
             changes++;
         }
     }
 
     // If the number of changes exceeds k, return -1
     if (changes > k) {
         return '-1';
     }
 
     // Step 2: Maximize the palindrome to get the largest number
     for (let i = 0; i < Math.floor(n / 2); i++) {
         if (arr[i] !== '9') {
             if (changes < k) {
                 if (s[i] !== arr[i] || s[n - 1 - i] !== arr[n - 1 - i]) {
                     arr[i] = '9';
                     arr[n - 1 - i] = '9';
                     changes++;
                 } else if (changes + 2 <= k) {
                     arr[i] = '9';
                     arr[n - 1 - i] = '9';
                     changes += 2;
                 }
             }
         }
     }
 
     // Handle the middle character for odd-length strings
     if (n % 2 === 1 && changes < k) {
         arr[Math.floor(n / 2)] = '9';
     }
 
     return arr.join('');
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
 
     const n = parseInt(firstMultipleInput[0], 10);
     const k = parseInt(firstMultipleInput[1], 10);
     const s = readLine();
 
     const result = highestValuePalindrome(s, n, k);
 
     ws.write(result + '\n');
     ws.end();
 }
 