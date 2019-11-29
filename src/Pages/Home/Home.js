import React, { Component } from 'react'
import { connect } from 'react-redux';
import axios from 'axios'
import './Home.css'
class Home extends Component {

    render() {
        return (
            <div className='homeApp'>
                {/* <img className='shurikenImg' src="https://www.pngrepo.com/download/200832/shuriken.png" alt=""/> */}
                <img className='shurikenImg' src="https://i-love-png.com/images/tribal-eye-png-2.png" alt="" />
                <br/>
                <img className='shurikenImg2' src="https://i-love-png.com/images/tribal-eye-png-2.png" alt="" />
                <div className='hometext'>
                    <p>Random crap to fill the endless void that is here <br/>
                    Random crap to fill the endless void that is here <br/>
                    More random crap running through this page to do stuff <br/>
                    More random crap running through this page to do stuff <br/>
                    and then you run and it is there and here and everything <br/>
                    and then you run and it is there and here and everything <br/></p>
                </div>
                <br/><br/><br/><br/>
                <br/><br/><br/><br/>
                
                <img className='shurikenImg' src="https://i-love-png.com/images/tribal-eye-png-2.png" alt="" />
                <br/>
                <img className='shurikenImg2' src="https://i-love-png.com/images/tribal-eye-png-2.png" alt="" />
            </div>
        )
    }
}

export default connect((storeObject) => { return storeObject })(Home)