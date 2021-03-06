import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import './Home.css'
import cretCrap from './createNew.png'
import disCrap from './displayedItem.png'
import friCrap from './friends.png'
class Home extends Component {

    render() {
        return (
            <div className='homeApp'>
                <div className='homeText'>
                    <h4>Finding the right present for your family and friends
                    can sometimes seem impossible. <br /> With Whatchuwant you
                    can now show everyone what you <br /> want and when you want
                    it.</h4>
                    <hr />
                    <br />
                    <div className='displayer1'>
                        <p class='createNewDv'>
                            Go to create new to get started! Add the name,
                        price, image, the holiday you want it for, and rate how
                        much you want the item so your friends can find it later.
                        </p>
                        <img className='homeImg1' src={cretCrap} alt="img" />
                    </div>
                    <br />
                    <div className='displayer2' >
                        <img className='homeImg2' src={disCrap} alt="img" />
                        <p className='dispDv'>
                            Go to displayed items to view your wish list.
                            You can also manage and delete items you no longer want.
                        </p>
                    </div>
                    <br />
                    <div className='displayer1'>
                        <p className='friendsDv'>
                            Go to friends to view what everyone is asking for.
                            You can even reserve the gifts so you don't have to
                            worry about getting them the same thing.
                        </p>
                        <img className='homeImg1' src={friCrap} alt="img" />
                    </div>
                </div>
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)