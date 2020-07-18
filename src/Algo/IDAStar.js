import App from '../App';

export const IDAstar = async function() {
  let ok = false;
  heuristics = this.state.heuristics;
  grid = this.state.grid;
  end = this.state.end[0];
  // console.log(end);
  this.computeHeuristics();
  const root = [this.state.start[0][0], this.state.start[0][1]];
  let bound = heuristics[root[0]][root[1]];
  path = [...path, root];
  const i = 0;
  while (true) {
    const t = search(this, root, 0, bound);
    if (ok) {
      break;
    }
    if (t === true) return root;
    if (t === 50) return [];

    if (ok) {
      break;
    }
    bound = t;
  }
  // console.log(path);
  this.pathdisplay(path);
};
// trying to impliment https://en.wikipedia.org/wiki/Iterative_deepening_A*#Pseudocode

function search(AppState, node, g, bound) {

  path = [...path, node];

  if (node[0] === end[0] && node[1] === end[1]) {
    ok = true;
    return true;
  }

  const f = g + heuristics[node[0]][node[1]];
  if (f > bound) return f;
  if (node[0] === end[0] && node[1] === end[1]) {
       ok = true;
    return true;
  }
  let min = 50;
  const neighborr = neighbors(node[0], node[1]);
  for (let i = 0; i < neighborr.length; i++) {
    if (ok) {
      return true;
    }

    const t = search(AppState, neighborr[i], g+1, bound);
    if (ok) return true;
    if (t === true) {
      return true;
    } else if (t < min) {
      min = t;
    }
  }
  return min;
}
function neighbors(i, j) {
  let answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isGoodCell(neighbor[0], neighbor[1])) {
      answer = [...answer, [neighbor[0], neighbor[1]]];
    }
  }

  return answer;
}
const isGoodCell = (i, j) =>{
  if (i < 0 || i >=20 || j < 0 || j >=20) return false;
  if (grid[i][j] === 1) return false;
  return true;
};

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
