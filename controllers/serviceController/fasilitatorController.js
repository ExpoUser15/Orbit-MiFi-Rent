const {  QueryTypes } = require('sequelize');
const sequelize = require('../../config/db');
const rentalSchema = require('../../models/rentalSchema');

const fasilitatorController = async (req, res) => {
    const rentals = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan', {
        type: QueryTypes.SELECT,
    });

    console.log(rentals)

    res.render('service/fasilitator.ejs', { data: rentals });
} 

module.exports = { 
    fasilitatorController,
}