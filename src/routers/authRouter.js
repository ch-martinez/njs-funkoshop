const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')
const authValidations = require('../middlewares/authValidations')

router.get('/login', authController.loginView)
router.post('/login', authValidations.loginValidate, authController.login)
router.get('/register', authController.registerView)
router.post('/register', authController.register)
router.get('/recover', authController.recoverPassView)

module.exports = router