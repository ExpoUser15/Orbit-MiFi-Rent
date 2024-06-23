const dashboardController = (req, res) => {
    console.log(req.path)
    res.render('service/superuser/dashboard.ejs', { path: req.path });
} 

module.exports = {
    dashboardController
}