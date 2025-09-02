const express = require('express');
const router = express.Router();
const {handleRenderHome , handleRenderBlog , handleRenderDynamicBlog} = require('../controllers/render')
const {handlePostBlogReq, upload} = require('../controllers/blog');
router.route('/').get(handleRenderHome);
router.route('/add-new')
.get(handleRenderBlog)
.post(upload.single('coverImage'),handlePostBlogReq);

router.route('/blog/:id').get(handleRenderDynamicBlog);        

module.exports =router;