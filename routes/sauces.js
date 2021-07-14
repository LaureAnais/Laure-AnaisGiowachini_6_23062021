const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

// problème créer controllers/sauces
const saucesCtrl = require('../controllers/sauces');

// Revoir les routes car sauces.js et non stuff.js
router.get('/', auth, saucesCtrl.getAllSauces);
router.post('/', auth, saucesCtrl.createSauce);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);

module.exports = router;