const { DataTypes } = require ('sequelize')
const { connection } = require ('../database/connection')

const PermissionRole = connection.define('permissionsRole', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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

module.export = PermissionRole
