export const BiBFS = async function() {
  this.setState({path: [], pointer: this.state.start[0], pointer2: this.state.end[0]});
  let queue1 = [this.state.start[0]];
  let queue2 = [this.state.end[0]];
  const height = this.state.height;
  const width = this.state.width;
  const grid = this.state.grid;
  const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

  const isGoodCell = (i, j) =>{
    if (i < 0 || i >=height || j < 0 || j >=width) return false;
    if (grid[i][j]===1 || grid[i][j] === 3 || grid[i][j] === 4) return false;
    return true;
  };
  const start = this.state.start[0];
  const end = this.state.end[0];

  const par1 = Array(height).fill().map(() => Array(width).fill([]));

  const par2 = Array(height).fill().map(() => Array(width).fill([]));
  const visited = Array(height).fill().map(() => Array(width).fill(0));


  par1[start[0]][start[1]] = start;
  par2[end[0]][end[1]] = end;

  let ptr;
  while (queue1.length !==0 && queue2.length !== 0) {
    const current = queue1[0]; // current of forward path
    const revcurrent = queue2[0]; // current pointer of reverse path
    let flag1=false; let flag2=false;
    if (visited[current[0]][current[1]] === 2) {
      ptr = current; break;
    } else {
      visited[current[0]][current[1]] = 1;
    }
    if (visited[revcurrent[0]][revcurrent[1]] === 1) {
      ptr = revcurrent; break;
    } else {
      visited[revcurrent[0]][revcurrent[1]] = 2;
    }
    queue1.shift();
    queue2.shift();
    const list1 = [];
    const list2 = [];
    for (const dir of directions) {
      const neighbour1 = [current[0] + dir[0], current[1] + dir[1]];
      if (isGoodCell(neighbour1[0], neighbour1[1])) {
        if (visited[neighbour1[0]][neighbour1[1]] === 1 ) {
          continue;
        }
        if (grid[neighbour1[0]][neighbour1[1]] === 2) continue;
        par1[neighbour1[0]][neighbour1[1]] = current;
        if (visited[neighbour1[0]][neighbour1[1]] === 2 ) {
          ptr=neighbour1; flag1=true; break;
        }
        if ( neighbour1[0]===start[0] && neighbour1[1]===start[1]) continue;

        list1.push(neighbour1);
        grid[neighbour1[0]][neighbour1[1]] = 2;
      }
    }
    queue1 = queue1.concat(list1);
    if (flag1) break;
    for (const dir of directions) {
      const neighbour2 = [revcurrent[0] + dir[0], revcurrent[1] + dir[1]];
      if (isGoodCell(neighbour2[0], neighbour2[1])) {
        if (visited[neighbour2[0]][neighbour2[1]] === 2 ) {
          continue;
        }
        if (grid[neighbour2[0]][neighbour2[1]] === 6) continue;
        par2[neighbour2[0]][neighbour2[1]] = revcurrent;
        if (visited[neighbour2[0]][neighbour2[1]] === 1 ) {
          ptr = neighbour2; flag2=true; break;
        }

        if (neighbour2[0]===end[0] && neighbour2[1]===end[1]) continue;
        list2.push(neighbour2);
        grid[neighbour2[0]][neighbour2[1]] = 6;
      }
    }
    queue2 = queue2.concat(list2);
    this.setState({grid: grid, pointer: current, pointer2: revcurrent});
    await new Promise((done) => setTimeout(() => done(), 50));// To slow down the speed of Animation
    if (flag1 || flag2) {
      break;
    }
  }
  // console.log({ptr});
  const breakpoint = ptr;
  while (true) {
    this.state.path = [...this.state.path, ptr];
    if (ptr[0] === this.state.start[0][0] && ptr[1] === this.state.start[0][1]) break;
    else {
      ptr = par1[ptr[0]][ptr[1]];
    }
  }
  this.state.path = this.state.path.reverse();
  ptr = breakpoint;
  let pth2= [];
  while (true) {
    pth2 = [...pth2, ptr];
    if (ptr[0] === end[0] && ptr[1] === end[1]) break;
    else {
      ptr = par2[ptr[0]][ptr[1]];
    }
  }
  // console.log({pth2});
  pth2 = pth2.reverse();
  // console.log({pth2});
  this.state.path = this.state.path.concat(pth2);
  // console.log(this.state.path);
  await this.pathdisplay(this.state.path);
};
