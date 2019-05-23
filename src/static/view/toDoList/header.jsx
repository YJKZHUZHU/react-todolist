import React from 'react'
export default class Header extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      todoId: 0
    }
  }
  render() {
    return <header className='titleBar'>
      <section>
          <label>ToDoList</label>
          <input type="text" placeholder='添加待办事项' autoComplete='off' name='title' value={this.state.title} onChange={(e)=> this.changeTitle(e)} onKeyDown = {(e) => this.keyDownTitle(e)} />
      </section>
    </header>
  }
  keyDownTitle(e) {
    if (e.keyCode === 13) {
      if (e.target.value === '') {
        return alert('待办事项不能输入为空')
      }
      this.props.addTodoItem(this.state.title, this.state.todoId)
      this.setState({
        title: '',
        todoId: this.state.todoId+1
      },function() {
          console.log(this.state.todoId)
      })
    }
  }
  changeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
}  