const authModel = require('../models/authModel')
const cookieService = require('../services/cookieService')

// Verifica si esta logueado
const isLogged = async (req,res,next) => {
    let cookie = cookieService.getCookie(req.headers.cookie,'jwt')
    if (cookie == undefined) {
        return next()
    }else{
        cookie = cookieService.getCookieData(req.headers.cookie, "jwt")
        const role = await authModel.getUserRoleByIdFromDB(cookie.user_id)
        switch (role.role_role_id) {
            case 0:
                return res.redirect('/admin')
                break;
            case 1:
                return res.redirect('/userPanel')
                break;
            default:
                return res.redirect('/')
                break;
        }
    }
}

const isLoggedCart = async (req, res, next) => {
    let cookie = cookieService.getCookie(req.headers.cookie,'jwt')
    if (cookie == undefined) {
        res.redirect('/auth/login')
    }else{
        return next()
    }
}

// Verifica si el usuario logueado es administrador
const adminAuthorize = async (req,res,next) => {
    let cookie = cookieService.getCookie(req.headers.cookie,'jwt')
    if (cookie == undefined) {return res.redirect('/')}
    cookie = cookieService.getCookieData(req.headers.cookie, "jwt")
    const role = await authModel.getUserRoleByIdFromDB(cookie.user_id)
    if (role.role_role_id == 0){
        next()
    }else{
        res.redirect('/')
    }
}

// Verifica si el usuario logueado es cliente
const userAuthorize = async (req,res,next) => {
    let cookie = cookieService.getCookie(req.headers.cookie,'jwt')
    if (cookie == undefined) {return res.redirect('/')}
    cookie = cookieService.getCookieData(req.headers.cookie, "jwt")
    const role = await authModel.getUserRoleByIdFromDB(cookie.user_id)
    if (role.role_role_id == 1){
        next()
    }else{
        res.redirect('/')
    }
}

module.exports = {
    isLogged,
    isLoggedCart,
    adminAuthorize,
    userAuthorize
}