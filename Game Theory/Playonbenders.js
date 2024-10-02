General Iroh and Commandant Bumi are heading to the Republic City to stop a rebellion. But it's quite a long travel, so in the meantime they have started discussing about possible attacking plans. Right now, they're arguing about best ways for moving soldiers during the battle. Tired of not getting a final and concise strategy, Iroh proposed a particularly original idea.

Iroh:

Bumi, look at this map: here we have all possible locations in the battle field soldiers can occupy. I know a game which can give us some ideas.
Bumi:

A game? How will a game help us here?
Iroh:

It's pretty simple, we know which location is connected to each one, and also, that all those paths between locations are one-way (it's too dangerous to have two ways paths), so we place some soldiers at random initial locations, take turns, and in each turn, we try to make a valid move with one soldier from one location to another. Eventually, we won't be able to move any man so, the first one which is not able to perform any valid move, loses. One important thing is, at some moment, we may have some men at the same field location.
Bumi:

Are you sure we are gonna end this? We have so many locations and paths... don't know, soldiers could be moving in circles for ever.
Iroh:

Take it easy man, those paths were built by the best architects I've ever known, so there is no way that could happen.
Bumi:

Well, I still don't get how does this help us.
Iroh:

Me neither, but greatest generals from the Earth Kingdom created their strategies from this game, so, who knows?
Bumi:

Ok, I'm in. Who plays first?
Iroh:

You go first my friend. Just make sure you always do your best, because I will show no mercy to you :).
Input Format

First line in the input contains two integers N and M, describing the number of locations and paths between them, respectively. M lines follow, each one with two integers u and v, denoting a one-way path from u to v.
Then comes a line with a single integer Q, denoting how many times Bumi and Iroh played the game over the given field. Q queries follow each one with two lines, first one with a single integer K, the number of soldiers in the field; and second one with K integers b_i separated by space, each one denoting the initial location of some soldier.

Constraints

1 < N <= 105
1 <= M <= 106
1 <= u, v, b_i <= N
1 <= K <= 102
1 <= Q <= 105

Output Format

Output Q lines, each one saying Bumi if Bumi should be the winner of the corresponding game or Iroh otherwise.
Remember that, being both top strategy masters, they will always perform the best possible move each turn.

Sample Input

10 10
1 10
3 10
7 8
6 8
7 4
9 4
7 6
5 8
1 8
2 8
5
4
10 7 6 4
3
1 9 4
3
8 3 5
3
4 9 7
3
7 9 10
Sample Output

Bumi
Iroh
Iroh
Bumi
Bumi

 /* ----------------------------------------- */

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
 * Complete the 'bendersPlay' function below.
 *
 * The function is expected to return an ARRAY of STRINGS.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY paths
 *  3. ARRAY of ARRAY of INTEGER query
 */

function bendersPlay(n, paths, queries) {
    // Create adjacency list and out-degree counter
    const adj = Array.from({ length: n + 1 }, () => []);
    const outDegree = new Array(n + 1).fill(0);
    
    for (const [u, v] of paths) {
        adj[u].push(v);
        outDegree[u]++;
    }
    
    // Array to determine if a position is winning (true) or losing (false)
    const isWinning = new Array(n + 1).fill(false);
    const queue = [];
    
    // Start with nodes that have no outgoing edges
    for (let i = 1; i <= n; i++) {
        if (outDegree[i] === 0) {
            isWinning[i] = false; // Losing position
            queue.push(i);
        }
    }
    
    // Process nodes in the queue
    while (queue.length > 0) {
        const node = queue.shift();
        
        // Check all incoming edges to this node
        for (let prevNode = 1; prevNode <= n; prevNode++) {
            if (adj[prevNode].includes(node)) {
                outDegree[prevNode]--; // Remove the edge
                if (!isWinning[node]) {
                    isWinning[prevNode] = true; // If this leads to a losing position
                }
                
                // If the current node now has no outgoing edges, add it to the queue
                if (outDegree[prevNode] === 0) {
                    queue.push(prevNode);
                }
            }
        }
    }

    // Evaluate each query
    const results = [];
    for (const query of queries) {
        const k = query[0];
        const soldiers = query.slice(1);
        
        let bumiWins = false;
        for (const soldier of soldiers) {
            if (isWinning[soldier]) {
                bumiWins = true;
                break;
            }
        }
        
        results.push(bumiWins ? "Bumi" : "Iroh");
    }
    
    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
    
    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);
    
    let paths = Array(m);
    
    for (let i = 0; i < m; i++) {
        paths[i] = readLine().replace(/\s+$/g, '').split(' ').map(pathsTemp => parseInt(pathsTemp, 10));
    }
    
    const q = parseInt(readLine().trim(), 10);
    const queries = [];
    
    for (let qItr = 0; qItr < q; qItr++) {
        const queryCount = parseInt(readLine().trim(), 10);
        const query = readLine().replace(/\s+$/g, '').split(' ').map(queryTemp => parseInt(queryTemp, 10));
        queries.push(query);
    }
    
    const result = bendersPlay(n, paths, queries);
    
    ws.write(result.join('\n') + '\n');
    ws.end();
}
