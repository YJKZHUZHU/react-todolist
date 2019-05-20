import React from 'react'
// import  '../css/cmt.css'
function listItem(props) {
  return <div className="cmtList">
          <h1>评论人：{props.user}</h1>
          <p>评论内容: {props.content}</p>
  </div>
}
export default listItem