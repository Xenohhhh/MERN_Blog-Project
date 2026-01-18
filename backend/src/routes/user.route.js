import { Router } from "express";
import { registerUser, loginUser } from "../controller/user.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";


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


export default router;