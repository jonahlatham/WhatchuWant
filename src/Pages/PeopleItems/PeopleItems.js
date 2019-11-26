import React, { Component } from 'react'
import './PeopleItems.css'
import axios from 'axios'

export default class PeopleItems extends Component {
    state = {
        items: [],
        holidays: [],
        people: []
    }

    componentDidMount() {
        axios.get(`/api/displayItems/${this.props.match.params.id}`)
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
                return axios.get('/api/people')
                    .then((response) => {
                        this.setState({
                            people: response.data.people
                        })
                    })
            })
    }

    handleReserve = (id) => {
        let body = {
            item_id: id
        }
        axios.put('/api/createNew', body)
            .then((response) => {
                this.setState({
                    items: response.data.items
                })
            })
            window.location.reload()
    }

    handleUnReserve = (id) => {
        let body = {
            item_id: id,
        }
        axios.put('/api/createNewTwo', body)
            .then((response) => {
                this.setState({
                    items: response.data.items
                })
            })
            window.location.reload()
            }

    render() {
        let holidays = this.state.holidays.map((e) => {
            return e.name
        })

        const names = this.state.people.map((e) => {
            if (Number(this.props.match.params.id) ===e.id){
                return `${e.first_name} ${e.last_name}`
            } else {
                return ''
            }
        })

        const fire = <div><img className='fireRating' src="https://dejpknyizje2n.cloudfront.net/marketplace/products/modern-flame-fire-logo-sticker-1539108491.5454743.png" alt="fire" /></div>

        let items = this.state.items.map((e, i) => {
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
                <br />
                <button className='reserveButton' onClick={e.reserved_by_user_id ? () => { this.handleUnReserve(e.id) } : () => { this.handleReserve(e.id) }}>{e.reserved_by_user_id ? 'Unreserve' : 'Reserve'}</button>
            </div >
        })

        return (
            <div className='peopleItemsApp' >
                <h1>{names}</h1>
                <div className='peopleItemsDiv'>
                    {items}
                </div>
            </div>
        )
    }
}
