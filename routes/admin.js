const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/controllers/admin/adminController');
const categoryController = require('app/controllers/admin/categoryController');







// admin routes
router.get( "/",adminController.index);


// Category Routes
router.get('/categories' , categoryController.index);
router.get('/categories/create' , categoryController.create);
router.post('/categories/store' , categoryController.store );
// router.get('/categories/:id/edit' , categoryController.edit);
// router.put('/categories/:id' , categoryValidator.handle() , categoryController.update );
router.delete('/categories/:id' , categoryController.destroy);







module.exports = router;