// Código necessário para a conexão com o banco de dados
import mysql from 'mysql'

const conexao = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '',
    database: 'dbsenac'
})

conexao.connect()

export default conexao
