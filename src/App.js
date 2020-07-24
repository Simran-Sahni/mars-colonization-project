import React, {Component} from "react";
import Grid from "./components/Grid";
import Navbar from "./components/Navbar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {DFS} from "./Algo/dfs";
import {Dijkstra} from "./Algo/Dijkstra";
import {AStar} from "./Algo/AStar";
import {findOptimalVertex} from "./Algo/TSP";
import {aStarForTSP} from "./Algo/TSP";
import {TSP} from "./Algo/TSP";
import {BFS} from "./Algo/BFS";
import {BiBFS} from "./Algo/BiBFS";
import {BiAstar} from "./Algo/BiAstar";
import {BidirectionalDijkstra} from "./Algo/BidirectionalDijkstra";
import Graph from "./Algo/Graph";
// This is the modal to display path not found
const D = ({handleClose, show}) => {
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{
          opacity: "90%",
          backgroundColor: "#000000",
          color: "#fee440",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Uh-Oh!!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
                    PATH TO THE TARGET NOT FOUND!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
//This is the path length modal, shown after the process
const PathModal = ({handleClose, show, pathlength}) => {
  return (
      <>
        <Modal
            show={show}
            onHide={handleClose}
            style={{
              marginLeft:'0',
              opacity:'70%',

            }}
        >
          <Modal.Header closeButton>
            Path length:  {pathlength}
          </Modal.Header>
         </Modal>
      </>
  );
};
/**
 * Class for our Application
 */
class App extends Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      height: 17, // height of the grid
      width: 30, // width of the grid
      start: [[10, 9]], // start position
      end: [[10, 15]], // end position
      grid: Array(20).fill().map(() => Array(20).fill(0)),
      speed: 0.100, // speed for animation
      pointer: [], // store the pointer for visualization
      pointer2: [], // for bidirectional visualization
      modalshow: false,
      heuristics: Array(20).fill().map(() => Array(20).fill(0)),
      reverseHeuristics: Array(20).fill().map(() => Array(20).fill(0)),
      path: [],
      graph: null,
      changeSource: false,
      changeDestination: false,
      multipledestinations: false,
      visual: false,
      pathmodal:false,
      pathlength: 0,
      currentAlgo: "Not Selected",
      bi: false, // boolean indicator for bidirectional algos
    };
    this.state.grid[this.state.start[0][0]][this.state.start[0][1]] = 3;
    // special point : start point

    this.state.grid[this.state.end[0][0]][this.state.end[0][1]] = 4;
    // special point : end point

    this.computeHeuristics();
  }
    dfs = DFS.bind(this);
    bfs= BFS.bind(this);
    dijkstra = Dijkstra.bind(this);
    aStar = AStar.bind(this);
    tsp = TSP.bind(this);
    aStarForTSP = aStarForTSP.bind(this);
    findOptimalVertex = findOptimalVertex.bind(this);
    biBFS = BiBFS.bind(this);
    biAstar = BiAstar.bind(this);
    bidirectionalDijkstra = BidirectionalDijkstra.bind(this);

    toggleSource=() => this.setState({changeSource: !this.state.changeSource});
    toggleDestination = () => {
        this.setState({changeDestination: !this.state.changeDestination});
    }
    changedSource=(i, j) => {
      const grid = this.state.grid;
      grid[this.state.start[0][0]][this.state.start[0][1]] = 0;
      grid[parseInt(i, 10)][parseInt(j, 10)] = 3; // special point : end point
      this.setState({
        changeSource: !this.state.changeSource,
        start: [[i, j]],
        grid,
      });
    }
    changedDestination = (i, j) => {
      const grid = this.state.grid;
      grid[parseInt(i, 10)][parseInt(j, 10)] = 4; // special point : end point
      if (this.state.multipledestinations && this.state.changeDestination) {
        this.setState({end: [...this.state.end, [i, j]], grid});
        return;
      } else {
        grid[this.state.end[0][0]][this.state.end[0][1]] = 0;
      }

      this.setState({
        changeDestination: !this.state.changeDestination,
        end: [[i, j]],
        grid,
      });
    }
    multiDestination = () => {
      this.setState({multipledestinations: !this.state.multipledestinations});
    }
    showModal = () => this.setState({modalshow: true});
    hideModal = () => this.setState({modalshow: false});
    hidePathModal = () => this.setState({pathmodal: false});
    computeHeuristics= () => {
      const heuristics = this.state.heuristics;
      const start = this.state.start; const end = this.state.end;
      const height = this.state.height; const width = this.state.width;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          heuristics[parseInt(i, 10)][parseInt(j, 10)] =
              Math.abs(end[0][0]-i) + Math.abs(end[0][1]-j);
        }
      }

      const reverseHeuristics = this.state.reverseHeuristics;
      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          reverseHeuristics[parseInt(i, 10)][parseInt(j, 10)] =
              Math.abs(start[0][0]-i) + Math.abs(start[0][1]-j);
        }
      }

      this.setState({heuristics, reverseHeuristics});
    }
    randomizeMatrix = () => {
      this.clearGrid();
      const newGrid = Array(this.state.height).fill().map(() =>
        Array(this.state.width).fill(0));
      for (let i = 0; i < this.state.height; i++) {
        for (let j = 0; j < this.state.width; j++) {
          newGrid[parseInt(i, 10)][parseInt(j, 10)] =
              (Math.floor(Math.random() * 10) % 2);
          // random values of zero or one to generate a random grid of
          // walls amd empty cells
        }
      }
      newGrid[this.state.start[0][0]][this.state.start[0][1]] = 3;
      // special point : start
      newGrid[this.state.end[0][0]][this.state.end[0][1]] = 4;
      // special point : end
      this.setState({grid: newGrid});
    }
    clearGrid = () => {
      const newGrid = Array(this.state.height).fill().map(() =>
        Array(this.state.width).fill(0));
      newGrid[this.state.start[0][0]][this.state.start[0][1]] = 3;
      // special point : start
      newGrid[this.state.end[0][0]][this.state.end[0][1]] = 4;
      // special point : end
      this.setState({grid: newGrid, pointer: [], pointer2: []});
    }
    changeState = (x, y) => {
      if (this.state.grid[parseInt(x, 10)][parseInt(y, 10)] === 3) {
        return;
      } // check if the current point is a special point (start or end)
      const grid = this.state.grid;
      if (grid[parseInt(x, 10)][parseInt(y, 10)] === 0 ||
          grid[parseInt(x, 10)][parseInt(y, 10)] === 2) {
        // if it is a visited cell or empty , make it a wall
        grid[parseInt(x, 10)][parseInt(y, 10)] = 1;
      } else { // convert a wall to empty cell
        grid[parseInt(x, 10)][parseInt(y, 10)] = 0;
      }
      grid[this.state.start[0][0]][this.state.start[0][1]] = 3;
      grid[this.state.end[0][0]][this.state.end[0][1]] = 4;
      this.setState({grid});
    }
    changeSpeed = (newSpeed) => this.setState({speed: newSpeed});
    selectAlgo = (name) => this.setState({currentAlgo: name});
    visualize = async () => {
      if (this.state.currentAlgo === "Not Selected") {
        return;
      }
      const pointer = this.state.pointer;
      pointer[0] = this.state.start[0][0];
      pointer[1] = this.state.start[0][1];
      this.setState({pointer, visual: true});

      if (this.state.start[0] === this.state.end[0][0] &&
          this.state.start[1] === this.state.end[0][1]) {
        return;
      }

      if (this.state.start[0][0] === this.state.end[0][0] &&
          this.state.start[0][1] === this.state.end[0][1]) {
        return;
      } else if (this.state.currentAlgo === "DFS") {
        await this.dfs();
      } else if (this.state.currentAlgo === "Dijkstra") {
        await this.dijkstra();
      } else if (this.state.currentAlgo === "BFS") {
        await this.bfs();
      } else if (this.state.currentAlgo === "biDijkstra") {
        await this.bidirectionalDijkstra();
      } else if (this.state.currentAlgo === "Best-FS") {
        await this.aStar(0, 1);
      } else if (this.state.currentAlgo === "A*") {
        await this.aStar(1, 1);
      } else if (this.state.currentAlgo === "Weighted-AStar") {
        await this.aStar(1, 10);
      } else if (this.state.currentAlgo === "TSP") {
        this.state.graph =
            new Graph(this.state.grid, this.state.height, this.state.width);
        await this.tsp();
      } else if (this.state.currentAlgo === "biBFS") {
        await this.biBFS();
      } else if (this.state.currentAlgo === "BiAstar") {
        await this.biAstar();
      }
    }
    pathdisplay = async (path) => {
      const grid = this.state.grid;
      console.log(this.state.path);
      for (let i = 1; i < path.length; i++) {
        grid[path[parseInt(i, 10)][0]][path[parseInt(i, 10)][1]] = 5;
        await new Promise((done) => setTimeout(() => done(), this.state.speed));
        this.setState({grid});
      }

       grid[this.state.end[0][0]][this.state.end[0][1]] = 4;
       grid[this.state.start[0][0]][this.state.start[0][1]] = 3;

      await new Promise((done) => setTimeout(() => done(), this.state.speed));
      this.setState({grid, visual: false,
        pathlength: path.length,
        pathmodal:true,
        bi: false, pointer: [], pointer2: []});
    }
    clearPath = () => {
      const g = this.state.grid;
      for (let i = 0; i < this.state.height; i++) {
        for (let j = 0; j < this.state.width; j++) {
          if (g[parseInt(i, 10)][parseInt(j, 10)] === 5) {
            g[parseInt(i, 10)][parseInt(j, 10)] = 2;
          }
        }
      }
      this.setState({path: [], grid: g});
    }
    render() {
      return (
        <div>
          <div id="navigation">
            <Navbar randomize={this.randomizeMatrix}
              clearWalls={this.clearGrid}
              newSpeed={this.changeSpeed}
              multiDestination={this.multiDestination}
              handle={this.selectAlgo}
              selectedAlgo={this.currentAlgo}
              visualize={this.visualize}
              clearPath = {this.clearPath}
              multipledestinations = {this.state.multipledestinations}
              visual={this.state.visual}
              toggleSource= {this.toggleSource}
              toggleDestination=
                {this.toggleDestination}/>
          </div>
          <div id="Board">
            <Grid start={this.state.start} end={this.state.end}
              height={this.state.height}
              multipledestinations = {this.state.multipledestinations}
              bi={this.state.bi}
              width={this.state.width}
              grid={this.state.grid}
              changeState={this.changeState}
              changesourcefunc={this.changedSource}
              changedestfunc = {this.changedDestination}
              pointer={this.state.pointer}
              pointer2={this.state.pointer2}
              changeSource = {this.state.changeSource}
              changeDestination = {this.state.changeDestination} />
          </div>
          <D show={this.state.modalshow} handleClose={this.hideModal} />
          <PathModal show={this.state.pathmodal} handleClose={this.hidePathModal} pathlength={this.state.pathlength} />

        </div>
      );
    }
}
export default App;
