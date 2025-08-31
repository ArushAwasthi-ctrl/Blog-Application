const express = require('express');
const router = express.Router();
const {handleRenderSignUp} = require('../controllers/render');
const {handlePostSignUp} = require('../controllers/signup');
router.route('/')
.get(handleRenderSignUp)
.post(handlePostSignUp);

module.exports =router;