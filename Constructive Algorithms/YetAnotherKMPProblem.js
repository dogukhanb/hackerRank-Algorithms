This challenge uses the famous KMP algorithm. It isn't really important to understand how KMP works, but you should understand what it calculates.

A KMP algorithm takes a string, , of length  as input. Let's assume that the characters in  are indexed from  to ; for every prefix of , the algorithm calculates the length of its longest valid border in linear complexity. In other words, for every  (where ) it calculates the largest  (where ) such that for every  (where ) there is .

Here is an implementation example of KMP:

kmp[1] = 0;
for (i = 2; i <= N; i = i + 1){
    l = kmp[i - 1];
    while (l > 0 && S[i] != S[l + 1]){
        l = kmp[l];
    }
    if (S[i] == S[l + 1]){
        kmp[i] = l + 1;
    }
    else{
        kmp[i] = 0;
    }
}
Given a sequence , construct a string, , that meets the following conditions:

The frequency of letter '' in  is exactly , the frequency of letter '' in  is exactly , and so on.
Let's assume characters of  are numbered from  to , where . We apply the KMP algorithm to  and get a table, , of size . You must ensure that the sum of  for all  is minimal.
If there are multiple strings which fulfill the above conditions, print the lexicographically smallest one.

Input Format

A single line containing  space-separated integers describing sequence .

Constraints

The sum of all  will be a positive integer .
Output Format

Print a single string denoting .

Sample Input

2 2 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
Sample Output

aabb
Explanation

The output string must have two '' and two ''. There are several such strings but we must ensure that sum of  for all  is minimal. See the figure below:

kmp(1).png

The minimum sum is . Among all the strings that satisfy both the condition, "aabb" is the lexicographically smallest.

 /* --------------------- */

 function kmp(x) {
    // Build the string S according to the frequencies given in x
    let result = [];
    
    // Iterate over the frequencies and build the string
    for (let i = 0; i < x.length; i++) {
        let char = String.fromCharCode(97 + i); // 'a' has ASCII code 97
        result.push(char.repeat(x[i])); // Repeat the character x[i] times
    }
    
    // Join the result to form the final string
    return result.join('');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const x = readLine().replace(/\s+$/g, '').split(' ').map(xTemp => parseInt(xTemp, 10));

    const result = kmp(x);

    ws.write(result + '\n');

    ws.end();
}
