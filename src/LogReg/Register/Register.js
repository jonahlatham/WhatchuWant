import React, { Component } from 'react'
import './Register.css'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from "react-router-dom"

export default class Register extends Component {
    state = {
        first_name: '',
        last_name: '',
        email: '',
        password: '',
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
                })
            })
    }

    render() {
        return (
            <div className='registerApp'>
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='FIRST NAME' type="text" />
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='LAST NAME' type="text" />
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='EMAIL' type="text" />
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='PASSWORD' type="text" />
                <input name='firstName' value={this.state.firstName} onChange={this.handleChange} placeholder='DATE OF BIRTH' type="text" />
                <button onClick={this.handleRegister} className='registerButton'>Register</button>
                <Link className='' to='/'>Login</Link>
            </div>
        )
    }
}
