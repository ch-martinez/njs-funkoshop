const { pool } = require('../config/conn');

const getEmailFromDB = async (email) => {
    try {
        const [response] = await pool.query('SELECT u.user_email FROM user u WHERE u.user_email = ?', email)
        return response
    } catch (error) {
        throw(error)
    }
}

const getUserFromDB = async (email) => {
    try {
        const [response] = await pool.query('SELECT u.* FROM user u WHERE u.user_email = ?', email)
        return response
    } catch (error) {
        throw(error)
    }
}

const getUserRoleFromDB = async (userId) => {
    try {
        const [response] = await pool.query('SELECT uhr.role_role_id FROM user_has_role uhr WHERE uhr.user_user_id = ?', userId)
        return response
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    getEmailFromDB,
    getUserFromDB,
    getUserRoleFromDB
}