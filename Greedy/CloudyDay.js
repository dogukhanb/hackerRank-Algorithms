Quibdó in Colombia is one among the cities that receive maximum rainfall in the world.

All year round, the city is covered in clouds. The city has many towns, located on a one-dimensional line. The positions and populations of each town on the number line are known to you. Every cloud covers all towns located at a certain distance from it. A town is said to be in darkness if there exists at least one cloud such that the town is within the cloud's range. Otherwise, it is said to be sunny.

image

The city council has determined that they have enough money to remove exactly one cloud using their latest technology. Thus they want to remove the cloud such that the fewest number of people are left in darkness after the cloud is removed. What is the maximum number of people that will be in a sunny town after removing exactly one cloud?

Note: If a town is not covered by any clouds, then it is already considered to be sunny, and the population of this town must also be included in the final answer.

Complete the function maximumPeople which takes four arrays representing the populations of each town, locations of the towns, locations of the clouds, and the extents of coverage of the clouds respectively, and returns the maximum number of people that will be in a sunny town after removing exactly one cloud.

Input Format

The first line of input contains a single integer , the number of towns.

The next line contains  space-separated integers . The  integer in this line denotes the population of the  town.

The next line contains  space-separated integers  denoting the location of the  town on the one-dimensional line.

The next line consists of a single integer  denoting the number of clouds covering the city.

The next line contains  space-separated integers  the  of which denotes the location of the  cloud on the coordinate axis.

The next line consists of  space-separated integers  denoting the range of the  cloud.

Note: The range of each cloud is computed according to its location, i.e., the  cloud is located at position  and it covers every town within a distance of  from it. In other words, the  cloud covers every town with location in the range .

Constraints

Output Format

Print a single integer denoting the maximum number of people that will be in a sunny town by removing exactly one cloud.

Sample Input 0

2
10 100
5 100
1
4
1
Sample Output 0

110
Explanation 0

In the sample case, there is only one cloud which covers the first town. Our only choice is to remove this sole cloud which will make all towns sunny, and thus, all  people will live in a sunny town.

image

As you can see, the only cloud present, is at location  on the number line and has a range , so it covers towns located at ,  and  on the number line. Hence, the first town is covered by this cloud and removing this cloud makes all towns sunny.


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
 * Complete the 'maximumPeople' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. LONG_INTEGER_ARRAY p
 *  2. LONG_INTEGER_ARRAY x
 *  3. LONG_INTEGER_ARRAY y
 *  4. LONG_INTEGER_ARRAY r
 */

function maximumPeople(p, x, y, r) {
    const n = p.length; // Number of towns
    const m = y.length; // Number of clouds

    // Track which towns are covered by any clouds
    const covered = new Array(n).fill(false);
    
    // Calculate which towns are covered by each cloud
    const coverage = new Array(m).fill(0);

    for (let cloudIndex = 0; cloudIndex < m; cloudIndex++) {
        const cloudLocation = y[cloudIndex];
        const cloudRange = r[cloudIndex];

        const leftLimit = cloudLocation - cloudRange;
        const rightLimit = cloudLocation + cloudRange;

        // Mark towns that are covered by this cloud
        for (let townIndex = 0; townIndex < n; townIndex++) {
            if (x[townIndex] >= leftLimit && x[townIndex] <= rightLimit) {
                covered[townIndex] = true;
                coverage[cloudIndex] += p[townIndex]; // Accumulate population covered by this cloud
            }
        }
    }

    // Calculate total population of towns
    const totalPopulation = p.reduce((a, b) => a + b, 0);
    
    // Now determine how many people would be sunny if we removed each cloud
    let maxSunnyPopulation = 0;

    // Count total population of towns that are not covered by any clouds
    const initialSunnyPopulation = totalPopulation - coverage.reduce((a, b) => a + b, 0);

    for (let cloudIndex = 0; cloudIndex < m; cloudIndex++) {
        // Calculate the population if we remove this cloud
        const populationWithoutCloud = initialSunnyPopulation + coverage[cloudIndex];
        maxSunnyPopulation = Math.max(maxSunnyPopulation, populationWithoutCloud);
    }

    return maxSunnyPopulation;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const p = readLine().replace(/\s+$/g, '').split(' ').map(pTemp => parseInt(pTemp, 10));

    const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));

    const m = parseInt(readLine().trim(), 10);

    const y = readLine().replace(/\s+$/g, '').split(' ').map(yTemp => parseInt(yTemp, 10));

    const r = readLine().replace(/\s+$/g, '').split(' ').map(rTemp => parseInt(rTemp, 10));

    const result = maximumPeople(p, x, y, r);

    ws.write(result + '\n');

    ws.end();
}
