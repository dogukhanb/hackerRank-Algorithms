Marc loves cupcakes, but he also likes to stay fit. Each cupcake has a calorie count, and Marc can walk a distance to expend those calories. If Marc has eaten  cupcakes so far, after eating a cupcake with  calories he must walk at least  miles to maintain his weight.

Example

If he eats the cupcakes in the order shown, the miles he will need to walk are . This is not the minimum, though, so we need to test other orders of consumption. In this case, our minimum miles is calculated as .

Given the individual calorie counts for each of the cupcakes, determine the minimum number of miles Marc must walk to maintain his weight. Note that he can eat the cupcakes in any order.

Function Description

Complete the marcsCakewalk function in the editor below.

marcsCakewalk has the following parameter(s):

int calorie[n]: the calorie counts for each cupcake
Returns

long: the minimum miles necessary
Input Format

The first line contains an integer , the number of cupcakes in .
The second line contains  space-separated integers, .

Constraints

Sample Input 0

3
1 3 2
Sample Output 0

11
Explanation 0

Let's say the number of miles Marc must walk to maintain his weight is . He can minimize  by eating the  cupcakes in the following order:

Eat the cupcake with  calories, so .
Eat the cupcake with  calories, so .
Eat the cupcake with  calories, so .
We then print the final value of , which is , as our answer.

Sample Input 1

4
7 4 9 6
Sample Output 1

79
Explanation 1


/* ------------------------------------------ */

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
 * Complete the 'marcsCakewalk' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY calorie as parameter.
 */
function marcsCakewalk(calorie) {
    // Sort calories in descending order
    calorie.sort((a, b) => b - a);
    
    let totalMiles = 0;

    // Calculate total miles
    for (let i = 0; i < calorie.length; i++) {
        totalMiles += calorie[i] * Math.pow(2, i);
    }

    return totalMiles;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const calorie = readLine().replace(/\s+$/g, '').split(' ').map(calorieTemp => parseInt(calorieTemp, 10));

    const result = marcsCakewalk(calorie);

    ws.write(result + '\n');
    ws.end();
}
