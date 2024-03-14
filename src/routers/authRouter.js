const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authValidations = require('../middlewares/authValidations')
const authAuthorization =require('../middlewares/authAuthorization')

router.get('/login', authAuthorization.isLogged, authController.loginView)
router.post('/login', authController.login)
//router.post('/login', authValidations.loginValidateFields, authController.login)
router.get('/register', authAuthorization.isLogged, authController.registerView)
router.post('/register', authController.register)
router.get('/recover', authAuthorization.isLogged, authController.recoverPassView)

module.exports = router