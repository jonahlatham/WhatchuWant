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

    CreateNewItemSubmit = (event) => {
        const body = {
            name: this.props.newItem,
            holiday_id: this.props.holiday,
            img: this.props.itemImage
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
        return (
            <div className='createNewApp'>
                <input className='createNewInputs' placeholder='Item' onChange={this.handleNewItem} type="text" value={this.props.newItem} />
                <input className='createNewInputs' placeholder='Image URL' onChange={this.handleImage} type="text" value={this.props.itemImage} />
                <select className='createNewSelect' onChange={this.handleHoliday}>
                    <option className='createNewOptions' value="">Select</option>
                    {loopedHolidays}
                </select>
                <button onClick={this.CreateNewItemSubmit}>Submit</button>
                <br />
                <button style={{ width: '50px', margin: 'auto' }} onClick={this.handleClear}>Clear</button>
            </div>
        );
    }
}

export default connect((storeObject) => { return storeObject })(CreateNewItem)
