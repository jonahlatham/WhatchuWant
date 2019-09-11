import React, { Component } from 'react'
import './SavedItems.css'
import axios from 'axios'

let baseUrl = 'http://localhost:8090/api/whatchuwant/wishlist'
class SavedItems extends Component {
    state={
        items: []
    }
    componentDidMount(){
        axios.get(baseUrl)
        .then((response)=>{
            this.setState({
                items: response.data
            })
        })
    }
    render() {
        const listedItems = this.state.items.map((e,i)=>{
            return <div key={e.id} className='listedItemsSavedItems'>{e.name}
            <br/>
            {e.link}
            <br/>
            {e.holiday}
            <br/>
        {e.price}</div>
        })
        return (
            <div className='savedItemsApp'>
                {listedItems}
            </div>
        )
    }
}

export default SavedItems