# Maze
Maze Algorithm

**Unweighted Maze Challenge**
Given a 10x10 maze,
1. Find a path "out" of the maze given a starting coordinate. Print the # of steps and the exit coordinate or "impossible" if there is no exit
2. Find the shortest path "out" of the maze given a starting coordinate. Print the # of steps and the exit coordinate or "impossible" if there is no exit 
3. Find the shortest path "out" of the maze given a starting coordinate. Return an array of coordinates that represent the path out of the maze
4. Return an array with all of the possible exit coordinates given a starting coordinate 

**Weighted Maze Challenge**
Given a 10x10 maze,
1. Find the shortest path in a maze given a starting coordinate and an ending node. The maze is weighted where all 0 values represent "walls" and all positive integers represent the cost for that "step". Return an array of coordinates that represent the path out of the maze
2. Add a Key Value pair to your current object in addition to "node", "distance", and "path" called "estimate" which tracks the estimated distance from the current node to the ending node. Calculate the estimate using a helper function (that you create) that calculates the diagonal from the current node to the ending node using pythagorean theorem. For example. If the current node is [4,3] and the ending node is [1,7] then we would calculate the diagonal as (4-1)^2 + (7-3)^2 = d^2 -> 3^2 + 4^2 = d^2 -> 9 + 16 = d^2 -> 25 = d^2 -> d=5

Please print the estimate and the distance at each step of the algorithm.