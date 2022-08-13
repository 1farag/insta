const Joi = require("joi");

const createPost = {
    body:Joi.object().required().keys({
        text:Joi.string()
    })
}
const likePost = {

    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}
const createComment = {

    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required()
    })
}

const replyOnComment = {
    body: Joi.object().required().keys({
        text: Joi.string().required(),
    
    }),
    params:Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
        comentID:Joi.string().min(24).max(24).required(),
    })
}
module.exports = {createPost,likePost,createComment,replyOnComment}