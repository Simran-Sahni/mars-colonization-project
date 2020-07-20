import App from '../App';
import DSU from './DSU';
import Heap from './Heap';


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

  const dist1 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(1000000000));
  const par1 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  const dist2 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(1000000000));
  const par2 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  const visited = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  dist1[this.state.start[0][0]][this.state.start[0][1]] = 0;
  par1[this.state.start[0][0]][this.state.start[0][1]] = [this.state.start[0][0], this.state.start[0][1]];
  dist2[this.state.end[0][0]][this.state.end[0][1]] = 0;
  par1[this.state.start[0][0]][this.state.start[0][1]] = [this.state.start[0][0], this.state.start[0][1]];
  par2[this.state.end[0][0]][this.state.end[0][1]] = [this.state.end[0][0], this.state.end[0][1]];
  const heuristics = this.state.heuristics;
  const start = this.state.start[0];
  const end = this.state.end[0];


  const vis1 = new Set();
  const vis2 = new Set();
  // dsu = new DSU();
  // visited[start[0]][start[1]] = true;
  // visited[end[0]][end[1]] = true;
  /* const minpath = 1000000000;
    var cmp = function(nodeA, nodeB) {
            return nodeA.f - nodeB.f;
        };
        startOpenList = new Heap(cmp);
        endOpenList = new Heap(cmp);
        startOpenList.push(start);
        endOpenList.push(end);
     heuristics = this.state.heuristics;

    let ok = true;
    while (startOpenList.peek() + endOpenList.peek() <= minpath) {
      WILL BE USEFUL IN BIDIRECTIONAL A*
    }*/


  let ptr;
  while (queue1.length !==0 && queue2.length !== 0) {
    const current = queue1[0]; // current of forward path
    const revcurrent = queue2[0]; // current pointer of reverse path
    let flag1=false; let flag2=false;
    // this.setState({pointer: current, pointer2: revcurrent});
    // console.log({current, revcurrent});

    if (!visited[current[0]][current[1]] && visited[current[0]][current[1]] === 2) {
      ptr = current; break;
    }
    if (!visited[revcurrent[0]][revcurrent[1]] && visited[revcurrent[0]][revcurrent[1]] === 1) {
      ptr = revcurrent; break;
    }
    visited[current[0]][current[1]] = 1;
    visited[revcurrent[0]][revcurrent[1]] = 2;

    queue1.shift();
    queue2.shift();
    const list1 = [];
    const list2 = [];
    for (const dir of directions) {
      // console.log({dir});
      const neighbour1 = [current[0] + dir[0], current[1] + dir[1]];

      // console.log(neighbour1);
      if (isGoodCell(neighbour1[0], neighbour1[1])) {
        if (vis1.has([neighbour1[0], neighbour1[1]])) continue;
        console.log(visited[neighbour1[0]][neighbour1[1]]);
        if (visited[neighbour1[0]][neighbour1[1]] === 2 ) {
          ptr=neighbour1; flag1=true; break;
        }
        if (visited[neighbour1[0]][neighbour1[1]] === 1 ) {
          continue;
        }
        if ( neighbour1[0]===start[0] && neighbour1[1]===start[1]) continue;
        if (grid[neighbour1[0]][neighbour1[1]] === 2) continue;
        if (dist1[neighbour1[0]][neighbour1[1]] > dist1[current[0]][current[1]] + 1) {
          dist1[neighbour1[0]][neighbour1[1]] = dist1[current[0]][current[1]] + 1;
          par1[neighbour1[0]][neighbour1[1]] = current;
        }
        list1.push(neighbour1);
        vis1.add([neighbour1[0], neighbour1[1]]);
        grid[neighbour1[0]][neighbour1[1]] = 2;
        // console.log({list1});
      }
    }
    queue1 = queue1.concat(list1);
    // console.log(queue1);
    for (const dir of directions) {
      const neighbour2 = [revcurrent[0] + dir[0], revcurrent[1] + dir[1]];
      // console.log({neighbour2});
      if (isGoodCell(neighbour2[0], neighbour2[1])) {
        if (vis2.has([neighbour2[0], neighbour2[1]])) continue;
        //     console.log(visited[neighbour2[0]][neighbour2[1]]);
        if (visited[neighbour2[0]][neighbour2[1]] === 1 ) {
          ptr = neighbour2; flag2=true; break;
        }
        if (visited[neighbour2[0]][neighbour2[1]] === 2 ) {
          continue;
        }
        if (grid[neighbour2[0]][neighbour2[1]] === 2) continue;
        if (neighbour2[0]===end[0] && neighbour2[1]===end[1]) continue;
        if (dist2[neighbour2[0]][neighbour2[1]] > dist2[revcurrent[0]][revcurrent[1]] + 1) {
          dist2[neighbour2[0]][neighbour2[1]] = dist2[revcurrent[0]][revcurrent[1]] + 1;
          par2[neighbour2[0]][neighbour2[1]] = revcurrent;
        }
        list2.push(neighbour2);
        vis2.add([neighbour2[0], neighbour2[1]]);
        grid[neighbour2[0]][neighbour2[1]] = 2;
        // console.log({list2});
      }
    }
    queue2 = queue2.concat(list2);
    // console.log({queue1,queue2});
    this.setState({grid: grid, pointer: current, pointer2: revcurrent});
    await new Promise((done) => setTimeout(() => done(), 50));// To slow down the speed of Animation
    if (flag1 || flag2) {
      break;
    }
  }

  // console.log(vis1);
  // console.log({ptr});
  while (true) {
    this.state.path = [...this.state.path, ptr];
    if (ptr[0] === this.state.start[0][0] && ptr[1] === this.state.start[0][1]) break;
    else {
      // console.log(ptr);
    //  console.log(par1[ptr[0]][ptr[1]]);
      ptr = par1[ptr[0]][ptr[1]];
    }
  }
  // console.log(this.state.path);
  await this.pathdisplay(this.state.path);
};

