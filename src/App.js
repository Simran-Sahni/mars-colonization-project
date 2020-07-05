import React, { Component } from "react";
import PropTypes from 'prop-types';


      function NavBar(){
          return (
           <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a id="refreshButton" className="navbar-brand" href="#">
                        <i className="fa fa-rocket"></i>Conquer Mars!</a
                    >
                </div>
                <ul className="nav navbar-nav">
                    <li className="dropdown">
                        <button
                            className="btn dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                        >
                            Algorithms <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li id="startButtonDijkstra">
                                <a href="#">Dijkstra's Algorithm</a>
                            </li>
                            <li id="startButtonAStar2"><a href="#">A* Search</a></li>
                        </ul>
                    </li>
                    <li>
                        <button className="btn">
                            Randomize
                        </button>
                    </li>
                    <li>
                        <button className="btn">
                            Clear Walls
                        </button>
                    </li>
                    <li>
                        <button className="btn">
                            Clear Path
                        </button>
                    </li>
                    <li className="dropdown">
                        <button
                            className="btn dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                        >
                            Speed <span className="caret"></span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a href="#">Fast</a></li>
                            <li><a href="#">Medium</a></li>
                            <li><a href="#">Slow</a></li>
                        </ul>
                    </li>
                </ul>
            </div>
        </nav>
       );
    }



function Grid(props) {
    const height = props.height; const width = props.width;
    const gridList = [];
    for (let i = 0; i < height; i++) {
        const rowList = [];
        for (let j = 0; j < width; j++) {
            rowList.push(
                <div
                    key={i + j}
                    style={{
                        width: '30px',
                        height: '30px',
                        border: '1px solid black',
                        WebkitUserSelect: 'none',
                    }}
                >

                </div>,
            );
        }
        gridList.push(rowList);
    }
    return (
        <div className="p-4">
            {' '}
            {gridList.map((object, index) => {
                return (
                    <div className="row justify-content-center " key = {index}>
                        {' '}
                        {object}
                        {' '}
                    </div>
                );
            })}{' '}
        </div>
    );
}
Grid.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
};

//ReactDOM.render(<Grid />,document.getElementById("root"));
class App extends Component{
  state = {
    height: 20,
    width: 30,
    start: [15,5],
    end: [15,25],
  };
  render(){
     return(
         <Grid height = {this.state.height} width = {this.state.width}/>
     );
  }
}
export default App;
