const sequelize = require("../../../config/db");
const { QueryTypes } = require('sequelize');

let success;

const dashboardController = async (req, res) => {

    const userLevel = req.userLevel;
    const port = process.env.PORT || '7777';

    if(userLevel){
        if(userLevel.toLowerCase() !== 'superuser'){
            return res.redirect(`/${userLevel.toLowerCase()}`);
        }   
    }

    const testimonialData = await sequelize.query('SELECT * FROM `tb_testimonials` ORDER BY createdAt DESC LIMIT 4', {
        type: QueryTypes.SELECT,
    });

    const locations = await sequelize.query('SELECT location FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    });

    if(success){
        success = false;
        return res.render('service/superuser/dashboard.ejs', { 
            path: req.path, data: { testimonialData, locations }, 
            success, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' 
        });
    }

    res.render('service/superuser/dashboard.ejs', { 
        path: req.path, 
        data: { testimonialData, locations },  
        success: false, 
        uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser'
     });
} 

const addLocationsController = async (req, res) => {

    await sequelize.query('INSERT INTO `tb_locations` (location_id, location) VALUES (:id, :location)', {
        type: QueryTypes.INSERT,
        replacements: { 
            id: '',
            location: req.body.lokasi
         }
    });

    sequelize
        .sync()
        .then(() => {
            console.log('Berhasil');
            success = true;
            res.redirect('/superuser');
        })
        .catch(error => {
            console.log(error);
        });
}


module.exports = {
    dashboardController,
    addLocationsController,
}