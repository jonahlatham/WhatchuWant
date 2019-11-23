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
        axios.get(`/api/displayItems`)
            .then((response) => {
                // debugger
                this.setState({
                    items: response.data
                })
                console.log(response.data)
                return axios.get('/api/holidays')
            })
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
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

        const fire = <div><img className='fireRating' src="https://dejpknyizje2n.cloudfront.net/marketplace/products/modern-flame-fire-logo-sticker-1539108491.5454743.png" alt="fire" /></div>
        let fires = []

        const displayedItems = Object.keys(this.state.items).map((e) => {
            if (e.rating > 8) {
                fires.push(fire, fire, fire)
            } else if (e.rating > 5) {
                fires.push(fire, fire)
            } else if (e.rating > 4) {
                fires.push(fire)
            } else {
                return fires
            }
            console.log(e)
            // debugger
            // if (e.creator_id === this.props.user.id) {
                return <div className='displayedItems' key={e.id}>
                    <div className='itemPriceDiv'>
                        <h4 className='eNameDiv'> <div className='fires'>{/*{fires}*/}</div>  <div className='nameDiv'>{e.name}</div></h4>
                        <br />
                    </div>
                    <div className='holidayDiv'>${e.price} | {holidays[e.holiday_id - 1]}</div>
                    <div className='imageContainer'><img className='displayedItemsImg' src={e.img} alt="img" /></div>
                    <button className='reserveButton'>Reserve</button>
                </div>
            // } else {
            //     return ''
            // }
        })
        return (
            <div className='displayedItemsApp'>
                {displayedItems}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)