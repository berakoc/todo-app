const Joi = require('@hapi/joi')

const dateRegex = /([a-zA-Z]+)\s(\d?\d),\s(\d\d\d\d)\s(\d\d):(\d\d):(\d\d)/

const joiTodoSchema = Joi.object().keys({
    title: Joi.string().max(100).required(),
    content: Joi.string().required(),
    isFinished: Joi.bool().required(),
    date: Joi.string().regex(dateRegex).required()
})

module.exports = {
    joiTodoSchema
}