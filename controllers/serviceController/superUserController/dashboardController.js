const sequelize = require("../../../config/db");
const { QueryTypes } = require('sequelize');

const dashboardController = async (req, res) => {
    const testimonialData = await sequelize.query('SELECT * FROM `tb_testimonials` ORDER BY createdAt DESC LIMIT 4', {
        type: QueryTypes.SELECT,
    });

    res.render('service/superuser/dashboard.ejs', { path: req.path, data: { testimonialData } });
} 

module.exports = {
    dashboardController
}