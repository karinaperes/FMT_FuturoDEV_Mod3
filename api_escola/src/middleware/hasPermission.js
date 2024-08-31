const jwt = require('jsonwebtoken')
const PermissionRole = require('../models/PermissionRole')
const Permission = require('../models/Permission')

function hasPermission(permissions) {
    return async (req, res, next) => {
        if (!req.headers.authorization) {
            return res.status(401).send({ message: 'Token não fornecido' })
        }

        const token = req.headers.authorization
        if (!token) {
            return res.status(401).send({ message: 'Token não encontrado' })
        }

        const decoded = jwt.verify(token, process.env.SECRET_JWT)
        req.payload = decoded

        if (!Array.isArray(req.payload.roles)) {
            return res.status(400).send({ message: 'Roles não encontradas ou formato inválido' });
        }

        try {
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: req.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions' }]
            })

            const existPermission = roles.some((item) => {
                const hasPermission = item.permissions.some((permissao) => {
                    return permissions.includes(permissao.description)
                })

                return hasPermission
            })

            if (!existPermission) {
                return res.status(401).send({ message: 'Você não tem permissão' })
            }

            next()
        } catch (error) {
            console.log(error)
            return res.status(401).send({ message: 'Autenticação falhou', cause: error.message })
        }
    }
}

module.exports = { hasPermission }
