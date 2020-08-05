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

it(`should be OK for the request [POST ${todoRouterRoot}/add]`, async done => {
    const response =  await request
        .post(`${todoRouterRoot}/add`)
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

it(`should be OK for the request [GET ${todoRouterRoot}/finish]`, async done => {
    const response = await request
        .put(`${todoRouterRoot}/finish`)
        .send({
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Updated given todo as finished.')
    done()
})

it(`should be OK for the request [DELETE ${todoRouterRoot}/delete`, async done => {
    const response = await request
        .delete(`${todoRouterRoot}/delete`)
        .send({
            isTestingMode: true
        })
    expect(response.status).toBe(200)
    expect(response.body).toBe('Deleted the given todo.')
    done()
})