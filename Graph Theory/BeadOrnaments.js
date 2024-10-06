There are  colors of beads. You have  beads of the  color. You want to make an ornament by joining all the beads together. You create the ornament by using the following algorithm:

Step # Arrange all the beads in any order such that beads of the same color are placed together.

Step # The ornament initially consists of only the first bead from the arrangement.

Step # For each subsequent bead in order, join it to a bead of the same color in the ornament. If there is no bead of the same color, it can be joined to any bead in the ornament.

All beads are distinct, even if they have the same color. Two ornaments are considered different if two beads are joined by a thread in one configuration, but not in the other. How many different ornaments can be formed using this algorithm? Return the answer modulo .

Update/clarification

Think of the bead formation as a tree and not as a straight line. Any number of beads can be connected to a bead.

Example

There are two beads of color :  and . These can occur as  or . In both cases, the same two beads are joined, so the arrangements are not different. There is  way to join these beads.


There are two beads of two colors, . They can be arranged as , ,  and . Call these groups , ,  and . The 8 possible arranements of groups are shown below.

1 A1, B1 = a1, a2, b1, b2
2 A2, B1 = a2, a1, b1, b2
3 A1, B2 = a1, a2, b2, b1
4 A2, B2 = a2, a1, b2, b1
5 B1, A1 = b1, b2, a1, a2
6 B2, A1 = b2, b1, a1, a2 
7 B1, A2 = b1, b2, a2, a1
8 B2, A2 = b2, b1, a2, a1
Note that in line 1, ,  and  are the connections. This also occurs on line 8, so these two lines are not different. In fact, line 8 is just line 1 reversed, like flipping the string of beads end for end. Using the same logic, the other similar lines are . There are only 4 different arrangements.

Function Description

Complete the beadOrnaments function in the editor below.

beadOrnaments has the following parameters:

int b[n]: the number of beads of each color
Returns

int: the number of arrangements modulo 
Input Format

The first line contains the number of test cases .

Each of the following  pairs of lines contain:
- An integer, , the number of elements in array 
-  space-separated integers that comprise 

Constraints

Sample Input

STDIN       Function
-----       --------
5           T = 5   
2           b[] size n = 2
2 1         b = [2, 1]
2           n = 2
2 2         b = [2, 2]
1           n = 1
4           b = [4]
2           n = 2
3 1         b = [3, 1]
5           n = 5
1 1 1 1 1   b = [1, 1, 1, 1, 1]
Sample Output

2
4
16
9
125
Explanation

Testcase 1:

Let us label the beads A1,A2 and B1. Initially, they can be arranged in  ways - "A1,A2,B1", "A2,A1,B1", "B1,A1,A2", and "B1,A2,A1".

For each of the first two arrangements, an ornament can be formed in  ways (A1-A2-B1 or B1-A1-A2 from the first one and A2-A1-B1 or B1-A2-A1 from the second one).

For each of the last two arrangements, an ornament can be formed in  way.

However, of the total  possible ornaments, there are only  unique ones : A1 - A2 - B1, and A2 - A1 - B1.

Testcase 2:

The possible unique ornaments are A1 - A2 - B1 - B2, A1 - A2 - B2 - B1, A2 - A1 - B1 - B2, and A2 - A1 - B2 - B1.

Testcase 3:

For the third test-case, it might be easier to see there are only  types of graphs on  vertices: the path or the star. It's not hard to see that there are  paths and  stars (explanation courtesy: zlangley)

Testcase 5:

For the fifth test-case, a lot of people claimed that the total number of possible ways is . But that is wrong. The correct answer is . Here's the hint: Once again, you've to think of it as a tree.

So one possible arrangement can be:

A is a root node and has two edges (A-B and A-C). Now, think of B as a sub-root node with two edges (B-D and B-E). Similarly, you can figure out the other possible bead arrangements. This will lead you to the correct answer.


 /* ------------------- */

 'use strict';

const fs = require('fs');
const MOD = 1e9 + 7;

// Precompute factorials
function precomputeFactorials(max) {
    const factorial = new Array(max + 1);
    factorial[0] = 1;
    for (let i = 1; i <= max; i++) {
        factorial[i] = (factorial[i - 1] * i) % MOD;
    }
    return factorial;
}

// Calculate number of unique ornaments
function beadOrnaments(b) {
    const totalBeads = b.reduce((sum, count) => sum + count, 0);
    const colors = b.length;

    // Precompute factorials
    const factorial = precomputeFactorials(totalBeads);

    // Calculate arrangements of colors
    let arrangements = factorial[colors];
    for (let count of b) {
        arrangements = (arrangements * pow(factorial[count], MOD - 2)) % MOD;
    }

    // Calculate the number of unique trees
    let treeWays = 1;
    for (let count of b) {
        treeWays = (treeWays * factorial[count - 1]) % MOD;
    }

    // Total arrangements
    return (arrangements * treeWays) % MOD;
}

// Modular exponentiation to compute a^b % mod
function pow(a, b) {
    let result = 1;
    a = a % MOD; // Ensure a is within the modulus
    while (b > 0) {
        if (b % 2 === 1) {
            result = (result * a) % MOD;
        }
        a = (a * a) % MOD;
        b = Math.floor(b / 2);
    }
    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const bCount = parseInt(readLine().trim(), 10);
        const b = readLine().replace(/\s+$/g, '').split(' ').map(bTemp => parseInt(bTemp, 10));
        const result = beadOrnaments(b);
        ws.write(result + '\n');
    }

    ws.end();
}

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