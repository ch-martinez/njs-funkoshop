const jwt = require('jsonwebtoken')
const cartModel = require('../models/cartModel')

// Inicializa la cookie
const setCookie = (name,token,res) => {
    const cookieOption = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES *24*60*60*1000), // Expresa en dias (Si en el .env se pone 1, seria 1 dia)
        path: ('/')
    }
    return res.cookie(name,token,cookieOption)
}

// Devuelve la coockie codificada
const getCookie = (cookies, cookieName) => {
    if (cookies != undefined) {
        const cookiesArr = cookies.split('; ')
        const cookieNameLength = cookieName.length + 1
        const cookieExist = cookiesArr.find(cookie => cookie.startsWith(`${cookieName}=`))
        if (cookieExist != undefined) {
            return cookieExist.slice(cookieNameLength)
        }
    }
    return undefined
}

// Devuelve la coockie decodificada
const getCookieData = (cookies, cookieName) => {
    const cookie = getCookie(cookies,cookieName)
    const cookieDecode = jwt.verify(cookie,process.env.JWT_SECRET)
    return cookieDecode
}

// Obtiene el cart_id de la coockie
const getCartIdFromCookie = async (req) =>{
    const cookie = await getCookieData(req,'jwt')
    return await cartModel.getCartIdFromDB(cookie.user_id)
}

module.exports = {
    setCookie,
    getCookie,
    getCookieData,
    getCartIdFromCookie
}