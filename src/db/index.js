import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";



const connectDB = async () => {
    try {
        const hostInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MongoDb connected! Host: ${hostInstance.connection.host}`)
    } catch (error) {
        console.log(`Connection failed: ${error.message}`)
        process.exit(1);
    }

}

export default connectDB;