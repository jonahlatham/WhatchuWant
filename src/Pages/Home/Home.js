import React, { Component } from 'react'
import './Home.css'
import axios from 'axios'

let baseUrl = 'http://localhost:8090/api/whatchuwant'

class Home extends Component {
    state = {
        people: [],
        img: '',
    }
    componentDidMount() {
        axios.get(baseUrl)
            .then((response) => {
                console.log(response.data)
                this.setState({
                    people: response.data,
                    img: response.data[0].img
                })
            })
    }
    render() {
        const newPeople = this.state.people.map((e, i) => {
            return <div key={e.id}>{e.first_name}</div>
        })
        return (
            <div className='homeApp'>
                <img className='imageHomePage' src={this.state.img} alt=" " />
                <div className='topHalfHomePage'>
                    <div className='findFriendsHomePage'>
                        <u>Friends</u>
                        {newPeople}
                    </div>
                    <div className='findFriendsHomePage'>
                        <u>Find Friends</u>
                        <input type="text" placeholder='Search' name="" id="" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Home