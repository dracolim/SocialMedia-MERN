import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
        } ,
        firstName: {
            type: String,
            required: true,
        } ,
        lastName: {
            type: String,
            required: true,
        },
        location: String,
        description: String,
        picturePath: String,
        userPicturePath: String,
        likes: {
            type: Map,
            of: Boolean, /* check if userId EXISTS, if yes, then it is true => if do not like it, remove */
        },
        comments: {
            type: Array,
            default: [],
        }
    },
    {timestamps: true} // automatically create 
);

const Post = mongoose.model("Post" , postSchema);
export default Post ; 