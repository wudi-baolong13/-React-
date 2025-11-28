import React, { Component } from 'react'
//引入action
import {
    createIncrementAction,
    createDecrementAction,
    createIncrementAsyncAction
} from '../../redux/count_action'

//引入connect用于连接UI组件与redux
import { connect } from 'react-redux'

//定义UI组件
class Count extends Component {



    increment = () => {
        const { value } = this.selectNumber
        this.props.jia(value * 1)

    }
    decrement = () => {
        const { value } = this.selectNumber
        this.props.jian(value * 1)

    }
    incrementIfOdd = () => {
        const { value } = this.selectNumber
        if (this.props.count % 2 !== 0) this.props.jia(value * 1)


    }
    incrementAsync = () => {
        const { value } = this.selectNumber
        this.props.jiaAsync(value * 1, 1000)

    }

    render() {
        console.log(this.props, 'props')
        return (
            <div>
                <h1>当前求和为：{this.props.count}</h1>
                <select ref={c => this.selectNumber = c}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>&nbsp;
                <button onClick={this.increment}>+</button>&nbsp;
                <button onClick={this.decrement}>-</button>&nbsp;
                <button onClick={this.incrementIfOdd}>奇数时加</button>&nbsp;
                <button onClick={this.incrementAsync}>异步加</button>&nbsp;
            </div>
        )
    }
}



/*
    1.mapStateToProps函数返回的是一个对象
    2.返回对象中的key就作为传递给UI组件props的key，value就作为传递给UL组件props的values----状态
    3.mapStateToProps用于传递状态
 */
//映射状态
// const mapStateToProps = state => ({ count: state })

/*
    1.mapDispatchToProps函数返回的是一个对象
    2.返回对象中的key就作为传递给UI组件props的key，value就作为传递给UL组件props的values----状态
    3.mapDispatchToProps用于传递操作状态的方法
 */
//映射操作状态的方法
// const mapDispatchToProps = dispatch => (
//     {
//         ji  a: number => { dispatch(createIncrementAction(number)) },
//         jian: number => { dispatch(createDecrementAction(number)) },
//         jiaAsync: (number, time) => { dispatch(createIncrementAsyncAction(number, time)) },
//     }
// )


//使用connect()()创建并暴漏一个Count的容器组件
export default connect(
    state => ({ count: state }),
    //mapDispatchToProps的一般写法
    // dispatch => ({
    //         jia: number => { dispatch(createIncrementAction(number)) },
    //         jian: number => { dispatch(createDecrementAction(number)) },
    //         jiaAsync: (number, time) => { dispatch(createIncrementAsyncAction(number, time)) },
    //     })

    //mapDispatchToProps的简写
    {
        jia: createIncrementAction,
        jian: createDecrementAction,
        jiaAsync: createIncrementAsyncAction
    }
)(Count)