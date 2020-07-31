import React, { Component } from 'react'
import './Main.css'
import TodoAdder from './TodoAdder'
import CardList from './native/CardList'

export default class Main extends Component {
    render() {
        return (
            <div id="Main">
                <TodoAdder />
                <div className="verticalSeparator"></div>
                <CardList />
            </div>
        )
    }
}
