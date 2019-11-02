import React, { Component } from 'react'
import axios from 'axios'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Link } from "react-router-dom"
import './Head.css'

class Head extends Component {
    handleLogout = () => {
        axios.delete('/auth/user')
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({
                        type: 'LOGOUT',
                    })
                    this.props.history.push('/')
                } else {
                    alert('something blew up')
                }
            })
    }
    render() {
        return (
            <div className='headApp'>
                {this.props.user ? <button className='logoutButton' onClick={this.handleLogout}>Logout</button> : <Link className='loginLink' to='/'>Login</Link>}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(withRouter(Head))