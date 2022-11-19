const Router = require('express');
const router = new Router();
const typeController = require('../controller/type.controller');

router.post('/types', typeController.createType);
router.get('/types', typeController.getTypes);


module.exports = router;
