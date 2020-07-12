import React from "react";
import rover from "../media/mars-rover.svg";


class Grid2 extends React.Component{
  constructor(grid, height, width, start, end,pointer) {
    super();
    this.grid = grid;
    this.width = width;
    this.height = height;
    this.start = start;
    this.end = end;
    this.heuristics = Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(0));
    this.pointer = pointer;
    this.computeHeuristics();
  }

  computeHeuristics = ()=>{
    for(let i = 0; i < this.height; i++){
      for(let j = 0; j < this.width; j++){
        this.heuristics[i][j] = Math.abs(this.end[0]-i) + Math.abs(this.end[1]-j);
      }
    }
  }
  randomize() {
    this.clearGrid();
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = (Math.floor(Math.random() * 10) % 2);
      }
    }
    this.grid[this.start[0]][this.start[1]] = 3;
    this.grid[this.end[0]][this.end[1]] = 4;
  }
  clearGrid() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.grid[i][j] = 0;
      }
    }
    this.grid[this.start[0]][this.start[1]] = 3;
    this.grid[this.end[0]][this.end[1]] = 4;
  }
  changeState = (x,y) => {
    console.log(x,y);
    if(this.grid[x][y] === 3 || this.grid[x][y] === 4)return;
    if(this.grid[x][y] === 0 || this.grid[x][y] === 2){
      this.grid[x][y] = 1;
    }
    else{
      this.grid[x][y] = 0;
    }
    this.grid[this.start[0]][this.start[1]] = 3;
    this.grid[this.end[0]][this.end[1]] = 4;
    console.log(this.grid);
  }


}


export default Grid2;
