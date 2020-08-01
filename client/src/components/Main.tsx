import React, { Component } from 'react'
import './Main.css'
import TodoAdder from './TodoAdder'
import CardList from './native/CardList'
import { EmptyProps } from '../libs/Interfaces'

interface TodoAdderState {
    addTodoCard(card: JSX.Element | void): void
}

// TODO: Create the state schema for handling cards and index
export default class Main extends Component<EmptyProps, TodoAdderState> {
    private cardListRef: (cardList: CardList) => void

    constructor(props: EmptyProps) {
        super(props)
        this.cardListRef = (cardList: CardList) => {
            const addTodoCard = cardList.addTodoCard
            this.setState({
                addTodoCard
            })
        }
        this.state = {
            addTodoCard: () => {}
        }
    }

    render() {
        return (
            <div id="Main">
                <TodoAdder addTodoCard={this.state.addTodoCard} />
                <div className="verticalSeparator"></div>
                <CardList ref={this.cardListRef} />
                <div>{`${JSON.stringify(this.cardListRef)}`}</div>
            </div>
        )
    }
}
