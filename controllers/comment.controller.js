import * as commentService from "../services/comment.service.js";

/* =========================
   NORMALIZER (IMPORTANT)
   Ensures frontend ALWAYS
   receives `user` object
========================= */
const normalizeComment = (comment) => ({
  _id: comment._id,
  content: comment.content,
  post: comment.post,
  createdAt: comment.createdAt,
  updatedAt: comment.updatedAt,
  user: comment.author
    ? {
        _id: comment.author._id,
        name: comment.author.name,
      }
    : null,
});

/* =========================
   Create Comment
========================= */
export const createComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;

    const comment = await commentService.createComment(
      content,
      postId,
      req.user.id
    );

    res.status(201).json({
      success: true,
      data: normalizeComment(comment),
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   Get Comments by Post
========================= */
export const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postId);

    res.status(200).json({
      success: true,
      data: comments.map(normalizeComment),
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   Get My Comments
========================= */
export const getMyComments = async (req, res, next) => {
  try {
    const comments = await commentService.getMyComments(req.user.id);

    res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   Update Comment
========================= */
export const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(
      req.params.id,
      req.user,
      req.body.content
    );

    res.status(200).json({
      success: true,
      data: normalizeComment(comment),
    });
  } catch (err) {
    next(err);
  }
};

/* =========================
   Delete Comment
========================= */
export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user);

    res.status(200).json({
      success: true,
      message: "Comment deleted",
    });
  } catch (err) {
    next(err);
  }
};
