const sequelize = require('../../config/db');
const { QueryTypes } = require('sequelize');
const rentalSchema = require('../../models/rentalSchema');
const { finishDate, formattedDate } = require('../../utils/date');

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
    const planMatching = req.params.plan;

    const planIdregex = /P0[1-8]/;
    const planIdTest = planIdregex.test(planMatching);
    
    if(!planIdTest){
        return res.redirect('/penyedia');
    }

    const plan = await sequelize.query('SELECT time FROM `tb_plan` WHERE plan_id = :planMatching', {
        replacements: {
            planMatching
        },
        type: QueryTypes.SELECT,
    });

    const planTime = plan[0].time.split(' ')[0];
    const finishTime = finishDate(planTime);
    const startTime = formattedDate();

    if(params === 'In Progress'){
        const query = await sequelize.query('SELECT * FROM tb_rentals WHERE id = :id', {
            type: QueryTypes.SELECT,
            replacements:{ id: req.params.id}
        });

        if(query[0].bak === ''){
            res.cookie('success', 'empty');

            if(req.path.includes('superuser/monitoring')){
                res.redirect('/superuser/monitoring');
            }

            if(req.path.includes('penyedia')){
                res.redirect('/penyedia');
            }
        }else{
            await rentalSchema.update(
                { 
                    status: 'Rented',
                    startAt: startTime,
                    finishAt: finishTime
                },
                    {
                    where: {
                        id: req.params.id,
                    },
                },
            );
        }

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

                console.log(req.path)

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