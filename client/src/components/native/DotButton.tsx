import React, { Component } from 'react'
import './DotButton.css'
import { EmptyState } from '../../libs/Interfaces'
import { setTimeout } from 'timers'

interface DotButtonProps {
    text: string
    colorName: string
    handler(): void
    margin?: boolean
}

export default class DotButton extends Component<DotButtonProps, EmptyState> {
    private dotButtonRef: React.RefObject<HTMLDivElement>

    constructor(props: DotButtonProps) {
        super(props)
        this.dotButtonRef = React.createRef()
        this.activateButton = this.activateButton.bind(this)
        this.deactivateButton = this.deactivateButton.bind(this)
    }

    activateButton() {
        setTimeout(() => {
            if (Math.ceil(this.dotButtonRef.current!.getBoundingClientRect().width) === 48) {
                this.dotButtonRef.current!.innerHTML = this.props.text
            }
        }, 200)
        this.dotButtonRef.current!.style.backgroundColor = `var(--${this.props.colorName})`

    }

    deactivateButton() {
        this.dotButtonRef.current!.innerHTML = ''
        this.dotButtonRef.current!.style.backgroundColor = `var(--${this.props.colorName}-light)`
    }

    render() {
        return (
            <div style={{backgroundColor: `var(--${this.props.colorName})`, marginRight: `${this.props.margin ? '4px'  : '0'}`}} ref={this.dotButtonRef} className="animated dotButton" onMouseEnter={this.activateButton} onMouseLeave={this.deactivateButton} onClick={this.props.handler}></div>
        )
    }
}
