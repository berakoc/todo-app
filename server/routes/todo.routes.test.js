const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)
const { convertDateToString } = require('../libs/Utils')


it ('Test if the request [GET /] is OK', async done => {
    const response = await request.get('/')
    expect(response.status).toBe(200);
    done()
})

const todoRouterRoot = '/api/todo-io/todos'
const addPath = '/add'

it(`Test if the request [POST ${todoRouterRoot}${addPath}] is OK`, async done => {
    const response =  await request
        .post(`${todoRouterRoot}${addPath}`)
        .send({
            title: 'Test Title',
            content: 'Test content',
            date: convertDateToString(new Date()),
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Todo has been recorded to database.')
    done()
})

it(`Test if the request [GET ${todoRouterRoot}] is OK`, async done => {
    const response = await request
        .get(`${todoRouterRoot}`)
        .send({
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Todos has been obtained from database.')
    done()
})