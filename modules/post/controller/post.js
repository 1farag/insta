const postModel = require("../../../DB/model/Post");
const commentModel = require("../../../DB/model/Comment")


const createPost = async( req, res )=>{
    const {text} = req.body;
    try {
        if (req.fileErr) {
            res.status(400).json({message:"in-valid format"})
        } else {
            const imageURL = []
            req.files.forEach(file => {
                imageURL.push(`${req.finalDestination}/${file.filename}`)
            });
            const newPost = await new postModel({text, image:imageURL , createdBy : req.user._id}) 
            const savedPost = await newPost.save();
            res.status(200).json({message:"Done",savedPost})
        }
    } catch (error) {
        res.status(400).json({message:"catch error"})
        console.log(error);
    }
}
const likePost = async (req, res) => {
   try {
    await postModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
   } catch (error) {
    res.status(400).json({message:"catch err",error})
    console.log(error);
   }
}
const unLikePost = async (req, res) => {
    await postModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}


module.exports = {createPost,likePost,unLikePost,}