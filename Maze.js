// Given a 10x10 maze,
// 1. Find a path "out" of the maze given a starting coordinate
//      Print the # of steps and the exit coordinate or "impossible" if there is no exit
// 2. Find the shortest path "out" of the maze given a starting coordinate
//      Print the # of steps and the exit coordinate or "impossible" if there is no exit 
// 3. Find the shortest path "out" of the maze given a starting coordinate
//      Return an array of coordinates that represent the path out of the maze
// 4. Return an array with all of the possible exit coordinates given a starting coordinate 

// Starting Coordinate: [4, 4]
// [2, 6]


//FOR STEP 3
// Add a new key value pair "paths" so it looks like this {node: [0,2], distance: 6, path: [[4,3], [4,2], [3,2], [2,2], [1,2], [0,2] ]} values to path like you do with distance

var maze = [
    //0  1  2  3  4  5  6  7  8  9
/*0*/[0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
/*1*/[0, 1, 1, 0, 0, 1, 1, 1, 0, 0],
/*2*/[0, 0, 1, 0, 0, 0, 0, 1, 1, 0],
/*3*/[0, 0, 1, 0, 1, 1, 1, 0, 1, 0],
/*4*/[0, 0, 1, 1, 1, 0, 1, 1, 1, 0],
/*5*/[0, 0, 0, 0, 0, 1, 1, 0, 1, 0],
/*6*/[0, 0, 1, 0, 1, 1, 0, 0, 0, 0],
/*7*/[1, 1, 0, 0, 0, 0, 1, 0, 1, 0],
/*8*/[0, 1, 1, 1, 0, 1, 1, 1, 1, 0],
/*9*/[0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


//This is our Priority Queue. This Priority Queue is used to keep track of what we need to visit and what we are visiting next.
function PQ(){
    this.arr = []
    //This function is used to check if the Priority Queue is empty or not.
    this.isEmpty = function() {
        return this.arr.length ? false : true
    }
    //This function is used to insert a node to the Priority Queue
    this.insert = function(node) {
        this.arr.push(node)
    }
    //This function is used to remove the node that will be visited next. 
    //The function is using a for loop to compare the first node in the array with all of the other nodes. In the case that there is a node with a shorter distance than the first node, the node with the shortest distance becomes the minimum value and is then removed from the queue and returned 
    this.removeMin = function() {
        var min = 0;
        for(var i = 0; i < this.arr.length; i++){
            if(this.arr[min].distance > this.arr[i].distance){
                min = 1;
            }
        }
        var node = this.arr[min];
        this.arr.splice(min, 1)
        return node;
    }
}

//This function is used to find the path out of our maze
//The function takes in a maze, a starting coordinate
function pathOut(maze, start){

    //Initializing our Priority Queue
    var Queue = new PQ();
    //This variable is used to store our current node
    var current;

    //If check used to check if we start at 0, if we start at 0, return impossible
    if(maze[start[0]][start[1]] == 0 ){
        return "Impossible"
    }

    //This for loop is used to change all of the exits to the word "out"
    for(var i=0; i < maze.length; i++){

        //If it's the top of bottom of the maze
        //Check all of the elements inside
        if(i == 0 || i == maze.length-1){
            for(var y=0; y < maze.length; y++){
                if(maze[i][y] == 1){
                    maze[i][y] = "out";
                }
            }
        }

        //If it's the middle of the maze
        //Check only the first and last element
        else{
            if(maze[i][0] == 1 ){
                maze[i][0] = "out";
            }
            if(maze[i][maze[i].length-1] == 1){
                maze[i][maze[i].length-1] = "out";
            }
        }
    }

    Queue.insert({node:start, distance: 0, path: [start] });

    //This while loop will continue to run as long as the priority queue contains a value or until our if check breaks the loop and returns the end node
    while(!Queue.isEmpty()){
       
        //To make this work with color fill you need to add the if checks that
        // prevent the maze from going out of bounds
        current = Queue.removeMin();
        
        console.log('Current.path!')
        console.log(current.path)
       
        
        
         //This if check will break out of the loop and return once we find an exit 
        if(maze[current.node[0]][current.node[1]] == "out"){
            console.log(`Total Distance: ${current.distance}`)
            console.log(`Exit Point: [${current.node}]`)
            console.log(`Final Path:`, current.path)
            return;
        }

        //Sets current node to false so we don't visit it again
        maze[current.node[0]][current.node[1]] = false;

       
        //check top
        if(maze[current.node[0]][current.node[1]-1] != 0 || maze[current.node[0]][current.node[1]-1] ){
            //Inserting the current node to our priority queue
            Queue.insert({node: [current.node[0], current.node[1]-1] , distance: (current.distance + 1), path: ( [[current.node[0], current.node[1]-1]].concat(current.path))  } )
            
        }

        //check right
        if(maze[current.node[0]+1][current.node[1]]  != 0 || maze[current.node[0]+1][current.node[1]] ){
            //Inserting the current node to our priority queue
            Queue.insert({node: [current.node[0]+1, current.node[1]] , distance: (current.distance + 1), path: ( [[current.node[0]+1, current.node[1]]].concat(current.path))  } )
        }

        //check bottom
        if(maze[current.node[0]][current.node[1]+1]  != 0 || maze[current.node[0]][current.node[1]+1] ){
           //Inserting the current node to our priority queue
            Queue.insert({node: [current.node[0], current.node[1]+1] , distance: (current.distance + 1), path: ( [[current.node[0], current.node[1]+1]].concat(current.path))  } )
        }

        //check left
        if(maze[current.node[0]-1][current.node[1]]  != 0 || maze[current.node[0]-1][current.node[1]]  ){
            //Inserting the current node to our priority queue
            Queue.insert({node: [current.node[0]-1, current.node[1]] , distance: (current.distance + 1), path: ( [[current.node[0]-1, current.node[1]]].concat(current.path) )  } )
            
        }

        
        
    }
    //If the while loop exits, we know the maze is impossible because we did not reach our exit point
    console.log("Impossible")



}

pathOut(maze, [4,4])