import Post from "../models/Post.model.js";

/* =========================
   Create Post
========================= */
export const createPost = async (data, userId) => {
  return Post.create({
    ...data,
    author: userId,
  });
};

/* =========================
   Get All Posts (Pagination)
========================= */
export const getPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const posts = await Post.find({ isDeleted: false })
    .populate("author", "name email")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Post.countDocuments({ isDeleted: false });

  return { posts, total };
};

/* =========================
   Get Single Post
========================= */
export const getPostById = async (id) => {
  return Post.findOne({ _id: id, isDeleted: false }).populate(
    "author",
    "name email"
  );
};

/* =========================
   Update Post (PUT / PATCH)
========================= */
export const updatePost = async (postId, user, updates) => {
  // Find post
  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // Ownership check
  if (post.author.toString() !== user.id) {
    throw new Error("You are not allowed to update this post");
  }

  // Update ONLY provided fields
  Object.keys(updates).forEach((key) => {
    post[key] = updates[key];
  });

  // Save updated post
  await post.save();

  return post;
};

/* =========================
   Soft Delete Post
========================= */
export const deletePost = async (postId, user) => {
  const post = await Post.findById(postId);

  if (!post || post.isDeleted) throw new Error("Post not found");

  if (post.author.toString() !== user.id && user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  post.isDeleted = true;
  post.deletedAt = new Date();

  return post.save();
};
