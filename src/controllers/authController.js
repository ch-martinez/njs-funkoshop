const authService = require('../services/authService')

// Login
const loginView = (req, res) => {
    //Verifica si hay algun error en las credenciales de login y pasa el mensaje a la vista
    const errors = (req.query.err != undefined) ? JSON.parse(req.query.err) : undefined
    const page = {
        title: 'Login - FS'
    }
    try {
        res.render('pages/auth/login',{page, layout: 'layouts/authLayout', errors})
    } catch (error) {
        throw(error)
    }
}

const login = async (req,res,next) => {
    const user = await authService.validateUser(req.body)
    if (user) {
        const role = await authService.getUserRole(user.user_id)
        req.session.user = user
        req.session.user.role = role.role_role_id
        res.redirect('/admin')
    } else {
        console.log('Datos incorrectos')
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

const register = (req, res) => {
    return res.status(200).send('TODO OK')
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