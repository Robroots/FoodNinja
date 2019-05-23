import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './../style/style.scss';
import {
    HashRouter,
    Route,
    Switch
}from 'react-router-dom';

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound";

class App extends Component {
    state = {
        loggedIn: false,
        userName: false
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
                        loggedIn: true,
                        userName: userName
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

    logOut = (e) => {
        this.setState({loggedIn: false});
    }

    render() {
        console.log(this.state.loggedIn)
        return (
            <HashRouter>
                <>
                    <Header loggedIn={this.state.loggedIn} logOut={this.logOut} userName={this.state.userName}/>
                    <Switch>
                        <Route render={props => <Main checkLoginData={this.checkLoginData} loggedIn={this.state.loggedIn}/>}/>
                        <Route render={props => <NotFound loggedIn={this.state.loggedIn}/>} />
                    </Switch>
                    <Footer />
                </>
            </HashRouter>
        );
    }
}


ReactDOM.render(
    <App />,
    document.querySelector('#app')
)