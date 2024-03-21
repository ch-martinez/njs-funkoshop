const jwt = require('jsonwebtoken')
const authService = require('../services/authService')
const authModel = require('../models/authModel')
const cookieService = require('../services/cookieService')

// ************************************************************************************

//AUX: Devuelve la ruta a la cual se debe redireccionar segun rol del usario
async function redirectUserRole (user_id) {
    const role = await authModel.getUserRoleByIdFromDB(user_id)
    if (role.role_role_id == 0) {return '/admin'}
    if (role.role_role_id == 1) {return '/user'}
}

// Login
const loginView = (req, res) => {
    const page = {
        title: 'Login - FS'
    }
    try {
        res.render('pages/auth/login',{page, layout: 'layouts/authLayout'})
    } catch (error) {
        console.log({message:'loginView ERROR', reference: error.message})
    }
}

const login = async (req,res,next) => {
    const loginValidate = await authService.loginValidateUser(req.body)
    if (loginValidate.validate_ok) {
        const redirectUrl = await redirectUserRole(loginValidate.user_id)
        const token = jwt.sign(loginValidate, process.env.JWT_SECRET)
        cookieService.setCookie('jwt',token,res)
        res.send({status:'ok',message:'Login correcto',redirect: redirectUrl})
    } else {
        console.log('Los datos ingresados son invalidos (login function)')
        res.status(400).send({status:'Error', message:'Los datos ingresados son invalidos'})
    }
}

// Register
const registerView = (req, res) => {
    const page = {
        title: 'Registrarse - FS'
    }
    try {
        res.render('pages/auth/register',{page, layout: 'layouts/authLayout'})
    } catch (error) {
        throw(error)
    }
}

const register = async (req, res) => {
    const existEmail = await authService.existEmailInDB(req.body.email)
    if (existEmail.email_ok){
        res.status(400).send({status:'Error', message:'Correo ya registrado'})
    }else{
        const user = await authService.generateUserFromRegister(req.body)
        authService.registerUserInDB(user)
        res.status(201).send({status:'ok', message:'Se registró correctamente', redirect:'/auth/login'})
    }
}

//RecoverPass
const recoverPassView = (req, res) => {
    const page = {
        title: 'Recuperar contraseña - FS'
    }
    try {
        res.render('pages/auth/recoverPass',{page, layout: 'layouts/authLayout'})
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    loginView,
    login,
    registerView,
    register,
    recoverPassView
}