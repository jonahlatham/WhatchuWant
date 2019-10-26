import React, { Component } from 'react'
import './LeftSideHeader.css'
import { Link } from "react-router-dom"

export default class Header extends Component {
    render() {
        return (
            <div className='headerApp'>
                {/* <div className='headerLinksHidden'>
                    <Link className='link' to='/Home'>Home</Link>
                    <Link className='link' to='/createquiz'>Create New</Link>
                    <Link className='link' to='/discoverquiz'>Discover</Link>
                    <Link className='link' to='/quiz/reviewsubmissions/:id'>Review</Link>
                </div> */}
            </div>
        )
    }
}
