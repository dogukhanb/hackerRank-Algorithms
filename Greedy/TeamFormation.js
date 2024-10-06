For an upcoming programming contest, Roy is forming some teams from the students of his university. A team can have any number of contestants.

Roy knows the skill level of each contestant. To make the teams work as a unit, he forms the teams based on some rules. Each of the team members must have a unique skill level for the team. If a member's skill level is  where , there exists another team member whose skill level is . Note that a contestant can write buggy code and thus can have a negative skill level.

The more contestants on the team, the more problems they can attempt at a time so Roy wants to form teams such that the smallest team is as large as possible.

For example, there are  contestants with skill levels . There are many ways teams could be formed, e.g. [-1], [0],...,[3]. At the other end of the spectrum, we could form  and . We're looking for the largest smaller team size though. Two sets that meet the criteria are  and . The largest smaller team size possible is .

Note: There is an edge case where  contestants have registered. As no teams are to be created, the largest team created will have  members.

Input Format

The first line contains an integer , the number of test cases.

Each of the next  lines contains a string of space-separated integers,  followed by  integers , a list of the contestants' skill levels.

Constraints




Output Format

For each test case, print the size of largest possible smallest team on a separate line.

Sample Input

4  
7 4 5 2 3 -4 -3 -5  
1 -4  
4 3 2 3 1  
7 1 -2 -3 -4 2 0 -1  
Sample Output

3
1
1
7
Explanation

For the first case, Roy can form two teams: one with contestants with skill levels {-4,-3,-5} and the other one with {4,5,2,3}. The first group containing 3 members is the smallest.

In the second case, the only team is {-4}

In the third case, the teams are {3} , {1,2,3}, the size of the smaller group being 1.

In the last case, you can build one group containing all of the contestants. The size of the group equals the total number of contestants.

Time limits

Time limits for this challenge are given here

Note

If n = 0, print 0.

 /* ----------------- */

 function processData(input) {
    const lines = input.split('\n');
    const testCases = parseInt(lines[0], 10);
    const results = [];

    for (let i = 1; i <= testCases; i++) {
        const skills = lines[i].trim().split(' ').map(Number);
        const n = skills[0]; // The number of contestants
        if (n === 0) {
            results.push(0);
            continue;
        }
        
        const skillLevels = skills.slice(1);
        const frequency = {};
        
        // Count the frequency of each skill level
        for (const skill of skillLevels) {
            frequency[skill] = (frequency[skill] || 0) + 1;
        }
        
        // Get the maximum frequency
        const maxFrequency = Math.max(...Object.values(frequency));
        
        // The number of unique skill levels
        const uniqueSkillsCount = Object.keys(frequency).length;
        
        // The size of the largest possible smallest team
        const largestSmallestTeamSize = Math.floor(uniqueSkillsCount / maxFrequency);
        results.push(largestSmallestTeamSize);
    }
    
    console.log(results.join('\n'));
}

// Example input for testing
const exampleInput = `4
7 4 5 2 3 -4 -3 -5
1 -4
4 3 2 3 1
7 1 -2 -3 -4 2 0 -1`;

processData(exampleInput);
