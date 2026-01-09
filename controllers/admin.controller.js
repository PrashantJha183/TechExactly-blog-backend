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

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Delete User (ADMIN ONLY)
========================= */
export const deleteUserByAdmin = async (req, res, next) => {
  try {
    console.log("Admin delete user:", req.params.id);

    // Prevent admin deleting themselves
    if (req.user.id === req.params.id) {
      return res.status(400).json({
        success: false,
        message: "Admin cannot delete their own account",
      });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Optional cleanup (recommended)
    await Post.updateMany(
      { author: user._id },
      { isDeleted: true, deletedAt: new Date() }
    );

    await Comment.deleteMany({ author: user._id });

    await user.deleteOne();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
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
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
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

/* =========================
   Get All Comments (ADMIN)
========================= */
export const getAllComments = async (req, res, next) => {
  try {
    const comments = await Comment.find()
      .populate("author", "name email")
      .populate("post", "title")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   Delete Comment (ADMIN)
========================= */
export const deleteCommentByAdmin = async (req, res, next) => {
  try {
    console.log("Admin deleting comment:", req.params.id);

    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      success: true,
      message: "Comment deleted by admin",
    });
  } catch (error) {
    next(error);
  }
};
