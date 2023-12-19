const { conn } = require('../config/conn');

const getAllCollectionsFromBD = async () => {
    try {
        const [collections] = await conn.query('SELECT `collection`. * FROM `collection`')
        return collections
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getAllCollectionsFromBD
}