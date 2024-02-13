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


// Collections home
const getAllCollectionsHomeFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT c.*, ch.* FROM collections_home ch JOIN collection c on ch.collection_id = c.collection_id ORDER BY ch.ch_order ')
        return response
    } catch (error) {
        throw(error)
    }
}

const getCollectionsHomeActiveFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT c.*, ch.* FROM collections_home ch JOIN collection c on ch.collection_id = c.collection_id WHERE ch_active = 1 ORDER BY ch.ch_order ')
        return response
    } catch (error) {
        throw(error)
    }
}

const updateCollectionHome = async (collection) => {
    try {
        await pool.query(`UPDATE collections_home ch SET ch_order = ${collection.ch_order},ch_active = ${collection.ch_active} WHERE collection_id = ${collection.collection_id};`)
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getAllCollectionsFromBD,
    getCollectionByIDFromBD,
    getAllCollectionsHomeFromDB,
    getCollectionsHomeActiveFromDB,
    updateCollectionHome
}