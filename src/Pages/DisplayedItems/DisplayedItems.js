import React, { Component } from 'react'
import './DisplayedItems.css'
import axios from 'axios'
import { connect } from 'react-redux';

class DisplayedItems extends Component {

    state = {
        items: [],
        holidays: []
    }

    componentDidMount() {
        axios.get('/api/displayItems')
            .then((response) => {
                this.setState({
                    items: response.data.items
                })
                console.log(this.state.items)
            })
        axios.get('/api/holidays')
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
            })
    }
    render() {
        const newItems = this.state.items.map((e) => {
            return <div key={e.id} className='newItems'>
                {e.name}
                <div>
                    <img className='newItemsImg' src={e.img} alt="img" />
                </div>
                {this.state.holidays[e.holiday_id - 1].name}
            </div>
        })
        return (
            <div className='displayedItemsApp'>
                {newItems}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)