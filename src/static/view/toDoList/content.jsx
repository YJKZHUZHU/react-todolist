import React from 'react'

export default class Content extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
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
            return (
              <li key={index}>
                <input type="checkbox"/>
                <p>{item.title}</p>
                <span>删除</span>
              </li>
            )
          })}
        </ul>
        <h2>已经完成
          <span>{this.completeList.length}</span>
        </h2>
        <ul>
          {this.completeList.map((item, index) => {
            return (
              <li key={index} className='doneList'>
                <input type="checkbox" />
                <p id="todoContent">{item.title}</p>
                <span>删除</span>
              </li>
            )
          })}
        </ul>
      </section>
    )
  }
}