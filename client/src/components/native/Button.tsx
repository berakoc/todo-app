import React, { Component, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

interface ButtonProps {
    text: string
    handler(event: MouseEvent): void
}

interface ButtonState {}

export default class Button extends Component<ButtonProps, ButtonState> {
    static propTypes: object

    render() {
        return (
            <div onClick={this.props.handler} className="animated button">
                {this.props.text}
            </div>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired,
    handler: PropTypes.func.isRequired
}