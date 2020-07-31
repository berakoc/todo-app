import React, { Component } from 'react'
import Card from './Card'

interface CardListProps {

}

interface CardListState {
    index: number
    cards: Array<JSX.Element>
}

export default class CardList extends Component<CardListProps, CardListState>{
    constructor(props: CardListProps) {
        super(props)
        this.state = {
            index: 0,
            cards: []
        }
    }

    componentDidMount() {
        console.log('Mounted.')
        const card = <Card title="Shopping" content="Buy some eggs" date={new Date()}/>
        this.setState({
            cards: this.state.cards.concat(card)
        })
    }

    render() {
        return (
            <div className="cardList">
                {this.state.cards}
            </div>
        )
    }
}