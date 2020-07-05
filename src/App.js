import React, { Component } from "react";
import Grid from "./Grid";
import Navbar from "./navbar"
class App extends Component{
    state = {
        height: 20,
        width: 30,
        start: [15,5],
        end: [15,25],
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0)),
    };
    randomizeMatrix = () =>{
        const newGrid = Array(20).fill(undefined, undefined, undefined).map(() => Array(40).fill(0));
        for(let i=0;i<20;i++){
            for(let j=0;j<40;j++){
                newGrid[i][j]= (Math.floor(Math.random()*10)%2);
        }
    }
    newGrid[this.state.start[0]][this.state.start[1]]=0;
    newGrid[this.state.end[0]][this.state.end[1]]=0;
    this.setState({grid:newGrid});
}
    clearGrid = () =>{
        const newGrid = Array(20).fill(undefined, undefined, undefined).map(() => Array(40).fill(0));
        this.setState({grid:newGrid});
    }
    render(){
        return(
            <div>
            <div>
                <Navbar randomize = {this.randomizeMatrix} clearwalls = {this.clearGrid}/>
            </div>
            <div>
                <Grid height={this.state.height} width={this.state.width} grid = {this.state.grid} />
            </div>
            </div>
        );
    }

}
export default App;