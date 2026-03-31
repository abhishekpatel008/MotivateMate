const express = require('express');
const router = express.Router();
const { getShopItems, purchaseItem, getUserInventory }  = require('../controllers/shopController');
const { protect } = require('../middleware/auth');

router.use(protect);
router.get('/items', getShopItems);
router.post('/purchase', purchaseItem);
router.get('/inventory', getUserInventory);

module.exports = router;