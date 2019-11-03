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
        dob: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleRegister = () => {
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

    render() {
        return (
            <div className='registerApp'>
                <input name='first_name' value={this.state.first_name} onChange={this.handleChange} placeholder='FIRST NAME' type="text" />
                <input name='last_name' value={this.state.last_name} onChange={this.handleChange} placeholder='LAST NAME' type="text" />
                <input name='email' value={this.state.email} onChange={this.handleChange} placeholder='EMAIL' type="text" />
                <input name='password' value={this.state.password} onChange={this.handleChange} placeholder='PASSWORD' type="text" />
                {/* <input name='dob' value={this.state.dob} onChange={this.handleChange} placeholder='DATE OF BIRTH' type="text" /> */}
                <button onClick={this.handleRegister} className='registerButton'>Register</button>
                <Link className='loginLink' to='/'>Login</Link>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Register)