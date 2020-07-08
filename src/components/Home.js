import React, { Component,useState } from "react";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { Redirect} from 'react-router-dom';

const Entry = ( {handleClose,show,onSubmit} ) => {
    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                style={{
                    backgroundColor:'#3a506b',

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
                    Answer this correct, to commence on your journey.
                </Modal.Body>
                <Modal.Footer
                    style={{
                        backgroundColor:'#89daff',
                        opacity: '100%'
                    }}>
                    <Button variant="danger" onClick={handleClose} style={{
                        backgroundColor:'#ff0000'
                    }}>
                        Try Later
                    </Button>
                    <Button variant="primary" style={{
                        backgroundColor:'#00ff00'
                    }}
                    onClick={onSubmit}>
                        LETS GO!
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

class Home extends Component{
    state = {
        show: false,
        redirect: null,
    };

    onSubmit() {

        this.setState({redirect: '/App'});
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

          <div id="home"  style={{ background:"url('./LANDING.png') no-repeat center center fixed"}}>

                <Button variant="primary" onClick={this.handleShow} style={{
                    backgroundColor:'#b8f2e6',
                    color: '#242423',
                    position: 'relative',
                    margin:'30%',
                }}>
                    LAUNCH TO MARS
                </Button>
                <Entry handleClose={this.handleClose} show={this.state.show} handleShow={this.handleShow} onSubmit={this.onSubmit.bind(this)}/>

            </div>

        );
    }
}


export default Home;
