const express = require('express');
const router = express.Router();
const {handleRenderHome , handleRenderBlog} = require('../controllers/render')
const {handlePostBlogReq, upload} = require('../controllers/blog');
router.route('/').get(handleRenderHome);
router.route('/add-new')
.get(handleRenderBlog)
.post(upload.single('coverImage'),handlePostBlogReq);

        

module.exports =router;