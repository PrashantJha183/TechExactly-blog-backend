import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";

export const createComment = async (content, postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  return Comment.create({
    content,
    post: postId,
    author: userId,
  });
};

export const getCommentsByPost = async (postId) => {
  return Comment.find({ post: postId })
    .populate("author", "name")
    .sort({ createdAt: -1 });
};

export const getMyComments = async (userId) => {
  return Comment.find({ author: userId })
    .populate("post", "title slug")
    .sort({ createdAt: -1 });
};

export const updateComment = async (commentId, user, content) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  if (comment.author.toString() !== user.id && user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  comment.content = content;
  await comment.save();
  return comment;
};

export const deleteComment = async (commentId, user) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  if (comment.author.toString() !== user.id && user.role !== "ADMIN") {
    throw new Error("Not authorized");
  }

  await comment.deleteOne();
};
