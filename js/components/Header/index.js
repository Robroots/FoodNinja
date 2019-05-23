import React, {Component} from "react";
import {
    NavLink,
} from 'react-router-dom';

class Header extends Component {
    state = {  }
    render() {
        return (
            <header className="containerx header-box">
                <div className="logo">
                    <span>Ninja Food</span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                            className="nav-link" 
                            activeClassName="nav-active" 
                            exact to="/">Home</NavLink>
                        </li>
                        <li>
                            <NavLink
                            className="nav-link" 
                            activeClassName="nav-active" 
                            exact to="/new-restaurant">Dodaj nowy lokal!
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                            className="nav-link" 
                            activeClassName="nav-active" 
                            exact to="/about">Z czym to się je?</NavLink>
                        </li>
                        <li>
                            <NavLink 
                            className="nav-link"
                            activeClassName="nav-active" 
                            exact to="/login">Zaloguj się</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;