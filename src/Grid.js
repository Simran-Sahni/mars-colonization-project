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
  for (let i = 0; i < height; i++) {
    const rowList = [];
    for (let j = 0; j < width; j++) {
      rowList.push(
          <div
            key={i + j}
            style={{
              width: '30px',
              height: '30px',
              border: '1px solid black',
              WebkitUserSelect: 'none',
            }}
          >

          </div>,
      );
    }
    gridList.push(rowList);
  }
  return (
    <div className="p-4">
      {' '}
      {gridList.map((object, index) => {
        return (
          <div className="row justify-content-center " key = {index}>
            {' '}
            {object}
            {' '}
          </div>
        );
      })}{' '}
    </div>
  );
}
Grid.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};
export default Grid;
