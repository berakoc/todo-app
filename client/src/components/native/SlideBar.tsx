import React, { Component } from 'react'
import './SlideBar.css'
import * as Feather from 'react-feather'
import { SLIDE_BAR_DOT_LIMIT } from '../../libs/Globals'

interface SlideBarProps {
    sendIndexProxy(index: number): void
    numberOfCards: number
    currentIndex: number
}

interface SlideBarState {
    multiplier: number
}

// BUG: Doesn't work well when you try to delete the last dot when there are 6 dots
export default class SlideBar extends Component<SlideBarProps, SlideBarState> {
    constructor(props: SlideBarProps) {
        super(props)
        this.state = {
            multiplier: 0
        }
        this.updateMultiplier = this.updateMultiplier.bind(this)
    }

    computeMaximumMultiplier() {
        return Math.floor((this.props.numberOfCards - 1) / SLIDE_BAR_DOT_LIMIT)
    }

    updateMultiplier(accumulator: number) {
        if (this.state.multiplier === 0 && accumulator === -1) return
        if (this.state.multiplier === this.computeMaximumMultiplier() && accumulator === 1) return
        this.setState({
            multiplier: this.state.multiplier + accumulator
        })
    }

    render() {
        const cardIndexDots: JSX.Element[] = []
        const numberOfLowerDots = this.state.multiplier * SLIDE_BAR_DOT_LIMIT
        for (let i = numberOfLowerDots; i < numberOfLowerDots + Math.min(SLIDE_BAR_DOT_LIMIT, this.props.numberOfCards - numberOfLowerDots); ++i) {
            cardIndexDots.push(<span onClick={() => this.props.sendIndexProxy(i)} className={`dot ${this.props.currentIndex === i ? 'active': ''}`} key={i}><Feather.Circle size="12px" /></span>)
        }
        return (
            <div className="slideBar">
                <span onClick={() => this.updateMultiplier(-1)}><Feather.ChevronLeft size="24px" /></span>
                {cardIndexDots}
                <span onClick={() => this.updateMultiplier(1)}><Feather.ChevronRight size="24px" /></span>
            </div>
        )
    }
}
