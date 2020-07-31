import React, { Component } from 'react'
import './SlideBar.css'
import * as Feather from 'react-feather'
import { EmptyState } from '../../libs/Interfaces'

interface SlideBarProps {
    limit: number
}

interface SlideBarState {
    multiplier: number
}

export default class SlideBar extends Component<SlideBarProps, SlideBarState> {
    constructor(props: SlideBarProps) {
        super(props)
        this.state = {
            multiplier: 0
        }
    }

    render() {
        const cardIndexDots: JSX.Element[] = []
        for (let i = 0; i < this.props.limit; ++i) {
            cardIndexDots.push(<span className="dot" key={i + this.props.limit * this.state.multiplier}><Feather.Circle size="12px" fill="black" color="white" /></span>)
        }
        return (
            <div className="slideBar">
                <span><Feather.ChevronLeft size="24px" /></span>
                {cardIndexDots}
                <span><Feather.ChevronRight size="24px" /></span>
            </div>
        )
    }
}
