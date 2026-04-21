const router = require('express').Router();
const { getAllNgos, getNgoById } = require('../controllers/ngoController');

router.get('/',    getAllNgos);
router.get('/:id', getNgoById);

module.exports = router;
