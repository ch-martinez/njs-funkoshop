const userPanelView = (req, res) => {
    const page = {
        title: 'Panel de usuario - FS'
    }
    res.render('pages/user/userPanel', {page})
}

module.exports = {
    userPanelView
}