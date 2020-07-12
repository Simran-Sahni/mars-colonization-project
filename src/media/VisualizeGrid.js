import React from 'react';
import rover from './mars-rover.svg';


function VisualiseGrid(props) {
  const gridList = [];
  /* status of grid states for reference
     0: normal cell
     1:wall
     2:visited during search
     3:Special Points : start
     4:Special Points : end
     5:Cells in Final Shortest Path
     */
  console.log(props);
  for (let i = 0; i < props.height; i++) {
    const rowList = [];
    for (let j = 0; j < props.width; j++) {
      if (props.pointer &&
                i === props.pointer[0] &&
                j === props.pointer[1]) { // display the current pointer
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
                props.changeState(i, j);
              }}
            >
              <img
                src={rover}
                alt="start"
                style={{width: '25px', height: '25px'}}
              />
            </div>,
        );
      } else if (props.grid[i][j] === 5) { // cell in final shortest path
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
                props.changeState(i, j);
              }}
            >

            </div>,
        );
      } else if (props.grid[i][j] === 3) {// start point
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
            >

            </div>,
        );
      } else if (props.grid[i][j] === 4) { // end point
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
      } else if (props.grid[i][j] === 1) { // This is a wall
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
                props.changeState(i, j);
              }}


            >
            </div>,
        );
      } else if (props.grid[i][j] === 2) { // this is a visited cell
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
                props.changeState(i, j);
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
                props.changeState(i, j);
              }}
            >
            </div>,
        );
      }
    }
    gridList.push(rowList);
  }
  return (
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

export default VisualiseGrid;
