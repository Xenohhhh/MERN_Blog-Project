import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, deletePost, editPost, getAllDrafts, getPublishedPosts, getSinglePost, publishPost } from "../controller/post.controller.js";

const router = Router();


router.route("/draft").post(verifyJWT, createPost)
router.route("/mydrafts").get(verifyJWT, getAllDrafts)
router.route("/posts/publish/:id").patch(verifyJWT, publishPost)
router.route("/").get(getPublishedPosts)
router.route("/:id").get(getSinglePost)
router.route("/:id").patch(verifyJWT, editPost)
router.route("/:id").delete(verifyJWT, deletePost)

export default router;