The SuperBowl Lottery is about to commence, and there are several lottery tickets being sold, and each ticket is identified with a ticket ID. In one of the many winning scenarios in the Superbowl lottery, a winning pair of tickets is:

Concatenation of the two ticket IDs in the pair, in any order, contains each digit from  to  at least once.
For example, if there are  distinct tickets with ticket ID  and ,  is a winning pair.

NOTE: The ticket IDs can be concantenated in any order. Digits in the ticket ID can occur in any order.

Your task is to find the number of winning pairs of distinct tickets, such that concatenation of their ticket IDs (in any order) makes for a winning scenario. Complete the function winningLotteryTicket which takes a string array of ticket IDs as input, and return the number of winning pairs.

Input Format

The first line contains  denoting the total number of lottery tickets in the super bowl.
Each of the next  lines contains a string, where string on a  line denotes the ticket id of the  ticket.

Constraints

 length of  
sum of lengths of all 
Each ticket id consists of digits from 
Output Format

Print the number of pairs in a new line.

Sample Input 0

5
129300455 
5559948277
012334556 
56789
123456879
Sample Output 0

5
Explanation 0

Pairs of distinct tickets that make for a winning scenario are :

Ticket ID 1	Ticket ID 2	Winning Pair
Notice that each winning pair has digits from  to  atleast once, and the digits in the ticket ID can be of any order. Thus, the number of winning pairs is .

 /* -------------------------------- */
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
  * Complete the 'winningLotteryTicket' function below.
  *
  * The function is expected to return a LONG_INTEGER.
  * The function accepts STRING_ARRAY tickets as parameter.
  */
 
 function winningLotteryTicket(tickets) {
     const masks = tickets.map(ticket => {
         let mask = 0;
         for (const char of ticket) {
             const digit = parseInt(char, 10);
             mask |= (1 << digit); // Set the bit corresponding to the digit
         }
         return mask;
     });
 
     let totalWinningPairs = 0; // Change const to let
     const fullMask = (1 << 10) - 1; // This is 1023, which represents all digits 0-9
 
     // Count valid pairs
     for (let i = 0; i < masks.length; i++) {
         for (let j = i + 1; j < masks.length; j++) {
             if ((masks[i] | masks[j]) === fullMask) {
                 totalWinningPairs++;
             }
         }
     }
 
     return totalWinningPairs;
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
 
     const n = parseInt(readLine().trim(), 10);
 
     let tickets = [];
 
     for (let i = 0; i < n; i++) {
         const ticketsItem = readLine();
         tickets.push(ticketsItem);
     }
 
     const result = winningLotteryTicket(tickets);
 
     ws.write(result + '\n');
 
     ws.end();
 }
 