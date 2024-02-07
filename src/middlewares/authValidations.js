const {body, validationResult} = require('express-validator')

//AUX: Convierte y filtra el resultado de "valuditarionResult" para ser enviado por query en la url
const parseErrors = (data) => {
    const errorsIn = data.array()
    let errorsOut = []
    errorsIn.forEach(error => {
        let e = {
            field: error.path,
            msg: error.msg
        }
        errorsOut.push(e)
    });
    return encodeURIComponent(JSON.stringify(errorsOut))
}

//Validacion de campos "login"
const loginValidate = [
    body('email')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese un correo')
        .isEmail()
            .withMessage('Ingrese un correo valido'),
    body('password')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese una contraseña')
        .isStrongPassword({minLength: 6, minLowercase: 1, minUppercase:1, minSymbols: 0})
            .withMessage('La contraseña no cumple los requisitos minimos'),
        (req,res,next) => {
            const result = validationResult(req)
            if (!result.isEmpty()) {
                res.redirect('/auth/login?err='+parseErrors(result))
            } else {
                next()
            }
        }
    ]

module.exports = {
    loginValidate
}