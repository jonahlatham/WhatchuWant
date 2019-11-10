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
                        dob: ''
                    })
                })
        }
    }

    render() {
        return (
            <div className='registerApp'>
                <input style={{ boxShadow: /^[a-zA-Z]+$/.test(this.state.first_name) ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} className='registerInputs' name='first_name' value={this.state.first_name} onChange={this.handleChange} placeholder='FIRST NAME' type="text" />
                <input style={{ boxShadow: /^[a-zA-Z]+$/.test(this.state.last_name) ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} className='registerInputs' name='last_name' value={this.state.last_name} onChange={this.handleChange} placeholder='LAST NAME' type="text" />
                <input style={{ boxShadow: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} className='registerInputs' name='email' value={this.state.email} onChange={this.handleChange} placeholder='EMAIL' type="text" />
                <input style={{ boxShadow: /^(?=.*[0-9])(?=.*[!@#$%^&*_+-=:;'()])[a-zA-Z0-9!@#$%^&*_+-=:;'()]{7,15}$/.test(this.state.password) ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} className='registerInputs' name='password' value={this.state.password} onChange={this.handleChange} placeholder='PASSWORD' type="text" />
                <input style={{ boxShadow: this.state.password === this.state.doubleCheck ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} className='registerInputs' name='doubleCheck' value={this.state.doubleCheck} onChange={this.handleChange} placeholder='RE-ENTER PASSWORD' type="text" />
                <small>
                    Password must have 7-15 characters with at least one numeric digit and a special character
                </small>
                <button onClick={this.handleRegister} className='registerButton'>Register</button>
                <Link className='loginLink' to='/'>Login</Link>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Register)