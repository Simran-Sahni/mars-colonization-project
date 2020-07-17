
export const dfs = async function() {
  this.setState({path: []});
  let stack = [this.state.start[0]];
  const grid = this.state.grid;
  const flag = 1;
  const par = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  par[this.state.start[0][0]][this.state.start[0][1]] = [this.state.start[0][0], this.state.start[0][1]];
  let ok = true;
  while (stack.length !== 0) {
    const current = stack[stack.length - 1];
    stack.pop();
    if (current[0] < 0 || current[0] >= this.state.height) continue;
    if (current[1] < 0 || current[1] >= this.state.width) continue;
    if (this.state.grid[current[0]][current[1]] === 2 || this.state.grid[current[0]][current[1]] === 1) continue; // already visited or wall
    if (this.state.grid[current[0]][current[1]] === 3) {
      if (ok) ok = false;
      else continue;
    }
    this.state.path = [...this.state.path, [current[0], current[1]]];
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid: grid, pointer: current});
      await new Promise((done) => setTimeout(() => done(), this.state.speed));// To slow down the speed of Animation
      break;
    } else {
      const list = []; // temporary array to store next points
      list.push([current[0] + 1, current[1]]); // Go right
      list.push([current[0], current[1] + 1]); // Go Above
      list.push([current[0] - 1, current[1]]); // Go Left
      list.push([current[0], current[1] - 1]); // Go below
      if (grid[current[0]][current[1]] !== 3) this.state.grid[current[0]][current[1]] = 2; // mark it as visited
      stack = stack.concat(list);
    }
    this.setState({grid: grid, pointer: current});
    await new Promise((done) => setTimeout(() => done(), this.state.speed));// To slow down the speed of Animation
  }
  if (flag === 0) this.setState({grid: grid});
  if (this.state.pointer[0] !== this.state.end[0][0] || this.state.pointer[1] !== this.state.end[0][1]) {
    this.showModal(); // return if path not found
    return;
  }
  await this.pathdisplay(this.state.path);
};
