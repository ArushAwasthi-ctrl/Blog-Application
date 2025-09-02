const Comment = require("../models/comment");

async function handleRenderComment(req, res) {
    if (!req.body || !req.body.content) {
        return res.status(400).redirect('/');
    }

    try {
        const newComment = await Comment.create({
            content: req.body.content,
            blogId: req.params.blogId,
            createdBy: req.user._id
        });
        
        console.log("Comment created:", newComment);
        res.redirect(`/blog/${req.params.blogId}`);
    } catch (error) {
        console.error("Error creating comment:", error);
        res.redirect('/');
    }
}

module.exports = { handleRenderComment };
