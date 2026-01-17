import jwt from "jsonwebtoken"

export const verifyJWT = (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")

        if (!token){
            return res.status(401).json({success: false, message: "Unauthorized request"})
        }

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message:
                error.name === "TokenExpiredError"
                    ? "Access token expired"
                    : "Invalid access token"
        })
    }

}