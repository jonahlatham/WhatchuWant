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
import Head from './Head/Head'
import { connect } from 'react-redux';


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
        <Route key={1} path="/createNewItem" component={CreateNewItem} />,
        <Route key={2} path="/displayedItems" component={DisplayedItems} />,
        <Route key={3} path="/home" exact component={Home} />,
      ]
    }
    return (
      <div className='App' >
        <Router>
          <div className='sideBySide'>
            <LeftSideHeader />
            <div className='flexFlex'>
              <div className='head'>
                <Head />
              </div>
              <Switch>
                {authRoutes}
                <Route path="/register" component={Register} />
                <Route path="/" component={Login} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default connect((storeObject) => { return storeObject })(App)