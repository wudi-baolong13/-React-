import React, { Component } from 'react'
import { nanoid } from 'nanoid'
import { connect } from 'react-redux'
import { addPerson } from '../../redux/actions/person'

class Person extends Component {

  addPerson = () => {
    const name = this.nameNode.value
    const age = this.ageNode.value * 1
    const personObj = { id: nanoid(), name, age }
    this.props.addPerson(personObj)
    this.nameNode.value = ''
    this.ageNode.value = ''

  }

  render() {
    return (
      <div>
        <h1>Person组件,上方组件的和为{this.props.count}</h1>
        <input ref={c => this.nameNode = c} type="text" placeholder='请输入姓名' />
        <input ref={c => this.ageNode = c} type="text" placeholder='请输入姓名' />
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {
            this.props.person.map(item => {
              return (<li key={item.id}>{item.name}---{item.age}</li>)
            })

          }

        </ul>
      </div>
    )
  }
}

export default connect(
  state => ({
    person: state.person,
    count:state.count
  }),  //映射状态
  { addPerson }//映射操作状态的方法
)(Person)


