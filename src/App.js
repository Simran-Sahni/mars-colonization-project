import React, { Component } from "react";
import Grid from "./Grid";
import Navbarr from "./navbar"
class App extends Component{
    state = {
        height: 20,
        width: 30,
        start: [10,5],
        end: [10,25],
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0)),
        speed : 1,
    };
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
        if(this.state.speed !== newspeed)
        {
            this.setState({speed: newspeed});
        }
    }
    render(){
        return(
            <div>
            <div>
                <Navbarr randomize = {this.randomizeMatrix} clearWalls = {this.clearGrid} newSpeed= {this.changeSpeed}/>
            </div>
            <div>
                <Grid start = {this.state.start} end = {this.state.end } height={this.state.height} width={this.state.width} grid = {this.state.grid} changeState = {this.changeState}/>
            </div>
            </div>
        );
    }
}
export default App;