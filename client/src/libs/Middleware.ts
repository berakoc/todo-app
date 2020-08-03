import axios from 'axios'
import { TodoDatabaseInterface, TodoAppInterface } from './Interfaces'

const API_ROOT_ADDRESS = 'http://localhost:5050/api/todo-io/todos'

class $middleware {

    getTodos(isFinished:boolean=false): Promise<TodoDatabaseInterface[] | void> {
        return axios
            .get(API_ROOT_ADDRESS, {
                params: {
                    isFinished
                }
            })
            .then(response => {
                return response.data as TodoDatabaseInterface[]
            })
            .catch(error => {
                console.error(error)
            })
    }

    addTodo(todo: TodoAppInterface): void {
        axios
            .post(`${API_ROOT_ADDRESS}/add`, {
                title: todo.title,
                content: todo.content,
                isFinished: todo.isFinished,
                date: todo.date
            })
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.error(error)
            })
    }

    finishTodo(date: string) {
        axios
            .put(`${API_ROOT_ADDRESS}/finish`, {
                date
            })
            .then(response => {
                console.log(response)
            })
    }
}

const Middleware = new $middleware()

export default Middleware