const {DataTypes} = require('sequelize')
const {connection} = require('../database/connection')

const Curso = connection.define('cursos', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    duracao_horas: {
        type: DataTypes.TIME,
        allowNull:false
    }
})

module.exports = Curso