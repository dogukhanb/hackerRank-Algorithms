Happy Ladybugs is a board game having the following properties:

The board is represented by a string, , of length . The  character of the string, , denotes the  cell of the board.
If  is an underscore (i.e., _), it means the  cell of the board is empty.
If  is an uppercase English alphabetic letter (ascii[A-Z]), it means the  cell contains a ladybug of color .
String  will not contain any other characters.
A ladybug is happy only when its left or right adjacent cell (i.e., ) is occupied by another ladybug having the same color.
In a single move, you can move a ladybug from its current position to any empty cell.
Given the values of  and  for  games of Happy Ladybugs, determine if it's possible to make all the ladybugs happy. For each game, return YES if all the ladybugs can be made happy through some number of moves. Otherwise, return NO.
Example

You can move the rightmost  and  to make  and all the ladybugs are happy. Return YES.

Function Description

Complete the happyLadybugs function in the editor below.

happyLadybugs has the following parameters:

string b: the initial positions and colors of the ladybugs
Returns

string: either YES or NO
Input Format

The first line contains an integer , the number of games.

The next  pairs of lines are in the following format:

The first line contains an integer , the number of cells on the board.
The second line contains a string  that describes the  cells of the board.
Constraints

Sample Input 0

4
7
RBY_YBR
6
X_Y__X
2
__
6
B_RRBR
Sample Output 0

YES
NO
YES
YES
Explanation 0

The four games of Happy Ladybugs are explained below:

Initial board:
lady.png
After the first move:
lady(1).png
After the second move:
lady(2).png
After the third move:
lady(3).png
Now all the ladybugs are happy, so we print YES on a new line.
There is no way to make the ladybug having color Y happy, so we print NO on a new line.
There are no unhappy ladybugs, so we print YES on a new line.
Move the rightmost  and  to form .
Sample Input 1

5
5
AABBC
7
AABBC_C
1
_
10
DD__FQ_QQF
6
AABCBC
Sample Output 1

NO
YES
YES
YES
NO

/* --------------------------------------------------------- */


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
 * Complete the 'happyLadybugs' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING b as parameter.
 */
function happyLadybugs(b) {
    const hasEmptyCell = b.includes('_');
    const ladybugCounts = {};
    const n = b.length;

    // Count occurrences of each ladybug
    for (const char of b) {
        if (char !== '_') {
            ladybugCounts[char] = (ladybugCounts[char] || 0) + 1;
        }
    }

    // If there are no empty cells, every ladybug must be happy already
    if (!hasEmptyCell) {
        for (let i = 0; i < n; i++) {
            const char = b[i];
            if (char !== '_' && (i === 0 || b[i - 1] !== char) && (i === n - 1 || b[i + 1] !== char)) {
                return "NO";
            }
        }
        return "YES";
    }

    // Check if each ladybug color can form pairs
    for (const color in ladybugCounts) {
        if (ladybugCounts[color] < 2) {
            return "NO";
        }
    }

    return "YES";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const g = parseInt(readLine().trim(), 10);

    for (let gItr = 0; gItr < g; gItr++) {
        const n = parseInt(readLine().trim(), 10);
        const b = readLine().trim();

        const result = happyLadybugs(b);

        ws.write(result + '\n');
    }

    ws.end();
}
