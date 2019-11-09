import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

class Home extends Component {
    state = {
        email: '',
        password: ''
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email)) {
            alert('You have done well my young padawan')
        } else {
            alert("You have entered an invalid email address!")
        }
    }

    render() {
        return (
            <div>
                <input style={{ boxShadow: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.state.email) ? '0 0 3pt 2pt green' : '0 0 3pt 2pt red' }} onChange={this.handleChange} name='email' value={this.state.email} placeholder='email' type="text" />
                <br />
                <br />
                <input onChange={this.handleChange} name='password' value={this.state.password} placeholder='password' type="text" />
                <br />
                <button onClick={this.handleSubmit}>Submit</button>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)