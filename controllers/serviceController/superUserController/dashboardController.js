const sequelize = require("../../../config/db");
const { QueryTypes } = require('sequelize');
const { getDatesOfLastWeek } = require("../../../utils/date");

let success;

const dashboardController = async (req, res) => {

    const testimonialData = await sequelize.query('SELECT * FROM `tb_testimonials` ORDER BY createdAt DESC LIMIT 4', {
        type: QueryTypes.SELECT,
    });

    const locations = await sequelize.query('SELECT location FROM `tb_locations`', {
        type: QueryTypes.SELECT,
    });

    if(success){
        success = false;
        return res.render('service/superuser/dashboard.ejs', { path: req.path, data: { testimonialData, locations }, success });
    }

    res.render('service/superuser/dashboard.ejs', { path: req.path, data: { testimonialData, locations },  success: false });
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

const chartController = async (req, res) => {

    if(req.path === '/superuser/chart/api/last-week-reports'){
        const dateArr = [];
        let datesOfLastWeek = getDatesOfLastWeek();
        datesOfLastWeek.forEach(date => {
            dateArr.push(date);
        });

        const chart = await sequelize.query('SELECT `finishAt`, COUNT(*) as finish_count FROM `tb_rentals` WHERE `finishAt` IN (:date) GROUP BY `finishAt`', {
            type: QueryTypes.SELECT,
            replacements: { date: dateArr }
        });

        res.json({ chart, rentangWaktu: `${dateArr[0]}/${dateArr[dateArr.length - 1]}`});
    }
    
    if(req.path === '/superuser/chart/api/most-visited'){
        const locations = await sequelize.query('SELECT location FROM `tb_locations`', {
            type: QueryTypes.SELECT,
        });

        const location = locations.map(item => item.location);

        const chart = await sequelize.query("SELECT `destination`, COUNT(*) as visit_count FROM `tb_rentals` WHERE `destination` IN (:location) GROUP BY `destination`", {
            type: QueryTypes.SELECT,
            replacements: { location }
        }); 

        const visitCount = chart.map(item => item.visit_count);
        const destination = chart.map(item => item.destination);

        res.json({ visitCount, destination });
    }

    if(req.path === '/superuser/chart/api/choosen-plan'){
        const rentals = await sequelize.query('SELECT tb_plan.plan FROM `tb_rentals` JOIN `tb_plan` ON tb_plan.plan_id = tb_rentals.plan', {
            type: QueryTypes.SELECT,
        });

        const rental = rentals.map(item => item.plan);

        const chart = await sequelize.query(`
            SELECT tb_plan.*, COUNT(tb_rentals.plan) AS plan_count
            FROM tb_plan
            LEFT JOIN tb_rentals ON tb_plan.plan_id = tb_rentals.plan
            WHERE tb_plan.plan IN (:rental)
            GROUP BY tb_plan.plan_id;
        `, {
            type: QueryTypes.SELECT,
            replacements: { rental }
        });

        const planCounts = chart.map(item => item.plan_count);
        const plan = chart.map(item => item.plan);

        res.json({ planCounts, plan });
    }
}

module.exports = {
    dashboardController,
    addLocationsController,
    chartController,
}