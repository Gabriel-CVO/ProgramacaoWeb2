import conexao from '../database/conexao.js'
import AlunoRepository from '../repositories/AlunoRepository'

class AlunoController {
    // listar tudo
    index(req, res) {
        const row = AlunoRepository.findAll()
        res.json(row)
    }

    // listar por id
    show(req, res){
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
    }

    // criar dados
    store(req, res){
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
    }

    // atualizar dados
    update(req, res){
        const id = req.params.id
        const aluno = req.body

        const checkSql = "SELECT * FROM dbsenac.alunos WHERE id=?;"
        conexao.query(checkSql, [id], (error, result) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ 'error': 'Error interno ao verificar o aluno', 'details': error });
            }
            
            
            if (result.lenght === 0) {
            return res.status(404).json({ 'message': `Aluno com ID${id} não encontrado.`});
            }

        const sql = "UPDATE dbsenac.alunos SET ? WHERE id = ?";
        conexao.query(sql, [aluno, id], (error, updateResult) => {
            if (error) {
                console.log(error);
                return res.status(400).json({ 'error': 'Erro ao atualizar o aluno', 'details': error})
            }

            if (updateResult.affectedRows === 0) {
                return res.status(404).json({ 'message': `Aluno com ID ${id} não encontrado para atualizar`})
            }

            res.status(200).json({ 'message': `Aluno com ID ${id} atualizado com sucesso`, 'data':aluno})
        });
    });
    }

    // remover dados
    delete(req, res){
        const id = req.params.id
        const sql = "DELETE FROM dbsenac.alunos WHERE id=?;"

        conexao.query(sql, [id], (error,result)=>{
            if (error) {
                console.log(error)
                return res.status(500).json({ 'error': 'Erro interno do servidor', 'details': error});
            } 
        
        // Verificar se a exclusão afetou alguma linha
            if(result.affectedRows === 0) {
                return res.status(404).json({ 'message': `Aluno com ID ${id} não encontrado.` })
            }

        // Caso a exclusão tenha sido bem sucedida
            res.status(200).json({ 'message': `Aluno com ${id} excluído com sucesso`})
        }) 
    }

}

// padraosingleton
export default new AlunoController()