const { DataTypes } =require('sequelize')
const { connection } = require('../database/connection')
const PermissionRole = require('./PermissionRole')
const Role = require('./Role')

const Permission = connection.define('permission', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        unique: true
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

module.exports = Permission
