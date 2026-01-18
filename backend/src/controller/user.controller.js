import { User } from "../model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const generateAccessTokens = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            role: user.role,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    )
}
const generateRefreshTokens = (user) => {
    return jwt.sign(
        {
            _id: user._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    )
}


const registerUser = async (req, res) => {
    try {
        // Take the required fields
        // check for empty fields
        // password shouldn't be empty 
        // Hash the password before being saved if modified
        const { username, email, password } = req.body;

        if (![username, email, password].every(f => f?.trim())) {
            return res.status(400)
                .json({ success: false, message: "All fields are required" })
        }

        const existedUser = await User.findOne({
            $or: [{ email }, { username }]
        })

        if (existedUser) {
            return res.status(409)
                .json({ success: false, message: "Either email or username exists already." });
        }
        const hashPassword = await bcrypt.hash(password, 10)


        const user = await User.create({
            username,
            email,
            password: hashPassword
        })


        if (!user) {
            return res.status(500)
                .json({ success: false, message: "Something went wrong while registering the user." })
        }
        return res.status(201)
            .json({
                "success": true,
                "message": `Welcome, ${username}`
            })

    } catch (error) {
        console.log(`Error in register: ${error.message}`)
    }
}

const loginUser = async (req, res) => {
    // Take fields
    // validation email/username
    // check password
    // generate access, refresh token

    try {
        const { identifier, password } = req.body

        if (!(password && (identifier))) {
            return res.status(400)
                .json({ success: false, message: "Either email or username is required" })
        }

        const isEmail = identifier.includes("@")
        
        const user = await User.findOne(
            isEmail?{email:identifier}:{username: identifier}
        )

        if (!user) {
            return res.status(401)
                .json({ success: false, message: "User not found." })
        }


        const validPassword = await bcrypt.compare(password, user.password)

        if (!validPassword) {
            return res.status(401)
                .json({ success: false, message: "Invalid password." })
        }

        const accessToken =  generateAccessTokens(user)
        //const refreshToken =  generateRefreshTokens(user)
       

        return res.status(200).json({
            message: "Login successful",
            accessToken
        });
    }
    catch (error) {
        return res.status(500).json({ message: `${error.message}` });
    }
}

export { registerUser, loginUser }