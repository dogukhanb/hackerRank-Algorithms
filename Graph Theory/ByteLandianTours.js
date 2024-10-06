The country of Byteland contains N cities and N - 1 bidirectional roads between them such that there is a path between any two cities. The cities are numbered (0,...,N - 1). The people were very unhappy about the time it took to commute, especially salesmen who had to go about every city selling goods. So it was decided that new roads would be built between any two "somewhat near" cities. Any two cities in Bytleland that can be reached by traveling on exactly two old roads are known as "somewhat near" each other.

Now a salesman situated in city 0, just like any other typical salesman, has to visit all cities exactly once and return back to city 0 in the end. In how many ways can he do this?

Input Format

The first line contains the number of test cases T. T test cases follow. The first line contains N, the number of cities in Byteland. The following N - 1 lines contain the description of the roads. The ith line contains two integers ai and bi, meaning that there was originally a road connecting cities with numbers ai and bi.

Constraints

1 <= T <= 20
1 <= N <= 10000
0 <= ai,bi < N  

Output Format

Output T lines, one corresponding to each test case containing the required answer for that test case. Since the answers can be huge, output them modulo 1000000007.

Sample Input

2
3
0 1
1 2
5
0 1
1 2
2 3
2 4

Sample Output

2
4

Explanation

For the first case, a new road was build between cities 0 and 2. Now, the salesman has two tour possibilities: 0-1-2-0 or 0-2-1-0.

 /* -------------------- */

 'use strict';

const fs = require('fs');
const MOD = 1000000007;

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

function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result = (result * i) % MOD;
    }
    return result;
}

function bytelandianTours(n, roads) {
    if (n === 1) return 1; // Only one city, only one way to tour it.

    const adjacencyList = Array.from({ length: n }, () => []);
   
    // Build the graph
    for (const [a, b] of roads) {
        adjacencyList[a].push(b);
        adjacencyList[b].push(a);
    }

    let newRoadsCount = 0;

    // Count new roads
    for (let city = 0; city < n; city++) {
        const degree = adjacencyList[city].length;
       
        // If there are at least 2 neighbors, we can create new roads
        if (degree >= 2) {
            newRoadsCount += (degree * (degree - 1)) / 2; // Choose 2 neighbors
        }
    }

    // Calculate number of tours
    const factorialPart = factorial(n - 1); // (N-1)!
    const totalTours = (newRoadsCount * factorialPart) % MOD;

    return totalTours;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        let roads = Array(n - 1);
        for (let i = 0; i < n - 1; i++) {
            roads[i] = readLine().replace(/\s+$/g, '').split(' ').map(Number);
        }

        const result = bytelandianTours(n, roads);
        ws.write(result + '\n');
    }

    ws.end();
}