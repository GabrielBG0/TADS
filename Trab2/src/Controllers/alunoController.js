const connection = require('../Database/connection')

module.exports = {
    async create(request, response) {

        const { nome, rga, curso } = request.body

        try {
            await connection('aluno').insert({
                rga,
                nome,
                curso
            })
            return response.json({ nome: nome, rga: rga, curso: curso })
        } catch (e) {
            return response.status(400).send('parâmetros inválidos')
        }
    },
    async get(request, response) {
        const { limite, pagina, nome } = request.query

        const limiteInt = parseInt(limite)
        const paginaInt = parseInt(pagina)

        try {
            if (nome) {
                const aluno = await connection('aluno').select('*').where('nome', nome).first()
                return response.json(aluno)
            }

            const alunos = await connection('aluno').select('*')

            if (limite && pagina) {
                return response.json(alunos.slice((limiteInt * paginaInt - limiteInt), (limiteInt + ((limiteInt * paginaInt) - limiteInt))))

            } else if (limite && !pagina) {
                return response.json(alunos.slice(0, limiteInt))

            } else if (!limite && pagina) {
                return response.json(alunos.slice((25 * paginaInt - 25), (25 + ((25 * paginaInt)) - 25)))

            }

            return response.json(alunos.slice(0, 25))

        } catch (e) {
            console.log(e)
            return response.status(400).send('parâmetros inválidos')
        }
    },

    async notPermited(request, response) {
        return response.status(405).send('Endpoints inexistentes.')
    },

    async getById(request, response) {
        const { id } = request.params

        try {
            const aluno = await connection('aluno').select('*').where('id', id)
            return response.json(aluno)
        } catch (e) {
            return response.send(404).send()
        }
    },

    async atualizar(request, response) {
        const { id } = request.params
        const { nome, rga, curso } = request.body

        try {
            await connection('aluno').where('id', id).update({
                nome: nome,
                rga: rga,
                curso: curso
            })
            return response.json({
                nome: nome,
                rga: rga,
                curso: curso
            })
        } catch (e) {
            return response.send(404).send('aluno não encontrado')
        }
    },

    async delete(request, response) {
        const { id } = request.params

        try {
            const aluno = await connection('aluno').select('*').where('id', id)
            await connection('aluno').where('id', id).del()
            return response.json(aluno)
        } catch (e) {
            return response.status(404).send('aluno não encontrado')
        }
    }
}