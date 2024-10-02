Dexter and Debra are playing a game. They have N containers each having one or more chocolates. Containers are numbered from 1 to N, where ith container has A[i] number of chocolates.

The game goes like this. First player will choose a container and take one or more chocolates from it. Then, second player will choose a non-empty container and take one or more chocolates from it. And then they alternate turns. This process will continue, until one of the players is not able to take any chocolates (because no chocolates are left). One who is not able to take any chocolates loses the game. Note that player can choose only non-empty container.

The game between Dexter and Debra has just started, and Dexter has got the first Chance. He wants to know the number of ways to make a first move such that under optimal play, the first player always wins.

Input Format

The first line contains an integer N, i.e., number of containers.
The second line contains N integers, i.e., number of chocolates in each of the containers separated by a single space.

Constraints

1 ≤ N ≤ 106
1 ≤ A[i] ≤ 109

Output Format

Print the number of ways to make the first move such that under optimal play, the first player always wins. If the first player cannot win under optimal play, print 0.

Sample Input

2
2 3
Sample Output

1
Explanation

Only 1 set of moves helps player 1 win.

Player:      1      2      1      2      1
Chocolates: 2 3 -> 2 2 -> 1 2 -> 1 1 -> 0 1


 /* --------------------------------- */

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

function chocolateInBox(arr) {
    // Calculate the overall Nim-sum
    let nimSum = 0;
    for (let chocolates of arr) {
        nimSum ^= chocolates;
    }

    // If nimSum is zero initially, Dexter cannot win
    if (nimSum === 0) {
        return 0;
    }

    let winningMoves = 0;

    // Determine the number of winning first moves
    for (let chocolates of arr) {
        // Calculate what chocolates must remain for the Nim-sum to be zero
        let remainingChocolates = nimSum ^ chocolates;
        
        // Check if remainingChocolates is less than current chocolates
        if (remainingChocolates < chocolates) {
            winningMoves++;
        }
    }

    return winningMoves;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const arrCount = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = chocolateInBox(arr);
    ws.write(result + '\n');
    ws.end();
}
