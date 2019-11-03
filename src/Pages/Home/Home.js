import React, { Component } from 'react'
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        return (
            <div>
                Home page
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)