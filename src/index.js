import connectDB from "./db/index.js";
import dotenv from "dotenv"
import { app } from "./app.js";

dotenv.config()

connectDB()
.then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Server running at ${process.env.PORT}`)
        })
    }
)