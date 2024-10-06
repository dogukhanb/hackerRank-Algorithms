Airports are being built on a straight road according to a new construction plan. For convenience, imagine a number line on which at different points airports can be positioned. Because a plane can't take off and start landing immediately, there will be flight between two airports in locations  and  if and only if , where  is a constant.

Changing the position of an airport from  to  costs . The cost to fix a certain plan is the minimum total cost of changing the positions of airports. After the changes, it should be possible to travel between any pair of airports, possibly taking flights through some intermediate airports. Note that it's possible that two airports have the same initial position, and this can be the case after changes too.

On  day, a plan to build a new airport with position  is announced. On each day that a new airport is announced, print the smallest cost to fix the set of airports announced so far . Note that you should not change the positions of any airports, just calculate the cost to do it.

image

Input Format

Input contains multiple queries.
The first line consists of an integer  which is the number of queries. Each query is given as follows.
The first line of each query contains two integers  and , the number of days, and the minimum distance respectively.
The second line of each test case contains  space-separated integers  denoting the position of the airport that was announced on  day.

Constraints

the sum of  over all test cases in a file will not exceed 
Output Format

Print one line for each query.
A line for a query with  airports should have  numbers on it where the  one should be the minimum cost to fix airports in positions .

Sample Input 0

1
3 1
0 0 0
Sample Output 0

0 1 1
Explanation 0

The answer for a single airport is always zero. When we have many airports in the same position, it's enough to move only one of them to satisfy the condition from the statement.

Sample Input 1

1
5 4
1 -1 2 -1 1
Sample Output 1

0 2 2 3 3
Explanation 1

image

For each new day that an airport is inserted, the cheapest rearranging of existing airports is shown on the diagram above. Note that cost changes for every day and travelling between airports can be done possibly flying through some intermediate ones. Costs are calculated without changing actual positions of the airports.


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
 * Complete the 'airports' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY x
 */

function airports(d, x) {
    const n = x.length;
    const result = [];
   
    // Sort the airport positions
    x.sort((a, b) => a - b);
   
    // Keep track of the total cost
    let totalCost = 0;
   
    for (let i = 0; i < n; i++) {
        // Always zero cost for the first airport
        if (i === 0) {
            result.push(0);
            continue;
        }

        // Calculate cost to connect with the previous airport
        if (x[i] - x[i - 1] < d) {
            // Calculate the required distance to move the current airport
            const moveCost = d - (x[i] - x[i - 1]);
            totalCost += moveCost;
            result.push(totalCost);
            // Move the airport effectively to the position that makes it connect
            x[i] += moveCost; // This is a virtual move; it doesn't change the original array
        } else {
            // If the current airport is already connectable, the cost remains the same
            result.push(totalCost);
        }
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10);
        const d = parseInt(firstMultipleInput[1], 10);
        const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));
       
        const result = airports(d, x);
        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}