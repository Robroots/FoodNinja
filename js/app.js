import React, {Component} from "react";
import ReactDOM from 'react-dom';
import './../style/style.scss';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
}from 'react-router-dom';

import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import NotFound from "./components/NotFound"

const App = () => (
    <HashRouter>
    <>
        <Header />
        <Switch>
            <Route component={Main} />
            <Route component={NotFound} />
        </Switch>
        <Footer />
    </>
</HashRouter>
)

ReactDOM.render(
    <App />,
    document.querySelector('#app')
)