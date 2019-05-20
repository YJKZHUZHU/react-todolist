import React from 'react'
export default class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }
  clear() {
    this.props.clear()
  }
  render() {
    return (
      <footer>
        <span>ToDoListDemo-叶俊宽</span>
        <span onClick={() => this.clear()}>清除</span>
      </footer>
    );
  }
}