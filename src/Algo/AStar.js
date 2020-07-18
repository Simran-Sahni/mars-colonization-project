import PriorityQueue from '../priorityq';
export const AStar = async function(w1, w2) {
  this.setState({path: [], pointer: this.state.start[0]});
  const pq = new PriorityQueue();
  pq.enqueue(this.state.start[0], this.state.heuristics[this.state.start[0][0]][this.state.start[0][1]]);
  const dp = Array(20)
      .fill()
      .map(() => Array(20).fill([]));
  while (!pq.isEmpty()) {
    const grid = this.state.grid;
    const current = pq.front().element;
    pq.dequeue();
    this.setState({current});
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      break;
    }
    const item = neighbors(current[0], current[1], this.state.grid);
    for (let i =0; i < item.length; i++) {
      if ((dp[item[i][0]][item[i][1]].length === 0) || (dp[item[i][0]][item[i][1]].length > dp[current[0]][current[1]].length + 1)) {
        pq.enqueue([item[i][0], item[i][1]], w1*(dp[item[i][0]][item[i][1]].length+1) + w2*this.state.heuristics[item[i][0]][item[i][1]]);
        dp[item[i][0]][item[i][1]] = [...dp[current[0]][current[1]], current];
      }
      grid[current[0]][current[1]] = 2; // this node as visited
      this.setState({grid, pointer: current});
      await new Promise((done) => setTimeout(() => done(), this.state.speed)); // To slow down the animation
    }
  }
  if (this.state.pointer[0] !== this.state.end[0][0] || this.state.pointer[1] !== this.state.end[0][1]) {
    this.showModal(); // return if path not found
    return;
  }
  this.state.path = dp[this.state.end[0][0]][this.state.end[0][1]];
  await this.pathdisplay(this.state.path);
};

function neighbors(i, j, grid) {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
}
const isFeasable = (i, j, grid) =>{
  if (i < 0 || i >=20 || j < 0 || j >=20) return false;
  return (grid[i][j] === 0 || grid[i][j] === 4);
};
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

