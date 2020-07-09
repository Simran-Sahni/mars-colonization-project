import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 * @param {props} props
 * @return {*}
 * @constructor
 */
class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      selectedAlgo: props.currentAlgo,
    };
  }
  handleChange(event) {
    const algo = (event.target.getAttribute('id')).toString();
    const setString = 'Visualize  ' + algo + '!';
    console.log(algo); console.log(setString);
    document.getElementById('visualizebtn').innerHTML = '<button id="visualizebtn" class="btn" type="button">'+setString+'</button>';

    this.props.handle(algo);
    this.setState({selectedAlgo: algo});
    console.log(this.state.selectedAlgo);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="navbar-header">
              <a id="refreshButton" className="navbar-brand" href="/App">
                {/* eslint-disable-next-line max-len */}
                                Conquer Mars! <i className="fa fa-rocket"/> <span className="icon" /></a
              >
            </div>
            <ul className="nav navbar-nav">
              <button
                id="visualizebtn"
                className="btn"
                type="button"
                onClick={this.props.visual}
              >
                                Visualize
              </button>
              <li className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                >
                                    Algorithms <span className="caret"/>
                </button>
                <ul className="dropdown-menu">
                  <li id="dijkstra" onMouseDown={(event) => this.handleChange(event)}>
                                        Dijkstra Algorithm
                  </li>
                  <li id="a-star" onMouseDown={(event) => this.handleChange(event)}>
                                        A* Search
                  </li>
                  <li id="dfs" onMouseDown={(event) => this.handleChange(event)}>
                                        DFS
                  </li>
                  <li id="bfs" onMouseDown={(event) => this.handleChange(event)}>
                                        BFS
                  </li>
                  <li id="bestfs" onMouseDown={(event) => this.handleChange(event)}>
                                        Greedy best-first search
                  </li>
                </ul>
              </li>
              <li>
                <button onClick={this.props.randomize} className="btn">
                                    Randomize
                </button>
              </li>
              <li>
                <button onClick = {this.props.clearWalls} className="btn">
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
                                    Speed <span className="caret"/>
                </button>
                <ul className="dropdown-menu">
                  <li onClick={()=> this.props.newSpeed(1)}>Fast
                  </li>
                  <li onClick={() => this.props.newSpeed(350)}>Medium
                  </li>
                  <li onClick={() => this.props.newSpeed(750)}>Slow
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
Navbar.propTypes = {
  clearWalls: PropTypes.func,
  randomize: PropTypes.func,
  newSpeed: PropTypes.func,
  currentAlgo: PropTypes.string,
  selectAlgo: PropTypes.func,
  visual: PropTypes.func,
  handle: PropTypes.func,
};
export default Navbar;
