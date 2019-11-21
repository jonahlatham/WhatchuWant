import React, { Component } from 'react'
import './DisplayedItems.css'
import axios from 'axios'
import { connect } from 'react-redux';

class DisplayedItems extends Component {

    state = {
        items: [],
        holidays: [],
    }

    componentDidMount() {
        axios.get('/api/displayItems')
            .then((response) => {
                // debugger
                this.setState({
                    items: response.data.items
                })
                console.log(this.state.items)
                return axios.get('/api/holidays')
            })
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
                console.log(this.state.holidays);

            })
    }

    handleReserve = () => {
        axios.put('/api/createNew')
            .then((response) => {

            })
    }
    render() {
        const holidays = this.state.holidays.map((e) => {
            return e.name
        })
        const displayedItems = this.state.items.map((e) => {
            if (e.creator_id === this.props.user.id) {
                return <div className='displayedItems' key={e.id}>
                    <div className='itemPriceDiv'>
                        <h4 className='eNameDiv'>{e.name}</h4>
                        <br />
                        
                    </div>
                    <div className='holidayDiv'>${e.price} | {holidays[e.holiday_id - 1]}</div>
                    <div className='imageContainer'><img className='displayedItemsImg' src={e.img} alt="img" /></div>
                    <button className='reserveButton'>Reserve</button>
                </div>
            } else {
                return ''
            }
        })
        return (
            <div className='displayedItemsApp'>
                {displayedItems}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)