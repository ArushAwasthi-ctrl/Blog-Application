const express = require('express');
const router = express.Router();
const {handleRenderSignIn} = require('../controllers/render');
router.route('/').get(handleRenderSignIn);




module.exports =router;