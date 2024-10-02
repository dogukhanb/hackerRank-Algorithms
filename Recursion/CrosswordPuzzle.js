A  Crossword grid is provided to you, along with a set of words (or names of places) which need to be filled into the grid. Cells are marked either + or -. Cells marked with a - are to be filled with the word list.

The following shows an example crossword from the input  grid and the list of words to fit, :

Input 	   		Output

++++++++++ 		++++++++++
+------+++ 		+POLAND+++
+++-++++++ 		+++H++++++
+++-++++++ 		+++A++++++
+++-----++ 		+++SPAIN++
+++-++-+++ 		+++A++N+++
++++++-+++ 		++++++D+++
++++++-+++ 		++++++I+++
++++++-+++ 		++++++A+++
++++++++++ 		++++++++++
POLAND;LHASA;SPAIN;INDIA
Function Description

Complete the crosswordPuzzle function in the editor below. It should return an array of strings, each representing a row of the finished puzzle.

crosswordPuzzle has the following parameter(s):

crossword: an array of  strings of length  representing the empty grid
words: a string consisting of semicolon delimited strings to fit into 
Input Format

Each of the first  lines represents , each of which has  characters, .

The last line contains a string consisting of semicolon delimited  to fit.

Constraints




Output Format

Position the words appropriately in the  grid, then return your array of strings for printing.

Sample Input 0

+-++++++++
+-++++++++
+-++++++++
+-----++++
+-+++-++++
+-+++-++++
+++++-++++
++------++
+++++-++++
+++++-++++
LONDON;DELHI;ICELAND;ANKARA
Sample Output 0

+L++++++++
+O++++++++
+N++++++++
+DELHI++++
+O+++C++++
+N+++E++++
+++++L++++
++ANKARA++
+++++N++++
+++++D++++
Sample Input 1

+-++++++++
+-++++++++
+-------++
+-++++++++
+-++++++++
+------+++
+-+++-++++
+++++-++++
+++++-++++
++++++++++
AGRA;NORWAY;ENGLAND;GWALIOR
Sample Output 1

+E++++++++
+N++++++++
+GWALIOR++
+L++++++++
+A++++++++
+NORWAY+++
+D+++G++++
+++++R++++
+++++A++++
++++++++++
Sample Input 2

++++++-+++
++------++
++++++-+++
++++++-+++
+++------+
++++++-+-+
++++++-+-+
++++++++-+
++++++++-+
++++++++-+
ICELAND;MEXICO;PANAMA;ALMATY
Sample Output 2

++++++I+++
++MEXICO++
++++++E+++
++++++L+++
+++PANAMA+
++++++N+L+
++++++D+M+
++++++++A+
++++++++T+
++++++++Y+

 /* ----------------------------------- */

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
 * Complete the 'crosswordPuzzle' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING_ARRAY crossword
 *  2. STRING words
 */

function crosswordPuzzle(crossword, words) {
    const wordList = words.split(';');
    const gridSize = crossword.length;

    // To hold positions to fill in the crossword
    let positions = [];

    // Step 1: Find all horizontal and vertical positions
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            // Check for horizontal
            if (crossword[i][j] === '-') {
                let start = j;
                while (j < gridSize && crossword[i][j] === '-') {
                    j++;
                }
                if (j - start > 1) { // Valid position for a word
                    positions.push({ start: [i, start], length: j - start, orientation: 'H' });
                }
            }
        }
    }

    for (let j = 0; j < gridSize; j++) {
        for (let i = 0; i < gridSize; i++) {
            // Check for vertical
            if (crossword[i][j] === '-') {
                let start = i;
                while (i < gridSize && crossword[i][j] === '-') {
                    i++;
                }
                if (i - start > 1) { // Valid position for a word
                    positions.push({ start: [start, j], length: i - start, orientation: 'V' });
                }
            }
        }
    }

    // Step 2: Try to fit words into the positions
    const fillCrossword = (index) => {
        if (index === positions.length) {
            return true; // All positions filled
        }

        const { start, length, orientation } = positions[index];

        for (const word of wordList) {
            if (word.length === length) {
                // Check if the word can fit in the crossword
                if (canPlaceWord(crossword, word, start, orientation)) {
                    placeWord(crossword, word, start, orientation); // Place the word

                    if (fillCrossword(index + 1)) {
                        return true; // Move to next position
                    }

                    removeWord(crossword, word, start, orientation); // Backtrack
                }
            }
        }
        return false; // No valid placement found
    };

    fillCrossword(0);
    return crossword; // Return the filled crossword
}

// Helper function to check if a word can be placed
function canPlaceWord(crossword, word, start, orientation) {
    const [row, col] = start;
    const length = word.length;

    for (let i = 0; i < length; i++) {
        const r = orientation === 'H' ? row : row + i;
        const c = orientation === 'H' ? col + i : col;

        if (crossword[r][c] !== '-' && crossword[r][c] !== word[i]) {
            return false; // Conflict with existing character
        }
    }
    return true; // No conflicts
}

// Helper function to place a word
function placeWord(crossword, word, start, orientation) {
    const [row, col] = start;

    for (let i = 0; i < word.length; i++) {
        const r = orientation === 'H' ? row : row + i;
        const c = orientation === 'H' ? col + i : col;

        crossword[r] = crossword[r].substring(0, c) + word[i] + crossword[r].substring(c + 1);
    }
}

// Helper function to remove a word
function removeWord(crossword, word, start, orientation) {
    const [row, col] = start;

    for (let i = 0; i < word.length; i++) {
        const r = orientation === 'H' ? row : row + i;
        const c = orientation === 'H' ? col + i : col;

        crossword[r] = crossword[r].substring(0, c) + '-' + crossword[r].substring(c + 1);
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    let crossword = [];

    for (let i = 0; i < 10; i++) {
        const crosswordItem = readLine();
        crossword.push(crosswordItem);
    }

    const words = readLine();

    const result = crosswordPuzzle(crossword, words);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
