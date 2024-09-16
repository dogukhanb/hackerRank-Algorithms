A Discrete Mathematics professor has a class of students. Frustrated with their lack of discipline, the professor decides to cancel class if fewer than some number of students are present when class starts. Arrival times go from on time () to arrived late ().

Given the arrival time of each student and a threshhold number of attendees, determine if the class is cancelled.

Example




The first  students arrived on. The last  were late. The threshold is  students, so class will go on. Return YES.

Note: Non-positive arrival times () indicate the student arrived early or on time; positive arrival times () indicate the student arrived  minutes late.

Function Description

Complete the angryProfessor function in the editor below. It must return YES if class is cancelled, or NO otherwise.

angryProfessor has the following parameter(s):

int k: the threshold number of students
int a[n]: the arrival times of the  students
Returns

string: either YES or NO
Input Format

The first line of input contains , the number of test cases.

Each test case consists of two lines.

The first line has two space-separated integers,  and , the number of students (size of ) and the cancellation threshold.
The second line contains  space-separated integers () that describe the arrival times for each student.

Constraints

Sample Input

2
4 3
-1 -3 4 2
4 2
0 -1 2 1
Sample Output

YES
NO
Explanation

For the first test case, . The professor wants at least  students in attendance, but only  have arrived on time ( and ) so the class is cancelled.

For the second test case, . The professor wants at least  students in attendance, and there are  who arrived on time ( and ). The class is not cancelled.


/* ------------------------------------------------------ */

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
    inputString = inputString.split('\n').map(str => str.trim());
    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'angryProfessor' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY a
 */
function angryProfessor(k, a) {
    // Count how many students arrived on time (arrival time <= 0)
    const onTimeCount = a.filter(arrivalTime => arrivalTime <= 0).length;
    
    // Compare with the threshold k
    if (onTimeCount < k) {
        return 'YES';  // Class is canceled
    } else {
        return 'NO';   // Class is not canceled
    }
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const k = parseInt(firstMultipleInput[1], 10);

        const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

        const result = angryProfessor(k, a);

        ws.write(result + '\n');
    }

    ws.end();
}

