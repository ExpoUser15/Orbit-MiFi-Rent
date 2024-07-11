const { QueryTypes} = require('sequelize');
const sequelize = require('../../config/db');
const { finishDate, formattedDate } = require('../../utils/date');
const rentalSchema = require('../../models/rentalSchema');

let action;
let success;
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
        res.render('service/index.ejs', { title: 'Telkomsel | Penyedia' , data, lokasi, path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Status diubah ke \'${msg}\'.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    if(action === 'Deleted'){
        action = null;
        res.render('service/index.ejs', { title: 'Telkomsel | Penyedia' , data, lokasi, path: req.path, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Penyewa berhasil dihapus.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    if(success === 'empty'){
        success = null;

        res.render('service/index.ejs', { title: 'Telkomsel | Penyedia' , path: req.path, lokasi, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Silahkan masukan gambar terlebih dahulu.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    if(success === 'success'){
        success = null;

        res.render('service/index.ejs', { title: 'Telkomsel | Penyedia' , path: req.path, data, lokasi, rentalInProgress, rentalRented, rentalFinished,  success: `<script>alert("Berhasil mengupload gambar.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' });
    }

    res.render('service/index.ejs', { 
        title: 'Telkomsel | Penyedia', 
        path: req.path,
        data,
        success: false,
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

const uploadBAKController = async (req, res) => {
    try {
        const files = req.files;

        console.log(files);
        console.log(req.params);
    
        if(!files){
            success = 'empty'
            res.redirect('/penyedia');
        }

        if(!req.params.id){
            success = false;
            res.redirect('/penyedia');
        }

        await sequelize.query('UPDATE tb_rentals SET bak = :bak WHERE id = :id', {
            type: QueryTypes.UPDATE,
            replacements: { 
                bak: files.bak[0].filename,
                id: req.params.id
             }
        })

        sequelize
        .sync()
        .then(() => {
            success = 'success';
            res.redirect('/penyedia');
            console.log('Updated');
        })
        .catch((error) => {
            console.log(error);
            res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
        });
    
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    penyediaController,
    tambahModemController,
    uploadBAKController,
} 