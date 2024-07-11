const notFoundController = (req, res) => {
    const port = process.env.PORT || '7777';

    console.log(req.cookies)

    res.render('404.ejs', { title: '404 Page Not Found', uri: `${req.protocol}://${req.hostname}:${port}`});
}

module.exports = notFoundController;