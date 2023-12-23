const { createPool } = require('mysql2/promise')
const { config } = require('dotenv')
config()

/* const pool = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
}) */

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'funkoshop',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0
})

pool.getConnection()
    .then(connection => {
        console.log('Conectado a MySQL database')
        connection.release()
    })
    .catch(err => {
        console.log(`Error al obtener la conexion: ${err}`)
    })

module.exports = {
    pool
}