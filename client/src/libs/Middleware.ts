import axios from 'axios'
import { TodoInterface } from './Interfaces'

const API_ROOT_ADDRESS = 'http://localhost:5050/api/todo-io/todos'

class $middleware {

    getTodos(): Promise<TodoInterface[] | void> {
        return axios
            .get(API_ROOT_ADDRESS)
            .then(response => {
                return response.data as TodoInterface[]
            })
            .catch(error => {
                console.error(error)
            })
    }
}

const Middleware = new $middleware()

export default Middleware