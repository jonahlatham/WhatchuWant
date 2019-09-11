import React, { Component } from 'react'
import './CreateNewItem.css'
import axios from 'axios'

let baseUrl = 'http://localhost:8090/api/whatchuwant/wishlist'
class CreateNewItem extends Component {
    state = {
        name: '',
        link: '',
        holiday: '',
        price: '',
    }

    handleAdd = () => {
        const body = {
            name: this.state.name,
            link: this.state.link,
            holiday: this.state.holiday,
            price: this.state.price,
        }
        axios.post(baseUrl, body)
        this.setState({
            name: '',
            link: '',
            holiday: '',
            price: '',
        })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {

        return (
            <div className='createNewItemApp'>
                <div className='inputsNewItemsPage'>
                    <input className='inputNewItemPage' placeHolder='Name' name='name' value={this.state.name} onChange={this.handleChange} type="text" />
                    <input className='inputNewItemPage' placeHolder='Link' name='link' value={this.state.link} onChange={this.handleChange} type="text" />
                    <input className='inputNewItemPage' placeHolder='Holiday' name='holiday' value={this.state.holiday} onChange={this.handleChange} type="text" />
                    <input className='inputNewItemPage' placeHolder='Price' name='price' value={this.state.price} onChange={this.handleChange} type="text" />
                    <button className='buttonNewItemPage' onClick={this.handleAdd}>Add</button>
                </div>
            </div>
        )
    }
}

export default CreateNewItem