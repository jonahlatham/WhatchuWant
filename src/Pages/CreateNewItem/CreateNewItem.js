import React, { Component } from 'react'
import { connect } from 'react-redux';
import './CreateNewItem.css'
import axios from 'axios'

class CreateNewItem extends Component {

    state = {
        holidays: []
    }

    componentDidMount() {
        axios.get('http://localhost:8090/api/holidays')
            .then((response) => {
                this.setState({
                    holidays: response.data.holidays
                })
                console.log(response.data.holidays)
            })
    }

    handleNewItem = (event) => {
        this.props.dispatch({
            type: 'ITEMS',
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
        this.props.dispatch({
            type: 'SUBMIT',
            payload: event.target.value
        })
        alert('Nothing happened')
    }
    render() {
        const loopedHolidays = this.state.holidays.map((e) => {
            return <option key={e.id} value={e.name}>{e.name}</option>
        })
        return (
            <div className='createNewApp'>
                <input placeholder='Item' onChange={this.handleNewItem} type="text" value={this.props.newItem} />
                <select onChange={this.handleHoliday}>
                    <option value="">Select</option>
                    {loopedHolidays}
                </select>
                <button onClick={this.CreateNewItemSubmit}>Submit</button>
            </div>
        );
    }
}

export default connect((storeObject) => { return storeObject })(CreateNewItem)
