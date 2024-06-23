const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../../config/db');
const usersSchema = require('../../../models/usersSchema');

const usersController = async (req, res) => {
    try {
        const query = await sequelize.query('SELECT * FROM `tb_users`', {
            type: QueryTypes.SELECT,
        });

        res.render('service/superuser/users.ejs', { path: req.path, data: query })
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const updateUserController = async (req, res) => {
    try {
        await usersSchema.update(
            { user_level: req.body.user_level, username: req.body.username },
                {
                where: {
                    id: req.body.id,
                },
            },
        );

        res.redirect('/superuser/users');
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const deleteUserController = async (req, res) => {
    try {
        await usersSchema.destroy({
            where: {
                id: req.params.id,
            },
        });

        res.redirect('/superuser/users');
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}


const addUserController = async (req, res) => {
    try {
        const body = req.body;

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                // Store hash in your password DB.
                if(err){
                    return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
                }

                await usersSchema.create({
                    id: '',
                    username: body.username,
                    password: hash,
                    user_level: body.user_level
                });
            });
        });
        
        console.log(req.body)

        res.redirect('/superuser/users');
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}
module.exports = {
    usersController,
    updateUserController,
    deleteUserController,
    addUserController,
}