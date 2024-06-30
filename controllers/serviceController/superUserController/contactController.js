const sequelize = require("../../../config/db");
const { QueryTypes } = require('sequelize');

const contactSuperuserController = async (req, res) => {
    try {
        const userLevel = req.userLevel;
        const port = process.env.PORT || '7777';

        if (userLevel.toLowerCase() !== 'superuser') {
            return res.redirect(`/${userLevel.toLowerCase()}`);
        }

        const contactData = await sequelize.query('SELECT * FROM `tb_contacts` ORDER BY createdAt DESC LIMIT 10');

        res.render('service/superuser/contact.ejs', {
            path: req.path,
            data: contactData[0],
            uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser'
        });
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const searchContactSuperuserController = async (req, res) => {
    const body = req.body;
    const searchQuery = await sequelize.query('SELECT * FROM `tb_contacts` WHERE name LIKE :search OR phone LIKE :search OR email LIKE :search OR message LIKE :search ORDER BY createdAt DESC LIMIT 10', {
        type: QueryTypes.SELECT,
        replacements: { search: `${body.search}%` }
    }); 

    console.log(body)

    res.json({
        data: searchQuery
    });
}

module.exports = { contactSuperuserController, searchContactSuperuserController };