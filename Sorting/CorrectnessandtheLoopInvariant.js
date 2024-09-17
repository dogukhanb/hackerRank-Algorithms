In the previous challenge, you wrote code to perform an Insertion Sort on an unsorted array. But how would you prove that the code is correct? I.e. how do you show that for any input your code will provide the right output?

Loop Invariant
In computer science, you could prove it formally with a loop invariant, where you state that a desired property is maintained in your loop. Such a proof is broken down into the following parts:

Initialization: It is true (in a limited sense) before the loop runs.
Maintenance: If it's true before an iteration of a loop, it remains true before the next iteration.
Termination: It will terminate in a useful way once it is finished.
Insertion Sort's Invariant
Say, you have some InsertionSort code, where the outer loop goes through the whole array :

for(int i = 1; i < A.length; i++){
//insertion sort code
You could then state the following loop invariant:

At the start of every iteration of the outer loop (indexed with ), the subarray until  consists of the original elements that were there, but in sorted order.

To prove Insertion Sort is correct, you will then demonstrate it for the three stages:

Initialization - The subarray starts with the first element of the array, and it is (obviously) sorted to begin with.

Maintenance - Each iteration of the loop expands the subarray, but keeps the sorted property. An element  gets inserted into the array only when it is greater than the element to its left. Since the elements to its left have already been sorted, it means  is greater than all the elements to its left, so the array remains sorted. (In Insertion Sort 2 we saw this by printing the array each time an element was properly inserted.)

Termination - The code will terminate after  has reached the last element in the array, which means the sorted subarray has expanded to encompass the entire array. The array is now fully sorted.

Loop Invariant Chart

You can often use a similar process to demonstrate the correctness of many algorithms. You can see these notes for more information.

Challenge

In the InsertionSort code below, there is an error. Can you fix it? Print the array only once, when it is fully sorted.

Input Format

There will be two lines of input:

 - the size of the array
 - the list of numbers that makes up the array
Constraints



Output Format

Output the numbers in order, space-separated on one line.

Sample Input

6
7 4 3 5 6 2
Sample Output

2 3 4 5 6 7
Explanation

The corrected code returns the sorted array

/* ------------------------------------------------------------ */

function insertionSort(arr) {
    // Outer loop: Start from the second element and go to the end
    for (let i = 1; i < arr.length; i++) {
        let value = arr[i]; // The element to be inserted
        let j = i - 1;
        
        // Inner loop: Shift elements greater than 'value' to the right
        while (j >= 0 && arr[j] > value) {
            arr[j + 1] = arr[j]; // Shift element right
            j--;
        }
        
        // Insert the 'value' at the correct position
        arr[j + 1] = value;
    }
    
    // After sorting, output the entire array in space-separated format
    console.log(arr.join(' '));
}

// Example of reading input (manually here for demonstration)
const input = `6\n4 1 3 5 6 2`;  // Sample input
const inputArray = input.split('\n');
const n = parseInt(inputArray[0], 10);
const arr = inputArray[1].split(' ').map(Number);

// Call the insertion sort function
insertionSort(arr);
