const {DataTypes} = require ('sequelize')
const {connection} = require ('../database/connection')

const Professor = connection.define('professores', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false     
    }
})

module.exports = Professor