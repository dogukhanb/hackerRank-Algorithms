HackerLand Enterprise is adopting a new viral advertising strategy. When they launch a new product, they advertise it to exactly  people on social media.

On the first day, half of those  people (i.e., ) like the advertisement and each shares it with  of their friends. At the beginning of the second day,  people receive the advertisement.

Each day,  of the recipients like the advertisement and will share it with  friends on the following day. Assuming nobody receives the advertisement twice, determine how many people have liked the ad by the end of a given day, beginning with launch day as day .

Example
.

Day Shared Liked Cumulative
1      5     2       2
2      6     3       5
3      9     4       9
4     12     6      15
5     18     9      24
The progression is shown above. The cumulative number of likes on the  day is .

Function Description

Complete the viralAdvertising function in the editor below.

viralAdvertising has the following parameter(s):

int n: the day number to report
Returns

int: the cumulative likes at that day
Input Format

A single integer, , the day number.

Constraints

Sample Input

3
Sample Output

9
Explanation

This example is depicted in the following diagram:

strange ad.png

 people liked the advertisement on the first day,  people liked the advertisement on the second day and  people liked the advertisement on the third day, so the answer is .

 /* ----------------------------------------------------- */


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
     inputString = inputString.split('\n').map(str => str.trim());
     main();
 });
 
 function readLine() {
     return inputString[currentLine++];
 }
 
 /*
  * Complete the 'viralAdvertising' function below.
  *
  * The function is expected to return an INTEGER.
  * The function accepts INTEGER n as parameter.
  */
 function viralAdvertising(n) {
     let peopleReceived = 5; // Initial number of people who receive the advertisement
     let cumulativeLikes = 0;
     
     for (let day = 1; day <= n; day++) {
         // Calculate likes for the current day
         let likesToday = Math.floor(peopleReceived / 2);
         cumulativeLikes += likesToday;
         
         // Prepare for the next day
         peopleReceived = likesToday * 3;
     }
     
     return cumulativeLikes;
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const n = parseInt(readLine().trim(), 10);
 
     const result = viralAdvertising(n);
 
     ws.write(result + '\n');
 
     ws.end();
 }

 
 