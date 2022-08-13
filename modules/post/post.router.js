const express = require("express");
const { auth } = require("../../middlwear/auth");
const postController = require("./controller/post");
const commentController = require("./controller/comment");

const endPoint = require("./post.endPoint");
const {myMulter,fileValidation, HME } = require('../../servieces/multer');
const validation = require("../../middlwear/validation");
const validators = require('./post.validation')
const router = express.Router();

router.post("/",auth(endPoint.createPost),myMulter('/post',fileValidation.image)
.array('image',5),HME,validation(validators.createPost),postController.createPost)

router.patch("/:id/like",
    auth(endPoint.createPost),
    validation(validators.likePost),
    postController.likePost)
    
router.patch("/:id/unlike",auth(endPoint.createPost),validation(validators.likePost),postController.unLikePost)


router.patch("/:id/comment",auth(endPoint.createPost),validation(validators.createComment),commentController.createComment)

router.patch("/:id/reply/:comentID",auth(endPoint.createPost),validation(validators.replyOnComment),commentController.replyOnComment)
router.patch("/:id/comLike/:comentID",auth(endPoint.createPost),validation(validators.likePost),commentController.likeComment)
router.patch("/:id/unlike/:comentID",auth(endPoint.createPost),validation(validators.likePost),commentController.unlikeComment)

module.exports = router