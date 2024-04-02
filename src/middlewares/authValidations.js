const { body, validationResult } = require('express-validator')

//AUX: Convierte y filtra el resultado de "valuditarionResult" para ser enviado por query en la url
// VERIFICAR SI SE USA
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
const loginValidateFields = [
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
        .isStrongPassword({ minLength: 6, minLowercase: 0, minUppercase: 0, minSymbols: 0 })
            .withMessage('La contraseña no cumple los requisitos minimos'),
    (req, res, next) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({status:"Error",message: result.errors[0].msg})
            //res.redirect('/auth/login?err=' + parseErrors(result))
        } else {
            next()
        }
    }
]

const registerValidateFields = [
    body('name')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese un nombre'),

    body('lastname')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese un apellido'),

    body('email')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese un correo')
        .isEmail()
            .withMessage('Correo invalido'),

    body('tel')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese un telefono')
        .isMobilePhone({ locale: 'es-AR' })
            .withMessage('Telefono invalido'),

    body('password')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese una contraseña')
        .isStrongPassword({ minLength: 6, minLowercase: 1, minUppercase: 1, minSymbols: 0 })
            .withMessage('La contraseña no cumple los requisitos minimos'),

    body('adress_street')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese una calle'),

    body('adress_nro')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese el numero de la calle')
        .isInt()
            .withMessage('Numero de calle invalido'),

    body('adress_city')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese una ciudad'),

    body('adress_state')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese una provincia'),

    body('adress_zipCode')
        .trim()
        .not()
        .isEmpty()
            .withMessage('Ingrese el codigo postal')
        .isPostalCode({locale: 'any'})
            .withMessage('Codigo postal invalido'),

    (req, res, next) => {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            res.status(400).send({status:"Error",message: parseErrors(result)})
            //res.redirect('/auth/register?err=' + parseErrors(result))
        } else {
            next()
        }
    }
]

module.exports = {
    loginValidateFields,
    registerValidateFields,
}