const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauces');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

// vérification de la requête avant son enregistrement 
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.post('/', auth, multer, sauceCtrl.createSauce);
router.get('/', auth, sauceCtrl.getAllSauces);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);

module.exports = router; 