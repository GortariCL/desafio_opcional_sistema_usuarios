const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'Feer1985',
    database: 'softlife',
    port: 5432
});
//Funcion para registro de usuarios (Requerimiento 1)
const registroUsuario = async (datos) => {
    try{
        const consulta = {
            text: 'INSERT INTO usuarios (email, password) VALUES ($1, $2)',
            values: datos,
        }
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}
//Funcion para login de usuario (Requqrimiento 2)
const loginUsuario = async (datos) => {
    try{
        const consulta = {
            text: 'SELECT * FROM usuarios WHERE email = $1 AND password = $2',
            values: datos,
        }
        const result = await pool.query(consulta);
        return result;
    }catch(err){
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}
//Funcion para obtener los usuarios registrados (Requerimiento 3)
const getUsuarios = async () => {
    try{
        const result = await pool.query('SELECT * FROM usuarios');
        return result;
    }catch(err){
        console.log(`El error se encuentra en la tabla: ${err.table}.
        El detalle del error es: ${err.detail}.
        El código de error es: ${err.code}.
        Restricción violada: ${err.constraint}`);
    }
}

module.exports = {
    registroUsuario,
    loginUsuario,
    getUsuarios
}