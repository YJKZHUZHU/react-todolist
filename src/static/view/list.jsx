import React from 'react'
import ListItem from './listItem'
// import '../css/cmt.css'
export default class List extends React.Component {
  constructor () {
    super()
    this.state = {
      messageTitle: '这是评论组件demo',
      commonList: [
        { id: 1, user: '叶俊宽', content: '叶俊宽在学习react' },
        { id: 2, user: '华晓雯', content: '华晓雯在学习美术' },
        { id: 3, user: '唐红涛', content: '唐红涛在学习dva' },
        { id: 4, user: '陈彦佳', content: '陈彦佳在学习vue' },
        { id: 5, user: '谭明华', content: '谭明华在学习nodejs' },
        { id: 6, user: '李波兰', content: '李波兰在学习java' }
      ]
    }
  }
  render() {
     return (
      <div className='container'>
        <h1 className='title' onClick={()=> {this.showAlert()}}>{this.state.messageTitle}</h1>
        <input type='text' value={this.state.messageTitle} style={{width: '100%'}} onChange={(e) => this.setInputText(e)} />
        {this.state.commonList.map(item => <ListItem {...item} key={item.id}></ListItem>)}
      </div>
    );
  }
  setInputText = (e) => {
    console.log(e.target.value)
    this.setState({
      messageTitle: e.target.value
    })
  }
  showAlert = ()=> {
    console.log(11111)
    this.setState({
      messageTitle: '我改变了评论组件demo'
    }, function() {
      console.log(this.state.messageTitle)
    })
  }
}