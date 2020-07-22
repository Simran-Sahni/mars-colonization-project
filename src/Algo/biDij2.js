import PriorityQueue from './customPriorityQueue';
import {biNeighbors} from './Utility';
export const BiDij2 = async function() {
  const start = this.state.start;
  const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const heuristics = this.state.heuristics; const speed = this.state.speed;
  const reverseHeuristics = this.state.reverseHeuristics;
  let meetpoint1; let meetpoint2;
  this.setState({pointer: start[0], pointer2: end[0]});
  const visited1 = Array(height).fill(undefined, undefined, undefined).map(() => Array(width).fill(0));
  const visited2 = Array(height).fill(undefined, undefined, undefined).map(() => Array(width).fill(0));
  const forwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  const backwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  forwardPQ.push([start[0], 0]);
  backwardPQ.push([end[0], 0]);
  const forwardPath = Array(height).fill(undefined, undefined, undefined).map(() => Array(width).fill([]));
  const backwardPath = Array(height).fill(undefined, undefined, undefined).map(() => Array(width).fill([]));
  let ok = 0;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      heuristics[i][j] = 0;
      reverseHeuristics[i][j] = 0;
    }
  }
  const dist1 = Array(height).fill().map(() =>
    Array(width).fill(1000000000));
  const dist2 = Array(height).fill().map(() =>
    Array(width).fill(1000000000));
  dist1[start[0][0]][start[0][1]] = 0;
  dist2[end[0][0]][end[0][1]] = 0;

  while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
    const grid = this.state.grid;
    const current1 = forwardPQ.peek()[0];
    const current2 = backwardPQ.peek()[0];
    //  console.log(current1, current2);
    this.setState({pointer: current1, pointer2: current2});
    await new Promise((done) =>
      setTimeout(() => done(), this.state.speed));
    visited1[current1[0]][current1[1]] = 1;
    visited2[current2[0]][current2[1]] = 1;
    // console.log(forwardPQ);
    // console.log(backwardPQ);
    // console.log(current1);
    // console.log(current2);
    forwardPQ.pop(); backwardPQ.pop();
    const neighbor1 = biNeighbors(current1[0], current1[1], this.state.grid);
    const neighbor2 = biNeighbors(current2[0], current2[1], this.state.grid);
    for (const item of neighbor1) {
      // console.log(item);
      if (item[0] === start[0] && item[1] === start[1]) continue;
      if (visited2[item[0]][item[1]] === 1) {
        meetpoint2 = item; meetpoint1 = current1;
        ok = 1;
        break;
      }
      // console.log(current1, item, dist1[current1[0]][current1[1]], dist1[item[0]][item[1]]);
      if ( dist1[current1[0]][current1[1]] + 1< dist1[item[0]][item[1]]) {
        dist1[item[0]][item[1]] = dist1[current1[0]][current1[1]] + 1;
        forwardPQ.push([[item[0], item[1]],
          dist1[item[0]][item[1]]]);
      }
    }
    if (ok === 1) break;
    for (const item of neighbor2) {
      if (item[0] === end[0] && item[1] === end[1]) continue;
      if (visited1[item[0]][item[1]] === 1) {
        meetpoint2 = current2;
        meetpoint1 = item;
        ok = 1;
        break;
      }
      if ( dist2[current2[0]][current2[1]] + 1< dist2[item[0]][item[1]]) {
        dist2[item[0]][item[1]] = dist2[current2[0]][current2[1]] + 1;
        backwardPQ.push([[item[0], item[1]],
          dist2[item[0]][item[1]]]);
      }
    }
    grid[current1[0]][current1[1]] = 2;
    grid[current2[0]][current2[1]] = 2;
    this.setState({grid});
    // console.log(current1, current2);
    // console.log(neighbor1);
    // console.log(neighbor2);
    // console.log(ok);
    if (ok === 1) break;
  }
  // const path = [...forwardPath[meetpoint1[0]][meetpoint1[1]],
  //   ...backwardPath[meetpoint2[0]][meetpoint2[1]].reverse()];
  // await this.pathdisplay(path);
};
