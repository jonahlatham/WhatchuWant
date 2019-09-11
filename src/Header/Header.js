import React, { Component } from 'react'
import './Header.css'
import { Switch, Link } from "react-router-dom"

class Header extends Component {
    render() {
        return (
            <div className='headerApp'>
                <div className='header'>
                    <Link className='link' to='/'>Home</Link>
                    <Link className='link' to='/SavedItems'>Wish List</Link>
                    <Link className='link' to='/CreateNewItem'>Make New Item</Link>
                </div>
            </div>
        )
    }
}

export default Header