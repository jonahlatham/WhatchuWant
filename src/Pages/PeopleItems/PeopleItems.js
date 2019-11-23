import React, { Component } from 'react'
import './PeopleItems.css'
import axios from 'axios'

export default class PeopleItems extends Component {
    state = {
        items: [],
        holidays: []
    }

    componentDidMount() {
        axios.get(`/api/displayItems/${this.props.match.params.id}`)
            .then((response) => {
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

    render() {
        // debugger

        let holidays = this.state.holidays.map((e) => {
            return e.name
        })

        const fire = <div><img className='fireRating' src="https://dejpknyizje2n.cloudfront.net/marketplace/products/modern-flame-fire-logo-sticker-1539108491.5454743.png" alt="fire" /></div>
        let fires = []

        let items = this.state.items.map((e, i) => {
            if (e.rating > 8) {
                fires = [fire, fire, fire]
            } else if (e.rating > 5) {
                fires = [fire, fire]
            } else if (e.rating > 4) {
                fires = [fire]
            } else {
                return fires
            }
            // if (e.creator_id === this.props.match.params.id) {
                return <div className='displayedItems' key={e.id}>
                    <div className='itemPriceDiv'>
                        <h4 className='eNameDiv'> <div className='fires'>{fires}</div>  <div className='nameDiv'>{e.name}</div></h4>
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

        let name = this.state.items.map((e) => {
            if (e.creator_id === this.props.match.params.id) {
                return <h1>{e.first_name} {e.last_name}</h1>
            } else {
                return ''
            }
        })

        return (
            <div className='peopleItemsApp'>
                <div className='peopleItemsDiv'>
                    {name}
                    {items}
                </div>
            </div>
        )
    }
}
