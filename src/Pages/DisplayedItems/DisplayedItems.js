import React, { Component } from 'react'
import './DisplayedItems.css'
import axios from 'axios'
import { connect } from 'react-redux';

class DisplayedItems extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        debugger
        axios.get('/api/displayItems')
        .then((response) => {
                this.setState({
                    items: response.data
                })
                console.log(this.state.items)
            })
    }
    render() {
        const items = this.state.items.map((e)=>{
            return e
        })
        return (
            <div>
                {items}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)