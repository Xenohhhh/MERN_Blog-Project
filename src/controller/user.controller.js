import {User} from "../model/user.model.js"
import bcrypt from "bcrypt"

const registerUser = async(req, res) => {
    try{
        // Take the required fields
        // validation for username, email
        // password shouldn't be empty 
        // Hash the password before being saved if modified
        const {username, email, password} = req.body;

        if(![username, email, password].every(f => f?.trim())){
            return res.status(400)
            .json({success: false, message:"All fields are required"})
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if(existedUser){
            return res.status(409)
            .json({success: false, message:"Either email or username exists already."});
        }
        const hashPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            username,
            email,
            passwordHash: hashPassword
        })

        

        if(!user){
            return res.status(500)
            .json({success: false, message:"Something went wrong while registering the user."})
        }
        return res.status(201)
        .json({
            "success": true,
            "message": `Welcome, ${username}`
        })

    }catch(error){
        console.log(`Error in register: ${error.message}`)
    }
}

export {registerUser}