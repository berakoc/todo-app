import React, { Component } from 'react'
import Card from './Card'
import './CardList.css'

interface CardListProps {

}

interface CardListState {
    index: number
    cards: Array<JSX.Element>
}

export default class CardList extends Component<CardListProps, CardListState>{
    private isDataLoaded: boolean

    constructor(props: CardListProps) {
        super(props)
        this.state = {
            index: 1,
            cards: []
        }
        this.isDataLoaded = false
        this.generateCardSet = this.generateCardSet.bind(this)
    }

    componentDidMount() {
        console.log('Mounted.')
        const cards = [<Card title="Shopping" content="Buy some eggs" date={new Date()}/>,
        <Card title="Reading" content="Read Clockwork Orange" date={new Date()}/>,
        <Card title="Homeworks" content="Finish Algebra homework" date={new Date()}/>]
        this.setState({
            cards: this.state.cards.concat(cards)
        }, () => {
            this.setState({
                cards: this.state.cards.slice(0, this.state.index).concat(React.cloneElement(this.state.cards[this.state.index], { isButtonActive: true}), this.state.cards.slice(this.state.index + 1))
            })
        })
    }

    // BUG: When hovering over left and right it interacts with StateButton. Solve it via masking
    generateCardSet(): JSX.Element {
        let leftElement: JSX.Element, rightElement: JSX.Element, middleElement: JSX.Element
        if (this.state.index === 0) {
            leftElement = <div></div>
        } else {
            leftElement = <div className="left animated">{this.state.cards[this.state.index - 1]}</div>
        }
        if (this.state.index === this.state.cards.length - 1) {
            rightElement = <div></div>
        } else {
            rightElement = <div className="right animated">{this.state.cards[this.state.index + 1]}</div>
        }
        if (this.state.cards.length === 0) {
            middleElement = <div>No Todos found</div>
        } else {
            middleElement = <div className="middle animated">{this.state.cards[this.state.index]}</div>
        }
        return <React.Fragment>
            {leftElement}
            {rightElement}
            {middleElement}
        </React.Fragment>
    }

    render() {
        return (
            <div className="cardList animated">
                {this.generateCardSet()}
            </div>
        )
    }
}