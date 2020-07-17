
export const Dijkstra = async function() {
  this.setState({path: [], pointer: this.state.start[0]});
  let queue = [this.state.start[0]];
  const grid = this.state.grid;
  const dist = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(1000000000));
  const par = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  dist[this.state.start[0][0]][this.state.start[0][1]] = 0;
  par[this.state.start[0][0]][this.state.start[0][1]] = [this.state.start[0][0], this.state.start[0][1]];
  let ok = true;
  while (queue.length !== 0) {
    const current = queue[0];
    queue.shift(); // pop the queue
    if (grid[current[0]][current[1]] === 1 || grid[current[0]][current[1]] === 2) // if its a wall or visited cell continue
    {
      continue;
    }
    if (grid[current[0]][current[1]] === 3) {
      if (ok) ok = false;
      else continue; // if you are again pushing the source point, its !ok
    }
    if (grid[current[0]][current[1]] === 4) { // reached the destination, so break.
      this.setState({grid: grid, pointer: current});
      await new Promise((done) => setTimeout(() => done(), this.state.speed));// To slow down the speed of Animation
      break;
    } else {
      const list = [];
      if (current[0] !== this.state.height - 1 && grid[current[0] + 1][current[1]] !== 2) {
        if (dist[current[0] + 1][current[1]] > dist[current[0]][current[1]] + 1) {
          dist[current[0] + 1][current[1]] = dist[current[0]][current[1]] + 1;
          par[current[0] + 1][current[1]] = [current[0], current[1]];
        }
        list.push([current[0] + 1, current[1]]);
      }
      if (current[1] !== this.state.width - 1 && grid[current[0]][current[1] + 1] !== 2) {
        if (dist[current[0]][current[1] + 1] > dist[current[0]][current[1]] + 1) {
          dist[current[0]][current[1] + 1] = dist[current[0]][current[1]] + 1;
          par[current[0]][current[1] + 1] = [current[0], current[1]];
        }
        list.push([current[0], current[1] + 1]);
      }
      if (current[0] !== 0 && grid[current[0] - 1][current[1]] !== 2) {
        if (dist[current[0] - 1][current[1]] > dist[current[0]][current[1]] + 1) {
          dist[current[0] - 1][current[1]] = dist[current[0]][current[1]] + 1;
          par[current[0] - 1][current[1]] = [current[0], current[1]];
        }
        list.push([current[0] - 1, current[1]]);
      }
      if (current[1] !== 0 && grid[current[0]][current[1] - 1] !== 2) {
        if (dist[current[0]][current[1] - 1] > dist[current[0]][current[1]] + 1) {
          dist[current[0]][current[1] - 1] = dist[current[0]][current[1]] + 1;
          par[current[0]][current[1] - 1] = [current[0], current[1]];
        }
        list.push([current[0], current[1] - 1]);
      }
      if (grid[current[0]][current[1]] !== 3) {
        grid[current[0]][current[1]] = 2; // mark it as visited
      }
      this.setState({grid: grid, pointer: current});
      await new Promise((done) => setTimeout(() => done(), this.state.speed));// To slow down the speed of Animation
      queue = queue.concat(list);
    }
  }
  if (this.state.pointer[0] !== this.state.end[0][0] || this.state.pointer[1] !== this.state.end[0][1]) {
    this.showModal(); // return if path not found
    return;
  }
  let ptr = [this.state.end[0][0], this.state.end[0][1]];
  while (true) {
    this.state.path = [...this.state.path, ptr];
    if (ptr[0] === this.state.start[0][0] && ptr[1] === this.state.start[0][1]) break;
    else ptr = par[ptr[0]][ptr[1]];
  }
  this.state.path = this.state.path.reverse();
  await this.pathdisplay(this.state.path);
};
