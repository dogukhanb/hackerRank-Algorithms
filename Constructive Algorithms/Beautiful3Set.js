You are given an integer . A set, , of triples  is beautiful if and only if:

Let  be the set of different 's in ,  be the set of different 's in , and  be the set of different  in . Then .
The third condition means that all 's are pairwise distinct. The same goes for  and .

Given , find any beautiful set having a maximum number of elements. Then print the cardinality of  (i.e., ) on a new line, followed by  lines where each line contains  space-separated integers describing the respective values of , , and .

Input Format

A single integer, .

Constraints

Output Format

On the first line, print the cardinality of  (i.e., ).
For each of the  subsequent lines, print three space-separated numbers per line describing the respective values of , , and  for triple  in .

Sample Input

3
Sample Output

3
0 1 2
2 0 1
1 2 0
Explanation

In this case, . We need to construct a set, , of non-negative integer triples () where .  has the following triples:

We then print the cardinality of this set, , on a new line, followed by  lines where each line contains three space-separated values describing a triple in .


 /* -------------------- */
 function processData(input) {
    const n = parseInt(input.trim());
    
    let triples = [];
    
    // Generate all distinct triples (a, b, c) where a != b != c
    for (let a = 0; a < n; a++) {
        for (let b = 0; b < n; b++) {
            if (a === b) continue; // Ensure a != b
            for (let c = 0; c < n; c++) {
                if (a !== c && b !== c) {
                    triples.push([a, b, c]);
                }
            }
        }
    }
    
    // Output the cardinality of the set
    console.log(triples.length);
    
    // Output each triple
    triples.forEach(triple => {
        console.log(triple.join(' '));
    });
}

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
    processData(_input);
});
