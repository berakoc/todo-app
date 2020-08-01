import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

interface ButtonProps {
    text: string
    handler(): void
}

interface ButtonState {}

export default class Button extends Component<ButtonProps, ButtonState> {
    static propTypes: object

    render() {
        return (
            <div onClick={(_) => this.props.handler()} className="animated button">
                {this.props.text}
            </div>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
}