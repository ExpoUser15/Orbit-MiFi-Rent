const errorController = (req, res) => {
    res.render('error.ejs', { title: 'Error' });
}

module.exports = errorController;