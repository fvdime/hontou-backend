import express from 'express'
import { verifyToken } from "../middlewares/jwt.js";

import { deletePost, getPosts, getPost, createPost  } from "../controllers/post.controller.js";

const router = express.Router()

router.post("/", verifyToken, createPost)
router.delete("/:id", verifyToken, deletePost)
router.get("/single/:id", getPost)
router.get("/", getPosts)


export default router