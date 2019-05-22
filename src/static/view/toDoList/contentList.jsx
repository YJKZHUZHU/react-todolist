import React from 'react'
import PropTypes from 'prop-types'
export default class ContentList extends React.Component {
  static contextTypes = {
    removeItem: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      isChecked: false,
      done: false
    }
  }
  handelChange(e) {
    this.setState({
      isChecked: e.target.checked,
      done: e.target.checked
    }, function () {
        this.props.getTodoListStatus(this.state.done, this.props.todoId)
    })
  }
  render() {
    return (
      <li style={{ background: (this.props.checkedStatus ? "#ccc" : "none") }}>
        <input type="checkbox" checked={this.props.checkedStatus} onChange={(e) => { this.handelChange(e) }} />
        <p>{this.props.title}</p>
        <span onClick={() => this.context.removeItem(this.props.todoId)}>删除</span>
      </li>
    )
  }
}