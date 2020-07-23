import PriorityQueue from "./customPriorityQueue";

export const Dijkstra = async function() {
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const queue = new PriorityQueue((a, b) => a[1] < b[1]);
  queue.push([start[0], 0]);
  const grid = this.state.grid;
  const dist = Array(height).fill().map(() =>
    Array(width).fill(1000000000));
  const par = Array(height).fill().map(() =>
    Array(width).fill(0));
  this.setState({path: [], pointer: start[0]});
  dist[start[0][0]][start[0][1]] = 0;
  par[start[0][0]][start[0][1]] =
      [start[0][0], start[0][1]];
  let ok = true;
  while (queue.length !== 0) {
    const current = queue.peek()[0];
    queue.pop(); // pop the queue
    if (grid[current[0]][current[1]] === 1 ||
        grid[current[0]][current[1]] === 2) {
      continue; // if a wall or visited continue
    }
    if (grid[current[0]][current[1]] === 3) {
      if (ok) {
        ok = false;
      } else {
        continue;
      } // if you are again pushing the source point, its !ok
    }
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid, pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), this.state.speed));
      break;
    } else {
      // dijkstra picks the minimum weight path,
      // updates it in its distance array
      if (current[0] !== height - 1 &&
          grid[current[0] + 1][current[1]] !== 2) {
        if (dist[current[0] + 1][current[1]] >
            dist[current[0]][current[1]] + 1) {
          dist[current[0] + 1][current[1]] = dist[current[0]][current[1]] + 1;
          par[current[0] + 1][current[1]] = [current[0], current[1]];
          queue.push([[current[0] + 1, current[1]],
            dist[current[0] + 1][current[1]]]);
        }
      }
      if (current[1] !== width - 1 &&
          grid[current[0]][current[1] + 1] !== 2) {
        if (dist[current[0]][current[1] + 1] >
            dist[current[0]][current[1]] + 1) {
          dist[current[0]][current[1] + 1] = dist[current[0]][current[1]] + 1;
          par[current[0]][current[1] + 1] = [current[0], current[1]];
          queue.push([[current[0], current[1] + 1],
            dist[current[0]][current[1] + 1]]);
        }
      }
      if (current[0] !== 0 && grid[current[0] - 1][current[1]] !== 2) {
        if (dist[current[0] - 1][current[1]] >
            dist[current[0]][current[1]] + 1) {
          dist[current[0] - 1][current[1]] = dist[current[0]][current[1]] + 1;
          par[current[0] - 1][current[1]] = [current[0], current[1]];
          queue.push([[current[0] - 1, current[1]],
            dist[current[0] - 1][current[1]]]);
        }
      }
      if (current[1] !== 0 && grid[current[0]][current[1] - 1] !== 2) {
        if (dist[current[0]][current[1] - 1] >
            dist[current[0]][current[1]] + 1) {
          dist[current[0]][current[1] - 1] = dist[current[0]][current[1]] + 1;
          par[current[0]][current[1] - 1] = [current[0], current[1]];
          queue.push([[current[0], current[1] - 1],
            dist[current[0]][current[1]-1]]);
        }
      }
      if (grid[current[0]][current[1]] !== 3) {
        grid[current[0]][current[1]] = 2; // mark it as visited
      }
      this.setState({grid, pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), this.state.speed));
    }
  }
  if (this.state.pointer[0] !== end[0][0] ||
      this.state.pointer[1] !== end[0][1]) {
    this.showModal(); // return if path not found
    this.setState({visual: false});
    return;
  }
  let ptr = [end[0][0], end[0][1]];
  ok = true;
  while (ok) {
    this.state.path = [...this.state.path, ptr];
    if (ptr[0] === start[0][0] &&
        ptr[1] === start[0][1]) {
      ok = false;
    } else {
      ptr = par[ptr[0]][ptr[1]];
    }
  }
  this.state.path = this.state.path.reverse();
  await this.pathdisplay(this.state.path);
};
