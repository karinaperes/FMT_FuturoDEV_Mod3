const User = require('../models/User')
const { sign } = require('jsonwebtoken')
const { compare } = require("bcrypt")

class LoginController {
    async logar(req, res) {
        try {
            const email = req.body.email
            const password = req.body.password
            if (!email) {
                return res.status(400).json({ erro: 'Informe o email' })
            }

            if (!password) {
                return res.status(400).json({ erro: 'Informe a sua senha' })
            }

            const user = await User.findOne({
                where: { email: email }
            })
            if (!user) {
                return res.status(404).json({ erro: 'Nenhum usuario corresponde ao email e senha informados' })
            }
            const hashSenha = await compare(password, user.password)

            if(hashSenha === false) {
                return res.status(400).json({mensagem: "Conta não encontrada."})
            }

            const payload = { sub: user.id, email: user.email, name: user.name }

            const token = sign(payload, process.env.SECRET_JWT)

            res.status(200).json({ Token: token })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error, message: 'Algo deu errado' })
        }
    }
}

module.exports = new LoginController()