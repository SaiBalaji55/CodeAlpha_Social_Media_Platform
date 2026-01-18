const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.post("/follow/:id", auth, async (req, res) => {
  const user = await User.findById(req.user);
  const target = await User.findById(req.params.id);

  if (!user.following.includes(target._id)) {
    user.following.push(target._id);
    target.followers.push(user._id);
  } else {
    user.following.pull(target._id);
    target.followers.pull(user._id);
  }

  await user.save();
  await target.save();
  res.json({ message: "Follow updated" });
});

module.exports = router;
