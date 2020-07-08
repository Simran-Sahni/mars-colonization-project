import React, { Component } from "react";
import App from './App'
import Home from './components/Home'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect,
    useLocation,
    useParams
} from "react-router-dom";

export default function Root(){
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <Home />
                </Route>
                <Route path="/">
                    <App />
                </Route>

            </Switch>
        </Router>
    );

}