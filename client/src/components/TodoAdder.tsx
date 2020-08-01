import React, { Component } from 'react'
import './TodoAdder.css'
import Input from './native/Input'
import TextArea from './native/TextArea'
import Button from './native/Button'
import Card from './native/Card'

interface TodoProps {
    addTodoCard(card: JSX.Element | void): void
}

interface TodoAdderState {
    title: string
    content: string
    getTitle?: {(): string}
    getContent?: {(): string}
    resetTitle?: {(): void}
    resetContent?: {(): void}
}

export default class TodoAdder extends Component<TodoProps, TodoAdderState> {
    private titleRef: (input: Input) => void
    private contentRef: (textArea: TextArea) => void

    constructor(props: TodoProps) {
        super(props)
        this.state = {
            title: '',
            content: ''
        }
        this.titleRef = (input: Input) => {
            this.setState({
                getTitle: input.getTitle,
                resetTitle: input.resetTitle
            })
        }
        this.contentRef = (textArea: TextArea) => {
            this.setState({
                getContent: textArea.getContent,
                resetContent: textArea.resetContent
            })
        }
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {
        this.setState({
            title: this.state.getTitle!(),
            content: this.state.getContent!()
        }, () => {
            this.props.addTodoCard(<Card title={this.state.title} content={this.state.content} date={new Date()} />)
            this.state.resetTitle!()
            this.state.resetContent!()
        })
    }

    render() {
        return (
            <div id="TodoAdder">
                <Input ref={this.titleRef} type="text" placeHolder="Title"/>
                <TextArea ref={this.contentRef} title="Content"/>
                <Button text="add" handler={this.handleClick}/>
            </div>
        )
    }
}