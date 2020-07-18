import App from '../App';
export const FringeSearch = async function() {
  const fringe = [this.state.start];
  const start=this.state.start;
  const heuristics = this.state.heuristics;
  grid = this.state.grid;
  const end = this.state.end[0];// does the work of both lists 'new' and 'later' by storing fringes
  const isGoodCell = (i, j) =>{
    if (i < 0 || i >=20 || j < 0 || j >=20) return false;
    if (grid[i][j] === 1 || grid[i][j] === 2) return false;
    return true;
  };

  path = this.state.path;

  const par = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
  const cache = par;
  par[this.state.start[0][0]][this.state.start[0][1]] = [this.state.start[0][0], this.state.start[0][1]];
  // cache stores the last marker or visited nodes
  const directions = [[1, 0], [-1, 0], [0, -1], [0, 1]];

  this.computeHeuristics();
  const flimit = heuristics[start[0][0]][start[0][1]]; // initial threshold
  let found = false;
  while ((found === false) && (fringes.length !==0)) {
    let fmin = 1000000;
    for ( const node in fringes ) {
      g = cache[node[0]][node[1]];
      f = g + heuristics[node[0]][node[1]];
      if (f > flimit) {
        fmin = Math.min(f, fmin);
        continue;
      }
      if (node[0] === end[0] && node[1]===end[1]) {
        found = true;
        break;
      }
      for (const direction in directions) {
        const curr = [node[0] + direction[0], node[1] + direction[1]];
        if (!isGoodCell(curr[0], curr[1])) {
          continue;
        }
        const g_child = g;
      }
    }
  }
};
