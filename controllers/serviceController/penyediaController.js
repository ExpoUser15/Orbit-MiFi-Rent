const { QueryTypes} = require('sequelize');
const sequelize = require('../../config/db');

let action;
let msg;

const penyediaController = async (req, res) => {

    const userLevel = req.userLevel;
    const port = process.env.PORT || '7777';

    if(userLevel){
        if(userLevel.toLowerCase() !== 'penyedia'){
            return res.redirect(`/${userLevel.toLowerCase()}`);
        }   
    }   

    const data = await sequelize.query('SELECT * FROM `tb_ready_stoks` JOIN `tb_locations` ON tb_locations.location_id = tb_ready_stoks.location', {
        type: QueryTypes.SELECT,
    });

    const lokasi = await sequelize.query('SELECT * FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    }); 

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
        return res.render('service/index.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Status diubah ke \'${msg}\'.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    if(action === 'Deleted'){
        action = null;
        return res.render('service/index.ejs', { title: 'Telkomsel | Fasilitator' , path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Penyewa berhasil dihapus.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    res.render('service/index.ejs', { 
        title: 'Telkomsel | Penyedia', 
        path: req.path,
        data,
        lokasi,
        rentalFinished,
        rentalInProgress,
        rentalRented,
        uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser'
    });
}

const tambahModemController = async (req, res) => {
    try {
        const body = req.body;

        const data = await sequelize.query('SELECT * FROM `tb_ready_stoks` JOIN `tb_locations` ON tb_locations.location_id = tb_ready_stoks.location', {
            type: QueryTypes.SELECT,
        });

        const x = body.action === 'edit' ? body.jumlah :  Number(body.jumlah) + Number(body.modem === 'N1' ? data[0].n1 : data[0].n2);

        if(body.modem === 'N1'){
            await sequelize.query('UPDATE `tb_ready_stoks` SET n1 = :n1 WHERE location = :location', {
                type: QueryTypes.UPDATE,
                replacements: { n1: String(x), location: body.location }
            }); 
        }

        if(body.modem === 'N2'){
            await sequelize.query('UPDATE `tb_ready_stoks` SET n2 = :n2 WHERE location = :location', {
                type: QueryTypes.UPDATE,
                replacements: { n2: String(x), location: body.location }
            }); 
        }


        sequelize
            .sync()
            .then(() => {
                res.redirect('/penyedia');
            })
            .catch((error) => {
                console.log(error);
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
            
    } catch (error) {
        console.log(error);
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

module.exports = {
    penyediaController,
    tambahModemController,
    statusUpdateController,
    statusDeleteController,
} 