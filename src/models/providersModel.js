const { pool } = require('../config/conn');

// Devuelve el listado de provedores
const getAllProvidersFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT * FROM providers p')
        return response
    } catch (error) {
        console.log({message:'getAllProvidersFromDB ERROR', reference: error.message})
    }
}

// Devuelve el provedor segun id indicado
const getProviderByIdFromDB = async (provider_id) => {
    try {
        const [response] = await pool.query(`SELECT * FROM providers p WHERE p.provider_id = ${provider_id}`)
        return response
    } catch (error) {
        console.log({message:'getProviderFromDB ERROR', reference: error.message})
    }
}

module.exports = {
    getAllProvidersFromDB,
    getProviderByIdFromDB
}