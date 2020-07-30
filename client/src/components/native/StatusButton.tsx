import React, { Component, MouseEvent } from 'react'
import PropTypes from 'prop-types'
import './StatusButton.css'

interface StatusButtonProps {
    defaultText: string
    hoverText: string
}

interface StatusButtonState {
    currentText: string
}

export default class StatusButton extends Component<StatusButtonProps, StatusButtonState>{
    static propTypes = {}

    constructor(props: StatusButtonProps) {
        super(props)
        this.state = {
            currentText: this.props.defaultText
        }
        this.activateCurrentText = this.activateCurrentText.bind(this)
        this.deactivateCurrentText = this.deactivateCurrentText.bind(this)
    }

    activateCurrentText(_event: MouseEvent): void {
        this.setState({ currentText: this.props.hoverText })
    }

    deactivateCurrentText(_event: MouseEvent): void {
        this.setState({ currentText: this.props.defaultText })
    }

    render() {
        return (
            <div className="statusButton" onMouseEnter={this.activateCurrentText} onMouseLeave={this.deactivateCurrentText}>
                {this.state.currentText}
            </div>
        )
    }
}

StatusButton.propTypes = {
    defaultText: PropTypes.string.isRequired,
    hoverText: PropTypes.string.isRequired
}