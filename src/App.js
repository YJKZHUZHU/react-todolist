import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import Header from './static/view/toDoList/header'
import Content from './static/view/toDoList/content'
import Footer from './static/view/toDoList/footer'
// import ThreeLevelLinkage from './static/view/Three-level-linkage/index'
import './static/css/reset.scss'
import './static/css/toDoList.scss'
import './static/css/threeLevelLinkageButton.scss'
class App extends React.Component {
  
  static childContextTypes = {
    removeItem: PropTypes.func,
  }
  
  constructor(props) {
    super(props)
    this.state = {
      todoList: []
    }
  }

  getChildContext() {
    return {
      removeItem: this.removeItem
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

  addTodoItem(todoText,todoId) {
    const {
      todoList
    } = this.state

    this.setState({
      todoList: [...todoList, {
        title: todoText,
        done: false,
        id: todoId
      }]
    }, function(){
        localStorage.setItem('todoList', JSON.stringify(this.state.todoList))
    })
  }
// 注意this指向，不用箭头函数this指向会指向这个函数本身，拿不到实例对象里面的state
  removeItem = (index)=>  {
    const {
      todoList
    } = this.state
    // 返回被删除的数组
    let removeItem = _.remove(todoList, function(item) {
      return item.id === index
    })
    console.log(removeItem)
    this.setState({
      todoList: todoList
    }, function() {
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

  getTodoListStatus(value, index) {
    console.log(value, index)
    const {
      todoList
    } = this.state
    // 返回被删除的数组
    _.forEach(todoList, function(o, todoIndex) {
      if (o.id === index) {
        o.done = value
      }
    })
    this.setState({
      todoList: todoList
    }, function () {
      localStorage.setItem('todoList', JSON.stringify(todoList))
    })
  }
  // 编辑
  editTodoItem(id, title) {
    const {
      todoList
    } = this.state
    _.forEach(todoList, function(item) {
      if (item.id === id) {
        item.title = title
      }
    })
    this.setState({
      todoList: todoList
    },function() {
      
    })
    
  }

  render() {
    return <div>
      <Header addTodoItem={this.addTodoItem.bind(this)}></Header>
      <Content todoList={this.state.todoList} removeItem={this.removeItem.bind(this)} getTodoListStatus={this.getTodoListStatus.bind(this)} editTodoItem={this.editTodoItem.bind(this)}></Content>
      <Footer clear={this.clear.bind(this)}></Footer>
      {/* <ThreeLevelLinkage></ThreeLevelLinkage> */}
    </div>
  } 
}

export default App;