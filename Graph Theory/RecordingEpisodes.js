Dave is a die-hard fan of a show called "HackerRank", in which a young programmer uses her problem-solving abilities to solve crimes. He splurged on a Digital Video Recorder (DVR) so that he can record HackerRank episodes and watch them later. Luckily, Dave managed to get his hands on schedules for all the episodes in each upcoming season.

Each season has  episodes numbered from  to . Each episode airs twice; the first time it's called "live", and the second time it's called "repeat". So, for each episode, we have  integers,  and  for the live airing and  and  for the repeat airing, where  is episode's start time and and  is its end time. All times are given as integers representing the number of minutes passed since the start of the season.

Episodes broadcast on multiple channels, so some of the air times overlap and the episodes may not broadcast sequentially. It's possible that both the live and repeat broadcasts of some episode  are held before episode , even though . In addition, live and repeat broadcasts of the same episode may differ in length due to the number of advertisements during the broadcast.

Dave only has one TV with a DVR attached to it, and the DVR is capable of recording one episode at a time. For each episode in a season, Dave first decides whether or not he will record it. If he decides to record it, he will either record it during  or . Dave will only ever record one of the two airings of an episode, and he always records full episodes. This means that once he starts recording an episode, he will always record it until the end (i.e., he never records partial episodes).

Dave realizes that it might not be possible for him to record all episodes successfully, so instead of focusing on recording all episodes of HackerRank (which may be impossible), he decides to record all consecutively airing episodes whose episode number occurs in some inclusive  interval such that  (i.e., the number of consecutive episodes recorded) is as large as possible.

Given the programming schedule for each season, find  and  episode numbers for largest range of consecutive episodes Dave can record during that season and print these respective values as two space-separated integers on a new line. If two or more such intervals exist, choose the one having the smallest  value.

Input Format

The first line contains a single positive integer, , denoting number of seasons of HackerRank.
The subsequent lines describe each of the  seasons in the following format:

The first line contains an integer, , denoting the number of episodes in the season.
Each line  of the  subsequent line contains four space-separated integers describing the respective values of , , , and .
Constraints

Output Format

On a new line for each season, print two space-separated integers denoting the respective  and  (inclusive) values for the maximum possible range of consecutive episodes Dave can record such that  is as large as possible. If more than one such interval exists, choose the interval having the smallest .

Sample Input

3
3
10 20 30 40
20 35 21 35
14 30 35 50
1
10 20 30 40
3
11 19 31 39
12 38 13 37
10 20 30 40
Sample Output

1 2
1 1
1 1
Explanation

For the first season, Dave records the live airing of episode  and the repeat airing of episode . Note that it is not possible to record episodes ,  and  simultaneously.

For the second season, there is only one episode so Dave records from episode  to episode  and we print 1 1 on a new line.

For the third season, Dave must choose to record either episode  or episode  (episode  starts while episode  is still airing and ends after episode  starts); he cannot record both, because he only wants to record consecutive episodes. Thus, we pick the episode with the smallest  value, which is episode , and print 1 1 as we are only recording episode .
 

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
 * Complete the 'episodeRecording' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts 2D_INTEGER_ARRAY episodes as parameter.
 */

function episodeRecording(episodes) {
    const n = episodes.length;
    const airingTimes = [];

    // Collect all airing times
    for (let i = 0; i < n; i++) {
        const [start1, end1, start2, end2] = episodes[i];
        airingTimes.push({ episode: i + 1, start: start1, end: end1 });
        airingTimes.push({ episode: i + 1, start: start2, end: end2 });
    }

    // Sort by episode number and start time
    airingTimes.sort((a, b) => {
        if (a.episode === b.episode) {
            return a.start - b.start;
        }
        return a.episode - b.episode;
    });

    let maxCount = 0;
    let bestStart = 0;
    let bestEnd = 0;
   
    for (let i = 0; i < n; i++) {
        let currentCount = 0;
        let lastEnd = -1;
        let currentStart = i + 1; // 1-based index for episode
       
        for (let j = i; j < n; j++) {
            const episodeNum = j + 1; // 1-based index for episode
            const airingOptions = airingTimes.filter(a => a.episode === episodeNum);
           
            let canRecord = false;

            for (const airing of airingOptions) {
                if (airing.start >= lastEnd) {
                    canRecord = true;
                    lastEnd = airing.end;
                    break; // Break on the first valid airing found
                }
            }

            if (canRecord) {
                currentCount++;
                if (currentCount > maxCount || (currentCount === maxCount && currentStart < bestStart)) {
                    maxCount = currentCount;
                    bestStart = currentStart;
                    bestEnd = episodeNum;
                }
            } else {
                break; // If we can't record the current episode, break out
            }
        }
    }

    return [bestStart, bestEnd];
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);
        let episodes = Array(n);

        for (let i = 0; i < n; i++) {
            episodes[i] = readLine().replace(/\s+$/g, '').split(' ').map(episodesTemp => parseInt(episodesTemp, 10));
        }

        const result = episodeRecording(episodes);
        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
