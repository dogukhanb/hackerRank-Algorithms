The evil forest is guarded by vicious mandragoras. Garnet and her pet must make a journey through. She starts with  health point () and  experience points.

As she encouters each mandragora, her choices are:

Garnet's pet eats mandragora . This increments  by  and defeats mandragora .
Garnet's pet battles mandragora . This increases  by  experience points and defeats mandragora .
Once she defeats a mandragora, it is out of play. Given a list of mandragoras with various health levels, determine the maximum number of experience points she can collect on her journey.

For example, as always, she starts out with  health point and  experience points. Mandragoras have the following health values: . For each of the beings, she has two choices, at or attle. We have the following permutations of choices and outcomes:

Action  s   p
_______ _   __
e, e, e 4   0
e, e, b 3   15
e, b, b 2   14
b, b, b 1   10
b, b, e 2   10
b, e, e 3   9
b, e, b 2   16
e, b, e 3   6
Working through a couple of rows, first, her pet can eat all three and she does not gain any experience points. In the second row, her pet eats the first two to have  health points, then battles the beast with  heatlth points to gain  experience points. We see that the best option is to eat the beast with  points and battle the others to achieve  experience points.

Function Description

Complete the mandragora function in the editor below. It must return an integer that denotes the maximum number of experience points that Garnet can earn.

mandragora has the following parameter(s):

H: an array of integers that represents the health values of mandragoras
Input Format

The first line contains an integer, , denoting the number of test cases. Each test case is described over two lines:

The first line contains a single integer , the number of mandragoras in the forest.
The second line contains  space-separated integers describing the respective health points for the mandragoras .
Constraints

, where 
The sum of all s in a single test case is 
Output Format

For each test case, print a single line with an integer denoting the maximum number of experience points that Garnet can earn.

Sample Input

1
3
3 2 2
Sample Output

10 
Explanation

There are  mandragoras having the following health points: . Initially,  and . The following is an optimal sequence of actions for achieving the maximum number of experience points possible:

Eat the second mandragora ().  is increased from  to , and  is still .
Battle the first mandragora ().  remains the same, but  increases by  experience points.
Battle the third mandragora ().  remains the same, but  increases by  experience points.
Garnet earns  experience points.


 /* ----------------------- */

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
 * Complete the 'mandragora' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY H as parameter.
 */

function mandragora(H) {
    // Sort the health points of mandragoras
    H.sort((a, b) => a - b);
    
    const n = H.length;
    let maxExperience = 0;
    let totalHealth = 0;

    // Calculate total health for battling
    for (let i = 0; i < n; i++) {
        totalHealth += H[i];
    }

    // Try different amounts of eating mandragoras
    let currentHealth = 0;
    for (let eatCount = 0; eatCount <= n; eatCount++) {
        // Experience gained by battling the remaining mandragoras
        let experience = totalHealth - currentHealth;
        
        // Update the maximum experience
        maxExperience = Math.max(maxExperience, experience);
        
        // If we eat this mandragora, increase the health
        if (eatCount < n) {
            currentHealth += H[eatCount]; // Health gained by eating the next mandragora
        }
    }

    return maxExperience;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const H = readLine().replace(/\s+$/g, '').split(' ').map(HTemp => parseInt(HTemp, 10));

        const result = mandragora(H);

        ws.write(result + '\n');
    }

    ws.end();
}
