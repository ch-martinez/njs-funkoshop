const shopView = (req, res) => {
    const page = {
        title: 'Funkos - FS'
    }
    res.render('pages/shop/shop', {page})
}

module.exports = {
    shopView
}