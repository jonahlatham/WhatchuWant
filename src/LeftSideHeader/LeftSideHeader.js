import React, { Component } from 'react'
import './LeftSideHeader.css'
import { Link } from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <div className='headerApp'>
                <div className='headerLinksHidden'>
                    <Link className='link' to='/Home'>Home</Link>
                    <br />
                    <Link className='link' to='/CreateNewItem/'>Create New</Link>
                    <br/>
                    <Link className='link' to='/DisplayedItems/'>Displayed Items</Link>
                </div>
            </div>
        )
    }
}
