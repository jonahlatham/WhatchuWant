import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import LeftSideHeader from './LeftSideHeader/LeftSideHeader'
import Home from './Pages/Home/Home'
import CreateNewItem from './Pages/CreateNewItem/CreateNewItem'
import DisplayedItems from './Pages/DisplayedItems/DisplayedItems'
import Login from './LogReg/Login/Login'
import Register from './LogReg/Register/Register'
import { connect } from 'react-redux';

let baseUrl = 'http://localhost:8090/api/whatchuwant'

class App extends Component {
  componentDidMount() {
    axios.get('/auth/user')
      .then((response) => {
        if (response.data.success) {
          this.props.dispatch({ type: 'SET_USER', payload: response.data.user })
        }
      })
  }
  render() {
    let authRoutes = ''
    if (this.props.user) {
      authRoutes = [
        <Route path="/CreateNewItem" component={CreateNewItem} />,
        <Route path="/DisplayedItems" component={DisplayedItems} />,
        <Route path="/Home" exact component={Home} />,
      ]
    }
    return (
      <div className='App' >
        <Router>
          <div className='flexFlex'>
            <LeftSideHeader />
          </div>
          <Switch>
            {authRoutes}
            <Route path="/register" component={Register} />
            <Route path="/" component={Login} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default connect((storeObject) => { return storeObject })(App)