import { Router } from "express";

const router = Router();


router.route("/draft").post(verifyJWT, createPost)
router.route("/mydrafts").get(verifyJWT, getAllDrafts)
router.patch("/posts/publish/:id", verifyJWT, publishPost)


export default router;