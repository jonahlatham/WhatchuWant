import React, { Component } from 'react'
import './LeftSideHeader.css'
import { Link } from "react-router-dom"
import axios from 'axios'
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import Head from '../Head/Head'

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
                            <i onClick={this.handleBar} className="fas fa-bars hamburger"></i>
                            <div className={`${this.state.sideBar ? 'headerLinksHidden openStyles' : 'headerLinksHidden'}`}>
                                <p className='sideBarX' onClick={this.handleNoBar}><strong>x</strong></p>
                                <br /><br />
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/Home'><strong>Home</strong></Link>
                                </div>
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/CreateNewItem/'><strong>Create New</strong></Link>
                                </div>
                                <div className='linkDiv'>
                                    <Link onClick={this.handleNoBar} className='link' to='/DisplayedItems/'><strong>Displayed Items</strong></Link>
                                </div>
                            <Head />
                            </div>
                        </div>
                    ) : ''
                }
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(withRouter(LeftSideHeader))