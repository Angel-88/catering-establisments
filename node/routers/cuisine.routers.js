const Router = require('express');
const router = new Router();
const cuisineController = require('../controller/cuisine.controller');

router.post('/cuisines', cuisineController.createCuisine);
router.get('/cuisines', cuisineController.getCuisines);


module.exports = router;
