import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'

class Home extends Component {

    render() {
        return (
            <div>
                Home Page
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)