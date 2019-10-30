import React, { Component } from 'react'
import './DisplayedItems.css'
import axios from 'axios'
import { connect } from 'react-redux';

class DisplayedItems extends Component {

    state = {
        items: []
    }

    componentDidMount() {
        axios.get('/api/displayItems')
        .then((response) => {
                this.setState({
                    items: response.data
                })
                console.log(response.data)
            })
    }
    render() {
        const newItems = this.state.items.map((e)=>{
            return <div>{e.name}</div>
        })
        return (
            <div>
                {newItems}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)