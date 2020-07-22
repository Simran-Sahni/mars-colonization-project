const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const isFeasable = (i, j, grid) => {
  if (i < 0 || i >=grid.length || j < 0 || j >=grid[0].length) {
    return false;
  }
  return (grid[i][j] === 0 || grid[i][j] === 4);
};

const isFeasable2 = (i, j, grid) =>{
  if (i < 0 || i >=grid.length || j < 0 || j >=grid[0].length) return false;
  return !(grid[i][j] === 1 || grid[i][j] === 3 || grid[i][j] === 4);
};

export const neighbors = (i, j, grid) =>{
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
};

export const biNeighbors = (i, j, grid) => {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (isFeasable2(neighbor[0], neighbor[1], grid)) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
};


