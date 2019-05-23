import React, {Component} from "react";
import {NavLink} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <header className="containerx header-box">
                <div className="logo">
                    <span>Ninja F<img className="logo-img" src="./images/wurfstern-1741226_1280.png"/>
                    <img className="logo-img" src="./images/wurfstern-1741226_1280.png"/>d</span>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink 
                                className="nav-link" 
                                activeClassName="nav-active" 
                                exact to="/">Home
                            </NavLink>
                        </li>
                        {this.props.loggedIn &&
                        <li>
                            <NavLink
                                className="nav-link" 
                                activeClassName="nav-active" 
                                exact to="/new-restaurant">Dodaj nowy lokal!
                            </NavLink>
                        </li>
                        }
                        <li>
                            <NavLink 
                                className="nav-link" 
                                activeClassName="nav-active" 
                                exact to="/about">Z czym to się je?
                            </NavLink>
                        </li>
                        {!this.props.loggedIn ? 
                        <li>
                            <NavLink 
                                className="nav-link"
                                activeClassName="nav-active" 
                                exact to="/login">Zaloguj się
                            </NavLink>
                        </li>
                        :
                        <li>
                            <NavLink 
                                className="nav-link"
                                onClick={this.props.logOut}
                                exact to="/"
                                >Witaj {this.props.userName} (wyloguj)
                            </NavLink>
                        </li>
                        }
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;