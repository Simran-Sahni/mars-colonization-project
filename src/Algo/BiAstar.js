import PriorityQueue from "./customPriorityQueue";
import {biNeighbors} from "./Utility";
export const BiAstar = async function() {
  this.computeHeuristics();
  const heuristics = this.state.heuristics;
  const reverseheuristics = this.state.reverseHeuristics;
  const start = this.state.start[0];
  const end = this.state.end[0];
  const height = this.state.height; const width = this.state.width;
  let meetpoint1; let meetpoint2; // the breakpoint from either direction
  this.setState({pointer: start[0], pointer2: end[0], bi: true});
  const visited1 = Array(height).fill().map(() =>
    Array(width).fill(0));
  // visited array to aid finding and stopping at common points
  const visited2 = Array(height).fill().map(() =>
    Array(width).fill(0));
  const forwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  // forward PQ for points from Start end
  const backwardPQ = new PriorityQueue((a, b) => a[1] < b[1]);
  // Priority queue for points from the other end
  forwardPQ.push([start, 0]);
  backwardPQ.push([end, 0]);
  // Parent arrays to restore the path
  const par1 = Array(height).fill().map(() => Array(width).fill([]));
  const par2 = Array(height).fill().map(() => Array(width).fill([]));
  par1[start[0]][start[1]] = start;
  par2[end[0]][end[1]] = end;
  let reached = true;
  let ok = 0;
  // initialising the distance array to a Maxima
  const dist1 = Array(height).fill().map(() =>
    Array(width).fill(100000));
  const dist2 = Array(height).fill().map(() =>
    Array(width).fill(100000));
  dist1[start[0]][start[1]] = 0;
  dist2[end[0]][end[1]] = 0;

  while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
    const grid = this.state.grid;
    const current1 = forwardPQ.peek()[0];
    const current2 = backwardPQ.peek()[0];
    this.setState({pointer: current1, pointer2: current2});
    await new Promise((done) =>
      setTimeout(() => done(), this.state.speed));
    visited1[current1[0]][current1[1]] = 1; // marking current pointers visited
    visited2[current2[0]][current2[1]] = 1;
    forwardPQ.pop(); backwardPQ.pop();
    const neighbor1 = biNeighbors(current1[0], current1[1], this.state.grid);
    const neighbor2 = biNeighbors(current2[0], current2[1], this.state.grid);
    for (const item of neighbor1) {
      // iterating over the neighbours from front
      if (item[0] === start[0] && item[1] === start[1]) {
        continue;
      }
      if (visited2[item[0]][item[1]] === 1) {
        meetpoint2 = item; meetpoint1 = current1;
        ok = 1;
        break;
      }

      if ( dist1[current1[0]][current1[1]] + 1< dist1[item[0]][item[1]]) {
        dist1[item[0]][item[1]] = dist1[current1[0]][current1[1]] + 1;
        par1[item[0]][item[1]] = current1;
        forwardPQ.push([item,
          dist1[item[0]][item[1]] + heuristics[item[0]][item[1]]]);
      }
    }
    if (ok === 1) {
      break;
    }
    // iterating over neighbours from back
    for (const item of neighbor2) {
      if (item[0] === end[0] && item[1] === end[1]) {
        continue;
      }

      if (visited1[item[0]][item[1]] === 1) {
        meetpoint2 = current2;
        meetpoint1 = item;
        ok = 1;
        break;
      }
      if ( dist2[current2[0]][current2[1]] + 1< dist2[item[0]][item[1]]) {
        dist2[item[0]][item[1]] = dist2[current2[0]][current2[1]] + 1;
        par2[item[0]][item[1]] = current2;
        backwardPQ.push([item,
          dist2[item[0]][item[1]] + reverseheuristics[item[0]][item[1]]] );
      }
    }
    grid[current1[0]][current1[1]] = 2;
    grid[current2[0]][current2[1]] = 6;
    grid[start[0]][start[1]]=3;
    grid[end[0]][end[1]]=4;
    this.setState({grid});
    if (ok === 1) {
      break;
    }
  }

  // Retrieving the found path
  let ptr = meetpoint1;

  while (true) {
    this.state.path = [...this.state.path, ptr];
    if (ptr === undefined) {
      reached = false;
      break;
    } else if (ptr[0] === start[0] && ptr[1] === start[1]) {
      break;
    } else {
      ptr = par1[ptr[0]][ptr[1]];
    }
  }
  if (!reached) {
    this.showModal(); // return not found
    this.setState({visual: false});
    return;
  }
  this.state.path = this.state.path.reverse();
  ptr = meetpoint2;
  let pth2= [];
  ok = true;
  while (ok) {
    pth2 = [...pth2, ptr];
    if (ptr === undefined) {
      reached = false;
      ok = false;
    } else if (ptr[0] === end[0] && ptr[1] === end[1]) {
      ok = false;
    } else {
      ptr = par2[ptr[0]][ptr[1]];
    }
  }
  if (!reached) {
    this.showModal(); // return not found
    this.setState({visual: false});
    return;
  }
  pth2 = pth2.reverse();
  this.state.path = this.state.path.concat(pth2);
  // console.log(this.state.path);
  await this.pathdisplay(this.state.path);
};
