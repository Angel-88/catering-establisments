const Router = require('express');
const router = new Router();
const phoneController = require('../controller/phone.controller');

router.post('/phones', phoneController.createPhone);
router.get('/phones', phoneController.getPhones);


module.exports = router;
