const router = require("express").Router();
const validateToken = require("./verifyToken");
const Post = require("../model/Post");
const { validatePost } = require("../validation/validate");

router.get("/", validateToken, async (req, res) => {
  const data = await Post.find();
  res.send(data);
});

router.get("/:id", validateToken, async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  if (!post) {
    return res.send("No such post was found");
  }
  res.send(post);
});

router.post("/", validateToken, async (req, res) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    title: req.body.title,
    description: req.body.description,
  });

  const postedPost = await post.save();
  res.send(postedPost._id);
});

router.delete("/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    if (id == null) return res.status(400).send('Provide an ID for deleting');

    const deleted = await Post.deleteOne({_id: id});

    if (!deleted) return res.status(400).send('No item was deleted');

    res.status(200).json({post: { _id: id, message: 'Deleted'}})
})

module.exports = router;
