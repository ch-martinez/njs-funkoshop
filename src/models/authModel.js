const { pool } = require('../config/conn');

// OBTENCION DE DATOS

// Obtiene el email de un usuario (Se utiliza para comprobar si ya existe un email en la BD)
const isEmailInDB = async (email) => {
    try {
        const [response] = await pool.query(`SELECT COUNT(*) AS user_email  FROM user WHERE user_email = '${email}'`)
        return (response.user_email == 0) ? false : true
    } catch (error) {
        console.log({message:'isEmailInDB ERROR', reference: error.message})
    }
}

// Devuelve el id de un usuario segun el email indicado
const getUserIdFromDB = async (email) => {
    try {
        const [[response]] = await pool.query(`SELECT u.user_id  FROM user u WHERE u.user_email = '${email}'`)
        return response
    } catch (error) {
        console.log({message:'getUserIdFromDB ERROR', reference: error.message})
    }
}

// Devuelve el nombre de un usuario segun el id indicado
const getUserNameByIdFromDB = async (user_id) => {
    try {
        const [[response]] = await pool.query(`SELECT u.user_name  FROM user u WHERE u.user_id = '${user_id}'`)
        return response
    } catch (error) {
        console.log({message:'getUserNameFromDB ERROR', reference: error.message})
    }
}
// Obtiene el rol de un usuario
const getUserRoleByIdFromDB = async (user_id) => {
    try {
        const [[response]] = await pool.query('SELECT uhr.role_role_id FROM user_has_role uhr WHERE uhr.user_user_id = ?', user_id)
        return response
    } catch (error) {
        console.log({message:'getUserRoleFromDB ERROR', reference: error.message})
    }
}

// Devuelve el listado de direcciones segun el user_id indicado
const getAdressListByUserIdFromDB = async (user_id) => {
    try {
        const [response] = await pool.query(`SELECT a.* FROM adress a WHERE a.user_id = ${user_id}`)
        return response
    } catch (error) {
        console.log({message:'getAdressListFromDB ERROR', reference: error.message})
    }
}

// Devuelve el hash de la password segun el user_id indicado
const getPasswordHashFromDB = async (user_id) => {
    try {
        const [[response]] = await pool.query(`SELECT u.user_password_hash FROM user u WHERE u.user_id = '${user_id}'`)
        return response.user_password_hash
    } catch (error) {
        console.log({message:'getPasswordHashFromDB ERROR', reference: error.message})
    }
}

// Obtiene el listado de usuarios
const getUserFromDB = async (email) => {
    try {
        const [response] = await pool.query('SELECT u.* FROM user u WHERE u.user_email = ?', email)
        return response
    } catch (error) {
        console.log({message:'getUserFromDB ERROR', reference: error.message})
    }
}

const getAllUsersFromDB = async () => {
    try {
        const [users] = await pool.query('SELECT * FROM user')
        return users
    } catch (error) {
        console.log({message:'getAllUsersFromDB ERROR', reference: error.message})
    }
}

// ****************************************************************************************************************************

// Crea un usuario 
const createUserInDB = async (user) => {
    try {
        const [response] = await pool.query(`INSERT INTO user (user_name, user_lastname, user_tel, user_email, user_password_hash) VALUES ('${user.user_name}','${user.user_lastname}','${user.user_tel}','${user.user_email}','${user.user_password_hash}')`)
        return [response]
    } catch (error) {
        console.log({message:'createUserInDB ERROR', reference: error.message})
    }
}

            // Crea un usuario ++++++++++++++++  REVISAR: Intenta insertar los datos de un usuario y a su vez la direccion
            const addUserAdressInDB = async (user_id, adress) => {
                try {
                    const [response] = await pool.query(`INSERT INTO adress (user_id, adress_street, adress_nro, adress_city, adress_state, adress_zipCode) VALUES ('${user_id}','${adress.adress_street}','${adress.adress_nro}','${adress.adress_city}','${adress.adress_state}','${adress.adress_zipCode}')`)
                    return [response]
                } catch (error) {
                    console.log({message:'addUserAdressInDB ERROR', reference: error.message})
                }
            }

module.exports = {
    isEmailInDB,
    getUserIdFromDB,
    getUserNameByIdFromDB,
    getUserRoleByIdFromDB,
    getAdressListByUserIdFromDB,
    getPasswordHashFromDB,
    getUserFromDB,
    getAllUsersFromDB,
    createUserInDB,
    addUserAdressInDB
}