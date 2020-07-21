import PriorityQueue from '../priorityq';
import {biNeighbors} from './Utility';
export const BidirectionalDijkstra = async function() {
  const start = this.state.start; const end = this.state.end;
  const height = this.state.height; const width = this.state.width;
  const speed = this.state.speed;
  let meetpoint1; let meetpoint2;
  this.setState({pointer: start[0], pointer2: end[0]});
  const visited1 = Array(height).fill().map(() => Array(width).fill(0));
  const visited2 = Array(height).fill().map(() => Array(width).fill(0));
  const forwardPQ = new PriorityQueue();
  forwardPQ.enqueue(start[0], 0);
  const forwardDP = Array(height)
      .fill()
      .map(() => Array(width).fill([]));
  const backwardPQ = new PriorityQueue();
  backwardPQ.enqueue(end[0], 0);
  const backwardDP= Array(height)
      .fill()
      .map(() => Array(width).fill([]));
  let ok = 0;
  while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
    const grid = this.state.grid;
    const current1 = forwardPQ.front().element;
    const current2 = backwardPQ.front().element;
    this.setState({pointer: current1, pointer2: current2});
    await new Promise((done) => setTimeout(() => done(), speed));
    visited1[current1[0]][current1[1]] = 1;
    visited2[current2[0]][current2[1]] = 1;
    forwardPQ.dequeue();
    backwardPQ.dequeue();
    let item = biNeighbors(current1[0], current1[1], this.state.grid);
    for (let i =0; i < item.length; i++) {
      if (item[i][0] === start[0] && item[i][1] === start[1]) continue;
      if (visited2[item[i][0]][item[i][1]] === 1) {
        meetpoint2 = item[i];
        meetpoint1 = current1;
        ok = 1;
        break;
      }
      if ((forwardDP[item[i][0]][item[i][1]].length === 0) ||
          (forwardDP[item[i][0]][item[i][1]].length >
              forwardDP[current1[0]][current1[1]].length + 1)) {
        forwardPQ.enqueue([item[i][0], item[i][1]],
            (forwardDP[item[i][0]][item[i][1]].length+1));
        forwardDP[item[i][0]][item[i][1]] =
            [...forwardDP[current1[0]][current1[1]], current1];
        grid[current1[0]][current1[1]] = 2;
        this.setState({grid, pointer: current1});
        await new Promise((done) => setTimeout(() => done(), speed));
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
        backwardPQ.enqueue([item[i][0], item[i][1]],
            (backwardDP[item[i][0]][item[i][1]].length+1));
        backwardDP[item[i][0]][item[i][1]] =
            [...backwardDP[current2[0]][current2[1]], current2];
        grid[current2[0]][current2[1]] = 2;
        this.setState({grid, pointer2: current2});
        await new Promise((done) => setTimeout(() => done(), this.state.speed));
      }
    }
    if (ok === 1) break;
  }
  const path = [...forwardDP[meetpoint1[0]][meetpoint1[1]],
    ...backwardDP[meetpoint2[0]][meetpoint2[1]].reverse()];
  await this.pathdisplay(path);
};

