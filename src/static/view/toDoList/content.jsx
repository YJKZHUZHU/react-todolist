import React from 'react'
import PropTypes from 'prop-types';
import ContentList from './contentList'
export default class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      isChecked: false
    }
  }

  get unCompleteList() {
    return this.props.todoList.filter(item => !item.done)
  }

  get completeList() {
    return this.props.todoList.filter(item => item.done)
  }

  render () {
    return (
      <section className='content'>
        <h2>正在进行
          <span>{this.unCompleteList.length}</span>
        </h2>
        <ul>
          {this.unCompleteList.map((item, index) => {
            return <ContentList key={index} title={item.title} index={index} todoId={item.id} getTodoListStatus={this.props.getTodoListStatus} editTodoItem={this.props.editTodoItem} checkedStatus={item.done}></ContentList>
          })}
        </ul>
        <h2>已经完成
          <span>{this.completeList.length}</span>
        </h2>
        <ul>
          {this.completeList.map((item, index) => {
            return <ContentList key={index} title={item.title} index={index} todoId={item.id} getTodoListStatus={this.props.getTodoListStatus} checkedStatus={item.done} editTodoItem={this.props.editTodoItem}></ContentList>
          })}
        </ul>
      </section>
    )
  }
}

Content.propTypes = {
  editTodoItem: PropTypes.func,
  getTodoListStatus: PropTypes.func,
  removeItem: PropTypes.func,
  todoList: PropTypes.array
}
