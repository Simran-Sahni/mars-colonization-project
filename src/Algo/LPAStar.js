
let g; let rhs;

export const LPAStar = async function() {
  g = Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(1000000000));
  rhs = Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(1000000000));
  rhs[this.state.start[0][0]][this.state.start[0][1]] = 0;
};

function calculateKey(AppState, i, j) {
  return [Math.min(Math.min(g[i][j], rhs[i][j])) + AppState.state.heuristics[i][j], Math.min(g[i][j], rhs[i][j])];
}

