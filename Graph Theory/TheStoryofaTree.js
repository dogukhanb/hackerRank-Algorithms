One day Bob drew a tree, , with  nodes and  edges on a piece of paper. He soon discovered that parent of a node depends on the root of the tree. The following images shows an example of that:

image

Learning the fact, Bob invented an exciting new game and decided to play it with Alice. The rules of the game is described below:

Bob picks a random node to be the tree's root and keeps the identity of the chosen node a secret from Alice. Each node has an equal probability of being picked as the root.
Alice then makes a list of  guesses, where each guess is in the form u v and means Alice guesses that  is true. It's guaranteed that an undirected edge connecting  and  exists in the tree.
For each correct guess, Alice earns one point. Alice wins the game if she earns at least  points (i.e., at least  of her guesses were true).
Alice and Bob play  games. Given the tree, Alice's guesses, and the value of  for each game, find the probability that Alice will win the game and print it on a new line as a reduced fraction in the format p/q.

Input Format

The first line contains an integer, , denoting the number of different games. The subsequent lines describe each game in the following format:

The first line contains an integer, , denoting the number of nodes in the tree.
The  subsequent lines contain two space-separated integers,  and , defining an undirected edge between nodes  and .
The next line contains two space-separated integers describing the respective values of  (the number of guesses) and  (the minimum score needed to win).
Each of the  subsequent lines contains two space-separated integers,  and , indicating Alice guesses .
Constraints

The sum of  over all test cases won't exceed .
No two guesses will be identical.
Scoring

For  of the maximum score, .
For  of the maximum score, .
Output Format

Print the probability as a reduced fraction in the format p/q.

Note: Print 0/1 if the probability is  and print 1/1 if the probability is .

Sample Input 0

2
4
1 2
1 3
3 4
2 2
1 2
3 4
3
1 2
1 3
2 2
1 2
1 3
Sample Output 0

1/2
1/3
Explanation 0

Alice and Bob play the following  games:

Alice makes two guesses,  and , meaning she guessed that  and . To win the game, at least  of her guesses must be true.

In the diagrams below, you can see that at least  guesses are true if the root of the tree is either node  or :

image

There are  nodes in total and the probability of picking node  or  as the root is , which reduces to .

In this game, Alice only wins if node  is the root of the tree. There are  nodes in total, and the probability of picking node  as the root is .


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

function storyOfATree(n, edges, k, guesses) {
    const graph = Array.from({ length: n + 1 }, () => []);
    const correctGuesses = new Map(); // To count correct guesses for each edge

    // Build the graph
    for (const [u, v] of edges) {
        graph[u].push(v);
        graph[v].push(u);
    }

    // Map to track guesses
    for (const [u, v] of guesses) {
        correctGuesses.set(`${u}-${v}`, (correctGuesses.get(`${u}-${v}`) || 0) + 1);
    }

    let totalWinningRoots = 0;

    // Check each node as a possible root
    for (let root = 1; root <= n; root++) {
        let correctCount = 0;

        // Perform DFS to count correct guesses for the current root
        const dfs = (node, parent) => {
            for (const neighbor of graph[node]) {
                if (neighbor !== parent) {
                    // Check if the edge is in the correct guesses
                    if (correctGuesses.has(`${node}-${neighbor}`)) {
                        correctCount++;
                    }
                    dfs(neighbor, node);
                }
            }
        };

        dfs(root, -1); // Start DFS with no parent
        // Check if the number of correct guesses meets or exceeds k
        if (correctCount >= k) {
            totalWinningRoots++;
        }
    }

    const totalRoots = n; // Total possible roots is the number of nodes
    const p = totalWinningRoots;
    const q = totalRoots;

    // Reduce the fraction p/q
    const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
    const divisor = gcd(p, q);

    return `${p / divisor}/${q / divisor}`;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        let edges = Array(n - 1);

        for (let i = 0; i < n - 1; i++) {
            edges[i] = readLine().replace(/\s+$/g, '').split(' ').map(edgesTemp => parseInt(edgesTemp, 10));
        }

        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const g = parseInt(firstMultipleInput[0], 10);
        const k = parseInt(firstMultipleInput[1], 10);

        let guesses = Array(g);

        for (let i = 0; i < g; i++) {
            guesses[i] = readLine().replace(/\s+$/g, '').split(' ').map(guessesTemp => parseInt(guessesTemp, 10));
        }

        const result = storyOfATree(n, edges, k, guesses);
        ws.write(result + '\n');
    }

    ws.end();
}
