import express from "express"
import cors from "cors"

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)

allowedOrigins.push("http://localhost:5173")

const corsOptions = {
    origin(origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            return callback(null, true)
        }

        return callback(new Error("CORS origin not allowed"))
    }
}

app.use(express.json())
app.use(cors(corsOptions))

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
