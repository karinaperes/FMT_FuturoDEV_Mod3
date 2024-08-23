const { DataTypes } = require ('sequelize')
const { connection } = require ('../database/connection')

const Role = connection.define('role', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        unique: true,
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

User.belongsToMany(Role, {through: Userrole})
Role.belongsToMany(User, {through: UserRole})

module.exports = Role
