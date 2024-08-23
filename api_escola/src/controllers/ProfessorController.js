const Professor = require('../models/Professor')

class ProfessorControler {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const email = req.body.email
            const telefone = req.body.telefone

            if (!nome) {
                return res.status(400).json({ erro: 'O nome deve ser informado' })
            }
            if (!email) {
                return res.status(400).json({ erro: 'O email deve ser informado' })
            }
            if (!telefone) {
                return res.status(400).json({ erro: 'O telefone deve ser informado' })
            }

            const professor = await Professor.create({
                nome: nome,
                email: email,
                telefone: telefone
            })

            res.status(201).json(professor)
        } catch (error) {
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro' })
        }
    }

    async listarTodos(req, res) {
        try {
            let params = {}

            if (req.query.nome) {
                params = { ...params, nome: req.query.nome }
            }

            if (req.query.email) {
                params = { ...params, email: req.query.email }
            }

            if (req.query.telefone) {
                params = { ...params, telefone: req.query.telefone }
            }

            const professores = await Professor.findAll({
                where: params
            })

            res.json(professores)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({ error: 'Não possível listar os professores' })
        }
    }

    async atualizar(req, res) {
        const { id } = req.params

        try {
            const professor = await Professor.findByPk(id)

            if (!professor) {
                return res.status(400).json({ erro: 'Professor não encontrado' })
            }

            await professor.update(req.body)
            await professor.save()

            res.status(200).json({ mensagem: 'Professor alterado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: 'Erro ao atualizar professor' })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const professor = await Professor.findByPk(id)

            if (!professor) {
                return res.status(400).json({ erro: 'Professor não encontrado' })
            }

            await professor.destroy()

            return res.status(204).json({})
        } catch (error) {
            return res.status(500).json({ erro: 'Erro ao excluir professor' })
        }
    }
}

module.exports = new ProfessorControler