const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../../config/db');
const usersSchema = require('../../../models/usersSchema');

let action;

const usersController = async (req, res) => {
    try {
        const userLevel = req.userLevel;
        const port = process.env.PORT || '7777';

        if(userLevel){
            if(userLevel.toLowerCase() !== 'superuser'){
                return res.redirect(`/${userLevel.toLowerCase()}`);
            }   
        }  

        const query = await sequelize.query('SELECT * FROM `tb_users`', {
            type: QueryTypes.SELECT,
        });

        if(action === 'error'){
            action = null;
            res.render('service/superuser/users.ejs', { path: req.path, data: query, success: `<script>alert("form tidak boleh kosong!")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }

        if(action === 'add'){
            action = null;
            res.render('service/superuser/users.ejs', { path: req.path, data: query, success: `<script>alert("User berhasil ditambahkan.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }

        if(action === 'update'){
            action = null;
            res.render('service/superuser/users.ejs', { path: req.path, data: query, success: `<script>alert("User berhasil diedit.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }

        if(action === 'delete'){
            action = null;
            res.render('service/superuser/users.ejs', { path: req.path, data: query, success: `<script>alert("User berhasil dihapus.")</script>`, uri: `${req.protocol}://${req.hostname}:${port}`,
            title: 'Orbit Mifi Rent | Superuser' });
        }

        res.render('service/superuser/users.ejs', { path: req.path, data: query, success: '', uri: `${req.protocol}://${req.hostname}:${port}`,
        title: 'Orbit Mifi Rent | Superuser' })
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!'});
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

        sequelize
            .sync()
            .then(() => {
                action = 'update';
                return res.redirect('/superuser/users');
            })
            .catch((error) => {
                console.log(error);
                return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
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

        sequelize
            .sync()
            .then(() => {
                action = 'delete';
                return res.redirect('/superuser/users');
            })
            .catch((error) => {
                console.log(error);
                res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
            });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}


const addUserController = async (req, res) => {
    try {
        const body = req.body;

        console.log(body)

        if(body.username === '' || body.password === ''){
            action = 'error';
            return res.redirect('/superuser/users');
        }

        const saltRounds = 10;

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, async function(err, hash) {
                if(err){
                    return res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
                }

                await usersSchema.create({
                    id: '',
                    username: body.username,
                    password: hash,
                    user_level: body.user_level
                });

                sequelize
                .sync()
                .then(() => {
                    action = 'add';
                    return res.redirect('/superuser/users');
                })
                .catch((error) => {
                    console.log(error);
                    res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
                });
            });
        });
    } catch (error) {
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

const searchUsersController = async (req, res) => {
    try {

        const body = req.body;

        const searchQuery = await sequelize.query('SELECT * FROM `tb_users` WHERE username LIKE :search OR user_level LIKE :search', {
            type: QueryTypes.SELECT,
            replacements: { search: `${body.search}%` },
        });

        res.json({ searchQuery });
    } catch (error) {
        console.log(error);
        res.render('error.ejs', { title: 'Internal Server Error', status: 500, msg: 'Silahkan hubungi administrator!' });
    }
}

module.exports = {
    usersController,
    updateUserController,
    deleteUserController,
    addUserController,
    searchUsersController,
}