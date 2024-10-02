There are n users registered on a website CuteKittens.com. Each of them has a unique password represented by pass[1], pass[2], ..., pass[N]. As this a very lovely site, many people want to access those awesomely cute pics of the kittens. But the adamant admin does not want the site to be available to the general public, so only those people who have passwords can access it.

Yu, being an awesome hacker finds a loophole in the password verification system. A string which is a concatenation of one or more passwords, in any order, is also accepted by the password verification system. Any password can appear  or more times in that string. Given access to each of the  passwords, and also have a string , determine whether this string be accepted by the password verification system of the website. If all of the  string can be created by concatenating password strings, it is accepted. In this case, return the passwords in the order they must be concatenated, each separated by a single space on one line. If the password attempt will not be accepted, return 'WRONG PWASSWORD'.

Examples


Concatenate the passwords in index order  to match 'abrakadabra'. Return 'abra ka dabra'.



Concatenate the passwords in index order  to match 'kaabra'. Return 'ka abra'.



Concatenate the passwords in index order  to match 'abba',  to match 'baab',  to match 'abab' or  to match $baba'. No combination of 1 or more passwords can be concatenated to match 'aba'. Return 'WRONG PASSWORD'.

Function Description

Complete the passwordCracker function in the editor below.

passwordCracker has the following parameters:
- string passwords[n]: a list of password strings
- string loginAttempt: the string to attempt to create

Returns
- string: Return the passwords as a single string in the order required for the password to be accepted, each separated by a space. If it is not possible to form the string, return the string WRONG PASSWORD.

Input Format

The first line contains an integer t, the total number of test cases.

Each of the next  sets of three lines is as follows:
- The first line of each test case contains n, the number of users with passwords.
- The second line contains n space-separated strings, passwords[i], that represent the passwords of each user.
- The third line contains a string, loginAttempt, which Yu must test for acceptance.

Constraints

, where 
loginAttempt and passwords[i] contain only lowercase latin characters ('a'-'z').
Sample Input 0

3
6
because can do must we what
wedowhatwemustbecausewecan
2
hello planet
helloworld
3
ab abcd cd
abcd
Sample Output 0

we do what we must because we can
WRONG PASSWORD
ab cd
Explanation 0

Sample Case #00: "wedowhatwemustbecausewecan" is the concatenation of passwords {"we", "do", "what", "we", "must", "because", "we", "can"}. That is

loginAttempt = pass[5] + pass[3] + pass[6] + pass[5] +  pass[4] + pass[1] + pass[5] + pass[2]
Note that any password can repeat any number of times.

Sample Case #01: We can't create string "helloworld" using the strings {"hello", "planet"}.

Sample Case #02: There are two ways to create loginAttempt ("abcd"). Both pass[2] = "abcd" and pass[1] + pass[3] = "ab cd" are valid answers.

Sample Input 1

3
4
ozkxyhkcst xvglh hpdnb zfzahm
zfzahm
4
gurwgrb maqz holpkhqx aowypvopu
gurwgrb
10
a aa aaa aaaa aaaaa aaaaaa aaaaaaa aaaaaaaa aaaaaaaaa aaaaaaaaaa
aaaaaaaaaab
Sample Output 1

zfzahm
gurwgrb
WRONG PASSWORD


 /* ---------------------------------- */

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
 * Complete the 'passwordCracker' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY passwords
 *  2. STRING loginAttempt
 */

function passwordCracker(passwords, loginAttempt) {
    const n = loginAttempt.length;
    const dp = Array(n + 1).fill(-1); // Initialize dp array
    dp[0] = 0; // Base case: empty string can be formed

    // Fill dp array
    for (let i = 1; i <= n; i++) {
        for (let j = 0; j < passwords.length; j++) {
            const password = passwords[j];
            const passwordLength = password.length;

            if (i >= passwordLength && loginAttempt.slice(i - passwordLength, i) === password) {
                if (dp[i - passwordLength] !== -1) {
                    dp[i] = j; // Store index of password used
                    break; // No need to find more passwords for this index
                }
            }
        }
    }

    // If dp[n] is still -1, it means loginAttempt can't be formed
    if (dp[n] === -1) {
        return 'WRONG PASSWORD';
    }

    // Backtrack to find which passwords were used
    const result = [];
    for (let i = n; i > 0; ) {
        const passwordIndex = dp[i];
        const password = passwords[passwordIndex];
        result.push(password);
        i -= password.length; // Move back by the length of the found password
    }

    // Since we collected the passwords in reverse order, reverse them back
    return result.reverse().join(' ');
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const passwords = readLine().replace(/\s+$/g, '').split(' ');

        const loginAttempt = readLine();

        const result = passwordCracker(passwords, loginAttempt);

        ws.write(result + '\n');
    }

    ws.end();
}
