import React, { Component } from "react";
import Grid from "./Grid"
class App extends Component{
  state = {
    height: 20,
    width: 30,
    start: [15,5],
    end: [15,25],
  }
  render(){
    return(
        <div>
          <p>Hello Mars from App.js</p>
        </div>
    )
  }
}
export default App;