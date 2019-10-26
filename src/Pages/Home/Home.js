import React, { Component } from 'react'
import axios from 'axios'
const baseUrl = 'http://localhost:8090/api/home'
export default class Home extends Component {
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
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleAddTask = () => {
        debugger
        const body = {
            task: this.state.task,
        }
        axios.post(baseUrl, body)
            .then((response)=>{
                this.setState({
                    task: ''
                })
            })
    }

    render() {
        const allTasks = this.state.tasks.map((e) => {
            return <div>{e.task} -- -- {e.id}</div>
        })
        return (
            <div>
                {allTasks}
                <input name='task' value={this.state.task} onChange={this.handChange} type="text" />
                <button onClick={this.handleAddTask}>Add</button>
            </div>
        )
    }
}
