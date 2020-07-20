import PriorityQueue from './customPriorityQueue';
let g; let rhs; let heuristics;
const Queue = new PriorityQueue((a, b) => a[1] === b[1] ? a[2] < b[2] : a[1] < b[1]);
export const LPAStar = async function() {
  heuristics = this.state.heuristics;
  g = Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(1000000000));
  rhs = Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(1000000000));
  rhs[this.state.start[0][0]][this.state.start[0][1]] = 0;
  g[this.state.start[0][0]][this.state.start[0][1]] = 0;
  console.log([this.state.start, ...calculateKey(this.state.start[0])]);
  Queue.push([this.state.start, ...calculateKey(this.state.start[0])]);
  computeShortestPath(this, Queue);
};

function calculateKey(node) {
  console.log(node[0], node[1]);
  return [Math.min(Math.min(g[node[0]][node[1]],
      rhs[node[0]][node[1]])) + heuristics[node[0]][node[1]],
  Math.min(g[node[0]][node[1]], rhs[node[0]][node[1]])];
}

function getPredecessors(node, grid) {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (neighbor[0] < 0 || neighbor[0] >= 20 || neighbor[1] < 0 || neighbor[1] >= 20) continue;
    if (grid[neighbor[0]][neighbor[1]] === 1) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
}
function getSuccessors(node, grid) {
  const answer = [];
  for (const direction of directions) {
    const neighbor = [i + direction[0], j + direction[1]];
    if (neighbor[0] < 0 || neighbor[0] >= 20 || neighbor[1] < 0 || neighbor[1] >= 20) continue;
    if (grid[neighbor[0]][neighbor[1]] === 0) {
      answer.push([neighbor[0], neighbor[1]]);
    }
  }
  return answer;
}

/** Recalculates rhs for a node and removes it from the queue.
 * If the node has become locally inconsistent, it is (re-)inserted into the queue with its new key. */

function updateNode(node, AppState) {
  if (node[0] !== AppState.state.start[0][0] && node[1] !== AppState.state.start[0][1]) {
    rhs[node[0]][node[1]] = 1000000000;
  }
  const predecessor = getPredecessors(node, AppState.state.grid);
  for (let i = 0; i < predecessor.length; i++) {
    rhs[node[0]][node[1]] = Math.min(rhs[node[0]][node[1]], g[item[i][0]][item[i][1]] + 1);
  }
  /**
   //  if (queue.contains(node))           impliment contains method for the queue
   // queue.remove(node);
   // if (node.g != node.rhs)
   // queue.insert(node, calculateKey(node));
   }
   */
}
/** Expands the nodes in the priority queue. */
function computeShortestPath(AppState) {
  while (Queue._greater(calculateKey(AppState.state.end[0]), Queue.peek()) ||
    rhs[AppState.state.end[0][0]][AppState.state.end[0][1]] !== g[AppState.state.end[0][0]][AppState.state.end[0][1]]) {
    const node = Queue.pop()[0];
    AppState.setState({pointer: node});
    if (g[node[0]][node[1]] > rhs[node[0]][node[1]]) {
      g[node[0]][node[1]] = rhs[node[0]][node[1]];
      const successor = getSuccessors(node, AppState.state.grid);
      for (let i = 0; i < successor.length; i++) {
        updateNode(item[i]);
      }
    } else {
      g[node[0]][node[1]] = 1000000000;
      updateNode(node);
      const successor = getSuccessors(node, AppState.state.grid);
      for (let i = 0; i < successor.length; i++) {
        updateNode(item[i]);
      }
    }
  }
}

const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
