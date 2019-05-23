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
    state = {
        loggedIn: false
    }

    checkLoginData = (userName, password) => {
        fetch("http://localhost:3002/users")
        .then(resp => {
            if(resp.ok){
                return resp.json();
            } else {
                throw new Error("Error during connection")
            }
        }).then(data => {
            if (!data || data.length === 0){
                throw new Error("Data is unvalid")
            }
            data.filter(user =>{
                if(user.userName === userName && user.password === password){
                    console.log('udane logowanie')
                    this.setState({
                        loggedIn: true
                    })
                    return true
                }
                console.log('nieudane logowanie')
                return false
            })
        }).catch(err => {
            this.setState({
                error : err.message
            })
            console.log("Error:" + err.message)
        })
    }
    
    render() {
        console.log(this.state.loggedIn)
        return (
            <section className="main-box containerx">
                <Route exact path="/" render={props => <Home loggedIn={this.state.loggedIn}/>}/>
                <Route path="/about" render={props => <About loggedIn={this.state.loggedIn}/>}/>
                <Route path="/new-restaurant" render={props => <NewRestaurant loggedIn={this.state.loggedIn}/>}/>
                <Route path='/restaurant/:id' component={Restaurant} />
                <Route path="/login" render={props => <Login checkLoginData={this.checkLoginData}/>} />
            </section>
        );
    }
}

export default Main;