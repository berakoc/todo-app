import React, { Component, FocusEvent } from 'react'
import PropTypes from 'prop-types'
import './Input.css'

interface InputProps {
    placeHolder: string,
    type: string
}

interface InputState {
    labelState: LabelState
}

enum LabelState {
    INACTIVE='inactive',
    ACTIVE='active'
}

export default class Input extends Component<InputProps, InputState> {
    static propTypes = {}

    constructor(props: InputProps) {
        super(props)
        this.state = {
            labelState: LabelState.INACTIVE
        }
        this.updateLabel = this.updateLabel.bind(this)
    }

    updateLabel(event: FocusEvent): void {
        (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).className = ''
        switch (event.type) {
            case 'focus': {
                (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).classList.add('active');
                if (!(event.target as HTMLInputElement).value) {
                    (document.querySelector('.inputContainer .label') as HTMLLabelElement).style.height = '100%'
                }
                break
            }
            case 'blur': {
                (document.querySelector('.inputContainer .label > span') as HTMLSpanElement).classList.add('inactive')
                if (!(event.target as HTMLInputElement).value) {
                    (document.querySelector('.inputContainer .label') as HTMLLabelElement).style.height = '54%'
                }
            }
        }
    }

    render() {
        return (
            <div className="inputContainer">
                <input onFocus={this.updateLabel} onBlur={this.updateLabel} type={this.props.type}/>
                <label className="label">
                <span>{this.props.placeHolder}</span>
                </label>
            </div>
        )
    }
}

Input.propTypes = {
    placeHolder: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
}