import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import './Home.css'
class Home extends Component {

    render() {
        return (
            <div className='homeApp'>
                Home Page
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)