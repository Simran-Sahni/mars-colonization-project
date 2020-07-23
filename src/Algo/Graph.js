import PropTypes from "prop-types";
/**
 *
 */
class Graph {
  /**
   *
   * @param {array} grid
   * @param {number} height
   * @param {number} width
   */
  constructor(grid, height, width) {
    this.adjacencyList = {};
    this.allPairShortest = Array(height*width).
        fill().map(() =>
          Array(height*width).fill(1000000000));
    this.grid = grid;
    this.map1 = new Map();
    this.map2 = new Map();
    this.height = height;
    this.width = width;
    let counter = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.map1[counter] = [[i, j]];
        this.map2[[i, j]] = counter;
        counter++;
      }
    }

    this.constructGraph();
    this.floydWarshall();
  }

  /**
   *
   * @param {number} vertex
   */
  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  /**
   *
   * @param {number} source
   * @param {number} destination
   */
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
    if (i < 0 || i >= this.height || j < 0 || j >= this.width ) {
      return false;
    } else {
      console.log(this.grid);
      return this.grid[i][j] !== 1;
    }
  }


  /**
   *
   */
  constructGraph() {
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.isNotWall(i, j)) {
          for (const direction of directions) {
            const neighbor = [i + direction[0], j + direction[1]];
            if (this.isNotWall(neighbor[0], neighbor[1])) {
              const x = this.map2[[i, j]];
              const y = this.map2[[neighbor[0], neighbor[1]]];
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
    for (let k = 0; k < this.height*this.width; k++) {
      for (let i = 0; i < this.height*this.width; i++) {
        for (let j = 0; j < this.height*this.width; j++) {
          this.allPairShortest[i][j] =
              Math.min(this.allPairShortest[i][j],
                  this.allPairShortest[i][k] +
                  this.allPairShortest[k][j]);
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

