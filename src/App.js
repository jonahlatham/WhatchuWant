import React, { Component } from 'react'
import './App.css'
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"
import LeftSideHeader from './LeftSideHeader/LeftSideHeader'
import Home from './Pages/Home/Home'
import CreateNewItem from './Pages/CreateNewItem/CreateNewItem'
import DisplayedItems from './Pages/DisplayedItems/DisplayedItems'

let baseUrl = 'http://localhost:8090/api/whatchuwant'

class App extends Component {
  render() {
    return (
      <div className='App'>
        <Router>
          <div className='flexFlex'>
            <LeftSideHeader />
            <Switch>
              <Route path="/CreateNewItem" component={CreateNewItem} />
              <Route path="/DisplayedItems" component={DisplayedItems} />
              <Route path="/Home" exact component={Home} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App
