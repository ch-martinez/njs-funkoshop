const mysql = require('mysql2');
require('dotenv').config();


const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT,
    waitForConnections: true,
    connectionLimit: 5,
    queueLimit: 0,
    //enableKeepAlive: true
})
const prueba = async () => {
    const [row] = await pool.query('SELECT * FROM user')
    console.log(row)
}
//Prueba de conexion a BD
pool.getConnection((error, connection) => {
    if (error) {
      console.error('Error al obtener una conexión:', error);
    } else {
      console.log('Conexión exitosa a la base de datos');
      connection.release();
    }
  });



module.exports = {
    conn: pool.promise()
}