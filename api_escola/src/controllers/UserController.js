const User = require('../models/User')
// const bcrypt = require('bcrypt')

class UserController {
    async findAll(req, res) {
        // const data = await User.findAll({ attributes: ['id', 'name', 'email'], include: { association: 'roles', attributes: ['id', 'description'] } })
        const data = await User.findAll({ attributes: ['id', 'name', 'email'] })
        const total = await User.count()

        return res.status(200).send({ records: data, total })
    }

    async findById(req, res) {
        const { id } = req.params
        const data = await User.findByPk(id, { select: ['id', 'name', 'email'] })

        if (!data) {
            return res.status(404).send({ message: 'Usuárionão encontrado' })
        }

        return res.status(200).send(data)
    }

    async createNewUser(req, res) {
        try {
            const { email, name, password } = req.body
            if (!email || !password) {
                return res.status(400).send({ message: 'O email e senha são obrigatórios!' })
            }

            const user = await User.findOne({ where: { email: email } })
            if (user) {
                return res.status(400).send({ message: 'Usuário já cadastrado' })
            }

            // const senhaEncriptada = await bcrypt.hash(password, 10)

            const data = await User.create({
                email,
                name,
                password
            })

            return res.status(201).send(data)

        } catch (error) {
            console.log(error.message)
            return res.status(400).send({ massage: 'O usuário não pôde ser criado' })
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params
            const { email, name, password } = req.body

            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).send({ message: 'Usuário não encontrado' })
            }

            const data = await user.update({
                email,
                name,
                password
            })

            return res.status(200).send(data)

        } catch (error) {
            console.log(error.message)
            return res.status(400).send({ message: 'O usuário não pôde ser atualizado' })
        }
    }

    async deleteUser(req, res) {
        try {
            const { id } = req.params

            const user = await User.findByPk(id)
            if (!user) {
                return res.status(404).send({ message: 'Usuário não encontrado' })
            }

            await user.destroy()

            return res.status(204).send()

        } catch (error) {
            console.log(error.message)
            return res.status(400).send({ message: 'O usuário não pôde ser deletado'})
        }
    }
}

module.exports = new UserController()
