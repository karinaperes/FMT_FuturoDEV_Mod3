const { DataTypes } = require ('sequelize')
const { connection } = require ('../database/connection')

const User = connection.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,        
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Date.now()    
    },
    updatedAt: {
        type: DataTypes.DATE
    }
})

module.export = User
