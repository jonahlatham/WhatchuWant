import React, { Component } from 'react'
import { connect } from 'react-redux';
import './CreateNewItem.css'

class CreateNewItem extends Component {
    state = {
        holidays: ['christmas', 'birthday', 'kwanzaa']
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
            // payload: event.target.value
        })
        alert('Nothing happened')
    }
    render() {
        const holiday = this.state.holidays.map((e) => {
            return <option value={e}>{e}</option>
        })
        return (
            <div className='createNewApp'>
                <input placeholder='Item' onChange={this.handleNewItem} type="text" value={this.props.newItem} />
                <select onChange={this.handleHoliday}>
                    <option value="">Select</option>
                    {holiday}
                </select>
                <button onClick={this.CreateNewItemSubmit}>Submit</button>
            </div>
        );
    }
}

export default connect((storeObject) => { return storeObject })(CreateNewItem)


// CREATE TABLE holidays (
//     id PRIMARY KEY,
//     holiday varchar,
//     date_added Datetime,
// );