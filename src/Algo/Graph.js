import PropTypes from 'prop-types';
import Navbar from '../Navbar';
/**
 *
 */
class Graph {
  /**
     *
     * @param props
     */
  constructor(props) {
    this.adjacencyList = {};
    this.allPairShortest = [];
    const grid = props.grid;
    this.map1 = new Map();
    this.map2 = new Map();
    for (let i = 0; i <= 400; i++) {
      this.addVertex(i);
    }
    let counter = 0;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.map1[counter] = [[i, j]];
        this.map2[[i, j]] = counter;
        counter++;
        this.allPairShortest[i][j] = 1000000000;
      }
    }
    this.constructGraph(grid);
    this.floydWarshall();
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source, destination) {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }

  constructGraph(grid) {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (isValidEmptyCell(i, j, grid)) {
          for (const direction of directions) {
            const neighbor = [i + direction[0], j + direction[1]];
            if (isValidEmptyCell(neighbor[0], neighbor[1], grid)) {
              this.addEdge(this.map2[[i, j]], this.map2[neighbor[0]]);
            }
          }
        }
      }
    }
  }

  /**
     *Floyd Warshal Algo to store distances betwenn all pairs of vertices
     */
  floydWarshall() {
    for (let k = 0; k < 20; k++) {
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          this.allPairShortest[i][j] = Math.min(this.allPairShortest[i][j], this.allPairShortest[i][k] + this.allPairShortest[k][j]);
        }
      }
    }
  }
}

Graph.propTypes = {
  grid: PropTypes.array,
};
export default Graph;


const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

/**
 *
 * @param {number }i
 * @param {number }j
 * @param {array }grid
 * @return {boolean}
 */
function isValidEmptyCell(i, j, grid) {
  if (i < 0 || i >= 20 || j < 0 || j >= 20 ) {
    return false;
  } else {
    return grid[i][j] === 0;
  }
}


