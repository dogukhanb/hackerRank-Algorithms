Lena developed a sorting algorithm described by the following pseudocode:

lena_sort(array nums) {
    if (nums.size <= 1) {
        return nums;
    }
    pivot = nums[0];
    array less;
    array more;
    for (i = 1; i < nums.size; ++i) {
    	// Comparison
        if (nums[i] < pivot) {
            less.append(nums[i]);
        }
        else {
            more.append(nums[i]);
        }
    }
    sorted_less = lena_sort(less);
    sorted_more = lena_sort(more);
    ans = sorted_less + pivot + sorted_more;
    
    return ans;
}
We consider a comparison to be any time some  is compared with .

You must solve  queries where each query  consists of some  and . For each query, construct an array of  distinct elements in the inclusive range between  and  that will be sorted by  in exactly  comparisons, then print each respective element of the unsorted array as a single line of  space-separated integers; if no such array exists, print -1 instead.

Input Format

The first line contains a single integer denoting  (the number of queries).
Each line  of the  subsequent lines contains two space-separated integers describing the respective values of  (the length of the array) and  (the number of comparisons) for query .

Constraints

 the sum of  over all queries 
Output Format

Print the answer to each query on a new line. For each query , print  space-separated integers describing each respective element in an unsorted array that Lena's algorithm will sort in exactly  comparisons; if no such array exists, print -1 instead.

Sample Input 0

2
5 6
5 100
Sample Output 0

4 2 1 3 5
-1
Explanation 0

We perform the following  queries:

One array with  elements is . The sequence of sorting operations looks like this:

Run  on . Compare  with , , , and  for a total of  comparisons. We're then left with  and ; we only need to continue sorting , as  is sorted with respect to itself because it only contains one element.
Run  on . Compare  with  and  for a total of  comparisons. We're then left with  and , so we stop sorting.
We sorted  in  comparisons and , so we print 4 2 1 3 5 on a new line.

It's not possible to construct an array with  elements that  will sort in exactly  comparisons, so we print -1 on a new line.
Sample Input 1

3
1 0
4 6
3 2
Sample Output 1

1
4 3 2 1
2 1 3
Explanation 1

We perform the following  queries:

We want an array with  element that  sorts in  comparisons; any array with  element is already sorted (i.e.,  performs  comparisons), so we choose  as our array and print 1 on a new line.
One array with  elements is ; sorting it with  looks like this:

 on . Compare  with , , and  for a total of  comparisons. We're then left with  and ; we only need to continue sorting , as  is empty.
Run  on . Compare  with  and  for a total of  comparisons. We're then left with  and , so we only continue sorting .
Run  on . Compare  with  for a total of  comparison. We then stop sorting, as  and .
We sorted  in  comparisons and , so we print 4 3 2 1 on a new line.

One array with  elements is . When we run  on it, we compare  with  and  for a total of  comparisons. We're then left with  and , so we stop sorting.

We sorted  in  comparisons and , so we print 2 1 3 on a new line.


 /* -------------------------- */


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

function main() {
    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');
        const n = parseInt(firstMultipleInput[0], 10);
        const c = parseInt(firstMultipleInput[1], 10);

        // Maximum number of comparisons possible
        const maxComparisons = (n * (n - 1)) / 2;

        // Check for impossibility
        if (c < n - 1 || c > maxComparisons) {
            console.log(-1);
            continue;
        }

        // Create an array of n distinct elements
        let result = Array.from({length: n}, (_, i) => i + 1);
        
        // Start with a reversed array to ensure max comparisons first
        result.reverse();

        // The number of additional comparisons we need to adjust to reach c
        let additionalComparisons = maxComparisons - c;

        // We can adjust the array to reduce the number of comparisons
        // by "fixing" the last additionalComparisons pairs
        for (let i = 0; i < additionalComparisons; i++) {
            // Swap positions to reduce comparisons
            if (i + 1 < n) {
                [result[i], result[i + 1]] = [result[i + 1], result[i]];
            }
        }

        console.log(result.join(' '));
    }
}
