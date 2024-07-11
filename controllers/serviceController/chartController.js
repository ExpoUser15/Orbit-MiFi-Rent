const sequelize = require("../../config/db");
const { QueryTypes } = require('sequelize');
const { getDatesOfLastWeek } = require("../../utils/date");

const chartController = async (req, res) => {

    try {
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
    
            const chart = await sequelize.query("SELECT `destination`, COUNT(*) as visit_count FROM `tb_rentals` WHERE `destination` IN (:location) AND `status` = 'rented' OR `status` = 'finished' GROUP BY `destination`", {
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
        }else{
            return
        }
    } catch (error) {
        return;
    }
}

module.exports = {
    chartController,
}