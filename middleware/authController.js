const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    jwt.verify(token, 'shhh', async (err, decoded) => {
        if(err){
            if(err.name === "TokenExpiredError"){
                res.clearCookie("token");
                return res.redirect('/login');
            }

            res.redirect('/login');
        }
    });
    next();
}

module.exports = { 
    authMiddleware,
}