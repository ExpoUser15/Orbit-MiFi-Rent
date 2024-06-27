const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err){
            if(err.name === "TokenExpiredError"){
                res.cookie('tokenExpired', true);
            }

            if(req.path !== '/login'){
                return res.redirect('/login');
            }
        }

            req.userLevel = decoded?.userLevel;

        // if(decoded.userLevel.toLowerCase() !== 'superuser'){
        //     return res.redirect('/superuser');
        // }
        // if(decoded.userLevel.toLowerCase() !== 'penyedia'){
        //     return res.redirect('/penyedia');
        // }
        // if(decoded.userLevel.toLowerCase() !== 'fasilitator'){
        //     return res.redirect('/fasilitator');
        // }
        // console.log(decoded.userLevel.toLowerCase());
        // console.log(decoded.userLevel.toLowerCase().includes('superuser'));
    });
    next();
}

module.exports = { 
    authMiddleware,
}