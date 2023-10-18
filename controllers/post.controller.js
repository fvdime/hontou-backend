import Post from '../models/post.model.js'
import createError from '../utils/createError.js'

export const createPost = async (req, res, next) => {
  const newPost = new Post({
    userId: req.userId,
    ...req.body
  })
  try {
    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
  } catch (error) {
    next(error)
  }
}

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId !== req.userId) return next(createError(403, "You can delete just your post!")) 

    await Post.findByIdAndDelete(req.params.id)
    res.status(200).send("Post has been deleted!")
  } catch (error) {
    next(error)
  }
}

export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)

    if(!post) return next(createError(404), "Post does not exists!")

    res.status(200).send(post)
  } catch (error) {
    next(error)
  }
}

export const getPosts = async (req, res, next) => {

  const q = req.query;

  const filters = {
    ...(q.userId && {userId: q.userId}),
    ...(q.categories && {categories: q.categories}),
    ...(q.search && { title: {$regex: q.search, $options: 'i'}})
  }

  try {
    const posts = await Post.find(filters)

    res.status(200).send(posts).sort({ createdAt: -1 })
  } catch (error) {
    next(error)
  }
}
