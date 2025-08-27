const express = require('express');
const router = express.Router();

router.get('/search', searchItems);

router.route('/').get(getItems).post(addItem);
router.route('/:id').delete(deleteItem);

module.exports = router;