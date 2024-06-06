const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const usersSchema = require('../../models/usersSchema');

let success = true;

const loginController = (req, res) => {
    try {
        if(success){
            if(req.cookies.token){
                res.redirect('/penyedia');
            }
    
            res.render('service/login.ejs', { success });
        }else{
            success = true
            res.render('service/login.ejs', { success: false })
        }
    } catch (error) {
        res.render('error.ejs', { 
            code: '500', 
            msg: 'Internal Server Error, Please contact the administrator.', 
            status: 'Error' 
        });
    }
}

const loginPostController = async (req, res) => {
    const { username, password, rememberMe } = req.body;

    const users = await usersSchema.findOne({ where: {
            username: {
                [Op.eq]: username
            },
            password: {
                [Op.eq]: password
        }}
    });

    const getUsers = users.get({ plain: true });

    if(!users){
        success = false;
        return res.redirect('/login')
    }

    const token = jwt.sign({password}, "shhh", { expiresIn: '5m' });
    res.cookie("token", token);

    success = true;
    
    // if(getUsers.user_level === 'PENYEDIA'){
    //     res.redirect('/penyedia');
    // }else if(getUsers.user_level === 'FASILITATOR'){
    //     res.redirect('/fasilitator');
    // }else if(getUsers.user_level === 'SUPERUSER'){
    //     res.redirect('/superuser');
    // }else{
    //     res.redirect('/login');
    // }
}

const logout = (req, res) => {
    console.log(req.cookies.token);
    res.clearCookie("token");
    res.redirect('/login');
}

module.exports = {
    loginController,
    loginPostController,
    logout
}