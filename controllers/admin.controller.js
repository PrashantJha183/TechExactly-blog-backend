import User from "../models/User.model.js";
import Post from "../models/Post.model.js";
import Comment from "../models/Comment.model.js";

/* =========================
   Dashboard Stats
========================= */
export const getDashboardStats = async (req, res, next) => {
  try {
    const usersCount = await User.countDocuments();
    const postsCount = await Post.countDocuments({ isDeleted: false });
    const commentsCount = await Comment.countDocuments({ isDeleted: false });

    res.status(200).json({
      success: true,
      data: {
        users: usersCount,
        posts: postsCount,
        comments: commentsCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Get All Users
========================= */
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Delete Any Post (Admin)
========================= */
export const deletePostByAdmin = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.isDeleted = true;
    post.deletedAt = new Date();
    await post.save();

    res.status(200).json({
      success: true,
      message: "Post deleted by admin",
    });
  } catch (error) {
    next(error);
  }
};
