const express = require('express');
const groupReportController = require('../../controllers/pastoralWork/groupReportController');
const jwt = require('../../jwt/jwt');
const router = express.Router();

// router.get('/groupReport', jwt.authenWithJwt, groupReportController.listReport);
// router.post('/groupReport', jwt.authenWithJwt, groupReportController.insertReport);

router.get('/groupReport', jwt.authenWithJwt, groupReportController.listReport);
router.post('/groupReport', jwt.authenWithJwt, groupReportController.insertReport);

module.exports = router;