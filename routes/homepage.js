const express = require('express');
const router = express.Router();
const {handleRenderHome} = require('../controllers/render')
router.route('/').get(handleRenderHome);

module.exports =router;