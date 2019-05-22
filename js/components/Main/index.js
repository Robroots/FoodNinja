import React, {Component} from "react";
import {
    Route,
}from 'react-router-dom';

import Home  from "./Home";
import About from "./About";
import Restaurant from "./Restaurant";
import Login from "./Login";

class Main extends Component {
    
    render() {
        return (
            <section className="main-box containerx">
                <Route exact path="/" component={Home} />
                <Route path="/about" component={About} />
                <Route path='/restaurant/:id' component={Restaurant} />
                <Route path="/login" component={Login} />
            </section>
        );
    }
}

export default Main;