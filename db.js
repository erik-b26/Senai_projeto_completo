import { Pool } from "pg";

export async function connect() {

    if(global.connection) {
        return global.connection.connect();
    }

    const pool = new Pool({
        connectionString : process.env.CONNECTION_STRING,
    })
    const client = await pool.connect();
    console.log("Criou o pool de conexão");

    const res = await client.query("SELECT NOW()");
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();

}

export async function listenFunc(){
    const client = await connect();
    const res = await client.query("SELECT * FROM funcionario");
    return res.rows;

}

export async function insereFunc(funcionario) {
    const client = await connect();
    const sql = "INSERT INTO funcionario VALUES (DEFAULT, $1, $2, $3, $4, $5)";
    await client.query(sql, [funcionario.nome, funcionario.cod_setor, funcionario.salario, funcionario.email, funcionario.senha]);

}

export async function alteraFunc(Id, funcionario) {
    const client = await connect();
    const sql = "UPDATE funcionario SET nome=$1, cod_setor=$2, salario=$3, email=$4 WHERE matricula=$5";
    await client.query(sql, [funcionario.nome, funcionario.cod_setor, funcionario.salario, funcionario.email, Id]);
}

export async function deletaFunc(Id) {
    const client = await connect();
    const sql = "DELETE FROM funcionario WHERE matricula=$1";
    const result = await client.query(sql, [Id]);
    return result.rowCount;
}


connect();