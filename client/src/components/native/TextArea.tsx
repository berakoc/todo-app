import React, { Component, ChangeEvent } from 'react'
import PropTypes from 'prop-types'
import './TextArea.css'

interface TextAreaProps {
    title: string
}

interface TextAreaState {
    content: string,
}

export default class TextArea extends Component<TextAreaProps, TextAreaState> {
    static propTypes = {}

    constructor(props: TextAreaProps) {
        super(props)
        this.state = {
            content: '',
        }
        this.updateContent = this.updateContent.bind(this)
    }

    updateActivity(event: ChangeEvent) {
        (document.querySelector('.textArea label') as HTMLLabelElement).className = ''
        switch (event.type) {
            case 'focus': {
                (document.querySelector('.textArea label') as HTMLLabelElement).classList.add('active')
                break
            }
            case 'blur': {
                (document.querySelector('.textArea label') as HTMLLabelElement).classList.add('inactive')
            }
        }
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

TextArea.propTypes = {
    title: PropTypes.string.isRequired
}
