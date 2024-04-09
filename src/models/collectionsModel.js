const { pool } = require('../config/conn');

// Devuelve listado de todas las colecciones
const getAllCollectionsFromBD = async () => {
    try {
        const [collections] = await pool.query('SELECT * FROM collection')
        return collections
    } catch (error) {
        console.log({message:'getAllCollectionsFromBD ERROR', reference: error.message})
    }
}

// Devuelve la coleccion segun el id indicado
const getCollectionByIDFromBD = async (collection_id) => {
    try {
        const [collection] = await pool.query(`SELECT c.*, ch.ch_active, ch.ch_order  FROM collection c JOIN collections_home ch ON ch.collection_id = c.collection_id  WHERE c.collection_id = ${collection_id}`)
        return collection
    } catch (error) {
        console.log({message:'getCollectionByIDFromBD ERROR', reference: error.message})
    }
}

// Devuelve el listado de colecciones que se muestran en home
const getAllCollectionsHomeFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT c.*, ch.* FROM collections_home ch JOIN collection c on ch.collection_id = c.collection_id ORDER BY ch.ch_order ')
        return response
    } catch (error) {
        console.log({message:'getAllCollectionsHomeFromDB ERROR', reference: error.message})
    }
}

// Devuelve el listado de colecciones activas que se muestran en home 
const getCollectionsHomeActiveFromDB = async () => {
    try {
        const [response] = await pool.query('SELECT c.*, ch.* FROM collections_home ch JOIN collection c on ch.collection_id = c.collection_id WHERE ch_active = 1 ORDER BY ch.ch_order ')
        return response
    } catch (error) {
        console.log({message:'getCollectionsHomeActiveFromDB ERROR', reference: error.message})
    }
}

// Actualiza una coleccion segun el id indicado
const updateCollectionByID = async (collection) => {
    try {
        await pool.query(`UPDATE collection SET collection_name = "${collection.collection_name}", collection_description = "${collection.collection_description}", collection_sku = "${collection.collection_sku}" WHERE collection_id = ${collection.collection_id};`)
        await pool.query(`UPDATE collections_home SET ch_active = ${collection.ch_active} WHERE collection_id = ${collection.collection_id};`)
    } catch (error) {
        console.log({message:'updateCollectionByID ERROR', reference: error.message})
    }
}

// Actualiza el listado de colecciones que se muestran en el home
const updateCollectionHome = async (collection) => {
    try {
        await pool.query(`UPDATE collections_home ch SET ch_order = ${collection.ch_order},ch_active = ${collection.ch_active} WHERE collection_id = ${collection.collection_id};`)
    } catch (error) {
        console.log({message:'updateCollectionHome ERROR', reference: error.message})
        return {status:500, message:'Error al actualizar colecciones en home'}
    }
}

module.exports = {
    getAllCollectionsFromBD,
    getCollectionByIDFromBD,
    getAllCollectionsHomeFromDB,
    getCollectionsHomeActiveFromDB,
    updateCollectionByID,
    updateCollectionHome
}