In this problem, we'll use the term "longest common substring" loosely. It refers to substrings differing at some number or fewer characters when compared index by index. For example, 'abc' and 'adc' differ in one position, 'aab' and 'aba' differ in two.

Given two strings and an integer , determine the length of the longest common substrings of the two strings that differ in no more than  positions.

For example, . Strings  and . Check to see if the whole string (the longest substrings) matches. Given that neither the first nor last characters match and , we need to try shorter substrings. The next longest substrings are  and . Two pairs of these substrings only differ in  position:  and . They are of length .

Function Description

Complete the substringDiff function in the editor below. It should return an integer that represents the length of the longest common substring as defined.

substringDiff has the following parameter(s):

k: an integer that represents the maximum number of differing characters in a matching pair
s1: the first string
s2: the second string
Input Format

The first line of input contains a single integer, , the number of test cases follow.
Each of the next  lines contains three space-separated values: an integer  and two strings,  and .

Constraints

All characters in  and .
Output Format

For each test case, output a single integer which is the length of the maximum length common substrings differing at  or fewer positions.

Sample Input

3
2 tabriz torino
0 abacba abcaba
3 helloworld yellomarin
Sample Output

4
3
8
Explanation

First test case: If we take "briz" from the first string, and "orin" from the second string, then the number of mismatches between these two substrings is equal to 2 and their lengths are .

Second test case: Since , we should find the longest common substring, standard definition, for the given input strings. We choose "aba" as the result.

Third test case: We can choose "hellowor" from first string and "yellomar" from the second string.

 /* ------------------------------------ */

 function substringDiff(k, s1, s2) {
    let maxLength = 0;
    const len1 = s1.length;
    const len2 = s2.length;

    // Iterate over all possible lengths of substrings
    for (let length = 1; length <= Math.min(len1, len2); length++) {
        for (let start1 = 0; start1 <= len1 - length; start1++) {
            const substr1 = s1.substring(start1, start1 + length);
            for (let start2 = 0; start2 <= len2 - length; start2++) {
                const substr2 = s2.substring(start2, start2 + length);
               
                // Count the differences
                let differences = 0;
                for (let i = 0; i < length; i++) {
                    if (substr1[i] !== substr2[i]) {
                        differences++;
                    }
                }
               
                // Check if the number of differences is within the allowed limit
                if (differences <= k) {
                    maxLength = Math.max(maxLength, length);
                }
            }
        }
    }
   
    return maxLength;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
   
    const t = parseInt(readLine().trim(), 10);
   
    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
       
        const k = parseInt(firstMultipleInput[0], 10);
        const s1 = firstMultipleInput[1];
        const s2 = firstMultipleInput[2];
       
        const result = substringDiff(k, s1, s2);
        ws.write(result + '\n');
    }

    ws.end();
}