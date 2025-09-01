const express = require('express');
const router = express.Router();
const {handleRenderLogout} = require('../controllers/render')
router.route('/').get(handleRenderLogout);

module.exports = router;