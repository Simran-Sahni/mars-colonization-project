import React, { Component } from "react";
import Grid from "./Grid";
import Navbar from "./Navbar"
import Modal from  "react-bootstrap/Modal"
import Button from "react-bootstrap/Button"
import {DFS} from "./Algo/dfs";
import {Dijkstra} from "./Algo/Dijkstra";
import {AStar} from "./Algo/AStar";
import {findOptimalVertex} from "./Algo/TSP";
import {aStarForTSP} from "./Algo/TSP";
import {TSP} from "./Algo/TSP";
import {BFS} from "./Algo/BFS";
import {IDAstar} from "./Algo/IDAStar";
import {BiBFS} from "./Algo/BiBFS";
import{BiAstar} from "./Algo/BiAstar";
import {BidirectionalDijkstra} from "./Algo/BidirectionalDijkstra";
import Graph from "./Algo/Graph";
//This is the modal to display path not found
const D = ({ handleClose, show}) => {
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    opacity: "90%",
                    backgroundColor: '#000000',
                    color: '#fee440'
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
class App extends Component {
    state = {
        height: 20, // height of the grid
        width: 20, // width of the grid
        start: [[10, 9]], // start position
        end: [[10, 15]],// end position
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(0)),
        speed: 0.100, // speed for animation
        pointer: [], // store the pointer for visualization
        pointer2:[],//for bidirectional visualization
        modalshow: false,
        heuristics:Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(0)),
        reverseHeuristics:Array(20).fill(undefined, undefined, undefined).map(() => Array(20).fill(0)),
        path: [],
        graph:null,
        changeSource:false,
        changeDestination:false,
        multipledestinations:false,
        visual:false,
        currentAlgo: "Not Selected",
    };
    constructor(props) {
        super(props);
        this.state.grid[this.state.start[0][0]][this.state.start[0][1]] = 3; // special point : start point
        this.state.grid[this.state.end[0][0]][this.state.end[0][1]] = 4; // special point : end point
        this.computeHeuristics();
    }
    DFS = DFS.bind(this);
    BFS = BFS.bind(this);
    Dijkstra = Dijkstra.bind(this);
    AStar = AStar.bind(this);
    TSP = TSP.bind(this);
    aStarForTSP = aStarForTSP.bind(this);
    findOptimalVertex = findOptimalVertex.bind(this);
    IDAstar = IDAstar.bind(this);
    BiBFS = BiBFS.bind(this);
    BiAstar = BiAstar.bind(this);
    BidirectionalDijkstra = BidirectionalDijkstra.bind(this);

    toggleSource=()=>this.setState({changeSource: !this.state.changeSource});
    toggleDestination = ()=>{
        if(this.state.multipledestinations) this.setState({changeDestination: true});
        else this.setState({changeDestination: !this.state.changeDestination});
    }
    changedSource=(i,j)=> {
        let grid = this.state.grid;
        grid[this.state.start[0][0]][this.state.start[0][1]] = 0;
        grid[i][j] = 3; // special point : end point
        this.setState({
            changeSource: !this.state.changeSource,
            start: [[i, j]],
            grid,
        });
    }
    changedDestination = (i,j)=> {
        let grid = this.state.grid;
        grid[i][j] = 4; // special point : end point
        if(!this.state.multipledestinations)
        {grid[this.state.end[0][0]][this.state.end[0][1]] = 0;}
        else{

            this.setState({end: [...this.state.end,[i,j]],grid});
            console.log(this.state.end);return;

        }

        this.setState({
            changeDestination: !this.state.changeDestination,
            end: [[i,j]],
            grid,
        });
    }
    multiDestination = () => {

            this.setState({multipledestinations:!this.state.multipledestinations});

    }
    showModal = () => this.setState({ modalshow: true });
    hideModal = () => this.setState({ modalshow: false });
    computeHeuristics= ()=>{
        const heuristics = this.state.heuristics;
        const start = this.state.start; const end = this.state.end;
        const height = this.state.height; const width = this.state.width;
        for(let i = 0; i < height; i++)
            for(let j = 0; j < width; j++)
                heuristics[i][j] = Math.abs(end[0][0]-i) + Math.abs(end[0][1]-j);
    
        const reverseHeuristics = this.state.reverseHeuristics;
        for(let i = 0; i < height; i++)
            for(let j = 0; j < width; j++)
                reverseHeuristics[i][j] = Math.abs(start[0][0]-i) + Math.abs(start[0][1]-j);
        
        this.setState({heuristics,reverseHeuristics});
    }
    randomizeMatrix = () => {
        this.clearGrid();
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        for (let i = 0; i < this.state.height; i++) {
            for (let j = 0; j < this.state.width; j++) {
                newGrid[i][j] = (Math.floor(Math.random() * 10) % 2); // random values of zero or one to generate a random grid of walls amd empty cells
            }
        }
        newGrid[this.state.start[0][0]][this.state.start[0][1]] = 3; // special point : start
        newGrid[this.state.end[0][0]][this.state.end[0][1]] = 4; // special point : end
        this.setState({grid: newGrid});
    }
    clearGrid = () => {
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        newGrid[this.state.start[0][0]][this.state.start[0][1]] = 3; // special point : start
        newGrid[this.state.start[0][0]][this.state.start[0][1]] = 3; // special point : start
        newGrid[this.state.end[0][0]][this.state.end[0][1]] = 4; // special point : end
        this.setState({grid: newGrid, pointer: []});
    }
    changeState = (x, y) => {
        if (this.state.grid[x][y] === 3) return; // check if the current point is a special point (start or end)
        let grid = this.state.grid;
        if (grid[x][y] === 0 || grid[x][y] === 2) { // if it is a visited cell or empty , make it a wall
            grid[x][y] = 1;
        } else {  // convert a wall to empty cell
            grid[x][y] = 0;
        }
        grid[this.state.start[0][0]][this.state.start[0][1]] = 3;
        grid[this.state.end[0][0]][this.state.end[0][1]] = 4;
        this.setState({grid: grid});
    }
    changeSpeed = (newSpeed) => this.setState({speed:newSpeed});
    selectAlgo = (name) => this.setState({currentAlgo: name});
    visualize = async () => {
        if(this.state.currentAlgo === "Not Selected")return;
        let pointer = this.state.pointer;
        pointer[0] = this.state.start[0][0];
        pointer[1] = this.state.start[0][1];
        this.setState({pointer, visual: true});

        if (this.state.start[0] === this.state.end[0][0] && this.state.start[1] === this.state.end[0][1]) return;

        if (this.state.start[0][0] === this.state.end[0][0] && this.state.start[0][1] === this.state.end[0][1]) return;

        else if (this.state.currentAlgo === "DFS") await this.DFS();
        else if (this.state.currentAlgo === "Dijkstra")  await this.Dijkstra();
        else if(this.state.currentAlgo === "BFS") await this.BFS();
        else if(this.state.currentAlgo === "biDijkstra") await this.BidirectionalDijkstra();
        else if (this.state.currentAlgo === "Best-FS") await this.AStar(0,1);
        else if (this.state.currentAlgo === "A*") await this.AStar(1,1);
        else if(this.state.currentAlgo === "Weighted-AStar")await this.AStar(1,10);
        else if (this.state.currentAlgo === "TSP")
        {
            this.state.graph = new Graph(this.state.grid,this.state.height,this.state.width);
            await this.TSP();
        }
        else if(this.state.currentAlgo === "IDAStar")await this.IDAstar();
        else if(this.state.currentAlgo === "biBFS")await this.BiBFS();
        else if(this.state.currentAlgo === "BiAstar")await  this.BiAstar();

    }
    pathdisplay = async (path) => {
        let grid = this.state.grid;
        for (let i = 1; i < path.length; i++) {
            grid[path[i][0]][path[i][1]] = 5;
            await new Promise((done) => setTimeout(() => done(), this.state.speed));
            this.setState({grid: grid});
        }
        grid[this.state.end[0][0]][this.state.end[0][1]] = 5;
        grid[this.state.start[0][0]][this.state.start[0][1]] = 3;

        await new Promise((done) => setTimeout(() => done(), this.state.speed));
        this.setState({grid: grid,visual: false});
    }
    clearPath = () => {
        let g = this.state.grid,path = this.state.path;
        for(let i = 0; i < path.length; i++)g[path[i][0]][path[i][1]] = 2;
        this.setState({path:[],grid: g});
    }
    render() {
        return (
            <div>
                <div id="navigation">
                    <Navbar randomize={this.randomizeMatrix} clearWalls={this.clearGrid} newSpeed={this.changeSpeed} multiDestination={this.multiDestination}
                            handle={this.selectAlgo} selectedAlgo={this.currentAlgo} visualize={this.visualize} clearPath = {this.clearPath}
                            multipledestinations = {this.state.multipledestinations} visual={this.state.visual}
                            toggleSource= {this.toggleSource} toggleDestination= {this.toggleDestination}/>
                </div>
                <div id="Board">
                    <Grid start={this.state.start} end={this.state.end} height={this.state.height}  multipledestinations = {this.state.multipledestinations}
                          width={this.state.width} grid={this.state.grid} changeState={this.changeState} changesourcefunc={this.changedSource} changedestfunc = {this.changedDestination}
                          pointer={this.state.pointer} pointer2={this.state.pointer2} changeSource = {this.state.changeSource} changeDestination = {this.state.changeDestination} />
                </div>
                <D show={this.state.modalshow} handleClose={this.hideModal} />

            </div>
        );
    }
}
export default App;