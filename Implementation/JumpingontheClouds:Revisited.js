A child is playing a cloud hopping game. In this game, there are sequentially numbered clouds that can be thunderheads or cumulus clouds. The character must jump from cloud to cloud until it reaches the start again.

There is an array of clouds,  and an energy level . The character starts from  and uses  unit of energy to make a jump of size  to cloud . If it lands on a thundercloud, , its energy () decreases by  additional units. The game ends when the character lands back on cloud .

Given the values of , , and the configuration of the clouds as an array , determine the final value of  after the game ends.

Example. 

The indices of the path are . The energy level reduces by  for each jump to . The character landed on one thunderhead at an additional cost of  energy units. The final energy level is .

Note: Recall that  refers to the modulo operation. In this case, it serves to make the route circular. If the character is at  and jumps , it will arrive at .

Function Description

Complete the jumpingOnClouds function in the editor below.

jumpingOnClouds has the following parameter(s):

int c[n]: the cloud types along the path
int k: the length of one jump
Returns

int: the energy level remaining.
Input Format

The first line contains two space-separated integers,  and , the number of clouds and the jump distance.
The second line contains  space-separated integers  where . Each cloud is described as follows:

If , then cloud  is a cumulus cloud.
If , then cloud  is a thunderhead.
Constraints

Sample Input

STDIN             Function
-----             --------
8 2               n = 8, k = 2
0 0 1 0 0 1 1 0   c = [0, 0, 1, 0, 0, 1, 1, 0]
Sample Output

92
Explanation

In the diagram below, red clouds are thunderheads and purple clouds are cumulus clouds:

game board

Observe that our thunderheads are the clouds numbered , , and . The character makes the following sequence of moves:

Move: , Energy: .
Move: , Energy: .
Move: , Energy: .
Move: , Energy: .

/* --------------------------------------------------*/

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

// Complete the jumpingOnClouds function below.
function jumpingOnClouds(c, k) {
    let energy = 100; // initial energy level
    let position = 0; // starting position
    
    do {
        // Move to the next cloud
        position = (position + k) % c.length;
        
        // Decrease energy for each jump
        energy -= 1;
        
        // Check if landed on a thunderhead
        if (c[position] === 1) {
            energy -= 2;
        }
        
    } while (position !== 0); // Repeat until we land back on the starting cloud

    return energy;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nk = readLine().split(' ');

    const n = parseInt(nk[0], 10);

    const k = parseInt(nk[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = jumpingOnClouds(c, k);

    ws.write(result + "\n");

    ws.end();
}
