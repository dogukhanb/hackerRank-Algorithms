Victoria is splurging on expensive accessories at her favorite stores. Each store stocks  types of accessories, where the  accessory costs  dollars (). Assume that an item's type identifier is the same as its cost, and the store has an unlimited supply of each accessory.

Victoria wants to purchase a total of  accessories according to the following rule:

Any -element subset of the purchased items must contain at least  different types of accessories.

For example, if , , and , then she must choose  accessories such that any subset of  of the  accessories will contain at least  distinct types of items.

Given , , , and  values for  shopping trips, find and print the maximum amount of money that Victoria can spend during each trip; if it's not possible for Victoria to make a purchase during a certain trip, print SAD instead. You must print your answer for each trip on a new line.

Input Format

The first line contains an integer, , denoting the number of shopping trips.
Each of the  subsequent lines describes a single shopping trip as four space-separated integers corresponding to , , , and , respectively.

Constraints

The sum of the 's for all  shopping trips .
Output Format

For each shopping trip, print a single line containing either the maximum amount of money Victoria can spend; if there is no collection of items satisfying her shopping rule for the trip's , , , and  values, print SAD instead.

Sample Input

2
6 5 3 2
2 1 2 2
Sample Output

24
SAD
Explanation

Shopping Trip 1:
We know that:

Victoria wants to buy  accessories.
The store stocks the following  types of accessories: .
For any grouping of  of her  accessories, there must be at least  distinct types of accessories.
Victoria can satisfy her shopping rule and spend the maximum amount of money by purchasing the following set of accessories: . The total cost is , so we print  on a new line.

Shopping Trip 2:
We know that:

Victoria wants to buy  accessories.
The store stocks  type of accessory: .
For any grouping of  of her  accessories, there must be at least  distinct types of accessories.
Because the store only carries  type of accessory, Victoria cannot make a purchase satisfying the constraint that there be at least  distinct types of accessories. Because Victoria will not purchase anything, we print that she is SAD on a new line.


/* ---------------------------- */

function acessoryCollection(L, A, N, D) {
    // Check if the requirements can be satisfied
    if (D > A) {
        return "SAD";
    }
    
    // Calculate how many full sets of N can be made with L accessories
    const maxSets = Math.floor(L / N); // Maximum number of complete N-sized sets
    const leftover = L % N; // Remaining accessories after forming complete sets

    // Calculate the number of distinct types used in the sets
    // Every set of N must have at least D distinct types.
    const totalTypesUsed = Math.min(A, maxSets * D + (leftover > 0 ? D : 0));

    // If we cannot use enough types to satisfy the conditions
    if (totalTypesUsed < D) {
        return "SAD";
    }

    // Calculate the maximum amount spent
    let maxSpend = 0;
    
    // To spend the maximum, we buy items with costs from A down to 1
    for (let i = 1; i <= totalTypesUsed; i++) {
        maxSpend += i; // Since the type identifier is equal to its cost
    }

    // Since we can have multiple full sets, we multiply by the number of complete sets
    maxSpend *= Math.floor(L / N);
    
    // Add the leftover items, ensuring we do not exceed total types available
    for (let i = 1; i <= leftover && i <= totalTypesUsed; i++) {
        maxSpend += i;
    }

    return maxSpend;
}
