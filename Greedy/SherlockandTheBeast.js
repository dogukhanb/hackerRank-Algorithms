Sherlock Holmes suspects his archenemy Professor Moriarty is once again plotting something diabolical. Sherlock's companion, Dr. Watson, suggests Moriarty may be responsible for MI6's recent issues with their supercomputer, The Beast.

Shortly after resolving to investigate, Sherlock receives a note from Moriarty boasting about infecting The Beast with a virus. He also gives him a clue: an integer. Sherlock determines the key to removing the virus is to find the largest Decent Number having that number of digits.

A Decent Number has the following properties:

Its digits can only be 3's and/or 5's.
The number of 3's it contains is divisible by 5.
The number of 5's it contains is divisible by 3.
It is the largest such number for its length.
Moriarty's virus shows a clock counting down to The Beast's destruction, and time is running out fast. Your task is to help Sherlock find the key before The Beast is destroyed!

For example, the numbers  and  are both decent numbers because there are  's and  's in the first, and  's in the second. They are the largest values for those length numbers that have proper divisibility of digit occurrences.

Function Description

Complete the decentNumber function in the editor below.

decentNumber has the following parameter(s):

int n: the length of the decent number to create
Prints

Print the decent number for the given length, or  if a decent number of that length cannot be formed. No return value is expected.

Input Format

The first line is an integer, , the number of test cases.

The next  lines each contain an integer , the number of digits in the number to create.

Constraints



Sample Input

STDIN   Function
-----   --------
4       t = 4
1       n = 1 (first test case)
3       n = 3 (second test case)
5
11
Sample Output

-1
555
33333
55555533333
Explanation

For , there is no Decent Number having  digit, so print .
For ,  is the only possible number. (Decent Number Property 3).
For ,  is the only possible number. (Decent Number Property 2).
For ,  is the Decent Number. All other permutations of these digits are not decent (Decent Number Property 4).

/* --------------------------------------------- */

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
 * Complete the 'decentNumber' function below.
 *
 * The function accepts INTEGER n as parameter.
 */
function decentNumber(n) {
    let numFives = n;
    
    // Try to reduce the number of 5s to find a valid configuration
    while (numFives % 3 !== 0) {
        numFives -= 5;
    }
    
    // If numFives is negative, it means we can't form a decent number
    if (numFives < 0) {
        console.log(-1);
    } else {
        const numThrees = n - numFives;
        // Build the result with numFives of '5' and numThrees of '3'
        console.log('5'.repeat(numFives) + '3'.repeat(numThrees));
    }
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);
        decentNumber(n);
    }
}
