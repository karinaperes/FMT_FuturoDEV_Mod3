const { connection } = require('../database/connection')
const { DataTypes } = require('sequelize')

const Matricula = connection.define('matricula', {
    aluno_id: {
        type: DataTypes.INTEGER
    },
    curso_id: {
        type: DataTypes.INTEGER
    }
})

module.exports = Matricula
