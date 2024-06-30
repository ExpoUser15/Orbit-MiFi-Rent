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
    });
    next();
}

module.exports = { 
    authMiddleware,
}