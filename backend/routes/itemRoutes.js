import express from 'express';
import {
  getItems,
  addItem,
  deleteItem,
  searchItems,
} from '../controllers/itemController.js';

const router = express.Router();

router.get('/search', searchItems);

router.route('/')
  .get(getItems)
  .post(addItem);

router.route('/:id')
  .delete(deleteItem);

export default router;
