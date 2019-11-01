import React, { Component } from 'react'
import './LeftSideHeader.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class LeftSideHeader extends Component {
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
            <div>
                {
                    this.props.user ? (
                        <div className='headerApp'>
                            <div className='headerLinksHidden'>
                                <Link className='link' to='/Home'>Home</Link>
                                <br />
                                <Link className='link' to='/CreateNewItem/'>Create New</Link>
                                <br />
                                <Link className='link' to='/DisplayedItems/'>Displayed Items</Link>
                            </div>
                        </div>
                        // <div className='headerRight'>
                        //     {this.props.user ? <button className='logoutButton' onClick={this.handleLogout}>Logout</button> : <Link className='' to='/'>Login</Link>}
                        // </div>
                    ) : ''
                }
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(withRouter(LeftSideHeader))