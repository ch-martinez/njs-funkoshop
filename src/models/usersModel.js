const { pool } = require('../config/conn')

const getAllUsersFromDB = async () => {
    const [users] = await pool.query('SELECT * FROM user')
    return users
}

module.exports = {
    getAllUsersFromDB
}