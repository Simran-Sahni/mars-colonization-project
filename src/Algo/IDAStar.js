let heuristics = [];
const ok = false;
let end = [];
const path = [];
let grid = [];

export const IDAstar = async function() {
  heuristics = this.state.heuristics;
  grid = this.state.grid;
  end = this.state.end[0];
};
// trying to impliment https://en.wikipedia.org/wiki/Iterative_deepening_A*#Pseudocode

async function search(AppState, node, g, bound) {

}
function neighbors(i, j) {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isGoodCell(neighbor[0], neighbor[1])) {
      answer.push([neighbor[0], neighbor[1]]);
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
