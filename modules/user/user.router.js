const express = require("express");
const { auth } = require("../../middlwear/auth");
const path = require('path')

const validation = require("../../middlwear/validation");
const  profileController  = require("./controller/profile");
const endPoint = require("./user.endPoint");
const validators = require("./user.validation")
const {myMulter, fileValidation, HME} = require("../../servieces/multer")
const router = express.Router();

// router.use('/uploads', express.static(path.join(__dirname, '../../uploads')))


router.get('/profile',validation(validators.displayProfile),
auth(endPoint.displayprofile),profileController.displayProfile)

router.get('/profile/qr',validation(validators.displayProfile),
auth(endPoint.displayprofile),profileController.qr)


router.patch('/profile/pic',
    myMulter('user/profile/pic',fileValidation.image).single('image'),
    auth(endPoint.displayprofile),profileController.profilePIc)

router.patch('/profile/covPic',
    myMulter('user/profile/cover',fileValidation.image).array('image',5),HME,
    auth(endPoint.displayprofile),profileController.coverPIC)


module.exports = router