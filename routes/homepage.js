const express = require('express');
const router = express.Router();
const {handleRenderHome, handleRenderBlog, handleRenderDynamicBlog} = require('../controllers/render');
const {handlePostBlogReq, upload} = require('../controllers/blog');
const {handleRenderComment} = require('../controllers/comment');
router.route('/').get(handleRenderHome);
router.route('/add-new')
.get(handleRenderBlog)
.post(upload.single('coverImage'),handlePostBlogReq);

router.route('/blog/:id').get(handleRenderDynamicBlog);   

router.route('/comment/:blogId').post(handleRenderComment);

module.exports =router;