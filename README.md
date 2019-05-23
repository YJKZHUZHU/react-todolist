

## react实现`todolist`增删改查

1. 项目运行（脚手架`create-react-app生成项目`）

   - `npm install`安装依赖
   - `npm start`运行在`ocalhost:3000`

2. 项目准备工作（为了练习react将`todolist复杂化了`）

   - `antd` 

     - `antd`按需加载

       安装插件`react-app-rewired`(一个对`create-react-app`自定义配置的解决方案)

       修改`package.json`里面的启动配件

       ```javascript
       /* package.json */
       "scripts": {
       -   "start": "react-scripts start",
       +   "start": "react-app-rewired start",
       -   "build": "react-scripts build",
       +   "build": "react-app-rewired build",
       -   "test": "react-scripts test",
       +   "test": "react-app-rewired test",
       }
       ```

       在项目根目录下创建一个`config-overrides.js`（根目录和`package.json同级`）

       安装按需加载样式插件`babel-plugin-import`

       ```javascript
       const { override, fixBabelImports } = require('customize-cra');
       module.exports = override(
          fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: 'css',//设置为true加载less,我没成功，，，，不知道是不是哪里搞错了
          }),
        );
       ```

     - `loadsh.js`封装好的`js`库，在这里主要用于数组的操作

   3.代码

   - `app.js`

     ```javascript
     import React from 'react'
     import _ from 'lodash'
     import PropTypes from 'prop-types'
     import Header from './static/view/toDoList/header'
     import Content from './static/view/toDoList/content'
     import Footer from './static/view/toDoList/footer'
     import './static/css/reset.scss'
     import './static/css/toDoList.scss'
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
         </div>
       } 
     }
     
     export default App;
     ```

   - `header.jsx`

     ```javascript
     import React from 'react'
     export default class Header extends React.Component {
       constructor(props) {
         super(props)
         this.state = {
           title: '',
           todoId: 0
         }
       }
       keyDownTitle(e) {
         if (e.keyCode === 13) {
           if (e.target.value === '') {
             return alert('待办事项不能输入为空')
           }
           this.props.addTodoItem(this.state.title, this.state.todoId)
           this.setState({
             title: '',
             todoId: this.state.todoId + 1
           }, function () {
             console.log(this.state.todoId)
           })
         }
       }
     
       changeTitle(e) {
         this.setState({
           title: e.target.value
         })
       }
     
       render() {
         return <header className='titleBar'>
           <section>
               <label>ToDoList</label>
               <input type="text" placeholder='添加待办事项' autoComplete='off' name='title' value={this.state.title} onChange={(e)=> this.changeTitle(e)} onKeyDown = {(e) => this.keyDownTitle(e)} />
           </section>
         </header>
       }
     }  
     ```

   - `content.jsx`

     ```javascript
     import React from 'react'
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
     ```

   - `contentList.jsx`

     ```javascript
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
     ```

   - `footer.jsx`

     ```javascript
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
     ```

### `react`使用过程中遇到的问题

1.组件间的传值，子组件想要用父组件的数据，需要通过this.props拿到，父组件需要用子组件的数据，需在子组件用回调函数传递`this.props.fn.bind(this)`在子组件就可以调用`fn(n1,n2)`,父组件接收这个参数。

2.组件嵌套的传递数据，一样通过props,一层层传递下去，在学习过程中，用到了上下文对象`this.context()`，共享数据和方法。当一些数据需要在不同的嵌套级别上被许多组件访问时，首先考虑使用 Context 。 请谨慎使用它，因为它使组件重用更加困难。 

3.`react`的input需要绑定`value`或者`onChange`事件，需要绑定回车事件，需先绑定`onChange`事件，改变`this.state`的数据，在通过`onKeyDown`事件判断`e.keyCode `来处理，`          <input type="text" placeholder='添加待办事项' autoComplete='off' name='title' value={this.state.title} onChange={(e)=> this.changeTitle(e)} onKeyDown = {(e) => this.keyDownTitle(e)} /> `

4.组件间传递数据的时候`props`的数据是不可修改的，只能在自己的组件内修改自己的数据，要修改其他组件的数据，可以用回调函数传参，改变。

5.react的没有像`vue`里面有scoped属性，来指定样式的作用域，在`vue`里面可以在组件内部样式里面加入`scoped`属性让写的样式只在该组件内生效，`react`要实现样式的模块化，可以修改`webpack`的配置文件，有点麻烦，如果`react`样式没有进行模块化，一不小心就会导致样式冲突，可以这样做，自己写的样式用`sass`,外部引入的样式用`css`控制，可以有效避免 。

6.类名需用`className`,`react`用`js`模拟`DOM`元素，即`虚拟DOM`，`class`在`js`里面是关键字，所以用`className`,写行内样式要注意，用`{{}}`,`jsx`语法里面`{}`里面可以放任何有效的`js表达式`，因此写行内样式需用`{}`包裹，样式属性要用小驼峰明名

7.想要修改state里面的数据，需要用`this.setstate({})`进行修改，但是直接操作`state`不会报错，一样可以改变，但是页面上并不会出现不要的结果，但是不推荐，会报警告，要知道`setState`本质是通过一个队列机制实现state更新的。 执行`setState`时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。  如果不通过`setState`而直接修改`this.state`，那么这个`state`不会放入状态队列中，下次调用`setState`时对状态队列进行合并时，会忽略之前直接被修改的`state`，这样我们就无法合并了，而且实际也没有把你想要的`state`更新上去。 