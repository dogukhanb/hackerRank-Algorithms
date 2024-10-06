Consider an array, , of  integers. We define the following terms:

Subsequence
A subsequence of  is an array that's derived by removing zero or more elements from  without changing the order of the remaining elements. Note that a subsequence may have zero elements, and this is called the empty subsequence.

Strictly Increasing Subsequence
A non-empty subsequence is strictly increasing if every element of the subsequence is larger than the previous element.

Subarray
A subarray of  is an array consisting of a contiguous block of 's elements in the inclusive range from index  to index . Any subarray of  can be denoted by .

The diagram below shows all possible subsequences and subarrays of :

image

We define the following functions:

 = the maximum sum of some strictly increasing subsequence in subarray 
We define the goodness, , of array  to be:

In other words,  is the maximum possible value of  for all possible subarrays of array .

Let  be the length of the smallest subarray such that . Given , find the value of  as well as the number of subarrays such that  and , then print these respective answers as space-separated integers on a single line.

Input Format

The first line contains an integer, , denoting number of elements in array .
The second line contains  space-separated integers describing the respective values of .

Constraints

Subtasks

For the  of the maximum score:



For the  of the maximum score:



Output Format

Print two space-seperated integers describing the respective values of  and the number of subarrays satisfying  and .

Sample Input 0

3
2 3 1
Sample Output 0

1 1
Explanation 0

The figure below shows how to calculate :

image

 is the length of the smallest subarray satisfying . From the table, we can see that . There is only one subarray of length  such that .


  /* ---------------------------- */

  function main() {
    const n = parseInt(readLine().trim(), 10);
    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    let maxSum = -Infinity;  // To track the maximum sum of a strictly increasing subsequence
    let minLength = Infinity; // To track the smallest length of the subarray that achieves the maximum sum
    let count = 0; // To track how many subarrays of `minLength` achieve the `maxSum`

    // Iterate over all possible subarrays
    for (let start = 0; start < n; start++) {
        let currentSum = a[start]; // The sum of the current subarray's increasing subsequence
        let prev = a[start]; // The last added element to the increasing subsequence
        let length = 1; // The length of the current subarray

        // Consider subarrays starting at `start` and ending at all positions from `start` to `n - 1`
        for (let end = start + 1; end <= n; end++) {
            if (end < n && a[end] > prev) {
                // If the next element is larger, it's part of the strictly increasing subsequence
                currentSum += a[end];
                prev = a[end];
                length = end - start + 1; // Update the length of the subarray
            }

            // Check if this subsequence sum is the maximum we have found
            if (currentSum > maxSum) {
                maxSum = currentSum;
                minLength = length;
                count = 1; // We found a new best, so reset the count
            } else if (currentSum === maxSum && length === minLength) {
                count++; // Another subarray with the same maximum sum and length
            }
        }
    }

    // Output the result
    console.log(minLength + ' ' + count);
}
