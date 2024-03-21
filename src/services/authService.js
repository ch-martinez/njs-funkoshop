const bcryptjs = require('bcryptjs')
const authModel = require('../models/authModel')

// Encripta la contraseña
async function encryptPass (password) {
    const salt = await bcryptjs.genSalt(5)
    return await bcryptjs.hash(password,salt) // Crea el hash de la contraseña
}

// Valida la contraseña ingresada con la guardada en la bd por medio del id
async function passwordLoginValidate (user_id,password) {
    const passwordHash = await authModel.getPasswordHashFromDB(user_id)
    return await bcryptjs.compare(password,passwordHash)
}

//Valida si existe el correo en la BD
const existEmailInDB = async (email) => {
    const existEmail = await authModel.isEmailInDB(email)
    const validate = {
        email_ok: false,
        validate_ok: false,
        user_id: undefined,
        user_name: undefined
    }
    if (existEmail) {
        validate.email_ok = true
        validate.user_id = (await authModel.getUserIdFromDB(email)).user_id
        validate.user_name = (await authModel.getUserNameByIdFromDB(validate.user_id)).user_name
    }
    return validate
}

// Genera el listado de las direcciones de un usuario
async function generateAdressList(user_id) {
    const response = await authModel.getAdressListFromDB(user_id)
    const adressList = []
    response.forEach(element => {
        const adress = {
            adress_street: element.adress_street,
            adress_nro: element.adress_nro,
            adress_city: element.adress_city,
            adress_state: element.adress_state,
            adress_zipCode: element.adress_zipCode
        }
        adressList.push(adress)
    })
    return adressList
}

// Devuelve una variable con todos los datos de un usuario
async function generateUser (user_id) {
    const response = await authModel.getUserFromDB(user_id)
    const user = {
        id: user_id,
        role_id: response.user_role_id,
        datetime: response.user_datatime,
        name: response.user_name,
        lastname: response.user_lastname,
        tel: response.user_tel,
        adress: generateAdressList(user_id)
    }
    return user
}

// Devuelve una variable donde se procesan los datos ingresados en formulario de registro
async function generateUserFromRegister (data) {
    const user = {
        user_name: data.name,
        user_lastname: data.lastname,
        user_tel: data.tel,
        adress: {
            adress_street: data.adress_street,
            adress_nro: data.adress_nro,
            adress_city: data.adress_city,
            adress_state: data.adress_state,
            adress_zipCode: data.adress_zipCode
        },
        user_email: data.email,
        user_password_hash: await encryptPass(data.password)
    }
    return user
}

// ************************************************************************************


//Registra un usuario en la base de datos
async function registerUserInDB (user) {
    await authModel.createUserInDB(user)
    const user_id = await authModel.getUserIdFromDB(user.user_email)
    await authModel.addUserAdressInDB(user_id.user_id,user.adress)
}

// LOGIN
const loginValidateUser = async (body) => {
    const email = body.email
    const password = body.password
    const validate = await existEmailInDB(email)
    validate.validate_ok = validate.email_ok && await passwordLoginValidate(validate.user_id, password)
    return validate
}

module.exports = {
    existEmailInDB,
    loginValidateUser,
    encryptPass,
    generateUser,
    registerUserInDB,
    generateUserFromRegister
}