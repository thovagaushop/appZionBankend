const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_EXPIRE_TIME});
}

const authenWithJwt = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if(token === null) return res.status(401).json({status: 'warning', msg: "Can not find token"});

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({status: 'warning', msg: "You dont have permission"});
        }

        req.user = user
        next();
    })
}

module.exports = {
    generateAccessToken,
    authenWithJwt
}