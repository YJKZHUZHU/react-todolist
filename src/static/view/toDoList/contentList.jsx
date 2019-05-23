import React from 'react'
import PropTypes from 'prop-types'
import { Input } from 'antd';
export default class ContentList extends React.Component {
  static contextTypes = {
    removeItem: PropTypes.func
  }
  constructor (props) {
    super(props)
    this.state = {
      isChecked: false,
      done: false,
      display_name_p: 'block',
      display_name_input: 'none',
      editText: props.title
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
  display_name() {
    this.setState({
      display_name_p: 'none',
      display_name_input: 'block'
    })
  }
  edit(e) {
    this.setState({
      editText: e.target.value
    })
  }
  editEnter() {
    this.setState({
      display_name_p: 'block',
      display_name_input: 'none'
    }, function() {
        this.props.editTodoItem(this.props.todoId, this.state.editText)
    })

  }
  render() {
    return (
      <li style={{ background: (this.props.checkedStatus ? "#ccc" : "none") }}>
        <input type="checkbox" checked={this.props.checkedStatus} onChange={(e) => { this.handelChange(e) }} />
        <p onClick={() => { this.display_name() }} style={{ display: this.state.display_name_p}}>{this.props.title}</p>
        <Input style={{ display: this.state.display_name_input, width: '80%', left: '44px' }} value={this.state.editText} onPressEnter={()=>{this.editEnter()}} onChange={(e)=>{this.edit(e)}}></Input>
        <span onClick={() => this.context.removeItem(this.props.todoId)}>删除</span>
      </li>
    )
  }
}