const app = require('../server')
const supertest = require('supertest')
const request = supertest(app)
const { convertDateToString } = require('../libs/Utils')
const { consoleLogger } = require('../libs/Logger')


it ('should be OK for the request [GET /]', async done => {
    const response = await request.get('/')
    expect(response.status).toBe(200);
    done()
})

const todoRouterRoot = '/api/todo-io/todos'
const addPath = '/add'
const finishPath = '/finish'

it(`should be OK for the request [POST ${todoRouterRoot}${addPath}]`, async done => {
    const response =  await request
        .post(`${todoRouterRoot}${addPath}`)
        .send({
            title: 'Test Title',
            content: 'Test content',
            isFinished: false,
            date: convertDateToString(new Date()),
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Todo has been recorded to database.')
    done()
})

it(`should be OK for the request [GET ${todoRouterRoot}]`, async done => {
    const response = await request
        .get(todoRouterRoot)
        .send({
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Todos has been obtained from database.')
    done()
})

it(`should be OK for the request [GET ${todoRouterRoot}${finishPath}]`, async (done) => {
    const response = await request
        .put(`${todoRouterRoot}${finishPath}`)
        .send({
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Updated given todo as finished.')
    done()
})