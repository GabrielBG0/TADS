import connection from '../Database/connection'

module.exports = {
    async create(request, response) {

        const { rga, nome, curso } = request.body

        try {
            await connecton('Aula').insert({
                rga,
                nome,
                curso
            })
        } catch (e) {
            return response.status(400).send('parâmetros inválidos')
        }
    },
    async get(request, response) {
        const { limite, pagina, nome } = request.query

        try {
            if (nome) {
                const aluno = await connection('aluno').select('*').where('nome', nome).first()
                return response.json(aluno)
            }

            const alunos = await connection('aluno').select('*')

            if (limite && pagina) {
                return response.json(alunos.slice((limite * pagina), limite))

            } else if (limite && !pagina) {
                return response.json(alunos.slice(0, limite))

            } else if (!limite && pagina) {
                return response.json(alunos.json((25 * pagina), 25))

            }

            return response.json(alunos.slice(0, 25))

        } catch (e) {
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