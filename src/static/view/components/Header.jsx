import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <header style={{marginTop: '20px',marginBottom: '30px'}}>
        <nav>
          <ul>
            <li><Link to='/'>首页</Link></li>
            <li><Link to='/roster'>列表</Link></li>
            <li><Link to='/schedule'>邮箱</Link></li>
          </ul>
        </nav>
      </header>
    )
  }
}