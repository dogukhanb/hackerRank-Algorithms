Meereen is famous for its fighting pits where fighters fight each other to the death.

Initially, there are  fighters and each fighter has a strength value. The  fighters are divided into  teams, and each fighter belongs exactly one team. For each fight, the Great Masters of Meereen choose two teams,  and , that must fight each other to the death. The teams attack each other in alternating turns, with team  always launching the first attack. The fight ends when all the fighters on one of the teams are dead.

Assume each team always attacks optimally. Each attack is performed as follows:

The attacking team chooses a fighter from their team with strength .
The chosen fighter chooses at most  fighters from other team and kills all of them.
The Great Masters don't want to see their favorite fighters fall in battle, so they want to build their teams carefully and know who will win different team matchups. They want you to perform two type of queries:

1 p x Add a new fighter with strength  to team . It is guaranteed that this new fighter's strength value will not be less than any current member of team .
2 x y Print the name of the team that would win a matchup between teams  and  in their current state (recall that team  always starts first). It is guaranteed that .
Given the initial configuration of the teams and  queries, perform each query so the Great Masters can plan the next fight.

Note: You are determining the team that would be the winner if the two teams fought. No fighters are actually dying in these matchups so, once added to a team, a fighter is available for all future potential matchups.

Input Format

The first line contains three space-separated integers describing the respective values of  (the number of fighters),  (the number of teams), and  (the number of queries).
Each line  of the  subsequent lines contains two space-separated integers describing the respective values of fighter 's strength, , and team number, .
Each of the  subsequent lines contains a space-separated query in one of the two formats defined in the Problem Statement above (i.e., 1 p x or 2 x y).

Constraints

It is guaranteed that both teams in a query matchup will always have at least one fighter.
Scoring
This challange has binary scoring. This means you will get a full score if your solution passes all test cases; otherwise, you will get  points.

Output Format

After each type  query, print the name of the winning team on a new line. For example, if  and  are matched up and  wins, you would print .

Sample Input

7 2 6
1 1
2 1
1 1
1 2
1 2
1 2
2 2
2 1 2
2 2 1
1 2 1
1 2 1
2 1 2
2 2 1
Sample Output

1
2
1
1
Explanation

Team  has three fighters with the following strength levels: .
Team  has four fighters with the following strength levels: .

The first query matching up team  and  would play out as follows:

Team  attacks  The fighter with strength  can kill one fighter with strength  and one fighter with strength . Now, , and .
Team  attacks  The fighter with strength  can kill the fighter with strength . Now, , and .
Team  attacks  The fighter with strength  can kill one fighter with strength . Now, , and .
Team  attacks  The fighter with strength  can kill one fighter with strength . Now, , and .
Team  attacks  The fighter with strength  can kill the last fighter with strength . Now, , and .
After this last attack, all of Team 's fighters would be dead. Thus, we print  as team  would win that fight.


 /* ---------------------------- */

 function fightingPits(k, fighters, queries) {
    const teams = Array.from({ length: k + 1 }, () => []); // Index 0 is unused

    // Fill the teams with initial fighters
    for (let [strength, teamNumber] of fighters) {
        teams[teamNumber].push(strength);
    }

    const results = [];

    // Process each query
    for (const query of queries) {
        if (query[0] === 1) {
            // Add a new fighter
            const teamNumber = query[1];
            const strength = query[2];
            teams[teamNumber].push(strength);
        } else if (query[0] === 2) {
            // Determine the winner between team x and team y
            const teamX = query[1];
            const teamY = query[2];

            // Sort the fighters in both teams in descending order
            const fightersX = teams[teamX].slice().sort((a, b) => b - a);
            const fightersY = teams[teamY].slice().sort((a, b) => b - a);

            let idxX = 0; // Index for teamX
            let idxY = 0; // Index for teamY

            // Simulate the fight
            let turn = 0; // 0 for teamX's turn, 1 for teamY's turn
            while (idxX < fightersX.length && idxY < fightersY.length) {
                if (turn === 0) {
                    // Team X's turn
                    let killCount = fightersX[idxX];
                    idxX++; // Move to the next fighter in team X
                    // Team Y loses fighters
                    while (killCount > 0 && idxY < fightersY.length) {
                        idxY++; // Kill one fighter from team Y
                        killCount--;
                    }
                } else {
                    // Team Y's turn
                    let killCount = fightersY[idxY];
                    idxY++; // Move to the next fighter in team Y
                    // Team X loses fighters
                    while (killCount > 0 && idxX < fightersX.length) {
                        idxX++; // Kill one fighter from team X
                        killCount--;
                    }
                }
                turn = 1 - turn; // Switch turns
            }

            // Determine the winning team
            if (idxX < fightersX.length) {
                results.push(teamX); // Team X wins
            } else {
                results.push(teamY); // Team Y wins
            }
        }
    }

    return results;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const k = parseInt(firstMultipleInput[1], 10);
    const q = parseInt(firstMultipleInput[2], 10);

    let fighters = Array(n);

    for (let i = 0; i < n; i++) {
        fighters[i] = readLine().replace(/\s+$/g, '').split(' ').map(fightersTemp => parseInt(fightersTemp, 10));
    }

    let queries = Array(q);

    for (let i = 0; i < q; i++) {
        queries[i] = readLine().replace(/\s+$/g, '').split(' ').map(queriesTemp => parseInt(queriesTemp, 10));
    }

    const result = fightingPits(k, fighters, queries);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
