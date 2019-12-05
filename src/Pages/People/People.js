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
            })
    }

    render() {
        const peeps = this.state.people.map((e,i)=>{
            // if(e.id!==this.session.user.id)
           return <Link className='linkPeep' key={e.id} to={`/peopleItems/${e.id}`} >
                    < div className='friends' key={e.id}>{e.first_name} <br/> {e.last_name}</div>
            </Link >
        })
        return (
            <div className='peopleApp' >
                {peeps}
            </div>
        )
    }
}