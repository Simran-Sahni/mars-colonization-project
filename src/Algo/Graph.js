import PropTypes from 'prop-types';
/**
 *
 */
class Graph {
  /**
   *
   * @param {array} grid
   */
  constructor(grid) {
    this.adjacencyList = {};
    this.allPairShortest = Array(400).fill(undefined, undefined, undefined).map(() => Array(400).fill(1000000000));
    this.grid = grid;
    this.map1 = new Map();
    this.map2 = new Map();
    for (let i = 0; i < 400; i++) {
      this.addVertex(i);
    }
    let counter = 0;
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        this.map1[counter] = [[i, j]];
        this.map2[[i, j]] = counter;
        counter++;
      }
    }
    console.log(this.map1);
    console.log(this.map2);
    this.constructGraph();
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

  /**
   *
   * @param {number} i
   * @param {number} j
   * @return {boolean}
   */
  isNotWall(i, j) {
    if (i < 0 || i >= 20 || j < 0 || j >= 20 ) {
      return false;
    } else {
      return this.grid[i][j] !== 1;
    }
  }

  /**
   *
   */
  constructGraph() {
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        if (this.isNotWall(i, j)) {
          for (const direction of directions) {
            const neighbor = [i + direction[0], j + direction[1]];
            if (this.isNotWall(neighbor[0], neighbor[1])) {
              const x = this.map2[[i, j]];
              const y = this.map2[[neighbor[0], neighbor[1]]];
              //  console.log(i, j, neighbor[0], neighbor[1], x, y);
              this.addEdge(x, y);
              this.allPairShortest[x][y] = 1;
              this.allPairShortest[y][x] = 1;
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
    for (let k = 0; k < 400; k++) {
      for (let i = 0; i < 400; i++) {
        for (let j = 0; j < 400; j++) {
          this.allPairShortest[i][j] = Math.min(this.allPairShortest[i][j], this.allPairShortest[i][k] + this.allPairShortest[k][j]);
          this.allPairShortest[j][i] = this.allPairShortest[i][j];
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
