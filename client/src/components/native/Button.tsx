import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Button.css'

interface ButtonProps {
    text: string
}

interface ButtonState {}

export default class Button extends Component<ButtonProps, ButtonState> {
    static propTypes: object

    render() {
        return (
            <div className="nativeButton">
                {this.props.text}
            </div>
        )
    }
}

Button.propTypes = {
    text: PropTypes.string.isRequired
}