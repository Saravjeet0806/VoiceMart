const express = require('express');
const router = express.Router();
const {
  getHistorySuggestions,
  getSeasonalSuggestions,
  getSubstituteSuggestion,
} = require('../controllers/suggestionController');

router.get('/history', getHistorySuggestions);
router.get('/seasonal', getSeasonalSuggestions);
router.get('/substitute/:itemName', getSubstituteSuggestion);

module.exports = router;