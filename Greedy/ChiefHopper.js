Chief's bot is playing an old DOS based game. There is a row of buildings of different heights arranged at each index along a number line. The bot starts at building  and at a height of . You must determine the minimum energy his bot needs at the start so that he can jump to the top of each building without his energy going below zero.

Units of height relate directly to units of energy. The bot's energy level is calculated as follows:

If the bot's  is less than the height of the building, his 
If the bot's  is greater than the height of the building, his 
Example


Starting with , we get the following table:

    botEnergy   height  delta
    4               2       +2
    6               3       +3
    9               4       +5
    14              3       +11
    25              2       +23
    48
That allows the bot to complete the course, but may not be the minimum starting value. The minimum starting  in this case is .

Function Description

Complete the chiefHopper function in the editor below.

chiefHopper has the following parameter(s):

int arr[n]: building heights
Returns

int: the minimum starting 
Input Format

The first line contains an integer , the number of buildings.

The next line contains  space-separated integers , the heights of the buildings.

Constraints

 where 
Sample Input 0

5
3 4 3 2 4
Sample Output 0

4
Explanation 0

If initial energy is 4, after step 1 energy is 5, after step 2 it's 6, after step 3 it's 9 and after step 4 it's 16, finally at step 5 it's 28.
If initial energy were 3 or less, the bot could not complete the course.

Sample Input 1

3
4 4 4
Sample Output 1

4
Explanation 1

In the second test case if bot has energy 4, it's energy is changed by (4 - 4 = 0) at every step and remains 4.

Sample Input 2

3
1 6 4
Sample Output 2

3
Explanation 2

botEnergy   height  delta
3           1       +2
5           6       -1
4           4       0
4
We can try lower values to assure that they won't work.

 /* -------------------- */

 function chiefHopper(arr) {
    let energy = 0; // This will hold the minimum energy required

    for (let i = arr.length - 1; i >= 0; i--) {
        energy = Math.ceil((energy + arr[i]) / 2); // Calculate minimum energy required
    }

    return energy;
}

// To read input and test the function
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

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);
    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));
    
    const result = chiefHopper(arr);

    ws.write(result + '\n');
    ws.end();
}
