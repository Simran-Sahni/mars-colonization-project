import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * @param {props} props
 * @return {*}
 * @constructor
 */
function Grid(props) {
  const height = props.height; const width = props.width;
  const gridList = [];

  /* status of grid states for reference
    0: normal cell
    1:wall
    2:visited during search
    3:Special Points : start
    4:Special Points : end
    5:Cells in Final Shortest Path
    */


  for (let i = 0; i < height; i++) {
    const rowList = [];
    for (let j = 0; j < width; j++) {
      if (props.pointer && i === props.pointer[0] && j === props.pointer[1]) { // display the current pointer
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
            >
            </div>,
        );
      } else if (props.grid[i][j] === 3 || props.grid[i][j] === 4) { // check if the current point is a special point (start or end)
        rowList.push(
            <div
              key={i + j}
              style={{
                width: '35px',
                height: '35px',
                border: '1.5px solid black',
                backgroundColor: '#335c67',
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
                backgroundColor: '#540B0E',
                WebkitUserSelect: 'none',
              }}
              onClick={() => props.changeState(i, j)}
            >
            </div>,
        );
      } else if (props.grid[i][j] === 2) // this is a visited cell
      {
        rowList.push(
            <div
              key={i + j}
              style={{
                width: '35px',
                height: '35px',
                border: '1.5px solid black',
                backgroundColor: '#fff3b0',
                WebkitUserSelect: 'none',
              }}
              onClick={() => props.changeState(i, j)}
            >
            </div>,
        );
      } else if (props.grid[i][j] === 5) {
        rowList.push(
            <div
              key={i + j}
              style={{
                width: '35px',
                height: '35px',
                border: '1.5px solid black',
                backgroundColor: 'orange',
                WebkitUserSelect: 'none',
              }}
              onClick={() => props.changeState(i, j)}
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
              onClick={() => props.changeState(i, j)}
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
Grid.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
  grid: PropTypes.array,
  changeState: PropTypes.func,
  start: PropTypes.array,
  end: PropTypes.array,
  pointer: PropTypes.array,
};
export default Grid;
