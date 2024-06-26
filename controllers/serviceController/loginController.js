const jwt = require('jsonwebtoken');
const { QueryTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../../config/db');

let success = true;

const loginController = (req, res) => {
    try {
        const tokenExpired = req.cookies.tokenExpired;
        const token = req.cookies.token;

        if(token){
            jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
                if(err){
                    return;
                }
                return res.redirect(`/${decoded.userLevel.toLowerCase()}`);
            });
        }

        if(tokenExpired){
            res.clearCookie('token');
            res.clearCookie('tokenExpired');
            return res.render('service/login.ejs', { tokenExpired: true, success: true });
        }

        if(!success){
            console.log(success)
            return res.render('service/login.ejs', { tokenExpired: false, success });
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

    if(!username || !password){
        success = false;
        return res.redirect('/login');
    }

    const users = await sequelize.query('SELECT * FROM `tb_users` WHERE username = :username', {
        type: QueryTypes.SELECT,
        replacements: { 
            username,
            password
         }
    });

    console.log(users)
    if(!users[0]){
        success = false;
        return res.redirect('/login');
    }

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