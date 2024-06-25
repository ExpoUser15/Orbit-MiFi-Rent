const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.cookies;

    console.log(token);

    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
        if(err){
            if(err.name === "TokenExpiredError"){
                res.clearCookie("token");
                return res.redirect('/login');
            }

            console.log(err)
            return res.redirect('/login');
        }
    });
    next();
}

module.exports = { 
    authMiddleware,
}