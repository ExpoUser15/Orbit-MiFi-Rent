const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/db');

let success = true;

const loginController = (req, res) => {
    try {
        const tokenExpired = req.cookies.tokenExpired;

        if(tokenExpired){
            res.clearCookie('token');
            res.clearCookie('tokenExpired');
            return res.render('service/login.ejs', { tokenExpired: true, success: true });
        }

        res.render('service/login.ejs', { tokenExpired: false, success });
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { 
            status: '500', 
            title: 'Internal Server Error', 
            msg: 'Please contact the administrator.' 
        });
    }
}

const loginPostController = async (req, res) => {
    const { username, password } = req.body;

    console.log(username, password);

    const users = await sequelize.query('SELECT * FROM `tb_users` WHERE username = :username', {
        type: QueryTypes.SELECT,
        replacements: { 
            username
         }
    });

    bcrypt.compare(password, users[0].password, function(err, result) {
        if (err) {
            // Tangani error bcrypt.compare
            console.error(err);
            return res.status(500).send('Internal Server Error');
        }
    
        if (!result) {
            success = false;
            return res.redirect('/login');
        }

        const token = jwt.sign({ userLevel: users[0].user_level }, process.env.SECRET_KEY, { expiresIn: '1d' });
        res.cookie("token", token, { httpOnly: true, secure: true }); 

        success = true;

        if (users[0].user_level === 'PENYEDIA') {
            return res.redirect('/penyedia');
        } else if (users[0].user_level === 'FASILITATOR') {
            return res.redirect('/fasilitator');
        } else if (users[0].user_level === 'SUPERUSER') {
            return res.redirect('/superuser');
        } else {
            return res.redirect('/login');
    }
    });
}

const logout = (req, res) => {
    try {
        res.clearCookie("token");
        res.redirect('/login'); 
    } catch (error) {
        console.log(error)
        res.render('error.ejs', { 
            status: '500', 
            title: 'Internal Server Error', 
            msg: 'Please contact the administrator.' 
        });
    }
}

module.exports = {
    loginController,
    loginPostController,
    logout
}