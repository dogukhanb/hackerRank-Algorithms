Johnny is playing with a large binary number, . The number is so large that it needs to be compressed into an array of integers, , where the values in even indices () represent some number of consecutive  bits and the values in odd indices () represent some number of consecutive  bits in alternating substrings of .

For example, suppose we have array .  represents ,  represents ,  represents ,  represents , and  represents . The number of consecutive binary characters in the  substring of  corresponds to integer , as shown in this diagram:

whats.png

When we assemble the sequential alternating sequences of 's and 's, we get .

We define setCount() to be the number of 's in a binary number, . Johnny wants to find a binary number, , that is the smallest binary number  where setCount() = setCount(). He then wants to compress  into an array of integers,  (in the same way that integer array  contains the compressed form of binary string ).

Johnny isn't sure how to solve the problem. Given array , find integer array  and print its length on a new line. Then print the elements of array  as a single line of space-separated integers.

Input Format

The first line contains a single positive integer, , denoting the number of test cases. Each of the  subsequent lines describes a test case over  lines:

The first line contains a single positive integer, , denoting the length of array .
The second line contains  positive space-separated integers describing the respective elements in integer array  (i.e., ).
Constraints

Subtasks

For a  score, .
For a  score, .
Output Format

For each test case, print the following  lines:

Print the length of integer array  (the array representing the compressed form of binary integer ) on a new line.
Print each element of  as a single line of space-separated integers.
It is guaranteed that a solution exists.

Sample Input 0

1
5
4 1 3 2 4
Sample Output 0

7
4 1 3 1 1 1 3
Explanation 0

, which expands to . We then find setCount() . The smallest binary number  which also has eleven 's is . This can be reduced to the integer array . This is demonstrated by the following figure:

whats-2.png

Having found , we print its length () as our first line of output, followed by the space-separated elements in  as our second line of output.

 /* ------------------------ */

 'use strict';

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
  * Complete the 'whatsNext' function below.
  *
  * The function accepts INTEGER_ARRAY arr as parameter.
  */
 
 function whatsNext(arr) {
     const result = [];
 
     // Iterate through the input array to construct the output
     for (let i = 0; i < arr.length; i++) {
         // Push the count of '1's at even indices
         result.push(arr[i]); // Push count of 1's
 
         // If there's a next count, we can add at least one '0'
         if (i < arr.length - 1) {
             result.push(1); // Push at least one '0'
         }
     }
 
     // Output the result
     console.log(result.length);
     console.log(result.join(' '));
 }
 
 function main() {
     const t = parseInt(readLine().trim(), 10);
 
     for (let tItr = 0; tItr < t; tItr++) {
         const arrCount = parseInt(readLine().trim(), 10);
         const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
         whatsNext(arr);
     }
 }
 