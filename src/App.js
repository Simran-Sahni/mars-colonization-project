import React, { Component } from "react";
import Grid from "./Grid";
import Navbarr from "./navbar"

class App extends Component{
    state = {
        height: 15, // height of the grid
        width: 20, // width of the grid
        start: [5,2], // start position
        end: [5,7], // end position
        grid: Array(15).fill(undefined, undefined, undefined).map(() => Array(20).fill(0)),
        speed : 50, // speed for animation
        pointer:null, // store the pointer for visualization
    };
    constructor() {
        super();
        this.state.grid[this.state.start[0]][this.state.start[1]] = 3; // special point : start point
        this.state.grid[this.state.end[0]][this.state.end[1]] = 4; // special point : end point
    }
    randomizeMatrix = () =>{
        this.clearGrid();
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        for(let i=0;i<this.state.height;i++){
            for(let j=0;j<this.state.width;j++){
                newGrid[i][j]= (Math.floor(Math.random()*10)%2); // random values of zero or one to generate a random grid of walls amd empty cells
        }
    }
    newGrid[this.state.start[0]][this.state.start[1]]= 3; // special point : start
    newGrid[this.state.end[0]][this.state.end[1]]=4; // special point : end
    this.setState({grid:newGrid});
}
    clearGrid = () =>{
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        newGrid[this.state.start[0]][this.state.start[1]] = 3; // special point : start
        newGrid[this.state.end[0]][this.state.end[1]] = 4; // special point : end
        this.setState({grid:newGrid,pointer : null});
    }
    changeState = (x,y) =>{
        if(this.state.grid[x][y] === 3)return; // check if the current point is a special point (start or end)

        let grid = this.state.grid;
        if(grid[x][y] ===0 || grid[x][y] === 2){ // if it is a visited cell or empty , make it a wall
            grid[x][y] = 1;
        }
        else{  // convert a wall to empty cell
            grid[x][y] = 0;
        }
        this.setState({grid:grid}); // toggle the states from wall to empty or empty to wall and retyrn
    }
    changeSpeed = (newSpeed) => {
            this.setState({speed: newSpeed});
    }
    Dijkstra = async() => {
        let queue = [this.state.start];
        let grid = this.state.grid;
        console.log(grid);
        console.log(this.state.start);
        console.log(this.state.end);
        let flag = 1;
        let ok = true;
        while(queue.length !== 0)
        {
            const current = queue[0];
            queue.shift(); // pop the queue
            if(grid[current[0]][current[1]] === 1)
            {
                continue;
            }
            if(grid[current[0]][current[1]] === 3)
            {
                if(ok)
                {
                    ok = false;

                }
                else
                    {
                    continue;
                }
            }
            if(grid[current[0]][current[1]] ===4)
            {
                this.setState({grid:grid,pointer:current});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                break;
            }
            else
            {
                let list = [];
                if(current[0] !== this.state.height - 1 && grid[current[0] + 1][current[1]] !== 2)
                {
                    list.push([current[0]+1,current[1]]);
                }
                if(current[1] !== this.state.width-1 && grid[current[0]][current[1]+1] !== 2)
                {
                    list.push([current[0],current[1]+1]);
                }
                if(current[0] !== 0 && grid[current[0]-1][current[1]] !==2)
                {
                    list.push([current[0]-1,current[1]]);
                }
                if(current[1] !== 0 && grid[current[0]][current[1]-1] !== 2)
                {
                    list.push([current[0],current[1]-1]);
                }
                    if(grid[current[0]][current[1]] !== 3)
                    {
                        grid[current[0]][current[1]] = 2; // mark it as visited
                    }
                this.setState({grid:grid,pointer:current});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                queue = queue.concat(list);
            }
        }
    }

    dfs = async() => {
        let stack = [this.state.start];
        let grid = this.state.grid;

        let flag = 1;


        while(stack.length !== 0)
        {
            const current = stack[stack.length -1];
            stack.pop();
            if(current[0]<0 || current[0]>=this.state.height)
                continue;
            if(current[1]<0 || current[1]>=this.state.width)
                continue;


            if(this.state.grid[current[0]][current[1]] ===2 || this.state.grid[current[0]][current[1]] === 1)
            {
                continue; // already visited or wall
            }

            if(grid[current[0]][current[1]] === 4)
            {
                this.setState({grid:grid,pointer:current});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                console.log('LOOP BREAK');
                break;
            }
            else
            {
                let list = [];  //temporary array to store next points
                list.push([current[0]+1,current[1]]);  //Go right
                list.push([current[0],current[1]+1]);  //Go Above
                list.push([current[0]-1,current[1]]);   //Go Left
                list.push([current[0],current[1]-1]);   //Go below
                if(grid[current[0]][current[1]] !== 3)
                {
                    this.state.grid[current[0]][current[1]] = 2; // mark it as visited
                }

                console.log(list);
                stack = stack.concat(list);

            }
            this.setState({grid:grid,pointer:current});
            await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation

        }
        if(flag === 0) this.setState({grid:grid});

    }



    
    render(){
        return(
            <div>
            <div>
                <Navbarr randomize = {this.randomizeMatrix} clearWalls = {this.clearGrid} newSpeed= {this.changeSpeed} dijkstra = {this.Dijkstra} dfs = {this.dfs}/>
            </div>
            <div>
                <Grid start = {this.state.start} end = {this.state.end } pointer = {this.state.pointer} height={this.state.height} width={this.state.width} grid = {this.state.grid} changeState = {this.changeState}/>
            </div>
            </div>
        );
    }
}
export default App;