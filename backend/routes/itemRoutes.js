const express = require('express');
const router = express.Router();
const {
  getItems,
  addItem,
  deleteItem,
  searchItems,
} = require('../controllers/itemController');


router.get('/search', searchItems);

router.route('/').get(getItems).post(addItem);
router.route('/:id').delete(deleteItem);

module.exports = router;