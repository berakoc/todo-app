import React, { Component } from 'react'
import './Card.css'
import { EmptyState } from '../../libs/Interfaces'
import StatusButton from './StatusButton'

interface CardProps {
    title: string,
    content: string,
    date: string,
    isButtonActive?: boolean
}

// TODO: Add markdown support for the card
export default class Card extends Component<CardProps, EmptyState> {
    static propTypes: object

    render() {
        return (
            <div className="card">
                <div className="title">{this.props.title}</div>
                <div className="content">{this.props.content}</div>
                <div className="date">{this.props.date}</div>
                <StatusButton isActive={this.props.isButtonActive === true} defaultText="Not finished" hoverText="Complete"/>
            </div>
        )
    }
}