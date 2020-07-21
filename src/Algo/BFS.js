import {neighbors} from './Utility';
export const BFS = async function() {
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const speed = this.state.speed;
  this.setState({pointer: start[0]});
  const queue = [start[0]]; const grid = this.state.grid;
  const par = Array(height).fill().map(() => Array(width).fill(0));
  par[start[0][0]][start[0][1]] = [start[0][0], start[0][1]];
  let ok = true;
  while (queue.length !== 0) {
    const current = queue[0];
    queue.shift();
    if (grid[current[0]][current[1]] === 1 ||
        grid[current[0]][current[1]] === 2) {
      continue;
    }
    if (grid[current[0]][current[1]] === 3) {
      if (ok) {
        ok = false;
      } else {
        continue;
      }
    }
    if (grid[current[0]][current[1]] === 4) {
      this.setState({grid});
      this.setState({pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), speed));
      break;
    } else {
      const item = neighbors(current[0], current[1], this.state.grid);
      for (const neighbor of item) {
        par[neighbor[0]][neighbor[1]] = [current[0], current[1]];
        queue.push([neighbor[0], neighbor[1]]);
      }
      if (grid[current[0]][current[1]] !== 3) {
        grid[current[0]][current[1]] = 2;
      }
      this.setState({grid});
      this.setState({pointer: current});
      await new Promise((done) =>
        setTimeout(() => done(), speed));
    }
  }
  const pointer = this.state.pointer;
  if (pointer[0] !== end[0][0] || pointer[1] !== end[0][1]) {
    this.showModal();
    return;
  }
  let ptr = [end[0][0], end[0][1]];
  const path = [];
  while (ptr[0] !== start[0][0] || ptr[1] !== start[0][1]) {
    path.push(ptr);
    ptr = par[ptr[0]][ptr[1]];
  }
  await this.pathdisplay(path.reverse());
};

