import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import Utils from '../../libs/Utils'
import { EmptyState } from '../../libs/Interfaces'
import StatusButton from './StatusButton'

interface CardProps {
    title: string,
    content: string,
    date: Date,
    isButtonActive?: boolean
}

// TODO: Add markdown support for the card
export default class Card extends Component<CardProps, EmptyState> {
    static propTypes: object

    constructor(props: CardProps) {
        super(props)
    }

    render() {
        return (
            <div className="card">
                <div className="title">{this.props.title}</div>
                <div className="content">{this.props.content}</div>
                <div className="date">{Utils.convertDateToString(this.props.date)}</div>
                <StatusButton isActive={this.props.isButtonActive === true} defaultText="Not finished" hoverText="Complete"/>
            </div>
        )
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired,
    isButtonActive: PropTypes.bool
}