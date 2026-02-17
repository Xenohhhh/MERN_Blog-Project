import connectDB from "./db/index.js";
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
import { app } from "./app.js";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, "../.env") })

const PORT = process.env.PORT || 8000

connectDB()
.then(() => {
        app.listen(PORT, () => {
            console.log(`Server running at ${PORT}`)
        })
    }
)
