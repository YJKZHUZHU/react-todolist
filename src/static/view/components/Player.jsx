import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

export default class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      player: ''
    }    
  }

  componentDidMount() {
    this.setState({
      player: PlayerAPI.get(parseInt(this.props.match.params.number, 10))
    },function() {
    })
  }

  render() {
    if (!this.state.player) {
      return <div>Sorry, but the player was not found</div>
    }else {
      return (
        <div>
          <h1>{this.state.player.name} (#{this.state.player.number})</h1>
          <h2>Position: {this.state.player.position}</h2>
          <Link to='/roster'>Back</Link>
        </div>
      )
    }
    
  }
}

