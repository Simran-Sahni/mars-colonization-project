import PriorityQueue from "./customPriorityQueue";
import {biNeighbors} from "./Utility";
export const BiAstar = async function() {
  this.computeHeuristics();
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const heuristics = this.state.heuristics; const speed = this.state.speed;
  const reverseHeuristics = this.state.reverseHeuristics;
  let meetpoint1; let meetpoint2;
  this.setState({pointer: start[0], pointer2: end[0]});
  const visited1 = Array(height).fill().map(() => Array(width).fill(0));
  const visited2 = Array(height).fill().map(() => Array(width).fill(0));
  const forwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  const backwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  forwardPQ.push([start[0], 0]);
  backwardPQ.push([end[0], 0]);
  const forwardDP = Array(height).fill().map(() => Array(width).fill([]));
  const backwardDP = Array(height).fill().map(() => Array(width).fill([]));
   let ok = 0;
  while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
    const grid = this.state.grid;
    const current1 = forwardPQ.peek()[0]; const current2 = backwardPQ.peek()[0];
    this.setState({pointer: current1, pointer2: current2, bi: true});
    await new Promise((done) => setTimeout(() => done(), speed));
    visited1[current1[0]][current1[1]] = 1;
    visited2[current2[0]][current2[1]] = 1;
    forwardPQ.pop(); backwardPQ.pop();
    let item = biNeighbors(current1[0], current1[1], this.state.grid);
    for (let i =0; i < item.length; i++) {
      if (item[i][0] === start[0] && item[i][1] === start[1]) continue;
      if (visited2[item[i][0]][item[i][1]] === 1) {
        meetpoint2 = item[i]; meetpoint1 = current1;
        ok = 1;
        break;
      }
      if ((forwardDP[item[i][0]][item[i][1]].length === 0) ||
          (forwardDP[item[i][0]][item[i][1]].length >
              forwardDP[current1[0]][current1[1]].length + 1)) {
        forwardPQ.push([item[i], (forwardDP[item[i][0]][item[i][1]].length+1) +
        heuristics[item[i][0]][item[i][1]]]);
        forwardDP[item[i][0]][item[i][1]] =
            [...forwardDP[current1[0]][current1[1]], current1];
        grid[current1[0]][current1[1]] = 2;
        this.setState({grid});
      }
    }
    item = biNeighbors(current2[0], current2[1], this.state.grid);
    for (let i =0; i < item.length; i++) {
      if (item[i][0] === end[0] && item[i][1] === end[1]) continue;
      if (visited1[item[i][0]][item[i][1]] === 1) {
        meetpoint2 = current2;
        meetpoint1 = item[i];
        ok = 1;
        break;
      }
      if ((backwardDP[item[i][0]][item[i][1]].length === 0) ||
          (backwardDP[item[i][0]][item[i][1]].length >
              backwardDP[current2[0]][current2[1]].length + 1)) {
        backwardPQ.push([item[i],
          (backwardDP[item[i][0]][item[i][1]].length+1) +
          reverseHeuristics[item[i][0]][item[i][1]]]);
        backwardDP[item[i][0]][item[i][1]] =
            [...backwardDP[current2[0]][current2[1]], current2];
        grid[current2[0]][current2[1]] = 2;
        this.setState({grid});
      }
    }
    grid[start[0][0]][start[0][1]] = 3;
    grid[end[0][0]][end[0][1]] = 4;
    
    if (ok === 1) break;
  }
  if((meetpoint1 === undefined)||(meetpoint2 === undefined))
  {
    
      this.showModal();  //return not found
      this.setState({visual: false});
      return;
    
  }
  const path = [...forwardDP[meetpoint1[0]][meetpoint1[1]],
    ...backwardDP[meetpoint2[0]][meetpoint2[1]].reverse()];
  await this.pathdisplay(path);
};
