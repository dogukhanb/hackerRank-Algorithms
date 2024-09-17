Alice has a binary string. She thinks a binary string is beautiful if and only if it doesn't contain the substring .

In one step, Alice can change a  to a  or vice versa. Count and print the minimum number of steps needed to make Alice see the string as beautiful.

Example


She can change any one element and have a beautiful string.

Function Description

Complete the beautifulBinaryString function in the editor below.

beautifulBinaryString has the following parameter(s):

string b: a string of binary digits
Returns

int: the minimum moves required
Input Format

The first line contains an integer , the length of binary string.
The second line contains a single binary string .

Constraints

.
Output Format

Print the minimum number of steps needed to make the string beautiful.

Sample Input 0

STDIN       Function
-----       --------
7           length of string n = 7
0101010     b = '0101010'
Sample Output 0

2  
Explanation 0:

In this sample, 

The figure below shows a way to get rid of each instance of :

binary.png

Make the string beautiful by changing  characters ( and ).

Sample Input 1

5
01100
Sample Output 1

0
Sample Case 1:

In this sample 

Explanation 1

The substring  does not occur in , so the string is already beautiful in  moves.

Sample Input 2

10
0100101010
Sample Output 2

3
Explanation 2

In this sample 

One solution is to change the values of  to form a beautiful string.

/* ------------------------------------------------------------ */ 

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
 * Complete the 'beautifulBinaryString' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING b as parameter.
 */
function beautifulBinaryString(b) {
    let count = 0;
    let i = 0;
    
    // Traverse the string
    while (i < b.length - 2) {
        // Check if the current substring is "010"
        if (b.substring(i, i + 3) === '010') {
            count++;
            // Skip past the fixed "010" substring
            i += 3;
        } else {
            i++;
        }
    }
    
    return count;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const b = readLine().trim();

    const result = beautifulBinaryString(b);

    ws.write(result + '\n');

    ws.end();
}
