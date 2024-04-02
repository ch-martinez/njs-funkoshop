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

const updateProviderByID = async (provider) => {
    try {
        await pool.query(`
        UPDATE providers
        SET
            provider_name = "${provider.provider_name}",
            provider_tel = "${provider.provider_tel}",
            provider_observation = "${provider.provider_observation}"
        WHERE
            provider_id = ${provider.provider_id}
        `)
    } catch (error) {
        console.log({message:'updateProviderByID ERROR', reference: error.message})
    }
}

module.exports = {
    getAllProvidersFromDB,
    getProviderByIdFromDB,
    updateProviderByID
}