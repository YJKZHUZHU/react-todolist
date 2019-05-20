import React from 'react'
import Header from './static/view/toDoList/header'
import Content from './static/view/toDoList/content'
import Footer from './static/view/toDoList/footer'
import './static/css/reset.scss'
import './static/css/toDoList.scss'
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todoList: []
    }
  }
  
  componentDidMount() {
    this.setInitialData()
  }

  setInitialData() {
    let todoList = localStorage.getItem('todoList')

    this.setState({
      todoList: JSON.parse(todoList || '[]')
    })
  }

  addTodoItem(todoText) {
    const {
      todoList
    } = this.state

    this.setState({
      todoList: [...todoList, {
        title: todoText,
        done: false
      }]
    }, function(){
        localStorage.setItem('todoList', JSON.stringify(todoList))
    })
  }
  clear() {
    this.setState({
      todoList: []
    }, function() {
      localStorage.clear()
    })
  }

  render() {
    return <div>
      <Header addTodoItem={this.addTodoItem.bind(this)}></Header>
      <Content todoList={this.state.todoList}></Content>
      <Footer clear={this.clear.bind(this)}></Footer>
    </div>
  } 
}

export default App;