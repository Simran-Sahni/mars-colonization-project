import React, { Component } from "react";
import Grid from "./Grid";
import Navbarr from "./navbar"
class App extends Component{
    state = {
        height: 20, // height of the grid
        width: 30, // width of the grid
        start: [5,5], // start position
        end: [5,8], // end position
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0)),
        speed : 50, // speed for animation
        pointer:null, // store the pointer for visualization
    };
    constructor() {
        super();
        this.state.grid[this.state.start[0]][this.state.start[1]] = 3; // special point : start point
        this.state.grid[this.state.end[0]][this.state.end[1]] = 3; // special point : end point
    }
    randomizeMatrix = () =>{
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        for(let i=0;i<this.state.height;i++){
            for(let j=0;j<this.state.width;j++){
                newGrid[i][j]= (Math.floor(Math.random()*10)%2); // random values of zero or one to generate a random grid of walls amd empty cells
        }
    }
    newGrid[this.state.start[0]][this.state.start[1]]= 3; // special point : start
    newGrid[this.state.end[0]][this.state.end[1]]=3; // special point : end
    this.setState({grid:newGrid});
}
    clearGrid = () =>{
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        newGrid[this.state.start[0]][this.state.start[1]] = 3; // special point : start
        newGrid[this.state.end[0]][this.state.end[1]] = 3; // special point : end
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
        console.log(this.state.end);
        let flag = 1;
        let visited = new Set();

        while(queue.length !== 0 && flag === 1)
        {
            const k = queue[0];
            visited.add(k);
            queue.shift(); // pop the queue

            console.log(k);


            // console.log(grid[k[0]][k[1]]);
            if(k === this.state.end)
            {
                flag = 0;
                break;
            }
            if(grid[k[0]][k[1]] ===2)
            {
                continue; // already visited
            }

            if(k === this.state.end)
            {
                flag = 0;
                break;
            }
            else
            {
                let list = [];
                if(k[0] !== this.state.height - 1 && grid[k[0] + 1][k[1]] !== 1)
                {
                    list.push([k[0]+1,k[1]]);
                }
                if(k[1] !== this.state.width-1 && grid[k[0]][k[1]+1] !== 1)
                {
                    list.push([k[0],k[1]+1]);
                }
                if(k[0] !== 0 && grid[k[0]-1][k[1]] !==1 )
                {
                    list.push([k[0]-1,k[1]]);
                }
                if(k[1] !== 0 && grid[k[0]][k[1]-1] !== 1)
                {
                    list.push([k[0],k[1]-1]);
                }
                //console.log(queue);
                    grid[k[0]][k[1]] = 2; // mark it as visited

                this.setState({grid:grid,pointer:k});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                console.log(list);
                queue = queue.concat(list);
            }
        }

        console.log(grid);




    }
    render(){
        return(
            <div>
            <div>
                <Navbarr randomize = {this.randomizeMatrix} clearWalls = {this.clearGrid} newSpeed= {this.changeSpeed} dijkstra = {this.Dijkstra}/>
            </div>
            <div>
                <Grid start = {this.state.start} end = {this.state.end } pointer = {this.state.pointer} height={this.state.height} width={this.state.width} grid = {this.state.grid} changeState = {this.changeState}/>
            </div>
            </div>
        );
    }
}
export default App;