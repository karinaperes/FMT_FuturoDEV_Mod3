const jwt = require('jsonwebtoken')

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

        try {
            const roles = await PermissionRole.findAll({
                where: {
                    roleId: req.payload.roles.map((id) => roles.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission }]
            })

            const existPermission = roles.some((role) => {
                const hasPermission = role.peermissions.some((permissao) => {
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
