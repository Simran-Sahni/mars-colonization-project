import PriorityQueue from "./customPriorityQueue";
export const TSP = async function() {
  const unvisited = new Set();
  for (const item of this.state.end) {
    unvisited.add(item);
  }
  let now = this.state.start[0];
  let totalpath = [];
  while (unvisited.size) {
    const togo = this.findOptimalVertex(this, unvisited, now);
    unvisited.delete(togo);
    const newpath = await this.aStarForTSP(this, now, togo);
    totalpath = totalpath.concat(newpath);
    now = togo;
  }
  await this.pathdisplay(totalpath);
};

export const aStarForTSP = async function(AppState, start, end) {
  const heuristics = AppState.state.heuristics;
  for (let i = 0; i < AppState.state.height; i++) {
    for (let j = 0; j < AppState.state.width; j++) {
      heuristics[parseInt(i, 10)][parseInt(j, 10)] =
          Math.abs(end[0]-i) + Math.abs(end[1]-j);
    }
  }
  AppState.setState({heuristics,
    path: [], pointer: start, bi: true});
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  pq.push([start, AppState.state.heuristics[start[0]][start[1]]]);
  const dp = Array(30)
      .fill()
      .map(() => Array(40).fill([]));
  while (!pq.isEmpty()) {
    const grid = AppState.state.grid;
    const current = pq.peek()[0];
    pq.pop();
    AppState.setState({current});
    if (grid[current[0]][current[1]] === 4) {
      AppState.setState({grid, pointer: current});
      break;
    }
    if (current[1] !== AppState.state.width - 1 &&
        (grid[current[0]][current[1] + 1] === 0 ||
            grid[current[0]][current[1] + 1] === 4)) {
      if (dp[current[0]][current[1] + 1].length === 0 ||
          dp[current[0]][current[1] + 1].length >
          [...dp[current[0]][current[1]], current].length) {
        // pq.enqueue([current[0], current[1] + 1],
        //     dp[current[0]][current[1]].length+
        //     AppState.state.heuristics[current[0]][current[1] + 1]);
        pq.push([[current[0], current[1] + 1],
          dp[current[0]][current[1]].length+
        AppState.state.heuristics[current[0]][current[1] + 1]]);
        dp[current[0]][current[1] + 1] =
            [...dp[current[0]][current[1]], current];
      }
    }
    if (current[0] !== AppState.state.height - 1 &&
        ((grid[current[0] + 1][current[1]] === 0) ||
            grid[current[0] + 1][current[1]] === 4)) {
      if (dp[current[0] + 1][current[1]].length === 0 ||
          dp[current[0] + 1][current[1]].length >
          [...dp[current[0]][current[1]], current]) {
        // pq.enqueue([current[0] + 1, current[1]],
        //     dp[current[0]][current[1]].length+
        //     AppState.state.heuristics[current[0] + 1][current[1]]);

        pq.push([[current[0] + 1, current[1]],
          dp[current[0]][current[1]].length+
        AppState.state.heuristics[current[0] + 1][current[1]]]);
        dp[current[0] + 1][current[1]] =
            [...dp[current[0]][current[1]], current];
      }
    }
    if (current[0] !== 0 && (grid[current[0] - 1][current[1]] === 0 ||
        (grid[current[0] - 1][current[1]] === 4))) {
      if (dp[current[0] - 1][current[1]].length === 0 ||
          dp[current[0] - 1][current[1]].length >
          [...dp[current[0]][current[1]], current]) {
        // pq.enqueue([current[0] - 1, current[1]],
        //     dp[current[0]][current[1]].length+
        //     AppState.state.heuristics[current[0] - 1][current[1]]);

        pq.push([[current[0] - 1,
          current[1]], dp[current[0]][current[1]].length+
        AppState.state.heuristics[current[0] - 1][current[1]]]);
        dp[current[0] - 1][current[1]] =
            [...dp[current[0]][current[1]], current];
      }
    }
    if (current[1] !== 0 && (grid[current[0]][current[1] - 1] === 0 ||
        (grid[current[0]][current[1]-1] === 4))) {
      if (dp[current[0]][current[1] - 1].length === 0 ||
          dp[current[0]][current[1] - 1].length >
          [...dp[current[0]][current[1]], current].length) {
        // pq.enqueue([current[0], current[1] - 1],
        //     dp[current[0]][current[1]].length+
        //     AppState.state.heuristics[current[0]][current[1] - 1]);
        pq.push([[current[0], current[1] - 1],
          dp[current[0]][current[1]].length+
        AppState.state.heuristics[current[0]][current[1] - 1]]);
        dp[current[0]][current[1] - 1] =
            [...dp[current[0]][current[1]], current];
      }
    }
    grid[current[0]][current[1]] = 2; // AppState node as visited
    AppState.setState({grid, pointer: current});
    await new Promise((done) =>
      setTimeout(() => done(), AppState.state.speed));
  }
  const grid = AppState.state.grid;
  for (let i = 0; i < AppState.state.height; i++) {
    for (let j = 0; j < AppState.state.width; j++) {
      if (grid[i][j] ===2) {
        grid[i][j] = 0;
      }
    }
  }
  grid[start[0]][start[1]] = 0;
  grid[end[0]][end[1]] = 3;
  await AppState.setState({grid});
  return dp[end[0]][end[1]];
};
export const findOptimalVertex = (AppState, unvisited, source) =>{
  const pq = new PriorityQueue((a, b) => a[1] < b[1]);
  const sourceMapped = AppState.state.graph.map2[source];
  for (const item of unvisited) {
    const destinationMapped = AppState.state.graph.map2[item];
    pq.push([item,
      AppState.state.graph.allPairShortest[sourceMapped][destinationMapped]]);
  }
  return pq.peek()[parseInt(0, 10)];
};
