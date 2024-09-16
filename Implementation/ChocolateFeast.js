Little Bobby loves chocolate. He frequently goes to his favorite  store, Penny Auntie, to buy them. They are having a promotion at Penny Auntie. If Bobby saves enough wrappers, he can turn them in for a free chocolate.

Example



He has  to spend, bars cost , and he can turn in  wrappers to receive another bar. Initially, he buys  bars and has  wrappers after eating them. He turns in  of them, leaving him with , for  more bars. After eating those two, he has  wrappers, turns in  leaving him with  wrapper and his new bar. Once he eats that one, he has  wrappers and turns them in for another bar. After eating that one, he only has  wrapper, and his feast ends. Overall, he has eaten  bars.

Function Description

Complete the chocolateFeast function in the editor below.

chocolateFeast has the following parameter(s):

int n: Bobby's initial amount of money
int c: the cost of a chocolate bar
int m: the number of wrappers he can turn in for a free bar
Returns

int: the number of chocolates Bobby can eat after taking full advantage of the promotion
Note: Little Bobby will always turn in his wrappers if he has enough to get a free chocolate.

Input Format

The first line contains an integer, , the number of test cases to analyze.
Each of the next  lines contains three space-separated integers: , , and . They represent money to spend, cost of a chocolate, and the number of wrappers he can turn in for a free chocolate.

Constraints

Sample Input

STDIN   Function
-----   --------
3       t = 3 (test cases)
10 2 5  n = 10, c = 2, m = 5 (first test case)
12 4 4  n = 12, c = 4, m = 4 (second test case)
6 2 2   n = 6,  c = 2, m = 2 (third test case)
Sample Output

6
3
5
Explanation

Bobby makes the following  trips to the store:

He spends  on  chocolates at  apiece. He then eats them and exchanges all  wrappers to get  more. He eats  chocolates.
He spends his  on  chocolates at  apiece. He has  wrappers, but needs  to trade for his next chocolate. He eats  chocolates.
He spends  on  chocolates at  apiece. He then exchanges  of the  wrappers for  additional piece. Next, he uses his third leftover chocolate wrapper from his initial purchase with the wrapper from his trade-in to do a second trade-in for  more piece. At this point he has  wrapper left, which is not enough to perform another trade-in. He eats  chocolates.

/* ---------------------------------------------------------- */

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
 * Complete the 'chocolateFeast' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER c
 *  3. INTEGER m
 */
function chocolateFeast(n, c, m) {
    // Calculate initial number of chocolates
    let chocolates = Math.floor(n / c);
    let wrappers = chocolates;

    // Exchange wrappers for more chocolates while possible
    while (wrappers >= m) {
        let additional_chocolates = Math.floor(wrappers / m);
        chocolates += additional_chocolates;
        wrappers = (wrappers % m) + additional_chocolates;
    }

    return chocolates;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const c = parseInt(firstMultipleInput[1], 10);
        const m = parseInt(firstMultipleInput[2], 10);

        const result = chocolateFeast(n, c, m);

        ws.write(result + '\n');
    }

    ws.end();
}
