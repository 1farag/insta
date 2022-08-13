const postModel = require("../../../DB/model/Post")
const commentModel = require("../../../DB/model/Comment")



const createComment = async (req,res)=>{

    const {id} =  req.params;
    const {text} = req.body;
    const {_id} = req.user ;
    try {
        const post = await postModel.findOne({_id: id })
    if (!post) {
        res.status(404).json({message:"post not found"})
    } else {
        const newComment = new commentModel({text,postId:post._id,createdBy:_id})
        const savedComment =await newComment.save();
        const dddd = await postModel.findByIdAndUpdate(post._id, { $push: { comments: savedComment._id }},{new:true})

        res.status(200).json({ message: "Done",dddd })

    }
    } catch (error) {
        res.status(400).json({message:"catch error",error})
    }
}
const replyOnComment = async (req,res)=>{

    const {id,comentID} =  req.params;
    const {text} = req.body;
    const {_id} = req.user ;
    try {
        const post = await postModel.findOne({_id: id })
        if (!post) {
            res.status(404).json({message:"post not found"})
        } else {
            const comment = await commentModel.findOne({_id: comentID })
            if (!comment) {
                res.status(404).json({message:"comment not found"})
        }else{
           const newComment = new commentModel({text,createdBy:_id,postId:post._id,})
           const savedComment = await newComment.save()
            await commentModel.findByIdAndUpdate(comment._id,{push:{reply: savedComment._id}})
            res.status(200).json({ message: "Done" })


        }
    }
    } catch (error) {
        res.status(400).json({message:"catch error",error})
    }

}


const likeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $push: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}

const unlikeComment = async (req, res) => {
    await commentModel.findByIdAndUpdate(req.params.id, { $pull: { likes: req.user._id } })
    res.status(200).json({ message: "Done" })
}


module.exports =
 {createComment,replyOnComment,
    likeComment,unlikeComment}