const homeView = (req, res) => {
    const page = {
        title: 'FunkoShop'
    }
    res.render('pages/main/home', {page})
}

module.exports = {
    homeView
}