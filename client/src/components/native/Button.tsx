import React, { Component } from 'react'
import './Button.css'
import { EmptyState } from '../../libs/Interfaces'

interface ButtonProps {
    text: string
    handler(): void
    colorName: string
}

export default class Button extends Component<ButtonProps, EmptyState> {
    private buttonRef: React.RefObject<HTMLDivElement>

    constructor(props: ButtonProps) {
        super(props)
        this.buttonRef = React.createRef()
        this.activateButton = this.activateButton.bind(this)
        this.deactivateButton = this.deactivateButton.bind(this)
    }

    activateButton() {
        this.buttonRef.current!.style.backgroundColor = `var(--${this.props.colorName})`
    }

    deactivateButton() {
        this.buttonRef.current!.style.backgroundColor = `var(--${this.props.colorName}-light)`
    }

    render() {
        return (
            <div style={{backgroundColor: `var(--${this.props.colorName}-light)`, borderColor: `var(--${this.props.colorName})`}} ref={this.buttonRef} onClick={(_) => this.props.handler()} onMouseEnter={this.activateButton} onMouseLeave={this.deactivateButton} className="animated button">
                {this.props.text}
            </div>
        )
    }
}