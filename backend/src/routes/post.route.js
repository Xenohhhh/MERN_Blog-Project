import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, getAllDrafts, publishPost } from "../controller/post.controller.js";

const router = Router();


router.route("/draft").post(verifyJWT, createPost)
router.route("/mydrafts").get(verifyJWT, getAllDrafts)
router.route("/posts/publish/:id").patch(verifyJWT, publishPost)


export default router;