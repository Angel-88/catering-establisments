const Router = require('express');
const router = new Router();
const establishmentController = require('../controller/establishment.controller');

router.post('/establishments', establishmentController.createEstablishment);
router.get('/establishments', establishmentController.getEstablishments);
router.get('/establishments/:id', establishmentController.getEstablishment);


module.exports = router;
