Penny has an array of  integers, . She wants to find the number of unique multisets she can form using elements from the array such that the bitwise XOR of all the elements of the multiset is a prime number. Recall that a multiset is a set which can contain duplicate elements.

Given  queries where each query consists of an array of integers, can you help Penny find and print the number of valid multisets for each array? As these values can be quite large, modulo each answer by  before printing it on a new line.

Input Format

The first line contains a single integer, , denoting the number of queries. The  subsequent lines describe each query in the following format:

The first line contains a single integer, , denoting the number of integers in the array.
The second line contains  space-separated integers describing the respective values of .
Constraints

Output Format

On a new line for each query, print a single integer denoting the number of unique multisets Penny can construct using numbers from the array such that the bitwise XOR of all the multiset's elements is prime. As this value is quite large, your answer must be modulo .

Sample Input

1   
3   
3511 3671 4153  
Sample Output

4
Explanation

The valid multisets are:

 is prime.
 is prime.
 is prime.
, which is prime.
Because there are four valid multisets, we print the value of  on a new line.


 /* ------------------------ */
 const MOD = 1000000007;
 const MAX_XOR = 8192; // Safe upper limit for XOR values
 const MAX = 10000; // Max value for elements in the array
 
 // Helper function to determine if a number is prime
 function isPrime(num) {
     if (num < 2) return false;
     for (let i = 2; i * i <= num; i++) {
         if (num % i === 0) return false;
     }
     return true;
 }
 
 // Precompute prime numbers in the range [0, MAX_XOR]
 const primes = new Set();
 for (let i = 2; i <= MAX_XOR; i++) {
     if (isPrime(i)) primes.add(i);
 }
 
 function primeXor(a) {
     const freq = new Array(MAX + 1).fill(0);
     
     // Count frequency of each number
     for (const num of a) {
         freq[num]++;
     }
     
     // DP array to store ways to reach a certain XOR value
     const dp = new Array(MAX_XOR).fill(0);
     dp[0] = 1; // There's one way to get XOR of 0 (empty set)
     
     for (let i = 0; i <= MAX; i++) {
         if (freq[i] === 0) continue;
         
         const count = freq[i];
         const newDP = [...dp];
         
         for (let j = 0; j < MAX_XOR; j++) {
             const xorVal = j ^ i;
             const ways = (dp[j] * (count + 1)) % MOD; // Each number can appear 0 to count times
             
             newDP[xorVal] = (newDP[xorVal] + ways) % MOD; // Update new XOR value
         }
         
         // Update dp with newDP values
         dp.splice(0, dp.length, ...newDP);
     }
     
     // Sum up all prime XORs
     let result = 0;
     for (const prime of primes) {
         result = (result + dp[prime]) % MOD;
     }
     
     return result;
 }
 
 function main() {
     const ws = fs.createWriteStream(process.env.OUTPUT_PATH);
     const q = parseInt(readLine().trim(), 10);
     
     for (let qItr = 0; qItr < q; qItr++) {
         const n = parseInt(readLine().trim(), 10);
         const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));
         
         const result = primeXor(a);
         
         ws.write(result + '\n');
     }
     
     ws.end();
 }
 
