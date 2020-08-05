import React, { Component } from 'react'
import Card from './Card'
import './CardList.css'
import SlideBar from './SlideBar'
import { TodoDatabaseInterface } from '../../libs/Interfaces'
import Middleware from '../../libs/Middleware'
import Utils from '../../libs/Utils'
import { CardHandleOption } from '../../libs/Enums'

interface CardListProps {
    ref: Function
}

interface CardListState {
    index: number
    cards: Array<JSX.Element>
    isSlideBarVisible: boolean
}

export default class CardList extends Component<CardListProps, CardListState>{

    constructor(props: CardListProps) {
        super(props)
        this.state = {
            index: 0,
            cards: [],
            isSlideBarVisible: true
        }
        this.generateCardSet = this.generateCardSet.bind(this)
        this.updateIndexAndCardSet = this.updateIndexAndCardSet.bind(this)
        this.addTodoCard = this.addTodoCard.bind(this)
        this.handleCard = this.handleCard.bind(this)
    }

    componentDidMount() {
        Middleware.getTodos().then(todos => {
            const cards = (todos as TodoDatabaseInterface[]).map(todo => {
                return <Card handleClick={this.handleCard} title={todo.title} content={todo.content} date={todo.date} />
            })
            this.setState({
                cards: this.state.cards.concat(cards)
            }, () => {
                if (this.state.cards.length) {
                    this.setState({
                        cards: this.state.cards.slice(0, this.state.index).concat(React.cloneElement(this.state.cards[this.state.index], { isButtonActive: true}), this.state.cards.slice(this.state.index + 1)),
                        isSlideBarVisible: true
                    })
                } else {
                    this.setState({
                        isSlideBarVisible: false
                    })
                }
            })
        })
    }

    addTodoCard(card: JSX.Element) {
        this.setState({
            cards: this.state.cards.concat(card)
        })
    }

    handleCard(card: JSX.Element, option: CardHandleOption) {
        let removalIndex = -1
        const cards = this.state.cards
        const length = cards.length
        for (let i = 0; i < length; i++) {
            if (cards[i].props.date === card.props.date) {
                removalIndex = i
                break
            }
        }
        const result = Utils.removeArrayElement<JSX.Element>(this.state.cards, removalIndex)
        this.setState({
            cards: result.array,
        }, () => {
            if (removalIndex === length - 1) {
                this.setState({
                    index: removalIndex - 1
                }, () => {
                    this.updateIndexAndCardSet(this.state.index)
                })
            }
            this.updateIndexAndCardSet(removalIndex)
            if (length - 1 === 0) {
                this.setState({
                    isSlideBarVisible: false
                })
            }
            if (option === CardHandleOption.FINISH) {
                Middleware.finishTodo(result.removedElement.props.date)
            } else if (option === CardHandleOption.DELETE) {
                Middleware.deleteTodo(result.removedElement.props.date)
            }
        })
    }

    updateIndexAndCardSet(newIndex: number) {
        if (newIndex === -1 || newIndex === this.state.cards.length) {
            return
        }
        this.setState({
            cards: this.state.cards.slice(0, this.state.index).concat(React.cloneElement(this.state.cards[this.state.index], { isButtonActive: false}), this.state.cards.slice(this.state.index + 1)),
            index: newIndex
        }, () => {
            this.setState({
                cards: this.state.cards.slice(0, this.state.index).concat(React.cloneElement(this.state.cards[this.state.index], { isButtonActive: true}), this.state.cards.slice(this.state.index + 1))
            })
        })
    }

    generateCardSet(): JSX.Element {
        let leftElement: JSX.Element, rightElement: JSX.Element, middleElement: JSX.Element
        if (this.state.index === 0) {
            leftElement = <div></div>
        } else {
            leftElement = <div onClick={() => this.updateIndexAndCardSet(this.state.index - 1)} className="left animated">{this.state.cards[this.state.index - 1]}</div>
        }
        if (this.state.index === this.state.cards.length - 1) {
            rightElement = <div></div>
        } else {
            rightElement = <div onClick={() => this.updateIndexAndCardSet(this.state.index + 1)} className="right animated">{this.state.cards[this.state.index + 1]}</div>
        }
        if (this.state.cards.length === 0) {
            middleElement = <div className="noTodo">No Todos found</div>
        } else {
            middleElement = <div className="middle animated">{this.state.cards[this.state.index]}</div>
        }
        return <React.Fragment>
            {leftElement}
            {middleElement}
            {rightElement}
        </React.Fragment>
    }

    render() {
        return (
            <div className="cardList animated">
                {this.generateCardSet()}
                <div className={this.state.isSlideBarVisible ? '': 'invisible'}>
                    <SlideBar sendIndexProxy={this.updateIndexAndCardSet} currentIndex={this.state.index} numberOfCards={this.state.cards.length} />
                </div>
            </div>
        )
    }
}