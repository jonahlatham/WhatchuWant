import React, { Component } from 'react'
import './Register.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        doubleCheck: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = () => {
        if (this.state.password !== this.state.doubleCheck) {
            alert('Password does not match')
            this.setState({
                first_name: '',
                last_name: '',
                email: '',
                password: '',
                doubleCheck: ''
            })
        } else {
            const body = {
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                email: this.state.email,
                password: this.state.password,
            }
            axios.post('/auth/register', body)
                .then((response) => {
                    if (response.data.success) {
                        this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
                        this.props.history.push('/home')
                    } else {
                        alert(response.data.err)
                    }
                    this.setState({
                        first_name: '',
                        last_name: '',
                        email: '',
                        password: '',
                        doubleCheck: ''
                    })
                })
        }
    }

    render() {
        return (
            <div className='registerApp'>
                <h5 className='registerRegi'>Register</h5>
                <br /><br />
                <p>First Name</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleRegister()
                    }
                }} autoComplete={false} style={{ borderColor: /^[a-zA-Z]+$/.test(this.state.first_name) ? 'green' : 'red' }} className='registerInputs' name='first_name' value={this.state.first_name} onChange={this.handleChange} type="text" />
                <p>Last Name</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleRegister()
                    }
                }} autoComplete={false} style={{ borderColor: /^[a-zA-Z]+$/.test(this.state.last_name) ? 'green' : 'red' }} className='registerInputs' name='last_name' value={this.state.last_name} onChange={this.handleChange} type="text" />
                <p>E-Mail</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleRegister()
                    }
                }} autoComplete={false} style={{ borderColor: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) ? 'green' : 'red' }} className='registerInputs' name='email' value={this.state.email} onChange={this.handleChange} type="text" />
                <p>Password</p>
                <small className='passText'>
                    ** Must be 7-15 characters and include one<br /> numeric digit and a special character **
                </small>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleRegister()
                    }
                }} autoComplete={false} style={{ borderColor: /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;'()])[a-zA-Z0-9!@#$%^&*_+-=:;'()]{7,15}$/.test(this.state.password) ? 'green' : 'red' }} className='registerInputs' name='password' value={this.state.password} onChange={this.handleChange} type="password" />
                <p>Re-Enter Password</p>
                <input onKeyPress={event => {
                    if (event.key === 'Enter') {
                        this.handleRegister()
                    }
                }} autoComplete={false} style={{ borderColor: this.state.password === this.state.doubleCheck ? 'green' : 'red' }} className='registerInputs' name='doubleCheck' value={this.state.doubleCheck} onChange={this.handleChange} type="password" />
                <button onClick={this.handleRegister} className='registerButton'><strong>Register</strong></button>
                <Link style={{ margin: 'auto' }} className='loginLink' to='/'><small className='passText'>Already a member? Log in here.</small></Link>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Register)