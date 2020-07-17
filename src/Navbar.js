import React from 'react';
import PropTypes from 'prop-types';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
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

      multipledestinations: props.multipledestinations,
    };
  }

  hc() {
    if (!this.state.checkedA) {
      this.editButtons();
    } else {
      document.getElementById('chngDestBtn').innerHTML = '<button id="chngDestBtn" class="btn" type="button" style=background-color:#ee0000>'+ 'Change Destination'+'</ button>';
    }
    this.setState({checkedA: !this.state.checkedA});
  }


  editButtons() {
    document.getElementById('chngDestBtn').innerHTML = '<button id="chngDestBtn" class="btn" type="button" style=background-color:#ee0000>'+ 'Add Destination'+'</ button>';
    this.props.multiDestination();
  }
  /**
   *
   * @param {event} event
   */

  handleChange(event) {
    const algo = (event.target.getAttribute('id')).toString();
    const setString = 'Visualize  ' + algo + '!';
    document.getElementById('visualizebtn').innerHTML =
        // eslint-disable-next-line max-len
        '<button id="visualizebtn" class="btn" type="button">'+ setString+'</ button>';

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
              <a id="refreshButton" className="navbar-brand" href="/mars-colonization-project/App">
                {/* eslint-disable-next-line max-len */}
                                Conquer Mars! <i className="fa fa-rocket"/> <span className="icon" /></a
              >
            </div>
            <ul className="nav navbar-nav">
              <FormGroup>
                <FormControlLabel
                  control={<Switch color = "primary" checked={this.state.checkedA} onChange={()=>this.hc()} />}
                  label="Multiple Destinations"

                />
              </FormGroup>
              <button onClick={this.props.toggleSource} className="btn"
                style={{
                  backgroundColor: '#00ee00',
                }}
                disabled={this.props.visual}
              >
                Change Source
              </button>
              <button onClick={this.props.toggleDestination} className="btn"
                id="chngDestBtn"
                style={{
                  backgroundColor: '#ee0000',
                }}
                disabled={this.props.visual}
              >
                Change Destination
              </button>

              <button
                id="visualizebtn"
                className="btn"
                type="button"
                onClick={this.props.visualize}
                disabled={this.props.visual}
              >
                                Visualize
              </button>

              <li className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  disabled={this.props.visual}
                >
                                    Algorithms <span className="caret"/>
                </button>
                <ul className="dropdown-menu">
                  <li id="dijkstra"
                    onMouseDown={(event) => this.handleChange(event)}>

                                        Dijkstra Algorithm
                  </li>
                  <li id="a-star"
                    onMouseDown={(event) => this.handleChange(event)}>
                                        A* Search
                  </li>
                  <li id="dfs"
                    onMouseDown={(event) => this.handleChange(event)}>
                                        DFS
                  </li>
                  <li id="bfs"
                    onMouseDown={(event) => this.handleChange(event)}>
                                        BFS
                  </li>
                  <li id="bestfs"
                    onMouseDown={(event) => this.handleChange(event)}>
                                        Greedy best-first search
                  </li>
                  <li id="tsp"
                    onMouseDown={(event) => this.handleChange(event)}>
                    Multiple Destinations
                  </li>
                </ul>
              </li>
              <li>
                <button onClick={this.props.randomize} className="btn" disabled={this.props.visual}>
                                    Randomize
                </button>
              </li>
              <li>
                <button onClick = {this.props.clearWalls} className="btn" disabled={this.props.visual}>
                                    Clear Walls
                </button>
              </li>
              <li>
                <button onClick = {this.props.clearPath} className="btn" disabled={this.props.visual}>
                                    Clear Path
                </button>
              </li>
              <li className="dropdown">
                <button
                  className="btn dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                  disabled={this.props.visual}
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
  multiDestination: PropTypes.func,
  multipledestinations: PropTypes.bool,

};
export default Navbar;
