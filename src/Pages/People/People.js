import React, { Component } from 'react'
import './People.css'
import axios from 'axios'
import { Link } from "react-router-dom"

export default class People extends Component {
    state = {
        people: []
    }
    componentDidMount() {
        axios.get('/api/people')
            .then((response) => {
                this.setState({
                    people: response.data.people
                })
                console.log(this.state.people)
            })
    }
    handleTakeToPeople = () => {

    }

    render() {
        const peeps = this.state.people.map((e,i)=>{
           return <Link key={1} to={`/people/${e.id}`} >
                    < div key={e.id}>{e.first_name} {e.last_name}</div>
            </Link >
        })
        return (
            <div className='peopleApp' >
                {peeps}
            </div>
        )
    }
}