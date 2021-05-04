// Given a 10x10 maze,
// 1. Find the shortest path in a maze given a starting coordinate and an ending node. The maze is weighted where all 0 values represent "walls" and all positive integers represent the cost for that "step". 
//      Return an array of coordinates that represent the path out of the maze
// 2. Add a Key Value pair to your current object in addition to "node", "distance", and "path" called "estimate" which tracks the estimated distance from the current node to the ending node. Calculate the estimate using a helper function (that you create) that calculates the diagonal from the current node to the ending node using pythagorean theorem. For example. If the current node is [4,3] and the ending node is [1,7] then we would calculate the diagonal as (4-1)^2 + (7-3)^2 = d^2 -> 3^2 + 4^2 = d^2 -> 9 + 16 = d^2 -> 25 = d^2 -> d=5
// Please print the estimate and the distance at each step of the algorithm.


// As an example you can use [4,4] as a starting node and [8,9] as an ending node

//STEP 3
// Add a new key value pair "paths" so it looks like this {node: [0,2], distance: 6, path: [[4,3], [4,2], [3,2], [2,2], [1,2], [0,2] ]} values to path like you do with distance


var maze = [
    //0  1  2  3  4  5  6  7  8  9
/*0*/[0, 0, 1, 0, 0, 2, 0, 0, 0, 0],
/*1*/[0, 1, 2, 1, 1, 3, 1, 2, 0, 0],
/*2*/[0, 0, 1, 0, 0, 0, 0, 2, 2, 0],
/*3*/[0, 0, 4, 0, 2, 1, 2, 0, 2, 0],
/*4*/[0, 0, 1, 5, 1, 0, 2, 1, 2, 0],
/*5*/[0, 0, 1, 0, 0, 1, 2, 0, 1, 0],
/*6*/[0, 2, 1, 0, 2, 3, 4, 0, 0, 0],
/*7*/[1, 1, 0, 0, 0, 0, 2, 0, 1, 0],
/*8*/[0, 1, 1, 1, 1, 1, 3, 3, 3, 1],
/*9*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

//This function is used to test if we have visted a coordinate, if we have visited the coordinate the function returns true, if we haven't visited the coordinate, we return false.
//This function takes in two variables, an array with the current node's path and the coordinate we are planning on visiting.
//The function loops through the path array and compares each path value with the coordinate we are planning on visiting to ensure we don't visit the same coordinate twice and end up going backwards in the maze.
function visitedTest(path, coord) {
    for (var i = 0; i < path.length; i++) {
        if (path[i][0] == coord[0] && path[i][1] == coord[1]) {
            return true;
        }
    }
    return false;
}

//This function is used to calculate our heuristic. The heuristic in this case is found by calculating the Pythagoreon Theorem between the current node and end node.
//This function takes in two coordinates, the current node and end node, and calculated the slope between the two points using the Pythagoreon Theorem
function PT(coord1, coord2) {
    var slope;
    var coord1Squared = Math.pow((coord1[0] - coord2[0]), 2)
    var coord2Squared = Math.pow((coord1[1] - coord2[1]), 2)
    var slope = Math.sqrt(coord1Squared + coord2Squared)

    return slope;
}

//This is our Priority Queue. This Priority Queue is used to keep track of what we need to visit and what we are visiting next.
function PQ() {
    this.arr = []
    //This function is used to check if the Priority Queue is empty or not.
    this.isEmpty = function () {
        return this.arr.length ? false : true
    }
    //This function is used to insert a node to the Priority Queue
    this.insert = function (node) {
        this.arr.push(node)
    }
    //This function is used to remove the node that will be visited next. 
    //The function is using a for loop to compare the first node in the array with all of the other nodes. In the case that there is a node with a smaller hueristic than the first node, the node with the smaller heuristic becomes the minimum value and is then removed form the queue and returned 
    this.removeMin = function () {
        var min = 0;
        for (var i = 0; i < this.arr.length; i++) {
            if (this.arr[min].distance + this.arr[min].estimate > this.arr[i].distance + this.arr[i].estimate) { 
                min = i;
            }
        }
        var node = this.arr[min];
        this.arr.splice(min, 1)
        console.log(node.distance + node.estimate)
        return node;
    }

 
}

//This function is used to find the path out of our maze
//The function takes in a maze, a start coordinate, and end coordinate
function pathOut(maze, start, end) {
    //Initializing our Priority Queue
    var Queue = new PQ();

    //This variable is used to store our current node
    var current;

    //If check used to check if we start at 0, if we start at 0, return impossible
    if (maze[start[0]][start[1]] == 0) {
        return "Impossible"
    }

    //Insert our the starting coordinate into our Priority Queue
    Queue.insert({ node: start, distance: maze[start[0]][start[1]], path: [start] });

    //This while loop will continue to run as long as the priority queue contains a value or until our if check breaks the loop and returns the end node
    while (!Queue.isEmpty()) {
        //Here we are using our removeMin function to find the node with the smallest heursitic  and assigning it to current
        current = Queue.removeMin();

        //This if check will break out of the loop and return if we arrive at the end node
        if (current.node[0] == end[0] && current.node[1] == end[1]) {
            console.log(`Total Distance: ${current.distance}`)
            console.log(`Exit Point: [${current.node}]`)
            console.log(`Final Path:`, current.path)
            return;
        }


        //Check Left
        //This if check, makes sure we are not going out of bounds on the left side of the maze
        if (current.node[1] > 0) {
            //This if check, checks the left side of our current position to make sure the left node isn't an "unvisitable position" (in our case, we cannot visit the 0s)
            if (maze[current.node[0]][current.node[1] - 1] != 0 || maze[current.node[0]][current.node[1] - 1]) {
                //This if check makes sure the coordinate we are attempting to visit has not been visited by using the visitedTest function
                if (visitedTest(current.path, [current.node[0], current.node[1] - 1]) == false) {
                    //Inserting the current node to our priority queue
                    Queue.insert({ node: [current.node[0], current.node[1] - 1], distance: (current.distance + maze[current.node[0]][current.node[1] - 1]), path: ([[current.node[0], current.node[1] - 1]].concat(current.path)), estimate: PT([current.node[0], current.node[1] - 1], end) })
                }

            }
        }


        //Check Down
        //This if check, makes sure we are not going out of bounds at the bottom of the maze
        if (current.node[0] < maze.length - 1) {
            //This if check, checks the bottom of our current position to make sure the bottom node isn't an "unvisitable position" (in our case, we cannot visit the 0s)
            if (maze[current.node[0] + 1][current.node[1]] != 0 || maze[current.node[0] + 1][current.node[1]]) {
                //This if check makes sure the coordinate we are attempting to visit has not been visited by using the visitedTest function
                if (visitedTest(current.path, [current.node[0] + 1, current.node[1]]) == false) {
                    //Inserting the current node to our priority queue
                    Queue.insert({ node: [current.node[0] + 1, current.node[1]], distance: (current.distance + maze[current.node[0] + 1][current.node[1]]), path: ([[current.node[0] + 1, current.node[1]]].concat(current.path)),
                        estimate: PT([current.node[0] + 1, current.node[1]], end)
                    })
                }
            }
        }


        //Check Right
        //This if check, makes sure we are not going out of bounds on the right side of the maze
        if (current.node[1] < maze.length - 1) {
            //This if check, checks the right of our current position to make sure the right node isn't an "unvisitable position" (in our case, we cannot visit the 0s)
            if (maze[current.node[0]][current.node[1] + 1] != 0 || maze[current.node[0]][current.node[1] + 1]) {
                //This if check makes sure the coordinate we are attempting to visit has not been visited by using the visitedTest function
                if (visitedTest(current.path, [current.node[0], current.node[1] + 1]) == false) {
                    //Inserting the current node to our priority queue
                    Queue.insert({node: [current.node[0], current.node[1] + 1], distance: (current.distance + maze[current.node[0]][current.node[1] + 1]), path: ([[current.node[0], current.node[1] + 1]].concat(current.path)),
                        estimate: PT([current.node[0], current.node[1] + 1], end)
                    })
                }
            }
        }


        //Check Up
        //This if check, makes sure we are not going out of bounds at the top of the maze
        if (current.node[0] > 0) {
            //This if check, checks the top of our current position to make sure the right node isn't an "unvisitable position" (in our case, we cannot visit the 0s)
            if (maze[current.node[0] - 1][current.node[1]] != 0 || maze[current.node[0] - 1][current.node[1]]) {
                //This if check makes sure the coordinate we are attempting to visit has not been visited by using the visitedTest function
                if (visitedTest(current.path, [current.node[0] - 1, current.node[1]]) == false) {
                    //Inserting the current node to our priority queue
                    Queue.insert({node: [current.node[0] - 1, current.node[1]], distance: (current.distance + maze[current.node[0] - 1][current.node[1]]), path: ([[current.node[0] - 1, current.node[1]]].concat(current.path)),
                        estimate: PT([current.node[0] - 1, current.node[1]], end)
                    })
                }
            }
        }
    }



    //If the while loop exits, we know the maze is impossible because we did not reach our exit point
    console.log("Impossible")



}

pathOut(maze, [4, 4], [8, 9])