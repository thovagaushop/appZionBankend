const userController = require('../../controllers/users/userController');
const jwt = require('../../jwt/jwt');
const router = require('express').Router();

router.get('/bytoken', jwt.authenWithJwt, userController.getUserByToken);

module.exports = router;