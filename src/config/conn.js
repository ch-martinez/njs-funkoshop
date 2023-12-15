const mysql = require('mysql2')
const config = require('dotenv')
config()

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    enableKeepAlive: true
});

pool.getConnection()
    .then(connection => {
        console.log('Conexion a MySQL correcta!')
        connection.release()
    })
    .catch(err => {
        console.log(`Error al obtener la conexion: ${err}`)
    })

module.exports = {
    pool
}