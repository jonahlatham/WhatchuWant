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
        axios.get(`/api/displayItems/0`)
            .then((response) => {
                this.setState({
                    items: response.data.items
                })
                return axios.get('/api/holidays')
            })
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
            })
    }

    handleDelete = (id) => {
        axios.delete(`/api/displayItems/${id}`)
            .then((response) => {
                this.setState({
                    items: response.data.items
                })
            })
    }

    // handleReserve = (id) => {
    //     let body = {
    //         item_id: id
    //     }
    //     axios.put('/api/createNew', body)
    //         .then((response) => {
    //             this.setState({
    //                 items: response.data.items
    //             })
    //         })
    // }

    render() {
        const holidays = this.state.holidays.map((e) => {
            return e.name
        })

        const fire = <div><img className='fireRating' src="https://dejpknyizje2n.cloudfront.net/marketplace/products/modern-flame-fire-logo-sticker-1539108491.5454743.png" alt="fire" /></div>

        const displayedItems = this.state.items.map((e) => {
            let fires = []

            if (e.rating > 8) {
                fires = [fire, fire, fire]
            } else if (e.rating > 5) {
                fires = [fire, fire]
            } else if (e.rating > 4) {
                fires = [fire]
            }
            return <div className='displayedItems' key={e.id} style={{ opacity: `${e.reserved_by_user_id ? '.5' : '1'}` }}>
                <div className='itemPriceDiv'>
                    <h4 className='eNameDiv'> <div className='fires'>{fires}</div>  <div className='nameDiv'>{e.name}</div></h4>
                    <br />
                </div>
                <div className='holidayDiv'>${e.price} | {holidays[e.holiday_id - 1]}</div>
                <div className='imageContainer'><img className='displayedItemsImg' src={e.img} alt="img" /></div>
                {e.reserved_by_user_id ? `This is reserved by ${e.user_name}` : ''}
                <button className='reserveButton' onClick={() => { this.handleDelete(e.id) }}>Delete Item</button>
            </div >
        })
        return (
            <div className='displayedItemsApp'>
                {displayedItems}
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(DisplayedItems)