import { Post } from "../model/post.model.js";

export const createPost = async (req, res) => {
    // Take title and content as fields
    // Validation for both
    // Check for title length to be at least 3
    // create draft
    // return draft

    try {
        const { title, content } = req.body

        if (!(title) || (!content)) {
            return res.status(400).json({
                success: false,
                message: "Title and content are required"
            })
        }

        if (title.length < 3) {
            return res.status(400).json({
                success: false,
                message: "Title must be at least 3 characters long"
            })
        }

        const draft = await Post.create({
            title,
            content,
            author: req.user.userId,
        })
        return res.status(201).json({
            success: true,
            message: "Draft created successfully",
            post: draft,
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Failed to create draft",
        })
    }


}