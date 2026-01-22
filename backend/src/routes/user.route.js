import { Router } from "express";
import { registerUser, loginUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { createPost, getAllDrafts } from "../controller/post.controller.js";


const router = Router();

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)


//secured routes
router.get("/profile", verifyJWT, (req, res) => {
    return res.json({
        message: "User profile",
        user: req.user
    })
})
router.route("/draft").post(verifyJWT, createPost)
router.route("/mydrafts").get(verifyJWT, getAllDrafts)




export default router;