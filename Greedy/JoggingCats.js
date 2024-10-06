
It's almost summertime, so Big Cat and Little Cat are getting in shape. They decide the core of their fitness plan is to start jogging every day.

Their city consists of  intersections connected by  bidirectional roads. The cats decide that their jogging route should be cyclic (i.e., starting and ending at the same intersection) and consist of  different roads.

The cats also love exploring new places, so each day they want to choose a new route to jog on that is not equal to any of their previous routes. Two routes are considered to be equal if their sets of component roads are equal.

Given a map of the city, can you help our heroic cats determine the maximum number of days they can go jogging so that every route traveled is different?

Input Format

The first line contains a pair of space-separated integers,  (the number of intersections) and  (the number of roads), respectively.

Each line  of the  subsequent lines contains a pair of space-separated integers,  and , defining a bidirectional road connecting intersections  and .

Constraints

Each bidirectional road connects  distinct intersections (i.e., no road connects an intersection to itself).
Each pair of intersections is directly connected by no more than  road.
Output Format

Print the maximum number of days for which the cats can go jogging without repeating a route.

Sample Input

4 6
1 2
2 3
3 4
4 1
1 3
2 4
Sample Output

3
Explanation

There are  different routes:

Recall that each route is a set of intersections forming a cycle, so each unique route is the same regardless of which city on the route the cats start out at. Thus, we print  (the number of routes) as our answer.

 /*  --------------------------------- */

 function processData(input) {
    const lines = input.trim().split('\n');
    const [n, m] = lines[0].split(' ').map(Number);
   
    const graph = Array.from({ length: n + 1 }, () => []);
   
    // Build the graph
    for (let i = 1; i <= m; i++) {
        const [u, v] = lines[i].split(' ').map(Number);
        graph[u].push(v);
        graph[v].push(u);
    }

    const visited = new Set();
    const cycles = new Set();

    function dfs(current, start, path) {
        visited.add(current);
        path.push(current);

        for (const neighbor of graph[current]) {
            if (!visited.has(neighbor)) {
                dfs(neighbor, start, path);
            } else if (neighbor === start && path.length > 2) {
                // Found a cycle
                const cycle = [...path, start].sort().join(',');
                cycles.add(cycle);
            }
        }

        path.pop();
        visited.delete(current);
    }

    for (let i = 1; i <= n; i++) {
        if (!visited.has(i)) {
            dfs(i, i, []);
        }
    }

    console.log(cycles.size);
}

// Read input
process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});