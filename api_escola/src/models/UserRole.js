const { DataTypes } = require ('sequelize')
const { connection } = require ('../database/connection')

const UserRole = connection.define('usersRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,        
        references: {
            model: User,
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

module.export = UserRole
