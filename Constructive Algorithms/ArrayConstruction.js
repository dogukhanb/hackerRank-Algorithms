Professor GukiZ has hobby — constructing different arrays. His best student, Nenad, gave him the following task that he just can't manage to solve:

Construct an -element array, , where the sum of all elements is equal to  and the sum of absolute differences between each pair of elements is equal to . All elements in  must be non-negative integers.

If there is more then one such array, you need to find the lexicographically smallest one. In the case no such array  exists, print .

Note: An array, , is considered to be lexicographically smaller than another array, , if there is an index  such that  and, for any index , .

Input Format

The first line contains an integer, , denoting the number of queries.
Each of the  subsequent lines contains three space-separated integers describing the respective values of  (the number of elements in array ),  (the sum of elements in ), and  (the sum of absolute differences between each pair of elements).

Constraints

Subtasks

For  of the maximum score:

For  of the maximum score:

Output Format

For each query, print  space-separated integers describing the respective elements of the lexicographically smallest array  satisfying the conditions given above. If no such array exists, print  instead.

Sample Input

 1
 3 3 4
Sample Output

 0 1 2
Explanation

We have  query in which , , and . The lexicographically smallest array is .

The sum of array 's elements is 
The absolute differences between each pair of elements are:



The sum of these absolute differences is 

As array  is both lexicographically smallest and satisfies the given conditions, we print its contents on a new line as 0 1 2.


 /* --------------------------- */

 function arrayConstruction(n, s, k) {
    // Initialize lexicographically smallest array: [0, 1, 2, ..., n-1]
    let arr = Array.from({ length: n }, (_, i) => i);
    
    // Calculate the initial sum of the array [0 + 1 + 2 + ... + (n-1)]
    let initialSum = (n * (n - 1)) / 2;
    
    // Calculate the sum of absolute differences for this array
    let initialK = (n * (n - 1)) / 2;
    
    // If initial sum or initial K is greater than s or k, no solution exists
    if (initialSum > s || initialK > k) {
        return [-1];
    }
    
    // Difference between the required sum and the initial sum
    let diffSum = s - initialSum;
    let diffK = k - initialK;

    // We will try to increase the elements in the array to satisfy the sum `s` and difference sum `k`
    for (let i = n - 1; i >= 0 && (diffSum > 0 || diffK > 0); i--) {
        // Max increment we can apply to arr[i] without exceeding the sum or breaking lexicographical order
        let maxIncrement = Math.min(diffSum, diffK);
        
        // Apply the increment
        arr[i] += maxIncrement;
        
        // Adjust the differences accordingly
        diffSum -= maxIncrement;
        diffK -= maxIncrement;
    }

    // If after trying to adjust, the sum or K is not correct, return -1
    if (diffSum !== 0 || diffK !== 0) {
        return [-1];
    }

    return arr;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

        const n = parseInt(firstMultipleInput[0], 10);
        const s = parseInt(firstMultipleInput[1], 10);
        const k = parseInt(firstMultipleInput[2], 10);

        const result = arrayConstruction(n, s, k);

        ws.write(result.join(' ') + '\n');
    }

    ws.end();
}
