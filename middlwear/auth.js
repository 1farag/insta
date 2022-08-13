const jwt = require("jsonwebtoken");
const userModel = require("../DB/model/User");
const roles = {
    Admin: "Admin",
    User: 'User',
    HR: 'HR'
}
const auth = (accessRoles)=>{
    return async (req,res,next) =>{
        try {
            const headerToken = req.headers['authorization']
            if (!headerToken || headerToken == null ||
                 headerToken == undefined || !headerToken.startsWith('Bearer ')) {
                    res.status(400).json({ message: "In-valid header Token" })
            } else {

                const token = headerToken.split(" ")[1];

                const decoded = jwt.verify(token,process.env.secretToken)
                if (!decoded || !decoded.isLoggedIn) {
                    res.status(403).json({message: "In-valid  Token" })
                } else {
                    const findUser = await userModel.findOne({_id:decoded.id}).select('role userName email')
                    if (!findUser) {
                        res.status(404).json({ message: "In-valid  account id" })
                    } else {
                        if ([accessRoles].includes(findUser.role)) {
                            res.status(401).json({ message: " Not auth  account" })
    
                        } else {
                            req.user = findUser
                            next()
                        }
                    }
                }
            }
        } catch (error) {
            res.status(500).json({ message: "catch error", error })
            console.log(error);
        }

    }
}

module.exports = {auth,roles}
