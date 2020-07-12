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
    if(this.grid[x][y] === 3 || this.grid[x][y] === 4)return;
    if(this.grid[x][y] === 0 || this.grid[x][y] === 2){
      this.grid[x][y] = 1;
    }
    else{
      this.grid[x][y] = 0;
    }
    this.grid[this.start[0]][this.start[1]] = 3;
    this.grid[this.end[0]][this.end[1]] = 4;
  }

  render(){
    const gridList = [];
    for (let i = 0; i < this.height; i++) {
      const rowList = [];
      for (let j = 0; j < this.width; j++) {
        console.log(i,j);

        if (this.pointer &&
            i === this.pointer[0] &&
            j === this.pointer[1]) { // display the current pointer
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#69fff1',
                    WebkitUserSelect: 'none',
                  }}
                  onClick={() => {
                    if (this.changeSource) {
                      this.toggleSource(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}
              >
                <img
                    src={rover}
                    alt="start"
                    style={{width: '25px', height: '25px'}}
                />
              </div>,
          );
        } else if (this.grid[i][j] === 5) { // cell in final shortest path
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#fee440',
                    WebkitUserSelect: 'none',
                  }}
                  onClick={() => {
                    if (this.changeSource) {
                      this.changesourcefunc(i, j);
                    } else if (this.changeDestination) {
                      this.changedestfunc(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}
              >

              </div>,
          );
        } else if (this.grid[i][j] === 3) {// start point
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#00ee00',
                    WebkitUserSelect: 'none',
                  }}
                  onClick={() => {
                    if (this.changeSource) {
                      this.changesourcefunc(i, j);
                    } else if (this.changeDestination) {
                      this.changedestfunc(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}
              >

              </div>,
          );
        } else if (this.grid[i][j] === 4) { // end point
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#ee0000',
                    WebkitUserSelect: 'none',
                  }}
              >
              </div>,
          );
        } else if (this.grid[i][j] === 1) { // This is a wall
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#540b0e',
                    WebkitUserSelect: 'none',
                  }}

                  onClick={() => {
                    if (this.changeSource) {
                      this.changesourcefunc(i, j);
                    } else if (this.changeDestination) {
                      this.changedestfunc(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}
                  onTouchStart={(e) => {
                    if (window.event.buttons === 1) {
                      this.changeState(i, j);
                    }
                  }
                  }
                  onMouseEnter={(e) => {
                    if (window.event.buttons === 1) {
                      this.changeState(i, j);
                    }
                  }
                  }
              >
              </div>,
          );
        } else if (this.grid[i][j] === 2) { // this is a visited cell
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    backgroundColor: '#e09891',
                    WebkitUserSelect: 'none',
                  }}
                  onClick={() => {
                    if (this.changeSource) {
                      this.changesourcefunc(i, j);
                    } else if (this.changeDestination) {
                      this.changedestfunc(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}

              >
              </div>,
          );
        } else { // This is an empty cell
          rowList.push(
              <div
                  key={i + j}
                  style={{
                    width: '35px',
                    height: '35px',
                    border: '1.5px solid black',
                    WebkitUserSelect: 'none',
                  }}
                  onClick={() => {
                    if (this.changeSource) {
                      this.changesourcefunc(i, j);
                    } else if (this.changeDestination) {
                      this.changedestfunc(i, j);
                    } else {
                      this.changeState(i, j);
                    }
                  }}
                  onTouchStart={(e) => {
                    if (window.event.buttons === 1) {
                      this.changeState(i, j);
                    }
                  }
                  }
                  onMouseEnter={(e) => {
                    if (window.event.buttons === 1) {
                      this.changeState(i, j);
                    }
                  }
                  }
              >
              </div>,
          );
        }
      }
      console.log(rowList);
      gridList.push(rowList);
    }
    console.log(gridList);
    return(
        <div className="p-4">
          {gridList.map((object, index) => {
            return (
                <div className="row justify-content-center flex-nowrap" key = {index}>
                  {object}
                </div>
            );
          })}
        </div>
    );
  }

}


export default Grid2;
