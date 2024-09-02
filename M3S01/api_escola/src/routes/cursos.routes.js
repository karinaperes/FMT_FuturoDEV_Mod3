const {Router, query} = require('express')
const cursoRoutes = new Router()
const {auth} = require('../middleware/auth')
const CursoController = require('../controllers/CursoController')

////// ------- Cursos ------- //////

cursoRoutes.post('/', auth, CursoController.cadastrar)

cursoRoutes.get('/', auth, CursoController.listar)

cursoRoutes.put('/:id', auth, CursoController.atualizar)

cursoRoutes.delete('/:id', auth, CursoController.excluir)

module.exports = cursoRoutes