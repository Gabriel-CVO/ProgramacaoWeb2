import express from "express"
import conexao from '../infra/conexao.js'
const app = express()

// Indicar para o express para usar o body com json
app.use(express.json())


//ROTAS

app.get('/listas',(req,res)=>{
    const sql = "SELECT * FROM dbsenac.alunos;"
    conexao.query(sql, (error,result)=>{
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
      } else {
        res.status(200).json(result);
      }
    }) 
})

app.get('/listas/:id', (req, res) => {
    const id = req.params.id
    const sql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
    conexao.query(sql, id, (error,result)=>{
        const row = result[0]
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
      } else {
        res.status(200).json(row);
      }
    }) 
})

app.post('/listas', (req, res) => {
    const aluno = req.body
    const sql = "INSERT INTO `dbsenac`.`alunos` SET ?;"
    conexao.query(sql, aluno, (error,result)=>{
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
      } else {
        res.status(200).json(result);
      }
    }) 
})

app.put('/listas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const alunoIndex = listas.findIndex(aluno => aluno.id === id);

    if (alunoIndex !== -1) {
        listas[alunoIndex] = { ...listas[alunoIndex], ...req.body };

        res.status(204).json('Cadastro alterado com sucesso!');
    } else {
        res.status(404).json("Aluno não encontrado");
    }
});

app.delete('/listas/:id', (req, res) => {
    const id = req.params.id
    const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"
    conexao.query(sql, id, (error,result)=>{
      if (error) {
        console.log(error)
        res.status(404).json({'error':error})
      } else {
        res.status(200).json(result);
      }
    }) 
})


// Expor o objeto para outros módulos
export default app
