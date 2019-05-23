import React, {Component} from "react";
import {Form, FormGroup, Button} from 'react-bootstrap'

class Login extends Component {
    state = { 
        login:'',
        password: ''
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        const {login, password} = this.state
        this.props.checkLoginData(login, password);
    }

    handleInputChange = (e) => {
        const input = e.target
        this.setState({
            [input.name] : input.value
        })
    }

    render() {
        return (
            <section className="containerx login-box">
                <Form onSubmit={this.handleLoginSubmit}>
                    <Form.Label>Zaloguj się</Form.Label>
                    <FormGroup id="login">
                        <Form.Control name="login" size="lg" placeholder="Login" value={this.state.login} onChange={this.handleInputChange}></Form.Control>
                        <Form.Control name="password" type="password" size="lg" placeholder="Hasło" value={this.state.password}  onChange={this.handleInputChange}></Form.Control>
                    </FormGroup>
                    <Button type="submit" variant="info" size="lg">Zaloguj</Button>
                </Form>
            </section>
        );
    }
}

export default Login;