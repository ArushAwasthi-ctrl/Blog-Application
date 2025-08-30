const express = require('express');
const router = express.Router();
const {handleRenderSignUp} = require('../controllers/render');
router.route('/').get(handleRenderSignUp);

module.exports =router;