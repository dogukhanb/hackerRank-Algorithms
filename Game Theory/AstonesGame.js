Koga and Ryuho, new generation Athena's saints, are training to improve their control over the cosmos. According to the ancient Masters, a saint's power to control the cosmos strengthens, when one allows the energy of the universe to flow within the body and then concentrates it. This energy can even be used to explode the objects.

Today's training is based on a game, and the goal is to use as little cosmos as possible to win. Two saints play as follows:

Initially there are  piles of stones; pile  has  stone, pile  has  stones, and so on. Thus, the  pile has  stones. The saints take turns and in each turn, a saint must select a non-empty pile and destroy at least half of the stones in it. The winner is the saint who destroys the last available stone .

For example, from a pile of  stones, a saint must destroy at least  stones, leaving a single (and possibly empty) pile at most 3 stones. With such game, saints learn how to use the appropriate amount of cosmos in a single strike: too much will destroy more stones than desired, too little won't be enough. They also improve their battle thinking and strategy skills.

Ryuho suspects that such game is not as random as it appears to be at first glance. He strongly believes that with the correct single blow, you're assured to win from the very first turn, if you play optimally, no matter how good the other saint plays. Moreover, he is particularly interested in knowing the minimum number of stones he needs to destroy at that first move. Can you help him?

Input Format

First line of the input consists of an integer ,  testcases follow, each in a new line. Each line will contain a single integer , which describes the number of initial piles as explained above.

Constraints

Output Format

For each line in the input, output the minimum number of stones Ryuho needs to destroy in his first turn, assuming he starts playing and that both he and Koga play always as well as possible. If this is not possible, just print .

Sample Input 0

5
1
10
6
8
123456
Sample Output 0

1
7
2
7
32768
Explanation 0

For the first testcase, we can see that the saint can destroy the first stone and win the game.

Sample Input 1

1
3
Sample Output 1

1
Explanation 1

There are three piles with stones  and . Initially Ryuho will remove  stone from the first pile. Now other saint has  options -

First, to remove all stones from second pile. In that case Ryuho will remove all stones from third pile and win the game.

Second, to remove all stones from third pile. In that case Ryuho will remove all stones from second pile and win the game.

Third, to remove  stone from second pile. In that case Ryuho will remove  stones from third pile and they will be left with  stone in each of the second and third pile. No matter what the other saint selects Ryuho will have an option to select the last stone.

Fourth, to remove  stones from the third pile. In that case Ryuho will remove  stone from second pile and they will be left with  stone in each of the second and third pile. No matter what the other saint selects Ryuho will have an option to select the last stone.

So in all four cases Ryuho will win the game.


 /* ------------------------------------- */

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
 * Complete the 'half' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function half(n) {
    let power = 1;
    
    // Find the highest power of 2 less than or equal to n
    while (power <= n) {
        power *= 2;
    }
    
    // The previous power of 2 is the largest power of 2 <= n
    power /= 2;

    // Minimum stones to remove to get to the previous power of 2
    return n - power + 1; // Must remove stones to drop to the previous power of 2
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const result = half(n);

        ws.write(result + '\n');
    }

    ws.end();
}
