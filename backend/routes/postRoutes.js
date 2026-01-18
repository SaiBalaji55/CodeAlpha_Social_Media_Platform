const router = require("express").Router();
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const auth = require("../middleware/authMiddleware");

// Create post
router.post("/", auth, async (req, res) => {
  const post = await Post.create({
    user: req.user,
    content: req.body.content
  });
  res.json(post);
});

// Like post
router.post("/like/:id", auth, async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.user)) {
    post.likes.push(req.user);
  } else {
    post.likes.pull(req.user);
  }
  await post.save();
  res.json(post);
});

// Comment
router.post("/comment/:id", auth, async (req, res) => {
  const comment = await Comment.create({
    post: req.params.id,
    user: req.user,
    text: req.body.text
  });
  res.json(comment);
});

module.exports = router;
