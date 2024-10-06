Alex has a board game consisting of:

A chip for marking his current location on the board.
 fields numbered from  to . Each position  has a value, , denoting the next position for the chip to jump to from that field.
A die with  faces numbered from  to . Each face  has a probability, , of being rolled.
Alex then performs the following actions:

Begins the game by placing the chip at a position in a field randomly and with equiprobability.
Takes  turns; during each turn he:
Rolls the die. We'll denote the number rolled during a turn as .
Jumps the chip  times. Recall that each field contains a value denoting the next field number to jump to.
After completing  turns, the game ends and he must calculate the respective probabilities for each field as to whether the game ended with the chip in that field.
Given , , , the game board, and the probabilities for each die face, print  lines where each line  contains the probability that the chip is on field  at the end of the game.

Note: All the probabilities in this task are rational numbers modulo . That is, if the probability can be expressed as the irreducible fraction  where , then it corresponds to the number  (or, alternatively, ). Click here to learn about Modular Multiplicative Inverse.

Input Format

The first line contains three space-separated integers describing the respective values of  (the number of positions),  (the number of die faces), and  (the number of turns).
The second line contains  space-separated integers describing the respective values of each  (i.e., the index of the field that field  can transition to).
The third line contains  space-separated integers describing the respective values of each  (where ) describing the probabilities of the faces of the -sided die.

Constraints

The sum of  is 
Note: The time limit for this challenge is doubled for all languages. Read more about standard time limits at our environment page.

Output Format

Print  lines of output in which each line  contains a single integer,  (where ), denoting the probability that the chip will be on field  after  turns.

Sample Input 0

4 5 1
2 3 2 4
332748118 332748118 332748118 0 0
Sample Output 0

582309206
332748118
332748118
748683265
Explanation 0

The diagram below depicts the respective probabilities of each die face being rolled:

image

The diagram below depicts each field with an arrow pointing to the next field:

image

There are four equiprobable initial fields, so each field has a  probability of being the chip's initial location. Next, we calculate the probability that the chip will end up in each field after  turn:

The only way the chip ends up in this field is if it never jumps from the field, which only happens if Alex rolls a . So, this field's probability is . We then calculate and print the result of  on a new line.
The chip can end up in field  after one turn in the following scenarios:

Start in field  and roll a , the probability for which is .
Start in field  and roll a  or a , the probability for which is .
Start in field  and roll a , the probability for which is .
After summing these probabilities, we get a total probability of  for the field. We then calculate and print the result of  on a new line.

The chip can end up in field  after one turn in the following scenarios:

Start in field  and roll a , the probability for which is .
Start in field  and roll a , the probability for which is .
Start in field  and roll a  or a , the probability for which is .
After summing these probabilities, we get a total probability of  for the field. We then calculate and print the result of  on a new line.

If the chip is initially placed in field , it will always end up in field  regardless of how many turns are taken (because this field loops back onto itself). Thus, this field's probability is . We then calculate and print the result of  on a new line.

 /* ----------------------- */

 'use strict';

const MOD = 1000000007;

function matMult(A, B, n) {
    const C = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                C[i][j] = (C[i][j] + A[i][k] * B[k][j]) % MOD;
            }
        }
    }
    return C;
}

function matPow(mat, exp, n) {
    const res = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        res[i][i] = 1;
    }
    
    while (exp) {
        if (exp % 2 === 1) {
            res = matMult(res, mat, n);
        }
        mat = matMult(mat, mat, n);
        exp = Math.floor(exp / 2);
    }
    return res;
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10); // number of fields
    const m = parseInt(firstMultipleInput[1], 10); // number of die faces
    const k = parseInt(firstMultipleInput[2], 10); // number of turns

    const f = readLine().replace(/\s+$/g, '').split(' ').map(fTemp => parseInt(fTemp, 10)).map(v => v - 1); // Convert to 0-indexed
    const p = readLine().replace(/\s+$/g, '').split(' ').map(pTemp => parseInt(pTemp, 10));

    // Create transition matrix
    const T = Array.from({ length: n }, () => Array(n).fill(0));

    // Fill the transition matrix based on probabilities
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            const nextPos = f[i] - 1; // Convert to 0-indexed
            T[i][nextPos] = (T[i][nextPos] + p[j]) % MOD; // Add the probability to the next position
        }
    }

    // Matrix exponentiation to get T^k
    const T_k = matPow(T, k, n);

    // Calculate the result probabilities
    const result = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            result[i] = (result[i] + T_k[j][i]) % MOD; // Accumulate probabilities
        }
        // Average the probabilities across starting fields
        result[i] = (result[i] * modInverse(n, MOD)) % MOD; // Modular inverse of n
    }

    // Output results
    result.forEach(prob => console.log(prob));
}

// Modular inverse using Fermat's Little Theorem
function modInverse(a, mod) {
    return pow(a, mod - 2, mod);
}

function pow(x, y, p) {
    let res = 1; // Initialize result
    x = x % p; // Update x if it is more than or equal to p
    while (y > 0) {
        if (y & 1) { // If y is odd, multiply x with result
            res = (res * x) % p;
        }
        y = y >> 1; // y = y / 2
        x = (x * x) % p; // Change x to x^2
    }
    return res;
}