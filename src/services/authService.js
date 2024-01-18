const authModel = require('../models/authModel')

const existEmailInDB = async (email) => {
    const response = await authModel.getEmailFromDB(email)
    return email == response[0]?.user_email
}

const validateUser = async (body) => {
    const response = await authModel.getUserFromDB(body.email)
    if (body.password == response[0]?.user_password) {
        const user = {
            user_id: response[0].user_id,
            user_name: response[0].user_name,
            user_lastname: response[0].user_lastname,
            user_email: response[0].user_email,
            user_tel: response[0].user_tel,
            adress_id: response[0].adress_id,
            create_time: response[0].create_time
        }
        return user
    } else {
        return false
    }
}

const getUserRole = async (userId) => {
    const [role] = await authModel.getUserRoleFromDB(userId)
    return role
}

module.exports = {
    existEmailInDB,
    validateUser,
    getUserRole
}