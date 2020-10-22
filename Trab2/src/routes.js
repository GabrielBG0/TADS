const express = require('express')
const routes = express.Router()
const alunoController = require('./Controllers/alunoController')

routes.get('/alunos', alunoController.get)
routes.post('/aluno', alunoController.create)
routes.put('/alunos', alunoController.notPermited)
routes.delete('/alunos', alunoController.notPermited)

routes.get('/aluno/:id', alunoController.getById)
routes.put('/aluno/:id', alunoController.atualizar)
routes.delete('/aluno/:id', alunoController.delete)
routes.post('/aluno/:id', alunoController.notPermited)

module.exports = routes