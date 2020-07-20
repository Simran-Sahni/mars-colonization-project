import PriorityQueue from '../priorityq';


export const BiAstar = async function() {
  const reverseHeuristics = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  let meetpoint1; let meetpoint2;
  for (let i = 0; i < 20; i++) {
    for (let j = 0; j < 20; j++) {
      reverseHeuristics[i][j] = Math.abs(i-this.state.start[0][0]) + Math.abs(j-this.state.start[0][0]);
    }
  }
  this.setState({path: [], pointer: this.state.start[0], pointer2: this.state.end[0]});
  const visited1 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  const visited2 = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  const forwardPQ = new PriorityQueue();
  forwardPQ.enqueue(this.state.start[0], this.state.heuristics[this.state.start[0][0]][this.state.start[0][1]]);
  const forwardDP = Array(20)
      .fill()
      .map(() => Array(20).fill([]));

  const backwardPQ = new PriorityQueue();
  backwardPQ.enqueue(this.state.end[0], reverseHeuristics[this.state.end[0][0]][this.state.end[0][1]]);
  const backwardDP = Array(20)
      .fill()
      .map(() => Array(20).fill([]));
  let ok = 0;
  while (!forwardPQ.isEmpty() && !backwardPQ.isEmpty()) {
    const grid = this.state.grid;
    const current1 = forwardPQ.front().element;
    const current2 = backwardPQ.front().element;
    this.setState({pointer: current1, pointer2: current2});
    visited1[current1[0]][current1[1]] = 1;
    visited2[current2[0]][current2[1]] = 1;
    forwardPQ.dequeue();
    backwardPQ.dequeue();

    let item = neighbors(current1[0], current1[1], this.state.grid);
    //  console.log(item);

    for (let i =0; i < item.length; i++) {
      if (visited2[item[i][0]][item[i][1]] === 1) {
        meetpoint2 = item[i];
        meetpoint1 = current1;
        ok = 1;
        break;
      }
      if ((forwardDP[item[i][0]][item[i][1]].length === 0) || (forwardDP[item[i][0]][item[i][1]].length > forwardDP[current1[0]][current1[1]].length + 1)) {
        forwardPQ.enqueue([item[i][0], item[i][1]], (forwardDP[item[i][0]][item[i][1]].length+1) + this.state.heuristics[item[i][0]][item[i][1]]);
        forwardDP[item[i][0]][item[i][1]] = [...forwardDP[current1[0]][current1[1]], current1];
      }
      grid[current1[0]][current1[1]] = 2; // this node as visited
      this.setState({grid, pointer: current1});
      await new Promise((done) => setTimeout(() => done(), this.state.speed)); // To slow down the animation
    }
    // console.log('Radhesh');

    item = neighbors(current2[0], current2[1], this.state.grid);
    // console.log(item);
    for (let i =0; i < item.length; i++) {
      if (visited1[item[i][0]][item[i][1]] === 1) {
        meetpoint2 = current2;
        meetpoint1 = item[i];
        ok = 1;
        break;
      }
      if ((backwardDP[item[i][0]][item[i][1]].length === 0) || (backwardDP[item[i][0]][item[i][1]].length > backwardDP[current2[0]][current2[1]].length + 1)) {
        backwardPQ.enqueue([item[i][0], item[i][1]], (backwardDP[item[i][0]][item[i][1]].length+1) + reverseHeuristics[item[i][0]][item[i][1]]);
        backwardDP[item[i][0]][item[i][1]] = [...backwardDP[current2[0]][current2[1]], current2];
      }
      grid[current2[0]][current2[1]] = 2; // this node as visited
      this.setState({grid, pointer2: current2});
      await new Promise((done) => setTimeout(() => done(), this.state.speed)); // To slow down the animation
    }
    // console.log('Radhesh');
    if (ok === 1) break;
  }
  // console.log(meetpoint1);
  // console.log(meetpoint2);

  // console.log(forwardDP);
  // console.log(backwardDP);

  //  console.log(forwardDP[meetpoint1[0]][meetpoint1[1]]);
  // console.log(backwardDP[meetpoint2[0]][meetpoint2[1]]);

  this.state.path = [...forwardDP[meetpoint1[0]][meetpoint1[1]], ...backwardDP[meetpoint2[0]][meetpoint2[1]].reverse()];

  await this.pathdisplay(this.state.path);
};


function neighbors(i, j, grid) {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
}
const isFeasable = (i, j, grid) =>{
  if (i < 0 || i >=20 || j < 0 || j >=20) return false;
  if (grid[i][j]===1 || grid[i][j] === 3 || grid[i][j] === 4) return false;
  return true;
};
const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
