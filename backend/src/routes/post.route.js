import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, getAllDrafts, getPublishedPosts, publishPost } from "../controller/post.controller.js";

const router = Router();


router.route("/draft").post(verifyJWT, createPost)
router.route("/mydrafts").get(verifyJWT, getAllDrafts)
router.route("/").get(getPublishedPosts)
router.route("/posts/publish/:id").patch(verifyJWT, publishPost)


export default router;