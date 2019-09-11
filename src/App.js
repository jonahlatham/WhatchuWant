import React, { Component } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import Header from './Header/Header'
import Home from './Pages/Home/Home'
import CreateNewItem from './Pages/CreateNewItem/CreateNewItem'
import SavedItems from './Pages/SavedItems/SavedItems'

let baseUrl = 'http://localhost:8090/api/whatchuwant'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <Header />
          <Switch>
            <Route path="/CreateNewItem/" component={CreateNewItem} />
            <Route path="/SavedItems/" component={SavedItems} />
            <Route path="/" exact component={Home} />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
