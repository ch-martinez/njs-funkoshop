const jwt = require('jsonwebtoken')

//AUX: Devuelve el valor de la cookie indicada
function getCookie (cookies, cookieName) {
    const cookiesArr = cookies.split('; ')
    const cookieNameLength = cookieName.length + 1
    return cookiesArr.find(cookie => cookie.startsWith(`${cookieName}=`)).slice(cookieNameLength)
}

function setCookie (name,token,res) {
    const cookieOption = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES *24*60*60*1000), // Expresa en dias (Si en el .env se pone 1, seria 1 dia)
        path: ('/')
    }
    return res.cookie(name,token,cookieOption)
}

function getCookieData (cookies, cookieName) {
    const cookie = getCookie(cookies,cookieName)
    const cookieDecode = jwt.verify(cookie,process.env.JWT_SECRET)
    return cookieDecode
}

module.exports = {
    setCookie,
    getCookieData
}