import PriorityQueue from '../priorityq';
import Graph from './Graph';

export const TSP = async function() {
  this.state.graph = new Graph(this.state.grid);
  const unvisited = new Set();
  unvisited.add(this.state.end);
  let now = this.state.start;
  let totalpath = [];
  while (unvisited.size) {
    const togo = this.findOptimalVertex(unvisited, now);
    unvisited.delete(togo);
    const newpath = await this.aStarForTSP(now, togo);
    totalpath = totalpath.concat(newpath);
    now = togo;
  }
  await this.pathdisplay(totalpath);
};

export const aStarForTSP = async function(start, end) {
  const heuristics = this.state.heuristics;
  for (let i = 0; i < this.state.height; i++) {
    for (let j = 0; j < this.state.width; j++) {
      heuristics[i][j] = Math.abs(end[0]-i) + Math.abs(end[1]-j);
    }
  }
  this.setState({heuristics: heuristics, path: [], pointer: start});
  const pq = new PriorityQueue();
  pq.enqueue(start, this.state.heuristics[start[0]][start[1]]);
  const dp = Array(30)
      .fill()
      .map(() => Array(40).fill([]));
  while (!pq.isEmpty()) {
    const grid = this.state.grid;
    const current = pq.front().element;
    pq.dequeue();
    this.setState({current});
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      break;
    }
    if (current[1] !== this.state.width - 1 && (grid[current[0]][current[1] + 1] === 0 || grid[current[0]][current[1] + 1] === 4)) {
      if (dp[current[0]][current[1] + 1].length === 0 || dp[current[0]][current[1] + 1].length > [...dp[current[0]][current[1]], current].length) {
        pq.enqueue([current[0], current[1] + 1], dp[current[0]][current[1]].length+this.state.heuristics[current[0]][current[1] + 1]);
        dp[current[0]][current[1] + 1] = [...dp[current[0]][current[1]], current];
      }
    }
    if (current[0] !== this.state.height - 1 && ((grid[current[0] + 1][current[1]] === 0) || grid[current[0] + 1][current[1]] === 4)) {
      if (dp[current[0] + 1][current[1]].length === 0 || dp[current[0] + 1][current[1]].length > [...dp[current[0]][current[1]], current]) {
        pq.enqueue([current[0] + 1, current[1]], dp[current[0]][current[1]].length+this.state.heuristics[current[0] + 1][current[1]]);
        dp[current[0] + 1][current[1]] = [...dp[current[0]][current[1]], current];
      }
    }
    if (current[0] !== 0 && (grid[current[0] - 1][current[1]] === 0 || (grid[current[0] - 1][current[1]] === 4))) {
      if (dp[current[0] - 1][current[1]].length === 0 || dp[current[0] - 1][current[1]].length > [...dp[current[0]][current[1]], current]) {
        pq.enqueue([current[0] - 1, current[1]], dp[current[0]][current[1]].length+this.state.heuristics[current[0] - 1][current[1]]);
        dp[current[0] - 1][current[1]] = [...dp[current[0]][current[1]], current];
      }
    }
    if (current[1] !== 0 && (grid[current[0]][current[1] - 1] === 0 || (grid[current[0]][current[1]-1] === 4))) {
      if (dp[current[0]][current[1] - 1].length === 0 || dp[current[0]][current[1] - 1].length > [...dp[current[0]][current[1]], current].length) {
        pq.enqueue([current[0], current[1] - 1], dp[current[0]][current[1]].length+this.state.heuristics[current[0]][current[1] - 1]);
        dp[current[0]][current[1] - 1] = [...dp[current[0]][current[1]], current];
      }
    }
    grid[current[0]][current[1]] = 2; // this node as visited
    this.setState({grid, pointer: current});
    await new Promise((done) => setTimeout(() => done(), 25)); // To slow down the animation
  }
  const grid = this.state.grid;
  for (let i = 0; i < this.state.height; i++) {
    for (let j = 0; j < this.state.width; j++) {
      if (grid[i][j] ===2) {
        grid[i][j] = 0;
      }
    }
  }
  grid[start[0]][start[1]] = 0;
  grid[end[0]][end[1]] = 3;
  await this.setState({grid});
  //  this.state.path = dp[end[0]][end[1]];
  return dp[end[0]][end[1]];
};

export const findOptimalVertex = (unvisited, source) =>{
  const pq = new PriorityQueue();
  const sourceMapped = this.state.graph.map2[source];
  for (const item of unvisited) {
    const destinationMapped = this.state.graph.map2[item];
    pq.enqueue(item, this.state.graph.allPairShortest[sourceMapped][destinationMapped]);
  }
  return pq.front().element;
};
