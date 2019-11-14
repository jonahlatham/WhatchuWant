import React, { Component } from 'react'
import './LeftSideHeader.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { withRouter } from "react-router";
import { connect } from 'react-redux';

class LeftSideHeader extends Component {
    state = {
        sideBar: false
    }

    handleBar = () => {
        this.setState({
            sideBar: true
        })
    }

    handleNoBar = () => {
        this.setState({
            sideBar: false
        })
    }

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
                            <i onClick={this.handleBar} class="fas fa-bars hamburger"></i>
                            <div className={`${this.state.sideBar ? 'headerLinksHidden openStyles' : 'headerLinksHidden'}`}>
                                <p className='sideBarX' onClick={this.handleNoBar}><strong>x</strong></p>
                                <br /><br />
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/Home'>Home</Link>
                                </div>
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/CreateNewItem/'>Create New</Link>
                                </div>
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/DisplayedItems/'>Displayed Items</Link>
                                </div>
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(withRouter(LeftSideHeader))