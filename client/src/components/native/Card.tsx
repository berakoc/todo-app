import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Card.css'
import Utils from '../../libs/Utils'
import StatusButton from './StatusButton'

interface CardProps {
    title: string,
    content: string,
    date: Date
}

interface CardState {}

// TODO: Add markdown support for the card
export default class Card extends Component<CardProps, CardState> {
    static propTypes: object

    render() {
        return (
            <div className="card">
                <div className="titleBar">
                    <div className="title">{this.props.title}</div>
                    <StatusButton defaultText="Not finished" hoverText="Finish now!"/>
                </div>
                <div className="content">{this.props.content}</div>
                <div className="date">{Utils.convertDateToString(this.props.date)}</div>
            </div>
        )
    }
}

Card.propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
}