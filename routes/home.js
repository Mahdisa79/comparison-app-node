const express = require('express');
const router = express.Router();


// Controllers
const homeController = require('app/controllers/home/homeController');


router.use((req , res , next) => {
    res.locals.layout = "home/layouts/masterLayout";
    next();
})

// home routes
router.get( "/",homeController.index);


module.exports = router;