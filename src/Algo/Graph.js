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
          Array(height*width).fill(1000000));
    this.grid = grid;
    this.map1 = new Map();
    this.map2 = new Map();
    this.height = height;
    this.width = width;
    let counter = 0;
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        this.map1[parseInt(counter, 10)] = [[i, j]];
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
    if (!this.adjacencyList[parseInt(vertex, 10)]) {
      this.adjacencyList[parseInt(vertex, 10)] = [];
    }
  }

  /**
   *
   * @param {number} source
   * @param {number} destination
   */
  addEdge(source, destination) {
    if (!this.adjacencyList[parseInt(source, 10)]) {
      this.addVertex(parseInt(source, 10));
    }
    if (!this.adjacencyList[parseInt(destination, 10)]) {
      this.addVertex(parseInt(destination, 10));
    }
    this.adjacencyList[parseInt(source, 10)].push(parseInt(destination, 10));
    this.adjacencyList[parseInt(destination, 10)].push(parseInt(source, 10));
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
      return this.grid[parseInt(i, 10)][parseInt(j, 10)] !== 1;
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
              this.allPairShortest[parseInt(x, 10)][parseInt(y, 10)] = 1;
              this.allPairShortest[parseInt(y, 10)][parseInt(x, 10)] = 1;
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
          this.allPairShortest[parseInt(i, 10)][parseInt(j, 10)] =
              Math.min(this.allPairShortest[parseInt(i, 10)][parseInt(j, 10)],
                  this.allPairShortest[parseInt(i, 10)][parseInt(k, 10)] +
                  this.allPairShortest[parseInt(k, 10)][parseInt(j, 10)]);
          this.allPairShortest[parseInt(j, 10)][parseInt(i, 10)] =
              this.allPairShortest[parseInt(i, 10)][parseInt(j, 10)];
        }
      }
    }
  }
}

Graph.propTypes = {
  grid: PropTypes.array,
};
export default Graph;

