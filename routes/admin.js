const express = require('express');
const router = express.Router();

// Controllers
const adminController = require('app/controllers/admin/adminController');
const categoryController = require('app/controllers/admin/categoryController');
const brandController = require('app/controllers/admin/brandController');
const carController = require('app/controllers/admin/carController');


const upload = require('utils/uploadImage');
const convertFileToField = require('utils/convertFileToField');








// admin routes
router.get( "/",adminController.index);


// Category Routes
router.get('/categories' , categoryController.index);
router.get('/categories/create' , categoryController.create);
router.post('/categories/store' , categoryController.store );
router.get('/categories/:id/edit' , categoryController.edit);
router.put('/categories/:id' , categoryController.update );
router.delete('/categories/:id' , categoryController.destroy);



// brands Routes
router.get('/brands' , brandController.index);
router.get('/brands/create' , brandController.create);
router.post('/brands/store' ,upload.single('logo'),convertFileToField.handle, brandController.store );
router.get('/brands/:id/edit' , brandController.edit);
router.put('/brands/:id' ,upload.single('logo') , convertFileToField.handle, brandController.update );
router.delete('/brands/:id' , brandController.destroy);


// cars Routes
router.get('/cars' , carController.index);
router.get('/cars/create' , carController.create);
router.post('/cars/store' ,upload.single('image'),convertFileToField.handle, carController.store );
// router.get('/brands/:id/edit' , brandController.edit);
// router.put('/brands/:id' ,upload.single('logo') , convertFileToField.handle, brandController.update );
// router.delete('/brands/:id' , brandController.destroy);






module.exports = router;