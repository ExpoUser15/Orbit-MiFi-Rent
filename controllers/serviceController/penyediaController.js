const { QueryTypes} = require('sequelize');
const sequelize = require('../../config/db');
const stokSchema = require('../../models/stokSchema');
const rentalSchema = require('../../models/rentalSchema');

const penyediaController = async (req, res) => {

    const jenisModem = await stokSchema.findAll();
    const countData = await rentalSchema.count();
    const lokasi = await sequelize.query('SELECT location FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    });

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

module.exports = {
    penyediaController,
} 