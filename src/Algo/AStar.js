import PriorityQueue from './customPriorityQueue';
import {neighbors} from './Utility';

export const AStar = async function(w1, w2) {
  this.computeHeuristics();
  this.setState({path: [], pointer: this.state.start[0]});
  const height = this.state.height; const width = this.state.width;
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  const start = this.state.start; const end = this.state.end;
  const heuristics = this.state.heuristics; const speed = this.state.speed;
  pq.push([start[0], heuristics[start[0][0]][start[0][1]]]);
  const dp = Array(height).fill().map(() => Array(width).fill([]));
  while (!pq.isEmpty()) {
    const grid = this.state.grid;
    const current = pq.peek()[0];
    pq.pop();
    this.setState({pointer: current});
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      break;
    }
    const item = neighbors(current[0], current[1], this.state.grid);
    for (let i =0; i < item.length; i++) {
      if ((dp[item[i][0]][item[i][1]].length === 0) ||
          (dp[item[i][0]][item[i][1]].length >
              dp[current[0]][current[1]].length + 1)) {
        pq.push([item[i],
          w1*(dp[current[0]][current[1]].length+1) +
          w2*this.state.heuristics[item[i][0]][item[i][1]]]);
        dp[item[i][0]][item[i][1]] = [...dp[current[0]][current[1]], current];
      }
    }
    grid[current[0]][current[1]] = 2;
    this.setState({grid, pointer: current});
    await new Promise((done) =>
      setTimeout(() => done(), speed));
  }
  const pointer = this.state.pointer;
  if (pointer[0] !== end[0][0] || pointer[1] !== end[0][1]) {
    this.showModal();
    this.setState({visual: false});
    return;
  }
  const path = dp[end[0][0]][end[0][1]];
  await this.pathdisplay(path);
};


