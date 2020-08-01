import React, { Component, FocusEvent, ChangeEvent } from 'react'
import './Input.css'

interface InputProps {
    ref: Function
    placeHolder: string
    type: string
}

interface InputState {
    labelState: LabelState
    title: string
}

enum LabelState {
    INACTIVE='inactive',
    ACTIVE='active'
}

export default class Input extends Component<InputProps, InputState> {
    constructor(props: InputProps) {
        super(props)
        this.state = {
            labelState: LabelState.INACTIVE,
            title: ''
        }
        this.updateLabel = this.updateLabel.bind(this)
        this.changeTitle = this.changeTitle.bind(this)
        this.resetTitle = this.resetTitle.bind(this)
        this.getTitle = this.getTitle.bind(this)
        this.emitWarning = this.emitWarning.bind(this)
    }

    updateLabel(event: FocusEvent): void {
        (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).className = ''
        switch (event.type) {
            case 'focus': {
                (document.querySelector('.inputContainer > .label > span') as HTMLSpanElement).style.removeProperty('color');
                (document.querySelector('.inputContainer input') as HTMLInputElement).style.borderBottomColor = 'var(--color-primary)';
                (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).classList.add('active');
                if (!(event.target as HTMLInputElement).value) {
                    (document.querySelector('.inputContainer .label') as HTMLLabelElement).style.height = '100%'
                }
                break
            }
            case 'blur': {
                (document.querySelector('.inputContainer input') as HTMLInputElement).style.borderBottomColor = 'var(--color-gray)';
                (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).classList.add('inactive')
                if (!(event.target as HTMLInputElement).value) {
                    (document.querySelector('.inputContainer .label') as HTMLLabelElement).style.height = '54%'
                }
            }
        }
    }

    emitWarning() {
        const input = (document.querySelector('.inputContainer > input') as HTMLInputElement)
        input.style.borderColor = 'var(--color-warning-light)';
        (document.querySelector('.inputContainer > .label > span') as HTMLSpanElement).style.color = 'var(--color-warning-light)'
    }

    getTitle() {
        return this.state.title
    }

    resetTitle() {
        this.setState({
            title: ''
        })
    }

    changeTitle(event: ChangeEvent) {
        this.setState({
            title: (event.target as HTMLInputElement).value
        })
    }

    render() {
        return (
            <div className="inputContainer">
                <input onChange={this.changeTitle} value={this.state.title} onFocus={this.updateLabel} onBlur={this.updateLabel} type={this.props.type}/>
                <label className="label animated">
                    <span>{this.props.placeHolder}</span>
                </label>
            </div>
        )
    }
}
