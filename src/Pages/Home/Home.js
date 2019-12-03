import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import './Home.css'
class Home extends Component {

    render() {
        return (
            <div className='homeApp'>
                <div className='hometext'>
                    <p>Finding the right present for your family and friends 
                    can sometimes seem impossible. With Whatchuwant you
                    can now show everyone what you want and when you want 
                    it.</p>
                    <br/>
                    <p>Go to create new to get started! <br/> add the name,
                    price, image, the holiday you want it for, and rate how 
                    much you want the item so your friends can find it later.
                    </p><img className='img' src="./createNew.png" alt="img"/>
                    <br/>
                    <p>Go to displayed items to view and manage your wish list.
                        </p> <img src="./displayedItem.png" alt="img"/>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)