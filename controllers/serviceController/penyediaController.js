const { QueryTypes} = require('sequelize');
const sequelize = require('../../config/db');
const stokSchema = require('../../models/stokSchema');
const rentalSchema = require('../../models/rentalSchema');

let n1 = 0;
let n2 = 0;

const penyediaController = async (req, res) => {

    const jenisModem = await stokSchema.findAll();
    const countData = await rentalSchema.count();
    const lokasi = await sequelize.query('SELECT location FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    });

    n1 = jenisModem[0].dataValues.jumlah;
    n2 = jenisModem[1].dataValues.jumlah;

    res.render('service/index.ejs', { 
        title: 'Telkomsel | Penyedia', 
        path: req.path,
        jumlahModem: {
            N1: jenisModem[0].dataValues.jumlah,
            N2: jenisModem[1].dataValues.jumlah
        },
        locations: lokasi,
        rentalsCount: countData
    });
}

const tambahModemController = async (req, res) => {
    try {
        const body = req.body;

        const x = body.action === 'edit' ? body.jumlah : Number(body.jumlah) + (body.modem === 'N1' ? n1 : n2);

        await stokSchema.update({
            jumlah: x
        }, { 
            where: { jenis_modem: body.modem }
        });

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