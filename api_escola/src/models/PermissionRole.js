const { DataTypes } =require('sequelize')
const { connection } = require('../database/connection')
const Permission = require('./Permission')
const Role = require('./Role')

const PermissionRole = connection.define('permissionsRole', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    permissionId: {
        type: DataTypes.INTEGER,
        references: {
            model: Permission,
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        references: {
            model: Role,
            key: 'id'
        }
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()
    },
    updatedAt: {
        type: DataTypes.DATE       
    }
})  

Role.belongsToMany(Permission, {through: PermissionRole})
Permission.belongsToMany(Role, {through: PermissionRole})
PermissionRole.hasMany(Permission, {foreignKey: 'id'})

module.exports = PermissionRole
