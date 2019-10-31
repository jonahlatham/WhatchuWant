import React, { Component } from 'react'
import './Login.css'

export default class Login extends Component {
    render() {
        return (
            <div>
                <div>
                    <input placeholder='Login' type="text"/>
                    <input placeholder='Register' type="text"/>
                </div>
            </div>
        )
    }
}
