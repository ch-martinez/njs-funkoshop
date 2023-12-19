const loginView = (req, res) => {
    const page = {
        title: 'Login - FS'
    }
    try {
        res.render('pages/auth/login',{page, layout: 'layouts/authLayout'})
    } catch (error) {
        throw(error)
    }
}

module.exports = {
    loginView
}