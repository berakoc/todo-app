import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './TodoAdder.css'
import Input from './native/Input'
import TextArea from './native/TextArea'
import Button from './native/Button'

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
                <TextArea title="Content"/>
                <Button text="add" handler={() => console.log('Mouse is activated')}/>
            </div>
        )
    }
}