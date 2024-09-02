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
        
        console.log(req.payload)

        try {
            const roles = await PermissionRole.findAll({                
                where: {
                    roleId: req.payload.roles.map((role) => role.id)
                },
                attributes: ['permissionId'],
                include: [{ model: Permission, as: 'permissions' }]
            })
            
            console.log(JSON.stringify(roles, null, 2))

            const existPermission = roles.some((item) => {
                
                const hasPermission = item.permissions.some((permissao) => {
                    return permissions.includes(permissao.description)      
                    
                })

                console.log(hasPermission)
                
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
