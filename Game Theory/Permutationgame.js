Alice and Bob play the following game:

They choose a permutation of the numbers  to .
Alice plays first and they alternate.
In a turn, they can remove any one remaining number from the permutation.
The game ends when the remaining numbers form an increasing sequence of  or more numbers. The person who played the turn that leaves an increasing sequence wins the game.
Assuming both play optimally, who wins the game? Return Alice or Bob.

Example 

This is the starting permutation to analyze, . First, Alice chooses  or . For the example, Alice chooses  and leaves . Since this is a decreasing sequence, Bob can remove any number for optimum play. He will lose regardless. Alice then removes any number leaving an array of only one element. Since Alice removed the last element to create an increasing sequence, Alice wins.

Function Description

Complete the permutationGame function in the editor below.

permutationGame has the following parameter:
- int arr[n]: the starting permutation

Returns

string: either Alice or Bob
Input Format

The first line contains the number of test cases .

Each of the next  pairs of lines is in the following format:
- The first line contains an integer , the size of the array 
- The second line contains  space-separated integers,  where 

Constraints

The permutation will not be an increasing sequence initially.
Sample Input

STDIN       Function
-----       --------
2           t = 2
3           arr[] size n = 3
1 3 2       arr = [1, 3, 2]
5           n = 5
5 3 2 1 4   arr = [5, 3, 2, 1, 4]
Sample Output

Alice
Bob
Explanation

For the first test, Alice can remove  or  to leave an increasing sequence and win the game.

For the second test, if  is removed then the only way to have an increasing sequence is to only have  number left. This takes a total of  moves, and Bob wins.

If Alice removes the  on the first move, it will take  more moves to create an increasing sequence. Bob wins. If Alice removes something else, Bob can remove  on his next turn to create the same game state. It is a decreasing sequence with  numbers left.


 /* ---------------------------------------------- */

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
 * Complete the 'permutationGame' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function permutationGame(arr) {
    const n = arr.length; // Get the size of the array
    return n % 2 === 0 ? 'Bob' : 'Alice'; // Determine the winner based on the length of the array
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10); // Number of test cases

    for (let tItr = 0; tItr < t; tItr++) {
        const arrCount = parseInt(readLine().trim(), 10); // Size of the array
        const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10)); // Read the array

        const result = permutationGame(arr); // Get the result

        ws.write(result + '\n'); // Write the result
    }

    ws.end(); // Close the output stream
}
