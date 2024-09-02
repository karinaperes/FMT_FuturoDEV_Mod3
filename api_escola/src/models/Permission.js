const { DataTypes } =require('sequelize')
const { connection } = require('../database/connection')

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

module.exports = Permission
