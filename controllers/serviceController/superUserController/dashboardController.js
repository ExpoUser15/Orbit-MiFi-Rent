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

    if(success == 'added'){
        success = false;
        return res.render('service/superuser/dashboard.ejs', { 
            path: req.path, data: { testimonialData, locations }, 
            success: 'added', uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' 
        });
    }

    if(success == 'deleted'){
        success = false;
        return res.render('service/superuser/dashboard.ejs', { 
            path: req.path, data: { testimonialData, locations }, 
            success: 'deleted', uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' 
        });
    }

    if(success == 'empty'){
        success = false;
        return res.render('service/superuser/dashboard.ejs', { 
            path: req.path, data: { testimonialData, locations }, 
            success: 'empty', uri: `${req.protocol}://${req.hostname}:${port}`,
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

    if(!req.body.lokasi){
        success = 'empty';
        return res.redirect('/superuser');
    }

    const query = await sequelize.query('SELECT `location` FROM `tb_locations`');

    let no = 1;
    
    if(query[0]){
        query[0].forEach(element => {
            no++;
        });
    }

    await sequelize.query('INSERT INTO `tb_locations` (location_id, location) VALUES (:id, :location)', {
        type: QueryTypes.INSERT,
        replacements: { 
            id: no,
            location: req.body.lokasi
         }
    });

    sequelize
        .sync()
        .then(() => {
            console.log('Berhasil');
            success = 'added';
            res.redirect('/superuser');
        })
        .catch(error => {
            console.log(error);
        });
}

const deleteLocationsController = async (req, res) => {

    await sequelize.query('DELETE FROM `tb_locations` WHERE location = :location', {
        type: QueryTypes.INSERT,
        replacements: { 
            location: req.body.lokasi,
         }
    });

    sequelize
        .sync()
        .then(() => {
            console.log('Berhasil');
            success = 'deleted';
            res.redirect('/superuser');
        })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {
    dashboardController,
    addLocationsController,
    deleteLocationsController
}