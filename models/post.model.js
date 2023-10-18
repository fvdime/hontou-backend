import mongoose from 'mongoose'
const {Schema} = mongoose

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true
  },
  about: {
    type: String,
    required: true
  },
  postPic: {
    type: String,
    required: false
  }, 
  categories: {
    type: Array,
    required:false
  }
}, {timestamps: true})

export default mongoose.model("Post", postSchema)