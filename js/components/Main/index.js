import React, {Component} from "react";
import {
    Route,
}from 'react-router-dom';

import Home  from "./Home";
import About from "./About";
import Restaurant from "./Restaurant";
import Login from "./Login";
import NewRestaurant from "./NewRestaurant";

class Main extends Component {
    render() {
        return (
            <section className="main-box containerx">
                <Route exact path="/" render={props => <Home loggedIn={this.props.loggedIn}/>}/>
                <Route path="/about" render={props => <About loggedIn={this.props.loggedIn}/>}/>
                <Route path="/new-restaurant" render={props => <NewRestaurant loggedIn={this.props.loggedIn}/>}/>
                <Route path='/restaurant/:id' render={props => <Restaurant {...props} loggedIn={this.props.loggedIn}/>}/>
                <Route path="/login" render={props => <Login checkLoginData={this.props.checkLoginData}/>} />
            </section>
        );
    }
}

export default Main;