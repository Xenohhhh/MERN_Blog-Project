import { Router } from "express";
import { registerUser, loginUser, avatarUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";



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
router.route("/avatar").patch(verifyJWT, upload.single("avatar"), avatarUser)




export default router;