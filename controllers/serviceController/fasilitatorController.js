const {  QueryTypes } = require('sequelize');
const sequelize = require('../../config/db');
const rentalSchema = require('../../models/rentalSchema');

let action;
let msg;

const fasilitatorController = async (req, res) => {
    try {
        const userLevel = req.userLevel;

        if(userLevel.toLowerCase() !== 'fasilitator'){
            return res.redirect(`/${userLevel.toLowerCase()}`);
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
            return res.render('service/index.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Status diubah ke \'${msg}\'.")</script>` });
        }

        if(action === 'Deleted'){
            action = null;
            return res.render('service/index.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Penyewa berhasil dihapus.")</script>` });
        }
    
        res.render('service/index.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished, success: '' });
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
} 

const statusDeleteController = async (req, res) => {
    try {
        await rentalSchema.destroy({
            where: {
                id: req.params.id,
            },
        });
    
        sequelize
            .sync()
            .then(() => {
                console.log("Status Deleted!");
                action = 'Deleted';
                res.redirect('/fasilitator');
            })
            .catch((error) => {
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const statusUpdateController = async (req, res) => {
    
    const params = req.params.status;

    if(params === 'In Progress'){
        await rentalSchema.update(
            { status: 'Rented' },
                {
                where: {
                    id: req.params.id,
                },
            },
        );

        sequelize
            .sync()
            .then(() => {
                console.log("Status Updated!");
                action = 'Updated';
                msg = 'Rented';
                res.redirect('/fasilitator');
            })
            .catch((error) => {
                console.error("Error synchronizing models with database:", error);
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    }else if(params === 'Rented'){
        await rentalSchema.update(
            { status: 'Finished' },
                {
                where: {
                    id: req.params.id,
                },
            },
        );

        sequelize
            .sync()
            .then(() => {
                console.log("Status Updated!");
                action = 'Updated';
                msg = 'Rented';
                res.redirect('/fasilitator');
            })
            .catch((error) => {
                console.error("Error synchronizing models with database:", error);
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    }else{
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }

    action = true;
    res.redirect('/fasilitator');
}

module.exports = { 
    fasilitatorController,
    statusUpdateController,
    statusDeleteController,
}