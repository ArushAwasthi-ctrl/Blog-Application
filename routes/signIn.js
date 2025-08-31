const express = require('express');
const router = express.Router();
const {handleRenderSignIn} = require('../controllers/render');
const {handlePostSignIn} = require('../controllers/signin')
router.route('/')
.get(handleRenderSignIn)
.post(handlePostSignIn);




module.exports =router;