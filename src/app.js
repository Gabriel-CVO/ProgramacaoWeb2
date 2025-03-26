import express from "express"
import conexao from './app/database/conexao.js'
import AlunoController from "./app/controllers/AlunoController.js"

const app = express()

// Indicar para o express para usar o body com json
app.use(express.json())


//ROTAS

app.get('/listas', AlunoController.index)

app.get('/listas/:id', AlunoController.show)

app.post('/listas', AlunoController.store)

app.put('/update/:id', AlunoController.update)

app.delete('/listas/:id', AlunoController.delete)

export default app
