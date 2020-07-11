import React, {Component} from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import {Redirect} from 'react-router-dom';
import Background from './LANDING.png';


function Child(){
    return(
    <Carousel
        interval = {2000}
        touch = {false}
        style={{
            width:"30%",
            height:"20%",
            textAlign:"center",
            position:"fixed center",
            marginLeft:"40%",
            marginTop:"17.5%",
        }}>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("../media/mars1.jpg")}
                alt="First slide"
                style={{
                    width:"auto",
                    height:"auto",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    overflow:"hidden",
                }}

            />

        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("../media/mars2.jpg")}
                alt="Second slide"
                style={{
                    width:"auto",
                    height:"auto",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    overflow:"hidden",
                }}
            />


        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("../media/mars3.jpg")}
                alt="Third slide"
                style={{
                    width:"auto",
                    height:"auto",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    overflow:"hidden",

                }}

            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("../media/mars4.jpg")}
                alt="Third slide"
                style={{
                    width:"auto",
                    height:"auto",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    overflow:"hidden",

                }}

            />
        </Carousel.Item>
        <Carousel.Item>
            <img
                className="d-block w-100"
                src={require("../media/mars5.jpg")}
                alt="Third slide"
                style={{
                    width:"auto",
                    height:"auto",
                    maxWidth:"100%",
                    maxHeight:"100%",
                    overflow:"hidden",

                }}

            />
        </Carousel.Item>


    </Carousel>
    );
}

class Welcome extends React.Component {
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
            this.setState({isChecked1: true, isChecked2: false, userAnswer: 'True'});
        } else {
            this.setState({isChecked1: false, isChecked2: true, userAnswer: 'False'});
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
                        backgroundColor:"#3423ae 80%",
                    }}

                >
                    <Modal.Header closeButton style={{
                        backgroundColor: '#89daff',
                        opacity: '100%',
                    }}>
                        <Modal.Title>Get Aboard!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor: '#89daff',
                        opacity: '100%',
                    }}>
                        <div><i>Answer this to move ahead!</i></div>
                        <div>{this.props.question}</div>
                        <div>
                            <label>
                                <input type="checkbox"
                                       checked={this.state.isChecked1}
                                       onChange={()=>this.toggleChange(1)}
                                />
                                True
                            </label>
                        </div>
                        <div>
                            <label>
                                <input type="checkbox"
                                       checked={this.state.isChecked2}
                                       onChange={()=>this.toggleChange(2)}
                                />
                                False
                            </label>
                        </div>
                    </Modal.Body>
                    <Modal.Footer
                        style={{
                            backgroundColor: '#89daff',
                            opacity: '100%',
                        }}>
                        <Button variant="danger" onClick={this.props.handleClose} style={{
                            backgroundColor: '#ff0000',
                        }}>
                            Try Later
                        </Button>
                        <Button variant="primary" style={{
                            backgroundColor: '#00ff00',
                        }}
                                onClick={()=>this.props.onSubmit(this.state.userAnswer)}>
                            LETS GO!
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}
function httpGet(theUrl) {
    const xmlHttp = new XMLHttpRequest();
    xmlHttp.open( 'GET', theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
class Home extends Component {
    state = {
        show: false,
        redirect: null,
        question: null,
        answer: null,
    };

    async componentDidMount() {
        try {
            let res = httpGet('https://opentdb.com/api.php?amount=1&category=18&type=boolean');
            res = JSON.parse(res);
            res = res['results'][0];
            res['question'] = res['question'].replace(/&quot;/gi,"\"");
            res['question'] = res['question'].replace(/&#034;/gi,"/'");
            this.setState({question: res['question'], answer: res['correct_answer']});
        } catch (e) {
            console.log(e);
        }
    }
    onSubmit(option) {
        if (option === this.state.answer) {

            this.setState({redirect: '/mars-colonization-project/App'});
            this.setState({redirect: '/App'});
        } else {
            alert('Wrong Option Chosen');
        }
    }
    handleShow = () => {
        this.setState({show: true});
    };

    handleClose = () => {
        this.setState({show: false});
    };

    render() {
        if (this.state.redirect !== null) {
            return <Redirect to='/mars-colonization-project/App'/>;

        }
        return (

            <div id = "home" style={{background: 'url(' + {Background} + ')', width: '100%', height: '100%', backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat'}}>

                <Child />

                <Button variant="primary" size="lg" onClick={this.handleShow} style={{
                    backgroundColor: '#b8f2e6',
                    color: '#242423',
                    position: 'relative',
                    marginLeft:'60%',
                    marginRight:"10%",
                    float:"right"

                }}>
                    <strong>LAUNCH TO MARS</strong>
                </Button>
                <Welcome question = {this.state.question} answer = {this.state.answer} handleClose={this.handleClose} show={this.state.show} handleShow={this.handleShow} onSubmit={this.onSubmit.bind(this)}/>
            </div>

        );
    }
}


export default Home;
