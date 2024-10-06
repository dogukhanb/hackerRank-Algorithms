You have a long list of tasks that you need to do today. To accomplish task  you need  minutes, and the deadline for this task is . You need not complete a task at a stretch. You can complete a part of it, switch to another task, and then switch back.

You've realized that it might not be possible to complete all the tasks by their deadline. So you decide to do them in such a manner that the maximum amount by which a task's completion time overshoots its deadline is minimized.

Input Format

The first line contains the number of tasks, . Each of the next  lines contains two integers,  and .

Constraints




Output Format

Output  lines. The  line contains the value of the maximum amount by which a task's completion time overshoots its deadline, when the first  tasks on your list are scheduled optimally. See the sample input for clarification.

Sample Input

5
2 2
1 1
4 3
10 1
2 1
Sample Output

0  
1  
2  
2  
3
Explanation

The first task alone can be completed in 2 minutes, and so you won't overshoot the deadline. 

With the first two tasks, the optimal schedule can be:
time 1: task 2
time 2: task 1 
time 3: task 1

We've overshot task 1 by 1 minute, hence returning 1. 

With the first three tasks, the optimal schedule can be:
time 1 : task 2
time 2 : task 1
time 3 : task 3
time 4 : task 1
time 5 : task 3
time 6 : task 3

Task 1 has a deadline 2, and it finishes at time 4. So it exceeds its deadline by 2.
Task 2 has a deadline 1, and it finishes at time 1. So it exceeds its deadline by 0.
Task 3 has a deadline 4, and it finishes at time 6. So it exceeds its deadline by 2.

Thus, the maximum time by which you overshoot a deadline is 2. No schedule can do better than this.

Similar calculation can be done for the case containing 5 tasks.


 /* --------------------- */

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

function taskScheduling() {
    const t = parseInt(readLine().trim(), 10); // number of tasks
    const tasks = [];

    for (let i = 0; i < t; i++) {
        const taskInfo = readLine().trim().split(' ').map(Number);
        tasks.push({ duration: taskInfo[0], deadline: taskInfo[1] });
    }

    let totalTime = 0;
    const overshoots = [];

    for (let i = 0; i < t; i++) {
        totalTime += tasks[i].duration; // Increment total time with the current task's duration
        const overshoot = Math.max(0, totalTime - tasks[i].deadline); // Calculate overshoot
        overshoots.push(overshoot);
       
        // Find the maximum overshoot for all tasks up to i
        const maxOvershoot = Math.max(...overshoots);
        console.log(maxOvershoot); // Print the maximum overshoot
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    taskScheduling();
    ws.end();
}