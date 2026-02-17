import express from "express"
import cors from "cors"

const app = express();

app.use(express.json())
app.use(cors({origin: "https://mern-blog-project-lhxp.vercel.app"}))

import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js"

app.use("/api/v1/user", userRouter)
app.use("/api/v1/post", postRouter)


/*
app.get('/health', (req, res) => {
    res.status(200).json(
        {
            "success": true,
            "message": "Heart is healthy"
        }
    )
})
*/
export { app }