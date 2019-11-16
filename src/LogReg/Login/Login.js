import React, { Component } from 'react'
import './Login.css'
import { Link } from "react-router-dom"
import axios from 'axios';
import { connect } from 'react-redux';

class Login extends Component {
    state = {
        email: '',
        password: '',
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleLogin = () => {
        const body = {
            email: this.state.email,
            password: this.state.password,
        }
        axios.post('/auth/login', body)
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
                    this.props.history.push('/Home')
                } else {
                    alert(response.data.err)
                }
            })
    }

    render() {
        return (
            <div className='loginInputDiv'>
                <h5 className='LoginLogi'>Log In</h5>
                <p className='loginPTag'>E-Mail</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleLogin()
                    }
                }} onChange={this.handleChange} name='email' value={this.state.email} className='loginInput' type="text" />
                <p className='loginPTag'>Password</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleLogin()
                    }
                }} onChange={this.handleChange} name='password' value={this.state.password} className='loginInput' type="password" />
                <button onClick={this.handleLogin} className='loginButton'><strong>Log In</strong></button>
                <Link className='loginLink' to='/Register'><small>Register</small></Link>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Login)