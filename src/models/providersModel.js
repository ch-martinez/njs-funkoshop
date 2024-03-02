const { pool } = require('../config/conn');

const getAllProvidersFromDB = async () => {
    const [response] = await pool.query('SELECT * FROM providers p ')
    return response
}

const getProviderFromDB = async (id) => {
    const [response] = await pool.query(`SELECT * FROM providers p WHERE p.provider_id = ${id}`)
    return response
}

module.exports = {
    getAllProvidersFromDB,
    getProviderFromDB
}