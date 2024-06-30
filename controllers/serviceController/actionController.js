const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');
const rentalSchema = require('../../models/rentalSchema');

const searchController = async (req, res) => {
    try {
        const body = req.body;

        let searchQuery;

        if(body.status === 'in-progress'){
            searchQuery = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE (name LIKE :search OR destination LIKE :search) AND status = "In Progress" ORDER BY startAt', {
                type: QueryTypes.SELECT,
                replacements: { search: `${body.search}%` }
            }); 
        }

        if(body.status === 'rented'){
            searchQuery = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE (name LIKE :search OR destination LIKE :search) AND status = "Rented" ORDER BY startAt', {
                type: QueryTypes.SELECT,
                replacements: { search: `${body.search}%` }
            }); 
        }

        if(body.status === 'finished'){
            searchQuery = await sequelize.query('SELECT * FROM `tb_rentals` JOIN tb_stoks ON tb_stoks.modem_id = tb_rentals.modem JOIN tb_plan ON tb_plan.plan_id = tb_rentals.plan WHERE (name LIKE :search OR destination LIKE :search) AND status = "Finished" ORDER BY startAt', {
                type: QueryTypes.SELECT,
                replacements: { search: `${body.search}%` }
            }); 
        }

        res.json({ data: searchQuery });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const statusDeleteController = async (req, res) => {
    try {

        console.log(req.path)
        await rentalSchema.destroy({
            where: {
                id: req.params.id,
            },
        });
    
        sequelize
            .sync()
            .then(() => {

                if(req.path.includes('superuser')){
                    res.redirect('/superuser/monitoring');
                }

                if(req.path.includes('penyedia')){
                    res.redirect('/penyedia');
                }

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

                if(req.path.includes('superuser/monitoring')){
                    res.redirect('/superuser/monitoring');
                }

                if(req.path.includes('penyedia')){
                    res.redirect('/penyedia');
                }
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
                
                if(req.path.includes('superuser/monitoring')){
                    res.redirect('/superuser/monitoring');
                }

                if(req.path.includes('penyedia')){
                    res.redirect('/penyedia');
                }
            })
            .catch((error) => {
                console.error("Error synchronizing models with database:", error);
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    }else{
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

module.exports = { 
    searchController,
    statusUpdateController,
    statusDeleteController,
 }