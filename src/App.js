import React from 'react'
import Header from './static/view/components/Header';
import Main from './static/view/components/Main'
import './static/css/reset.scss'
import './static/css/toDoList.scss'
class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    }
  }
  
  render() {
    return (
      <section>
        <Header></Header>
        <Main></Main>
      </section>
    )
  }
}

export default App;