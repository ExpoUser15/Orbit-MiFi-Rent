const {  QueryTypes } = require('sequelize');
const sequelize = require('../../../config/db');
const rentalSchema = require('../../../models/rentalSchema');

let action;
let msg;

const monitoringController = async (req, res) => {
    try {
        const userLevel = req.userLevel;
        const port = process.env.PORT || '7777';

        if(userLevel){
            if(userLevel.toLowerCase() !== 'superuser'){
                return res.redirect(`/${userLevel.toLowerCase()}`);
            }   
        }  

        const rentalInProgress = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE status = "In Progress" ORDER BY startAt', {
            type: QueryTypes.SELECT,
        });
    
        const rentalRented = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE status = "Rented" ORDER BY startAt', {
            type: QueryTypes.SELECT,
        });
    
        const rentalFinished = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE status = "Finished" ORDER BY startAt LIMIT 50', {
            type: QueryTypes.SELECT,
        });
    
        if(action === 'Updated'){
            action = null;
            return res.render('service/superuser/monitoring.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Status diubah ke \'${msg}\'.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }

        if(action === 'Deleted'){
            action = null;
            return res.render('service/superuser/monitoring.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Penyewa berhasil dihapus.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }
    
        res.render('service/superuser/monitoring.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished, success: '', uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
} 


module.exports = { 
    monitoringController,
}
