import React, { Component } from 'react'
import './Main.css'
import TodoAdder from './TodoAdder'
import CardList from './native/CardList'
import { EmptyProps } from '../libs/Interfaces'

interface TodoAdderState {
    addTodoCard(card: JSX.Element | void): void
    finishTodoCard(card: JSX.Element | void): void
}

// TODO: Create the state schema for handling cards and index
export default class Main extends Component<EmptyProps, TodoAdderState> {
    private cardListRef: (cardList: CardList) => void

    constructor(props: EmptyProps) {
        super(props)
        this.cardListRef = (cardList: CardList) => {
            const addTodoCard = cardList.addTodoCard
            const finishTodoCard = cardList.finishTodoCard
            this.setState({
                addTodoCard,
                finishTodoCard
            })
        }
        const emptyFunction = () => {}
        this.state = {
            addTodoCard: emptyFunction,
            finishTodoCard: emptyFunction
        }
    }

    render() {
        return (
            <div id="Main">
                <TodoAdder removeTodoCard={this.state.finishTodoCard} addTodoCard={this.state.addTodoCard} />
                <div className="verticalSeparator"></div>
                <CardList ref={this.cardListRef} />
            </div>
        )
    }
}
