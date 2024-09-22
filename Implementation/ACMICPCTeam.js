There are a number of people who will be attending ACM-ICPC World Finals. Each of them may be well versed in a number of topics. Given a list of topics known by each attendee, presented as binary strings, determine the maximum number of topics a 2-person team can know. Each subject has a column in the binary string, and a '1' means the subject is known while '0' means it is not. Also determine the number of teams that know the maximum number of topics. Return an integer array with two elements. The first is the maximum number of topics known, and the second is the number of teams that know that number of topics.

Example



The attendee data is aligned for clarity below:

10101
11110
00010
These are all possible teams that can be formed:

Members Subjects
(1,2)   [1,2,3,4,5]
(1,3)   [1,3,4,5]
(2,3)   [1,2,3,4]
In this case, the first team will know all 5 subjects. They are the only team that can be created that knows that many subjects, so  is returned.

Function Description

Complete the acmTeam function in the editor below.
acmTeam has the following parameter(s):

string topic: a string of binary digits
Returns

int[2]: the maximum topics and the number of teams that know that many topics
Input Format

The first line contains two space-separated integers  and , where  is the number of attendees and  is the number of topics.

Each of the next  lines contains a binary string of length .

Constraints



Sample Input

4 5
10101
11100
11010
00101
Sample Output

5
2
Explanation

Calculating topics known for all permutations of 2 attendees we get:


The 2 teams (1, 3) and (3, 4) know all 5 topics which is maximal.

/* ---------------------------------------------------------- */
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
 * Complete the 'acmTeam' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY topic as parameter.
 */

function acmTeam(topic) {
    let maxTopics = 0;
    let maxTeams = 0;

    // Iterate over all pairs of people
    for (let i = 0; i < topic.length - 1; i++) {
        for (let j = i + 1; j < topic.length; j++) {
            // Combine the topics known by both people
            let combinedTopics = 0;
            for (let k = 0; k < topic[i].length; k++) {
                if (topic[i][k] === '1' || topic[j][k] === '1') {
                    combinedTopics++;
                }
            }
            
            // Update maxTopics and maxTeams
            if (combinedTopics > maxTopics) {
                maxTopics = combinedTopics;
                maxTeams = 1;
            } else if (combinedTopics === maxTopics) {
                maxTeams++;
            }
        }
    }

    return [maxTopics, maxTeams];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const m = parseInt(firstMultipleInput[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    const result = acmTeam(topic);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
