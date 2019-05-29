import React from 'react'
import PlayerAPI from '../api'
import { Link } from 'react-router-dom'

export default class FullRoster extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <ul>
        {
          PlayerAPI.all().map(p => (
            <li key={p.number}>
              <Link to={`/roster/${p.number}`}>{p.name}</Link>
            </li>
          ))
        }
      </ul>
    )
    
  }
}