import React, { Component,useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import FormControl from "@material-ui/core/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import ButtonGroup from "react-bootstrap/cjs/ButtonGroup";
import { Redirect} from 'react-router-dom';
import './Home.css';
import Background from './LANDING.png';

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked1:false,
            isChecked2:false,
            userAnswer:null,
        };
    }
    toggleChange = (option) => {
        if(option === 1)
        {
            this.setState({isChecked1:true,isChecked2:false,userAnswer:"True"});
        }
        else
        {
            this.setState({isChecked1:false,isChecked2:true,userAnswer:"False"});
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
                        opacity:0.95,
                    }}

                >
                    <Modal.Header closeButton  style={{
                        backgroundColor:'#89daff',
                        opacity: '100%'
                    }}>
                        <Modal.Title>Get Aboard!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{
                        backgroundColor:'#89daff',
                        opacity: '100%'
                    }}>
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
                            backgroundColor:'#89daff',
                            opacity: '100%'
                        }}>
                        <Button variant="danger" onClick={this.props.handleClose} style={{
                            backgroundColor:'#ff0000'
                        }}>
                            Try Later
                        </Button>
                        <Button variant="primary" style={{
                            backgroundColor:'#00ff00'
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
function httpGet(theUrl)
{
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}
class Home extends Component{
    state = {
        show: false,
        redirect: null,
        question:null,
        answer:null,
    };

    async componentDidMount()
    {
        try {
            let res = httpGet('https://opentdb.com/api.php?amount=1&category=18&type=boolean');
            res = JSON.parse(res);
            res = res["results"][0];
             console.log(res);
             this.setState({question:res["question"],answer:res["correct_answer"]});

        } catch (e) {
            console.log(e);
        }
    }
    onSubmit(option) {
        if(option === this.state.answer)
        {
            this.setState({redirect: '/App'});
        }
        else{
            alert("Wrong Option Chosen");
        }
    }
    handleShow = () => {
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false });
    };

    render()
    {
        if(this.state.redirect !== null)
        {  return <Redirect to='/App'/>}
        return (

            <div id = "home" style={{background: "url(" + { Background } + ")", width: "100%", height: "100%",backgroundPosition: 'center',backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
                <Button variant="primary" onClick={this.handleShow} style={{
                    backgroundColor:'#b8f2e6',
                    color: '#242423',
                    position: 'relative',
                    margin:'25%',
                }}>
                    LAUNCH TO MARS
                </Button>
                <Welcome question = {this.state.question} answer = {this.state.answer} handleClose={this.handleClose} show={this.state.show} handleShow={this.handleShow} onSubmit={this.onSubmit.bind(this)}/>
            </div>

        );
    }
}


export default Home;