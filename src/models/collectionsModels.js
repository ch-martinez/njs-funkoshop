const { pool } = require('../config/conn');

const getAllCollectionsFromBD = async () => {
    try {
        const [collections] = await pool.query('SELECT `collection`. * FROM `collection`')
        return collections
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getAllCollectionsFromBD
}