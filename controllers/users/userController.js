const userModel = require('../../models/user/userModel');

const listUser = async(req, res, next) => {
    // todo
}

const getUserByToken = async (req, res, next) => {
    const user = req.user;
    res.json({status: "success", user: user});
}

module.exports = {
    getUserByToken
}