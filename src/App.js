import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'
import Grid from "./Grid";
import Navbar from "./navbar"
import PriorityQueue from "./priorityq";

function MyModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                PATH TO THE TARGET NOT FOUND!
            </Modal.Header>
            <Modal.Footer>
                <Modal.Button onClick={props.onHide}>Close</Modal.Button>
            </Modal.Footer>
        </Modal>
    );
}
class App extends Component {
    state = {
        height: 20, // height of the grid
        width: 20, // width of the grid
        start: [10, 2], // start position
        end: [10, 15], // end position
        grid: Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(0)),
        speed: 50, // speed for animation
        pointer: null, // store the pointer for visualization
        modalshow: false,
        heuristics:Array(20).fill(undefined, undefined, undefined).map(() => Array(30).fill(1000000000)),
        path: [],
    };

    constructor() {
        super();
        this.state.grid[this.state.start[0]][this.state.start[1]] = 3; // special point : start point
        this.state.grid[this.state.end[0]][this.state.end[1]] = 4; // special point : end point
        let heuristics = this.state.heuristics;
        for(let i = 0; i < this.state.height; i++)
        {
            for(let j = 0; j < this.state.width; j++)
            {
                heuristics[i][j] = Math.abs(this.state.end[0]-i) + Math.abs(this.state.end[1]-j);
            }
        }
        this.setState({heuristics});

    }
    setModalShow = (val) =>{
        this.setState({modalShow: val});
        if(val===true) setTimeout(() => this.setState({ modalShow: false }), 5000);
    }
    randomizeMatrix = () => {
        this.clearGrid();
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        for (let i = 0; i < this.state.height; i++) {
            for (let j = 0; j < this.state.width; j++) {
                newGrid[i][j] = (Math.floor(Math.random() * 10) % 2); // random values of zero or one to generate a random grid of walls amd empty cells
            }
        }
        newGrid[this.state.start[0]][this.state.start[1]] = 3; // special point : start
        newGrid[this.state.end[0]][this.state.end[1]] = 4; // special point : end
        this.setState({grid: newGrid});
    }
    clearGrid = () => {
        const newGrid = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
        newGrid[this.state.start[0]][this.state.start[1]] = 3; // special point : start
        newGrid[this.state.end[0]][this.state.end[1]] = 4; // special point : end
        this.setState({grid: newGrid, pointer: null});
    }
    changeState = (x, y) => {
        if (this.state.grid[x][y] === 3) return; // check if the current point is a special point (start or end)

        let grid = this.state.grid;
        if (grid[x][y] === 0 || grid[x][y] === 2) { // if it is a visited cell or empty , make it a wall
            grid[x][y] = 1;
        } else {  // convert a wall to empty cell
            grid[x][y] = 0;
        }

        grid[this.state.start[0]][this.state.start[1]] = 3;
        grid[this.state.end[0]][this.state.end[1]] = 4;
        this.setState({grid: grid});
    }
    changeSpeed = (newSpeed) => {
        // console.log(newSpeed);
        if (this.state.speed !== newSpeed)
            this.setState({speed: newSpeed});
    }

    selectAlgo = (name) => {
        // console.log(name);
        this.setState({currentAlgo: name});
        // console.log(this.state.currentAlgo);
    }

    visualize = async () => {
        // console.log(this.state.currentAlgo);
        if (this.state.currentAlgo === "dfs") {
            this.setState({path:[]});
            let stack = [this.state.start];
            let grid = this.state.grid;
            let flag = 1;
            let par = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
            par[this.state.start[0]][this.state.start[1]] = [this.state.start[0], this.state.start[1]];
            let ok = true;
            while (stack.length !== 0) {
                const current = stack[stack.length - 1];
                stack.pop();
                if (current[0] < 0 || current[0] >= this.state.height)
                    continue;
                if (current[1] < 0 || current[1] >= this.state.width)
                    continue;
                if (this.state.grid[current[0]][current[1]] === 2 || this.state.grid[current[0]][current[1]] === 1)
                    continue; // already visited or wall
                if(this.state.grid[current[0]][current[1]] === 3)
                {
                    if(ok)
                    {
                        ok = false;
                    }
                    else
                    {
                        continue;
                    }
                }

                this.state.path = [...this.state.path, [current[0], current[1]]];
                if (grid[current[0]][current[1]] === 4) {
                    this.setState({grid: grid, pointer: current});
                    await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                    //console.log('LOOP BREAK');
                    break;
                } else {
                    let list = [];  //temporary array to store next points
                    list.push([current[0] + 1, current[1]]);  //Go right
                    list.push([current[0], current[1] + 1]);  //Go Above
                    list.push([current[0] - 1, current[1]]);   //Go Left
                    list.push([current[0], current[1] - 1]);   //Go below

                    if (grid[current[0]][current[1]] !== 3) {
                        this.state.grid[current[0]][current[1]] = 2; // mark it as visited
                    }
                    //console.log(list);
                    stack = stack.concat(list);
                }
                this.setState({grid: grid, pointer: current});
                await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
            }
            //console.log(path);
            if (flag === 0) this.setState({grid: grid});
            if (this.state.pointer[0] !== this.state.end[0] || this.state.pointer[1] !== this.state.end[1]) return; // return if path not found
            await this.pathdisplay(this.state.path);

        }

        if (this.state.currentAlgo === "dijkstra" || this.state.currentAlgo === "bfs") {
            this.setState({path:[]});
            let queue = [this.state.start];
            let grid = this.state.grid;
            let dist = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(1000000000));
            let par = Array(this.state.height).fill(undefined, undefined, undefined).map(() => Array(this.state.width).fill(0));
            dist[this.state.start[0]][this.state.start[1]] = 0;
            par[this.state.start[0]][this.state.start[1]] = [this.state.start[0], this.state.start[1]];
            let ok = true;
            while (queue.length !== 0) {
                const current = queue[0];
                queue.shift(); // pop the queue
                if (grid[current[0]][current[1]] === 1 || grid[current[0]][current[1]] === 2)
                    continue;
                if (grid[current[0]][current[1]] === 3) {
                    if (ok) ok = false;
                    else continue;
                }
                if (grid[current[0]][current[1]] === 4) {
                    this.setState({grid: grid, pointer: current});
                    await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                    break;
                } else {
                    let list = [];
                    if (current[0] !== this.state.height - 1 && grid[current[0] + 1][current[1]] !== 2) {
                        if (dist[current[0] + 1][current[1]] > dist[current[0]][current[1]] + 1) {
                            dist[current[0] + 1][current[1]] = dist[current[0]][current[1]] + 1;
                            par[current[0] + 1][current[1]] = [current[0], current[1]];
                        }
                        list.push([current[0] + 1, current[1]]);
                    }
                    if (current[1] !== this.state.width - 1 && grid[current[0]][current[1] + 1] !== 2) {
                        if (dist[current[0]][current[1] + 1] > dist[current[0]][current[1]] + 1) {
                            dist[current[0]][current[1] + 1] = dist[current[0]][current[1]] + 1;
                            par[current[0]][current[1] + 1] = [current[0], current[1]];
                        }

                        list.push([current[0], current[1] + 1]);
                    }
                    if (current[0] !== 0 && grid[current[0] - 1][current[1]] !== 2) {
                        if (dist[current[0] - 1][current[1]] > dist[current[0]][current[1]] + 1) {
                            dist[current[0] - 1][current[1]] = dist[current[0]][current[1]] + 1;
                            par[current[0] - 1][current[1]] = [current[0], current[1]];
                        }
                        list.push([current[0] - 1, current[1]]);
                    }
                    if (current[1] !== 0 && grid[current[0]][current[1] - 1] !== 2) {
                        if (dist[current[0]][current[1] - 1] > dist[current[0]][current[1]] + 1) {
                            dist[current[0]][current[1] - 1] = dist[current[0]][current[1]] + 1;
                            par[current[0]][current[1] - 1] = [current[0], current[1]];
                        }
                        list.push([current[0], current[1] - 1]);
                    }
                    if (grid[current[0]][current[1]] !== 3) {
                        grid[current[0]][current[1]] = 2; // mark it as visited
                    }
                    this.setState({grid: grid, pointer: current});
                    await new Promise((done) => setTimeout(() => done(), this.state.speed));//To slow down the speed of Animation
                    queue = queue.concat(list);
                }
            }
            if (this.state.pointer[0] !== this.state.end[0] || this.state.pointer[1] !== this.state.end[1]) {this.setState({modalShow:true});return;} // return if path not found
            let ptr = [this.state.end[0],this.state.end[1]];
            while(true)
            {

                this.state.path = [...this.state.path,ptr];
                if(ptr[0] === this.state.start[0] && ptr[1] === this.state.start[1])
                {
                    break;
                }
                else
                {
                    ptr = par[ptr[0]][ptr[1]];
                }
            }
            this.state.path = this.state.path.reverse();
            await this.pathdisplay(this.state.path);
        }
        if(this.state.currentAlgo === "bestfs")
        {
            this.setState({path:[]});
            let pq = new PriorityQueue();
            pq.enqueue(this.state.start,this.state.heuristics[this.state.start[0]][this.state.start[1]]);
            let path = Array(30)
                .fill()
                .map(() => Array(40).fill([]));
            while(!pq.isEmpty())
            {

                let grid = this.state.grid;
                let current = pq.front().element;
                pq.dequeue();
                this.setState({current});
                if(grid[current[0]][current[1]] === 4)
                {
                    break;
                }
                if (current[1] !== this.state.width - 1 && (((grid[current[0]][current[1] + 1] === 0) || (grid[current[0]][current[1] + 1] === 4))))
                {
                    if (path[current[0]][current[1] + 1].length === 0 || path[current[0]][current[1] + 1].length > [...path[current[0]][current[1]], current].length) {
                        pq.enqueue([current[0], current[1] + 1], this.state.heuristics[current[0]][current[1] + 1]);
                        path[current[0]][current[1] + 1] = [...path[current[0]][current[1]], current,];
                    }
                }
                if (current[0] !== this.state.height - 1 && ((grid[current[0] + 1][current[1]] === 0) || (grid[current[0] + 1][current[1]] === 4)))
                {
                    if (path[current[0] + 1][current[1]].length === 0 || path[current[0] + 1][current[1]].length > [...path[current[0]][current[1]], current])
                    {
                        pq.enqueue([current[0] + 1, current[1]], this.state.heuristics[current[0] + 1][current[1]]);
                        path[current[0] + 1][current[1]] = [...path[current[0]][current[1]], current,];
                    }
                }
                if (current[0] !== 0 && ((grid[current[0] - 1][current[1]] === 0) || (grid[current[0] - 1][current[1]] === 4)))
                {
                    if (path[current[0] - 1][current[1]].length === 0 || path[current[0] - 1][current[1]].length > [...path[current[0]][current[1]], current])
                    {
                        pq.enqueue([current[0] - 1, current[1]], this.state.heuristics[current[0] - 1][current[1]]);
                        path[current[0] - 1][current[1]] = [...path[current[0]][current[1]], current,];
                    }
                }
                if (current[1] !== 0 && (grid[current[0]][current[1] - 1] === 0 || (grid[current[0]][current[1]-1] === 4)))
                {
                    if (path[current[0]][current[1] - 1].length === 0 || path[current[0]][current[1] - 1].length > [...path[current[0]][current[1]], current].length)
                    {
                        pq.enqueue([current[0], current[1] - 1], this.state.heuristics[current[0]][current[1] - 1]);
                        path[current[0]][current[1] - 1] = [...path[current[0]][current[1]],current,];
                    }
                }
                grid[current[0]][current[1]] = 2;
                this.setState({ grid });
                await new Promise((done) => setTimeout(() => done(), 25)); //To slow down the animation
            }

            this.state.path = path[this.state.end[0]][this.state.end[1]];
            await this.pathdisplay(this.state.path);


        }

        if(this.state.currentAlgo === "a-star")
        {
            this.setState({path:[]});
            let pq = new PriorityQueue();
            pq.enqueue(this.state.start,this.state.heuristics[this.state.start[0]][this.state.start[1]]);
            let dp = Array(30)
                .fill()
                .map(() => Array(40).fill([]));
            while(!pq.isEmpty())
            {

                let grid = this.state.grid;
                let current = pq.front().element;
                pq.dequeue();
                this.setState({current});
                if(grid[current[0]][current[1]] === 4)
                {
                    break;
                }
                if (current[1] !== this.state.width - 1 && (grid[current[0]][current[1] + 1] === 0 || grid[current[0]][current[1] + 1] === 4))
                {
                    if (dp[current[0]][current[1] + 1].length === 0 || dp[current[0]][current[1] + 1].length > [...dp[current[0]][current[1]], current].length) {
                        pq.enqueue([current[0], current[1] + 1], dp[current[0]][current[1]].length+this.state.heuristics[current[0]][current[1] + 1]);
                        dp[current[0]][current[1] + 1] = [...dp[current[0]][current[1]], current,];
                    }
                }
                if (current[0] !== this.state.height - 1 && (((grid[current[0] + 1][current[1]] === 0) || grid[current[0] + 1][current[1]] === 4)))
                {
                    if (dp[current[0] + 1][current[1]].length === 0 || dp[current[0] + 1][current[1]].length > [...dp[current[0]][current[1]], current])
                    {
                        pq.enqueue([current[0] + 1, current[1]], dp[current[0]][current[1]].length+this.state.heuristics[current[0] + 1][current[1]]);
                        dp[current[0] + 1][current[1]] = [...dp[current[0]][current[1]], current,];
                    }
                }
                if (current[0] !== 0 && (grid[current[0] - 1][current[1]] === 0 || (grid[current[0] - 1][current[1]] === 4)))
                {
                    if (dp[current[0] - 1][current[1]].length === 0 || dp[current[0] - 1][current[1]].length > [...dp[current[0]][current[1]], current])
                    {
                        pq.enqueue([current[0] - 1, current[1]], dp[current[0]][current[1]].length+this.state.heuristics[current[0] - 1][current[1]]);
                        dp[current[0] - 1][current[1]] = [...dp[current[0]][current[1]], current,];
                    }
                }
                if (current[1] !== 0 && (grid[current[0]][current[1] - 1] === 0 || (grid[current[0]][current[1]-1] === 4)))
                {
                    if (dp[current[0]][current[1] - 1].length === 0 || dp[current[0]][current[1] - 1].length > [...dp[current[0]][current[1]], current].length)
                    {
                        pq.enqueue([current[0], current[1] - 1], dp[current[0]][current[1]].length+this.state.heuristics[current[0]][current[1] - 1]);
                        dp[current[0]][current[1] - 1] = [...dp[current[0]][current[1]],current,];
                    }
                }
                grid[current[0]][current[1]] = 2; // this node as visited
                this.setState({ grid });
                await new Promise((done) => setTimeout(() => done(), 25)); //To slow down the animation

            }
            this.state.path = dp[this.state.end[0]][this.state.end[1]];
            await this.pathdisplay(this.state.path);
        }


    }
    pathdisplay = async (path) => {
        let grid = this.state.grid;
        for (let i = 1; i < path.length; i++) {
            grid[path[i][0]][path[i][1]] = 5;
            await new Promise((done) => setTimeout(() => done(), 25));
            this.setState({grid: grid});
        }
        grid[this.state.end[0]][this.state.end[1]] = 5;
        await new Promise((done) => setTimeout(() => done(), 25));
        this.setState({grid: grid});
        //To slow down the speed of Animation

    }
    clearPath = () => {
        let grid = this.state.grid;
        let path = this.state.path;
        for(let i = 0; i < path.length; i++)
        {
            grid[path[i][0]][path[i][1]] = 2;
        }
        this.setState({path:[]});
        this.setState({grid});
    }
    render() {
        return (
            <div>
                <div>
                    <Navbar randomize={this.randomizeMatrix} clearWalls={this.clearGrid} newSpeed={this.changeSpeed}
                            handle={this.selectAlgo} selectedAlgo={this.currentAlgo} visual={this.visualize} clearPath = {this.clearPath}/>
                </div>
                <div>
                    <Grid start={this.state.start} end={this.state.end} height={this.state.height}
                          width={this.state.width} grid={this.state.grid} changeState={this.changeState}
                          pointer={this.state.pointer}/>
                </div>
                <MyModal
                    show={this.modalShow}
                    onHide={() => this.setModalShow(false)}
                />

            </div>
        );
    }
}
export default App;