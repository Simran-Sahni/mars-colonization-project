import PriorityQueue from '../priorityq';

export const AStar = async function() {
  this.computeHeuristics();
  this.setState({path: [], pointer: this.state.start[0]});
  const pq = new PriorityQueue();
  pq.enqueue(this.state.start[0], this.state.heuristics[this.state.start[0][0]][this.state.start[0][1]]);
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
  if (this.state.pointer[0] !== this.state.end[0][0] || this.state.pointer[1] !== this.state.end[0][1]) {
    this.showModal(); // return if path not found
    return;
  }
  this.state.path = dp[this.state.end[0][0]][this.state.end[0][1]];
  await this.pathdisplay(this.state.path);
};
