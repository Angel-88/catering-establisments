const Router = require('express');
const router = new Router();
const serviceController = require('../controller/service.controller');

router.post('/services', serviceController.createService);
router.get('/services', serviceController.getServices);


module.exports = router;
