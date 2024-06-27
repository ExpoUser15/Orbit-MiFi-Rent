const { QueryTypes} = require('sequelize');
const sequelize = require('../../config/db');

let n1 = 0;
let n2 = 0;

const penyediaController = async (req, res) => {

    const userLevel = req.userLevel;

    if(userLevel.toLowerCase() !== 'penyedia'){
        return res.redirect(`/${userLevel.toLowerCase()}`);
    }   

    const data = await sequelize.query('SELECT * FROM `tb_ready_stoks` JOIN `tb_locations` ON tb_locations.location_id = tb_ready_stoks.location', {
        type: QueryTypes.SELECT,
    });

    const lokasi = await sequelize.query('SELECT * FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    }); 

    res.render('service/index.ejs', { 
        title: 'Telkomsel | Penyedia', 
        path: req.path,
        data,
        lokasi
    });
}

const tambahModemController = async (req, res) => {
    try {
        const body = req.body;

        const data = await sequelize.query('SELECT * FROM `tb_ready_stoks` JOIN `tb_locations` ON tb_locations.location_id = tb_ready_stoks.location', {
            type: QueryTypes.SELECT,
        });

        const x = body.action === 'edit' ? body.jumlah : Number(body.jumlah) + (body.modem === 'N1' ? Number(data[0].n1) : Number(data[0].n2));
        const num = Number(body.location);

        if(body.modem === 'N1'){
            await sequelize.query('UPDATE `tb_ready_stoks` SET n1 = :n1 WHERE location = :location', {
                type: QueryTypes.SELECT,
                replacements: { n1: x, location: num }
            }); 
        }

        if(body.modem === 'N2'){
            await sequelize.query('UPDATE `tb_ready_stoks` SET n2 = :n2 WHERE location = :location', {
                type: QueryTypes.SELECT,
                replacements: { n2: x, location: num }
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

module.exports = {
    penyediaController,
    tambahModemController,
} 