const Usuario = require('../models/Usuario')

class UsuarioController {
    async cadastrar(req, res) {
        try {
            const nome = req.body.nome
            const email = req.body.email
            const password = req.body.password

            if (!nome) {
                return res.status(400).json({ erro: 'O nome deve ser informado' })
            }            
            if (!email) {
                return res.status(400).json({ erro: 'O email deve ser informado' })
            }
            if (!password) {
                return res.status(400).json({ erro: 'A senha deve ser informada' })
            }

            const usuario = await Usuario.create({
                nome: nome,
                email: email,
                password: password                
            })

            res.status(201).json(usuario)
        } catch (error) {          
            console.log(error.message)  
            res.status(500).json({ erro: 'Não foi possível efetuar o cadastro' })
        }
    }

    async listarTodos(req, res) {
        try {
            const usuarios = await Usuario.findAll()
            res.json(usuarios)
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível listar os usuarios' })
        }
    }

    async listarUm(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não foi encontrado" })
            }

            res.json(usuario)
        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: "Não foi possível localizar o usuário",
                error: error
            })
        }
    }

    async atualizar(req, res) {
        const { id } = req.params

        try {
            const usuario = await Usuario.findByPk(id)
            if (!usuario) {
                return res.status(400).json({ erro: 'Usuário não encontrado' })
            }
            await usuario.update(req.body)
            await usuario.save()
            res.status(200).json({ mensagem: 'Alterado com sucesso!' })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ erro: 'Erro ao atualizar usuário' })
        }
    }

    async excluir(req, res) {
        try {
            const { id } = req.params
            const usuario = await Usuario.findByPk(id)

            if (!usuario) {
                return res.status(404).json({ erro: "Usuário não foi encontrado" })
            }

            Usuario.destroy({
                where: {
                    id: id
                }
            })

            res.status(204).json({ mensagem: 'Usuário excluído com sucesso' })

        } catch (error) {
            console.log(error.message)
            res.status(500).json({
                error: "Não foi possível localizar o usuário",
                error: error
            })
        }
    }
}

module.exports = new UsuarioController()