import React from 'react';
import PropTypes from 'prop-types';
/**
 *
 * @param {props} props
 * @return {*}
 * @constructor
 */
function Navbar(props) {
  return (
    <div>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <div className="navbar-header">
            <a id="refreshButton" className="navbar-brand" href="#">
              <i className="fa fa-rocket"/>Conquer Mars!</a
            >
          </div>
          <ul className="nav navbar-nav">
            <li className="dropdown">
              <button
                className="btn dropdown-toggle"
                type="button"
                data-toggle="dropdown"
              >
                                Algorithms <span className="caret"/>
              </button>
              <ul className="dropdown-menu">
                <li id="startButtonDijkstra">
                  <a href="#">Dijkstra's Algorithm</a>
                </li>
                <li id="startButtonAStar2"><a href="#">A* Search</a></li>
              </ul>
            </li>
            <li>
              <button onClick={props.randomize} className="btn">
                                Randomize
              </button>
            </li>
            <li>
              <button onClick = {props.clearwalls} className="btn">
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
                <li><a href="#">Fast</a></li>
                <li><a href="#">Medium</a></li>
                <li><a href="#">Slow</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
Navbar.propTypes = {
  clearwalls: PropTypes.func,
  randomize: PropTypes.func,
};
export default Navbar;

