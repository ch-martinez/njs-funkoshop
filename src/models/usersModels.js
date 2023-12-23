const { pool } = require('../config/conn')

const getAllUsersFromDB = async () => {
    const [users] = await pool.query('SELECT * FROM user')
    console.log(users)
    return users
}

module.exports = {
    getAllUsersFromDB
}