Oh!! Mankind is in trouble again. This time, it's a deadly disease spreading at a rate never seen before. The need of the hour is to set up efficient virus detectors. You are the lead at Central Hospital and you need to find a fast and reliable way to detect the footprints of the virus DNA in that of the patient.

The DNA of the patient as well as of the virus consists of lowercase letters. Since the collected data is raw, there may be some errors. You will need to find all substrings in the patient DNA that either exactly match the virus DNA or have at most one mismatch, i.e., a difference in at most one location.

For example, "aa" and "aa" are matching, "ab" and "aa" are matching, while "abb" and "bab" are not.

Function Description

Complete the virusIndices function in the editor below. It should print a list of space-separated integers that represent the starting indices of matching substrings in increasing order, or No match!.

virusIndices has the following parameter(s):

p: a string that represents patient DNA
v: a string that represents virus DNA
Input Format

The first line contains an integer , the number of test cases.

. Each of the next  lines contains two space-separated strings  (the patient DNA) and  (the virus DNA).

Constraints

All characters in  and .
Output Format

For each test case, output a single line containing a space-delimited list of starting indices (-indexed) of substrings of  which are matching with  according to the condition mentioned above. The indices have to be in increasing order. If there is no matching substring, output No Match!.

Sample Input 0

3
abbab ba
hello world
banana nan
Sample Output 0

1 2
No Match!
0 2
Explanation 0

For the first case, the substrings of  starting at indices  and  are "bb" and "ba" and they are matching with the string  which is "ba".
For the second case, there are no matching substrings so the output is No Match!.
For the third case, the substrings of  starting at indices  and  are "ban" and "nan" and they are matching with the string  which is "nan".

Sample Input 1

3
cgatcg gc
atcgatcga cgg
aardvark ab
Sample Output 1

1 3
2 6
0 1 5
Explanation 1

For the first case, the substrings of  starting at indices  and  are "ga" and "gc" and they are matching with the string  which is "gc".
For the second case, the substrings of  starting at indices  and  are "cga" and "cga" and they are matching with the string  which is "cgg".
For the third case, the substrings of  starting at indices ,  and  are "aa", "ar" and "ar" and they are matching with the string  which is "ab".


 /* --------------------------- */

 'use strict';

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
 * Complete the 'virusIndices' function below.
 *
 * The function accepts following parameters:
 *  1. STRING p
 *  2. STRING v
 */

function virusIndices(p, v) {
    const n = p.length;
    const m = v.length;
    const result = [];

    for (let i = 0; i <= n - m; i++) {
        let mismatchCount = 0;
        // Check the substring of length m starting at index i
        for (let j = 0; j < m; j++) {
            if (p[i + j] !== v[j]) {
                mismatchCount++;
            }
        }
        // Check if the mismatches are within the allowed limit
        if (mismatchCount <= 1) {
            result.push(i);
        }
    }

    // Print results
    if (result.length > 0) {
        console.log(result.join(' '));
    } else {
        console.log('No Match!');
    }
}

function main() {
    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const p = firstMultipleInput[0];
        const v = firstMultipleInput[1];

        virusIndices(p, v);
    }
}
