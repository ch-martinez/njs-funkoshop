const { pool } = require('../config/conn');

const getAllCollectionsFromBD = async () => {
    try {
        const [collections] = await pool.query('SELECT * FROM collection')
        return collections
    } catch (error) {
        throw(error)
    }
}

const getCollectionByIDFromBD = async (id) => {
    try {
        const [collection] = await pool.query(`SELECT * FROM collection c WHERE c.collection_id = ${id} `)
        return collection
    } catch (error) {
        throw(error)
    }
}

const getHomeCollectionsListFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT c.* FROM home_collections hc JOIN collection c on hc.collection_id = c.collection_id ORDER BY hc.hc_order ')
        return response
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getAllCollectionsFromBD,
    getCollectionByIDFromBD,
    getHomeCollectionsListFromDB
}