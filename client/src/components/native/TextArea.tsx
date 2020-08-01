import React, { Component, ChangeEvent } from 'react'
import './TextArea.css'

interface TextAreaProps {
    ref: Function
    title: string
}

interface TextAreaState {
    content: string,
}

export default class TextArea extends Component<TextAreaProps, TextAreaState> {
    constructor(props: TextAreaProps) {
        super(props)
        this.state = {
            content: '',
        }
        this.updateContent = this.updateContent.bind(this)
        this.resetContent = this.resetContent.bind(this)
        this.getContent = this.getContent.bind(this)
        this.emitWarning = this.emitWarning.bind(this)
    }

    updateActivity(event: ChangeEvent) {
        (document.querySelector('.textArea label') as HTMLLabelElement).className = ''
        switch (event.type) {
            case 'focus': {
                (document.querySelector('.textArea label') as HTMLSpanElement).style.removeProperty('color');
                (document.querySelector('.textArea textarea') as HTMLTextAreaElement).style.borderColor = 'var(--color-primary)';
                (document.querySelector('.textArea label') as HTMLLabelElement).classList.add('active')
                break
            }
            case 'blur': {
                (document.querySelector('.textArea textarea') as HTMLTextAreaElement).style.borderColor = 'var(--color-gray)';
                (document.querySelector('.textArea label') as HTMLLabelElement).classList.add('inactive')
            }
        }
    }

    getContent() {
        return this.state.content
    }

    emitWarning() {
        const textArea = (document.querySelector('.textArea > textarea') as HTMLTextAreaElement)
        textArea.style.borderColor = 'var(--color-warning-light)';
        (document.querySelector('.textArea > label') as HTMLLabelElement).style.color = 'var(--color-warning-light)'
    }

    resetContent() {
        this.setState({
            content: ''
        })
    }

    updateContent(event: ChangeEvent) {
        this.setState({
            content: (event.target as HTMLTextAreaElement).value
        })
    }

    render() {
        return (
            <div className="textArea">
                <textarea onChange={this.updateContent} value={this.state.content} onFocus={this.updateActivity} onBlur={this.updateActivity}  className="animated"></textarea>
                <label className="animated">{this.props.title}</label>
            </div>
        )
    }
}