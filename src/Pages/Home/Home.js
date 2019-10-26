import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';

const baseUrl = 'http://localhost:8090/api/home'

class Home extends Component {
    state = {
        tasks: [],
        task: ''
    }
    componentDidMount() {
        axios.get(baseUrl)
            .then((response) => {
                this.setState({
                    tasks: response.data
                })
            })
    }

    handChange = (event) => {
        this.props.dispatch({
            type: 'TASKS',
            payload: event.target.value,
        })
    }

    handleAddTask = () => {
        const body = {
            task: this.props.tasks,
        }
        axios.post(baseUrl, body)
            .then((response)=>{
                this.props.dispatch({
                    type: 'SUBMIT',
                })
            })
            window.location.reload()
    }

    render() {
        const allTasks = this.state.tasks.map((e) => {
            return <div>{e.task} -- {e.id} -- {e.isCompleted}</div>
        })
        return (
            <div>
                {allTasks}
                <input name='task' value={this.props.task} onChange={this.handChange} type="text" />
                <button onClick={this.handleAddTask}>Add</button>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)