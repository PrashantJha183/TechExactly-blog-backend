import * as postService from "../services/post.service.js";

export const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body, req.user.id);
    res.status(201).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const { page, limit } = req.query;
    const data = await postService.getPosts(page, limit);
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id);
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.user,
      req.body
    );
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    await postService.deletePost(req.params.id, req.user);
    res.status(200).json({ success: true, message: "Post deleted" });
  } catch (error) {
    next(error);
  }
};
