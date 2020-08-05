import React, { Component } from 'react'
import './Main.css'
import TodoAdder from './TodoAdder'
import CardList from './native/CardList'
import { EmptyProps } from '../libs/Interfaces'
import { CardHandleOption } from '../libs/Enums'

interface TodoAdderState {
    addTodoCard(card: JSX.Element | void): void
    handleCard(card: JSX.Element, option: CardHandleOption | void): void
}

// TODO: Create the state schema for handling cards and index
export default class Main extends Component<EmptyProps, TodoAdderState> {
    private cardListRef: (cardList: CardList) => void

    constructor(props: EmptyProps) {
        super(props)
        this.cardListRef = (cardList: CardList) => {
            const addTodoCard = cardList.addTodoCard
            const handleCard = cardList.handleCard
            this.setState({
                addTodoCard,
                handleCard
            })
        }
        const emptyFunction = () => {}
        this.state = {
            addTodoCard: emptyFunction,
            handleCard: emptyFunction
        }
    }

    render() {
        return (
            <div id="Main">
                <TodoAdder removeTodoCard={this.state.handleCard} addTodoCard={this.state.addTodoCard} />
                <div className="verticalSeparator"></div>
                <CardList ref={this.cardListRef} />
            </div>
        )
    }
}
