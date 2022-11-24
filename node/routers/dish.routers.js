const Router = require('express');
const router = new Router();
const dishController = require('../controller/dish.controller');

router.post('/dishes', dishController.createDish);
router.get('/dishes', dishController.getDishes);


module.exports = router;
