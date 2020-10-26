const express = require('express')
const routes = express.Router()
const alunoController = require('./Controllers/alunoController')

routes.get('/alunos', alunoController.get)
routes.post('/alunos', alunoController.create)
routes.put('/alunos', alunoController.notPermited)
routes.delete('/alunos', alunoController.notPermited)

routes.get('/alunos/:id', alunoController.getById)
routes.put('/alunos/:id', alunoController.atualizar)
routes.delete('/alunos/:id', alunoController.delete)
routes.post('/alunos/:id', alunoController.notPermited)

module.exports = routes