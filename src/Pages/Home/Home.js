import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

const baseUrl = 'http://localhost:8090/api/home'

class Home extends Component {

    render() {
        return (
            <div>
          
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)