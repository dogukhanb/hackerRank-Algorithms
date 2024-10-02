It's New Year's Day, and Balsa and Koca are stuck inside watching the rain. They decide to invent a game, the rules for which are described below.

Given array  containing  integers, they take turns making a single move. Balsa always moves first, and both players are moving optimally (playing to win and making no mistakes).

During each move, the current player chooses one element from , adds it to their own score, and deletes the element from ; because the size of  decreases by  after each move, 's size will be  after  moves and the game ends (as all elements were deleted from ). We refer to Balsa's score as  and Koca's score as . Koca wins the game if |-| is divisible by ; otherwise Balsa wins.

Given , determine the winner.

Note: .

Input Format

The first line contains an integer, , denoting the number of test cases.
Each test case is comprised of two lines; the first line has an integer , and the second line has  space-separated integers  describing array .

Constraints




Subtasks

For  score: 
For  score: 

Output Format

For each test case, print the winner's name on a single line; if Balsa wins print Balsa, otherwise print Koca.

Sample Input

2 
3
7 6 18
1
3
Sample Output

Balsa
Koca
Explanation

Test Case 1

Array . The possible play scenarios are:

, , , and .

, , , and .

, , -, and .

In this case, it doesn't matter what Balsa chooses because the difference between their scores isn't divisible by . Thus, Balsa wins.

Test Case 2

Array . Balsa must choose that element, the first move ends the game.

, , , and . Thus, Koca wins.

 /* ------------------------------------- */

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

function main() {
    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const n = parseInt(readLine().trim(), 10);
        const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

        const totalSum = a.reduce((acc, curr) => acc + curr, 0);
        const maxScoreBalsa = Math.max(...a); // Balsa's optimal move

        // Calculate Balsa's final score after all moves
        const finalScoreBalsa = maxScoreBalsa;

        // Check the winning condition
        if (Math.abs(2 * finalScoreBalsa - totalSum) % n === 0) {
            console.log("Koca");
        } else {
            console.log("Balsa");
        }
    }
}
