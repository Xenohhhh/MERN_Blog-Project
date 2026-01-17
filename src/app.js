import express from "express"

const app = express();

app.use(express.json())

import router from "./routes/user.route.js";
app.use("/api/v1/user", router)






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