import React from 'react';
import PropTypes from 'prop-types';
import {currentPointer, wall, finalShortestPath, startPoint, endPoint, visited, visited2,empty} from './Cell';

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
      if (props.pointer && i === props.pointer[0] && j === props.pointer[1])rowList.push(currentPointer(props, i, j));
      else if (props.grid[i][j] === 1) rowList.push(wall(props, i, j));
      else if (props.grid[i][j] === 2) rowList.push(visited(props, i, j));
      else if (props.grid[i][j] === 3)rowList.push(startPoint(props, i, j));
      else if (props.grid[i][j] === 4) rowList.push(endPoint(i, j));
      else if (props.grid[i][j] === 5) rowList.push(finalShortestPath(props, i, j));
      else if (props.grid[i][j] === 6) rowList.push(visited2(props, i, j));
      else rowList.push(empty(props, i, j));
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
  changeSource: PropTypes.bool,
  changeDestination: PropTypes.bool,
  changesourcefunc: PropTypes.func,
  changedestfunc: PropTypes.func,

};

export default Grid;