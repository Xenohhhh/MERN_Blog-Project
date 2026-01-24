import { Post } from "../model/post.model.js";
import mongoose from "mongoose";

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
            author: req.user._id,
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

export const getAllDrafts = async (req, res) => {
    // Get id from req.user._id
    // Filter post by author and status draft

    try {
        const userId = req.user._id

        const drafts = await Post.find({
            author: userId,
            status: "draft"
        }).sort({ updatedAt: -1 })

        return res.status(200).json({
            success: true,
            drafts
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch drafts",
        })
    }
}

export const publishPost = async (req, res) => {
    // Take postid, userid
    // Search for postid
    // validation for post, author, status
    // change the post status to published
    // save the post


    try {
        const postId = req.params.id
        const userId = req.user._id

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (!post.author.equals(userId)) {
            return res.status(403).json({
                success: false,
                message: "Not authorized to publish this post",
            })
        }

        if (post.status !== "draft") {
            return res.status(400).json({
                success: false,
                message: "Only draft posts can be published",
            })
        }

        post.status = "published"
        await post.save()

        return res.status(200).json({
            success: true,
            message: "Post published successfully",
        })
    } catch (error) {
        console.error("PUBLISH ERROR:", error)
        return res.status(500).json({
            success: false,
            message: "Failed to publish post",
        })
    }
}

export const getPublishedPosts = async (req, res) => {
    try {
        const post = await Post.find({ status: "published" }).sort({ createdAt: -1 })


        console.log(post)

        return res.status(200).json({
            success: true,
            "posts": post
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch posts.",
        })
    }
}

export const getSinglePost = async (req, res) => {
    try {
        const postId = req.params.id

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found",
            })
        }

        if (post.status !== "published") {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            })
        }

        return res.status(200).json({
            success: true,
            "post": post
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch the post.",
        })
    }

}