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
     const grid = crossword.map(row => row.split(''));
     const slots = [];
 
     // Find horizontal and vertical slots
     function findSlots() {
         for (let r = 0; r < grid.length; r++) {
             let start = -1;
             for (let c = 0; c < grid[r].length; c++) {
                 if (grid[r][c] === '-') {
                     if (start === -1) start = c; // Start of a slot
                 } else {
                     if (start !== -1) {
                         if (c - start > 1) {
                             slots.push({ start: [r, start], length: c - start, isHorizontal: true });
                         }
                         start = -1; // Reset start
                     }
                 }
             }
             // Check for open slot at the end
             if (start !== -1 && grid[r].length - start > 1) {
                 slots.push({ start: [r, start], length: grid[r].length - start, isHorizontal: true });
             }
         }
 
         // Vertical slots
         for (let c = 0; c < grid[0].length; c++) {
             let start = -1;
             for (let r = 0; r < grid.length; r++) {
                 if (grid[r][c] === '-') {
                     if (start === -1) start = r; // Start of a slot
                 } else {
                     if (start !== -1) {
                         if (r - start > 1) {
                             slots.push({ start: [start, c], length: r - start, isHorizontal: false });
                         }
                         start = -1; // Reset start
                     }
                 }
             }
             // Check for open slot at the end
             if (start !== -1 && grid.length - start > 1) {
                 slots.push({ start: [start, c], length: grid.length - start, isHorizontal: false });
             }
         }
     }
 
     // Check if the word can fit in the given slot
     function canPlace(word, slot) {
         const [row, col] = slot.start;
         if (slot.length !== word.length) return false; // Length mismatch
         for (let i = 0; i < word.length; i++) {
             const cell = slot.isHorizontal ? grid[row][col + i] : grid[row + i][col];
             if (cell !== '-' && cell !== word[i]) {
                 return false; // Blocked or conflicting character
             }
         }
         return true;
     }
 
     // Place the word in the slot
     function placeWord(word, slot) {
         const [row, col] = slot.start;
         for (let i = 0; i < word.length; i++) {
             if (slot.isHorizontal) {
                 grid[row][col + i] = word[i];
             } else {
                 grid[row + i][col] = word[i];
             }
         }
     }
 
     // Remove the word from the slot (backtrack)
     function removeWord(word, slot) {
         const [row, col] = slot.start;
         for (let i = 0; i < word.length; i++) {
             if (slot.isHorizontal) {
                 grid[row][col + i] = '-';
             } else {
                 grid[row + i][col] = '-';
             }
         }
     }
 
     // Recursive backtracking to place all words
     function backtrack(wordIndex) {
         if (wordIndex === wordList.length) {
             return true; // All words placed successfully
         }
 
         const word = wordList[wordIndex];
         for (let slot of slots) {
             if (canPlace(word, slot)) {
                 placeWord(word, slot);
                 if (backtrack(wordIndex + 1)) {
                     return true;
                 }
                 removeWord(word, slot); // Backtrack
             }
         }
         return false; // No valid placement found
     }
 
     findSlots();
     backtrack(0);
    
     return grid.map(row => row.join(''));
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
 