const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    const userId = req.user.id;
    const { content } = req.body;
    const image = req.file ? req.file.filename : null;
  
    try {
      const post = await Post.create({ content, image, userId });
      res.status(201).json(post);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { content, image } = req.body;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    // Optionnel : vérifier que req.user.id === post.userId
    if (post.userId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.content = content || post.content;
    post.image = image || post.image;

    await post.save();
    res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.destroy();
    res.status(200).json({ message: "Post deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.reportPost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findByPk(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.reported = true;
      await post.save();
  
      res.status(200).json({ message: "Post reported successfully" });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.getReportedPosts = async (req, res) => {
    try {
      const posts = await Post.findAll({
        where: { reported: true },
        order: [['createdAt', 'DESC']]
      });
      res.status(200).json(posts);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.unreportPost = async (req, res) => {
    const { postId } = req.params;
  
    try {
      const post = await Post.findByPk(postId);
      if (!post) return res.status(404).json({ message: "Post not found" });
  
      post.reported = false;
      await post.save();
  
      res.status(200).json({ message: "Post unreported successfully" });
  
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  
  
