import React from "react";
import PropTypes from "prop-types";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
/**
 *
 * @param {props} props
 * @return {*}
 * @constructor
 */
class Navbar extends React.Component {
  /**
   *@param {props} props
   */
  constructor(props) {
    super(props);
    this.state={
      selectedAlgo: props.currentAlgo,
      checkedA: false,
    };
  }

  /**
   * changes state in app when user toggles the switch for multiple destination
   */
  hc() {
      if (!this.state.checkedA) {
          this.editButtons();
      } else {
          document.getElementById('chngDestBtn').innerHTML = 'Change Destination';
          this.props.multiDestination();
      }
      this.setState({checkedA: !this.state.checkedA});
  }


    editButtons() {
        document.getElementById('chngDestBtn').innerHTML = 'Add Destination';
        this.props.multiDestination();
    }
  /**
   * Changes the Visualize Algo button according to the state
   * @param {anything} event
   */
  handleChange(event) {
    const algo = (event.target.getAttribute("id")).toString();
    const setString = "Visualize  " + algo + "!";
    document.getElementById("visualizebtn").innerHTML =
        "<button id='visualizebtn' " +
        "class='btn' " +
        "type='button' " +
        "style='font-weight:bold'>" +
        setString +
        "</button>";

    this.props.handle(algo);
    this.setState({selectedAlgo: algo});
  }
  /**
   *
   * @return {*}
   */
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid">
            <div className="navbar-header">
              <a id="refreshButton"
                className="navbar-brand"
                href="https://simran-sahni.github.io/mars-colonization-project/App">
                {/* eslint-disable-next-line max-len */}
                  Conquer Mars! <i className="fa fa-rocket"/>
                <span className="icon" />
              </a>
            </div>
            <ul className="navbar-nav">
              <FormGroup>
                <FormControlLabel
                  control={<Switch color = "primary"
                    checked={this.state.checkedA}
                    onChange={() => this.hc()} />
                  }
                  label="Multiple Destinations"
                  style={{color: "peachpuff"}}

                />
              </FormGroup>
              <li className="nav-item">
                <button onClick={this.props.toggleSource}
                  className="btn"
                  style={{
                    backgroundColor: "#71b340",
                  }}
                  disabled={this.props.visual}
                >
                    Change Source
                </button>
              </li>
              <li className="nav-item"
                >
                <button onClick={this.props.toggleDestination}
                  className="btn"
                  id="chngDestBtn"
                  style={{
                    backgroundColor: "#6a040f",
                    color: "peachpuff",
                  }}
                  disabled={this.props.visual}
                >
                    Change Destination
                </button>
              </li>
              <li className="nav-item">

                <button
                  id="visualizebtn"
                  className="btn"
                  type="button"
                  style={{fontWeight: "bolder"}}
                  onClick={this.props.visualize}
                  disabled={this.props.visual}
                >
                    Visualize
                </button>
              </li>
              <li className="nav-item dropdown"
                id = "AlgosList">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  disabled={this.props.visual}
                >
                    Algorithms <span className="caret"/>
                </button>
                <ul className="dropdown-menu">
                  <li >
                    <button id="Dijkstra"
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Dijkstra Algorithm</button>
                  </li>
                  <li >
                    <button id="A*"
                      disabled={this.props.multipledestinations}
                      onClick={(event) => this.handleChange(event)}>
                        A* Search </button>
                  </li>
                  <li >
                    <button id="DFS"
                      disabled={this.props.multipledestinations}
                      onClick={(event) => this.handleChange(event)}>
                        DFS </button>
                  </li>
                  <li >
                    <button id="BFS"
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        BFS</button>
                  </li>
                  <li >
                    <button id="biDijkstra"
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Bidirectional Dijkstra</button>
                  </li>
                  <li >
                    <button id='biBFS'
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Bidirectional BFS </button>
                  </li>
                  <li>
                    <button id='Best-FS'
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Greedy best-first search
                    </button>
                  </li>
                  <li >
                    <button id='TSP'
                      onMouseDown={(event) => this.handleChange(event)}>
                        Travelling Salesman
                    </button>
                  </li>
                  <li >
                    <button id='Weighted-AStar'
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Weighted A*
                    </button>
                  </li>
                  <li >
                    <button
                      id='BiAstar'
                      disabled={this.props.multipledestinations}
                      onMouseDown={(event) => this.handleChange(event)}>
                        Bidirectional A*
                    </button>
                  </li>
                </ul>
              </li>
              <li className='nav-item'>
                <button onClick={this.props.randomize}
                  className='btn'
                  disabled={this.props.visual}>
                    Randomize
                </button>
              </li>
              <li className='nav-item'>
                <button onClick = {this.props.clearWalls}
                  className='btn'
                  disabled={this.props.visual}>
                    Clear Board
                </button>
              </li>
              <li className='nav-item'>
                <button onClick = {this.props.clearPath}
                  className='btn'
                  disabled={this.props.visual}>
                    Clear Path
                </button>
              </li>
              <li className='nav-item dropdown'>
                <button
                  className='btn dropdown-toggle'
                  type='button'
                  data-toggle='dropdown'
                  disabled={this.props.visual}
                >
                    Speed <span className='caret'/>
                </button>
                <ul className='dropdown-menu'>
                  <li onClick={() => this.props.newSpeed(1)}>Fast
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
        <div className='d-flex flex-row flex-wrap m-2 justify-content-around'
          id='Legend'>
          <div className='d-flex p-2'>Start:
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#71b340",
                WebkitUserSelect: "none",
              }}
            >
            </div>
          </div>
          <div className='d-flex p-2'>End:
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#ee0000",
                WebkitUserSelect: "none",
              }}
            >
            </div>
          </div>
          <div className='d-flex p-2'>Wall:
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#540b0e",
                WebkitUserSelect: "none",
              }}
            >
            </div>
          </div>
          <div className='d-flex p-2'>Visited Node:
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#e09891",
                WebkitUserSelect: "none",
              }}
            >
            </div>
          </div>
          <div className='d-flex p-2'>Shortest Path Node:
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#fee440",
                WebkitUserSelect: "none",
              }}
            >
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Navbar.propTypes = {
  clearWalls: PropTypes.func,
  clearPath: PropTypes.func,
  randomize: PropTypes.func,
  newSpeed: PropTypes.func,
  currentAlgo: PropTypes.string,
  selectAlgo: PropTypes.func,
  visualize: PropTypes.func,
  visual: PropTypes.bool,
  handle: PropTypes.func,
  toggleSource: PropTypes.func,
  toggleDestination: PropTypes.func,
  changeGrid: PropTypes.func,
  changeDestination: PropTypes.func,
  multiDestination: PropTypes.func,
  multipledestinations: PropTypes.bool,
};
export default Navbar;
