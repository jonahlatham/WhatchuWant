import React, { Component } from 'react'
import { connect } from 'react-redux';
import './CreateNewItem.css'
import axios from 'axios'

class CreateNewItem extends Component {

    state = {
        holidays: []
    }

    componentDidMount() {
        axios.get('/api/holidays')
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
            })
    }

    handleNewItem = (event) => {
        this.props.dispatch({
            type: 'ITEMS',
            payload: event.target.value,
        })
    }

    handleImage = (event) => {
        this.props.dispatch({
            type: 'IMAGE',
            payload: event.target.value,
        })
    }

    handleHoliday = (event) => {
        this.props.dispatch({
            type: 'HOLIDAY',
            payload: event.target.value
        })
    }

    handleItemPrice = (event) => {
        this.props.dispatch({
            type: 'PRICE',
            payload: event.target.value
        })
    }

    CreateNewItemSubmit = (event) => {
        const body = {
            name: this.props.newItem,
            holiday_id: this.props.holiday,
            img: this.props.itemImage,
            price: this.props.itemPrice
        }
        axios.post('/api/createNew', body)
            .then((response) => {
                if (response.data.success) {
                    this.props.dispatch({ type: 'SUBMIT' })
                    this.props.history.push('/displayedItems')
                } else {
                    alert(response.data.err)
                }
            })
    }

    handleClear = () => {
        this.props.dispatch({ type: 'SUBMIT' })
        window.location.reload()
    }
    render() {
        console.log(this.props.item)
        const loopedHolidays = this.state.holidays.map((e) => {
            return <option className='createNewOptions' key={e.id} value={e.id}>{e.name}</option>
        })

        const holidays = this.state.holidays.map((e) => {
            return e.name
        })
        // let priceTag = this.props.itemPrice.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
        return (
            <div className='createNewFlex'>
                <div className='createNewApp'>
                    <input className='createNewInputs' placeholder='Item' onChange={this.handleNewItem} type="text" value={this.props.newItem} />
                    <input className='createNewInputs' placeholder='Image URL' onChange={this.handleImage} type="text" value={this.props.itemImage} />
                    <input className='createNewInputs' placeholder='Price' onChange={this.handleItemPrice} type="text" value={this.props.itemPrice} />
                    <select className='createNewSelect' onChange={this.handleHoliday}>
                        <option className='createNewOptions' value="">Select</option>
                        {loopedHolidays}
                    </select>
                    <div className='createNewbtnDiv'>
                        <button className='createNewClearButton' onClick={this.handleClear}>Clear</button>
                        <button className='createNewSubmitButton' onClick={this.CreateNewItemSubmit}>Submit</button>
                    </div>
                </div>
                <div className='createNewDisplay'>
                    <div>
                        <div className='displayedItems'>
                            <div className='itemPriceDiv'>{!this.props.newItem ? '' : this.props.newItem} | {this.props.holiday ? holidays[this.props.holiday - 1] : ''}</div>
                            {!this.props.itemPrice ? '$' : `$${this.props.itemPrice}`}
                            <div className='imageContainer'>{this.props.itemImage ? <img className='displayedItemsImg' src={this.props.itemImage} /> : ''}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect((storeObject) => { return storeObject })(CreateNewItem)
