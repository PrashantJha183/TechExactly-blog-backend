import Comment from "../models/Comment.model.js";
import Post from "../models/Post.model.js";

export const createComment = async (content, postId, userId) => {
  const post = await Post.findById(postId);
  if (!post) throw new Error("Post not found");

  const comment = await Comment.create({
    content,
    post: postId,
    author: userId,
  });

  //  Populate author so frontend always gets name
  await comment.populate("author", "name");

  return comment;
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

  //  Populate again after update
  await comment.populate("author", "name");

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
