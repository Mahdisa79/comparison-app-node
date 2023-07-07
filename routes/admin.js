const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/controllers/admin/adminController');







router.get( "/",adminController.index);






module.exports = router;