import React, { Component } from "react";
import Grid from "./Grid";
import Navbar from "./Navbar"
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
        height: 20,
        width: 30,
        start: [10, 5],
        end: [10, 25],
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0)),
        heuristic: null,
        speed: 12,
        path: [],
        currentAlgo: "",
        pointer: null,
        };
        this.state.grid[this.state.start[0]][this.state.start[1]] = 3; // special point : start point
        this.state.grid[this.state.end[0]][this.state.end[1]] = 3; // special point : end point
    }

    componentDidMount() {
        //Calculating Heriustic for A* Search && Best first search
        let heuristic = Array(20)
            .fill()
            .map(() => Array(40).fill(0));

        for (let i = 0; i < this.state.height; i++) {
            for (let j = 0; j < this.state.width; j++) {
                heuristic[i][j] =
                    Math.abs(this.state.end[0] - i) + Math.abs(this.state.end[1] - j);
            }
        }
        this.setState({ heuristic });
    }
    randomizeMatrix = () =>{
        const newGrid = Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0));
        for(let i=0;i<20;i++){
            for(let j=0;j<30;j++){
                newGrid[i][j]= (Math.floor(Math.random()*10)%2);
        }
    }
    newGrid[this.state.start[0]][this.state.start[1]]=0;
    newGrid[this.state.end[0]][this.state.end[1]]=0;
    this.setState({grid:newGrid});
}
    clearGrid = () =>{
        const newGrid = Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0));
        this.setState({grid:newGrid});
    }
    changeState = (x,y) =>{
        let grid = this.state.grid;
        if(grid[x][y] ===0){
            grid[x][y] = 1;
        }
        else{
            grid[x][y] = 0;
        }
        grid[this.state.start[0]][this.state.start[1]]=0;
        grid[this.state.end[0]][this.state.end[1]]=0;
        this.setState({grid:grid});
    }
    changeSpeed = (newspeed) => {
        console.log(newspeed);
        if(this.state.speed !== newspeed)
        {
            this.setState({speed: newspeed});
        }
        console.log(this.state.speed);
    }

    selectAlgo = (name) => {
        console.log(name);
            this.setState({currentAlgo: name});
        console.log(this.state.currentAlgo);
    }
    /* status of grid states for reference
     0: normal cell
     1:wall
     2:visited during search
     3:Special Points (Start & End)
     4:Cells in Final Shortest Path
   */
    visualize = async() => {
        console.log(this.state.currentAlgo);
        if(this.state.currentAlgo === "dfs")
        {
            let stack = [this.state.start];
            let grid = this.state.grid;

            let flag = 1;


            while(stack.length !== 0 && flag === 1)
            {
                const k = stack[stack.length -1];
                stack.pop();
                if(k[0]<0 || k[0]>=this.state.height)
                    continue;
                if(k[1]<0 || k[1]>=this.state.width)
                    continue;


                if(this.state.grid[k[0]][k[1]] ===2 || this.state.grid[k[0]][k[1]] === 1)
                {
                    continue; // already visited
                }

                if(k === this.state.end)
                {
                    flag = 0;
                    console.log('LOOP BREAK');
                    break;
                }
                else
                {
                    let list = [];  //temporary array to store next points
                    list.push([k[0]+1,k[1]]);  //Go right
                    list.push([k[0],k[1]+1]);  //Go Above
                    list.push([k[0]-1,k[1]]);   //Go Left
                    list.push([k[0],k[1]-1]);   //Go below
                  /*  if(k[0] !== this.state.height - 1 && grid[k[0] + 1][k[1]] !== 1  && grid[k[0]+1][k[1]] !== 2)
                    {

                    }
                    if(k[1] !== this.state.width-1 && grid[k[0]][k[1]+1] !== 1 && grid[k[0]][k[1] + 1] !== 2)
                    {

                    }
                    if(k[0] !== 0 && grid[k[0]-1][k[1]] !==1 && grid[k[0]-1][k[1]] !== 2 )
                    {

                    }
                    if(k[1] !== 0 && grid[k[0]][k[1]-1] !== 1 && grid[k[0]][k[1]-1] !== 2)
                    {

                    }  */
                    //console.log(queue);
                    this.state.grid[k[0]][k[1]] = 2; // mark it as visited
                    console.log(list);
                    stack = stack.concat(list);

                }
                this.setState({grid:grid,pointer:k});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation

            }
            if(flag === 0) this.setState({grid:grid});

        }
        if(this.state.currentAlgo === "a-star")
        {

        }
        if(this.state.currentAlgo === "dijkstra"){

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

                    //console.log(k);


                    // console.log(grid[k[0]][k[1]]);

                    if(grid[k[0]][k[1]] ===2)
                    {
                        continue; // already visited
                    }

                    if(k === this.state.end)
                    {
                        flag = 0;
                        console.log('loop is breaking');
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
                        console.log(list);
                        queue = queue.concat(list);

                    }
                    this.setState({grid:grid,pointer:k});
                    await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation

                }
            if(flag === 0) this.setState({grid:grid});

                //console.log(grid);
        }
    }

    render(){
        return(
            <div>
            <div>
                <Navbar randomize = {this.randomizeMatrix} clearWalls = {this.clearGrid} newSpeed= {this.changeSpeed} handle={this.selectAlgo} selectedAlgo={this.currentAlgo}  visual = {this.visualize} />
            </div>
            <div>
                <Grid start = {this.state.start} end = {this.state.end } height={this.state.height} width={this.state.width} grid = {this.state.grid} changeState = {this.changeState}  pointer = {this.state.pointer} />
            </div>
            </div>
        );
    }
}
export default App;