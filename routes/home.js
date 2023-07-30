const express = require('express');
const router = express.Router();


// Controllers
const homeController = require('app/controllers/home/homeController');
const CompareController = require('app/controllers/home/CompareController');



router.use((req , res , next) => {
    res.locals.layout = "home/layouts/masterLayout";
    next();
})

// home routes
router.get( "/",homeController.index);

router.get('/compare-list', CompareController.compareList);
router.get('/add-to-compare-list/:id',CompareController.addToCompareList);
router.get('/remove-from-compare-list/:id',CompareController.removeFromCompareList)

module.exports = router;