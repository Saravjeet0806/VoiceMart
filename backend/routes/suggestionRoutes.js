import express from 'express';
import {
  getHistorySuggestions,
  getSeasonalSuggestions,
  getSubstituteSuggestion,
} from '../controllers/suggestionController.js';

const router = express.Router();

router.get('/history', getHistorySuggestions);
router.get('/seasonal', getSeasonalSuggestions);
router.get('/substitute/:itemName', getSubstituteSuggestion);

export default router;
