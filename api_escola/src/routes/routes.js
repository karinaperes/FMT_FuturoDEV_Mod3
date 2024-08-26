const { Router } = require("express")
const alunoRoutes = require("./alunos.routes")
const cursoRoutes = require("./cursos.routes")
const professorRoutes = require("./profesores.routes")
const loginRoutes = require("./login.routes")
const rbacRouter = require("./rbac.routes")
const userRouter = require("./user.routes")

const routes = Router()

routes.use('/alunos', alunoRoutes)
routes.use('/cursos', cursoRoutes)
routes.use('/professores', professorRoutes)
routes.use('/login', loginRoutes)
routes.use('/rbac', rbacRouter)
routes.use('/user', userRouter)


module.exports = routes
