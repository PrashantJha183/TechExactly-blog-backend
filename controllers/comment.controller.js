import * as commentService from "../services/comment.service.js";

export const createComment = async (req, res, next) => {
  try {
    const { content, postId } = req.body;
    const comment = await commentService.createComment(
      content,
      postId,
      req.user.id
    );
    res.status(201).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

export const getCommentsByPost = async (req, res, next) => {
  try {
    const comments = await commentService.getCommentsByPost(req.params.postId);
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

export const getMyComments = async (req, res, next) => {
  try {
    console.log("HIT getMyComments controller"); // 👈 TEMP LOG
    const comments = await commentService.getMyComments(req.user.id);
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

export const updateComment = async (req, res, next) => {
  try {
    const comment = await commentService.updateComment(
      req.params.id,
      req.user,
      req.body.content
    );
    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
    await commentService.deleteComment(req.params.id, req.user);
    res.status(200).json({ success: true, message: "Comment deleted" });
  } catch (err) {
    next(err);
  }
};
