import React, { Component } from 'react'
import './Main.css'
import Card from './native/Card'
import TodoAdder from './TodoAdder'

export default class Main extends Component {
    render() {
        return (
            <div id="Main">
                <TodoAdder />
                <div className="verticalSeparator"></div>
                <Card title="Shopping" content="Buy some eggs" date={new Date()}/>
            </div>
        )
    }
}
