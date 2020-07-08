import React, { Component } from "react";
import App from './App'
import Home from './components/Home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default function Root(){
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>

                <Route path="/App">
                    <App />
                </Route>

            </Switch>
        </Router>
    );

}