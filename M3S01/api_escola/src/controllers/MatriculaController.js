const Aluno = require('../models/Aluno')
const Matricula = require('../models/Matricula')
const Curso = require('../models/Curso')

class MatriculaController {
    async cadastrar(req, res) {
        try {

            const curso_id = req.body.curso_id
            const aluno_id = req.body.aluno_id

            if (!(curso_id || aluno_id)) {
                return res.status(409).json({ erro: 'O ID do aluno e do curso são obrigatórios'})
            }

            const aluno = await Aluno.findById(aluno_id)
            if (!aluno) return res.status(404).json({ erro: 'Aluno não encontrado'})

            const curso = await Curso.findByPk(curso_id)
            if (!curso) return res.status(404).json({ erro: 'Curso não encontrado'})

            const matriculaExistente = await Matricula.findOne({
                where: {
                    curso_id: curso_id,
                    aluno_id: aluno_id
                }
            })

            if (matriculaExistente) {
                return res.status(409).json({ erro: 'Aluno já matriculado'})
            }
            
            const matricula = await Matricula.create({
                curso_id: curso_id,
                aluno_id: aluno_id
            })

            res.status(201).json(matricula)
        } catch (error) {
            res.status(500).json({ error: 'Não foi possível realizar o cadstro'})
        }
    }
}

module.exports = new MatriculaController()
