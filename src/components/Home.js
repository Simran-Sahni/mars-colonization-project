import React, {Component} from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import BackgroundSlider from "react-background-slider";
import mars1 from "../media/mars1.jpg";
import mars2 from "../media/mars2.jpg";
import mars3 from "../media/mars3.jpg";
import mars4 from "../media/mars4.png";
import mars5 from "../media/mars5.jpg";
import mars6 from "../media/mars6.jpg";
import mars7 from "../media/mars7.jpg";
import mars8 from "../media/mars8.jpg";
import mars9 from "../media/mars9.jpg";

import {Redirect} from "react-router-dom";
import Background from "./LANDING.png";

/**
 * Front Landing Page
 */
class Welcome extends React.Component {
  /**
   *
   * @param {props} props
   */
  constructor(props) {
    super(props);
    this.state = {
      isChecked1: false,
      isChecked2: false,
      userAnswer: null,
    };
  }
  toggleChange = (option) => {
    if (option === 1) {
      this.setState({isChecked1: true, isChecked2: false, userAnswer: "True"});
    } else {
      this.setState({isChecked1: false, isChecked2: true, userAnswer: "False"});
    }
  }
  render() {
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={this.props.handleClose}
          backdrop="static"
          keyboard={false}
          style={{
            backgroundColor: "#3423ae 80%",
          }}

        >
          <Modal.Header closeButton style={{
            backgroundColor: "#89daff",
            opacity: "100%",
          }}>
            <Modal.Title>Get Aboard!</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{
            backgroundColor: "#89daff",
            opacity: "100%",
          }}>
            <div><i>Answer this to move ahead!</i></div>
            <div>{this.props.question}</div>
            <div>
              <label>
                <input type="checkbox"
                  checked={this.state.isChecked1}
                  onChange={() => this.toggleChange(1)}
                />
                  True
              </label>
            </div>
            <div>
              <label>
                <input type="checkbox"
                  checked={this.state.isChecked2}
                  onChange={() => this.toggleChange(2)}
                />
                  False
              </label>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              backgroundColor: "#89daff",
              opacity: "100%",
            }}>
            <Button variant="danger" onClick={this.props.handleClose} style={{
              backgroundColor: "#ff0000",
            }}>
                Try Later
            </Button>
            <Button variant="primary" style={{
              backgroundColor: "#00ff00",
            }}
            onClick={() => this.props.onSubmit(this.state.userAnswer)}>
                LETS GO!
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}

/**
 * Parse the question using get request
 * @param {string} theUrl
 * @return {string}
 */
function httpGet(theUrl) {
  const xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  return xmlHttp.responseText;
}

/**
 * Stores properties related to user question and page redirection
 */
class Home extends Component {
  state = {
    show: false,
    redirect: null,
    question: null,
    answer: null,
  };

  /**
   * Get questions from API before page loads
   * @return {Promise<void>}
   */
  async componentDidMount() {
    try {
      let res = httpGet("https://opentdb.com/api.php?amount=1&category=18&type=boolean");
      res = JSON.parse(res);
      res = res["results"][0];
      res["question"] = res["question"].replace(/&quot;/gi, "\"");
      res["question"] = res["question"].replace(/&#039;/gi, "/'");
      this.setState({question: res["question"], answer: res["correct_answer"]});
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Changes state when user clicks submit
   * @param {anyObject }option
   */
  onSubmit(option) {
    if (option === this.state.answer) {
      this.setState({redirect: "/mars-colonization-project/App"});
     } else {
      alert("Wrong Option Chosen");
    }
  }
  handleShow = () => {
    this.setState({show: true});
  };

  handleClose = () => {
    this.setState({show: false});
  };

  /**
   * renders the home screen
   * @return {*}
   */
  render() {
    if (this.state.redirect !== null) {
      return <Redirect to='https://simran-sahni.github.io/mars-colonization-project/App'/>;
    }
    return (

      <div id = "home"
        style={{background:
                 "url(" + {Background} + ")",
        width: "100%",
        height: "100%",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"}}>
        <div id="MissionTitle"
          className="mb-4 p-4"
          style={{backgroundColor: "#e5e5e5",
            opacity: "70%",
            borderRadius: "25%",
            float: "right",
            width: "25%",
            height: "25%",
            fontSize: "2em",
            marginTop: "35px"}}>
          <p><b>&nbsp;&nbsp;&nbsp;&nbsp;MISSION</b></p>
          <p><b> COLONIZE MARS! </b></p>
        </div>


        <Button variant="primary" size="lg" onClick={this.handleShow} style={{
          backgroundColor: "#283618",
          color: "#fefae0",
          position: "relative",
          margin: "20%",
          marginLeft: "38%",
        }}>
          <strong>LAUNCH TO MARS</strong>
        </Button>
        <Welcome question = {this.state.question}
          answer = {this.state.answer}
          handleClose={this.handleClose}
          show={this.state.show}
          handleShow={this.handleShow}
          onSubmit={this.onSubmit.bind(this)}/>
        <BackgroundSlider
          images={[mars7, mars1, mars2, mars5, mars7,
            mars3, mars4, mars8, mars9, mars6]}
          duration={3}
          transition={0}/>
      </div>

    );
  }
}


export default Home;
