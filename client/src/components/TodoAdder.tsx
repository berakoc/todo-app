import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TodoAdder.css'
import Input from './native/Input'
import InputArea from './native/InputArea'

interface TodoAdderProps {

}

interface TodoAdderState {

}

export default class TodoAdder extends Component<TodoAdderProps, TodoAdderState> {
    static propTypes = {}

    render() {
        return (
            <div id="TodoAdder">
                <Input type="text" placeHolder="Title"/>
            </div>
        )
    }
}