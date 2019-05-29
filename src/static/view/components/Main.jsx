import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import Roster from './Roster'
import Schedule from './Schedule'
export default class Main extends Component {
  
  render() {
    return (
      <main>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/roster' component={Roster}></Route>
          <Route path='/schedule' component={Schedule}></Route>
        </Switch>
      </main>
    )
  }
}
