import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import FullRoster from './FullRoster'
import Player from './Player'
export default class Roster extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/roster' component={FullRoster}></Route>
        <Route path='/roster/:number' component={Player}></Route>
      </Switch>
    )
  }
}
