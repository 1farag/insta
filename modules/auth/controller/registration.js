const userModel = require("../../../DB/model/User");
const sendEmail = require("../../../servieces/sendEmail");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const signup =async (req,res)=>{

try {
    const { userName, email, gender, password, age } = req.body;
    const newUser =  new userModel({ userName, email, gender, password, age })
    const saveUser = await newUser.save();
    const token = jwt.sign({id:saveUser._id},process.env.emailToken,{expiresIn:'1h'})
    const url = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
    const url2 = `${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${saveUser._id}`
    await sendEmail(saveUser.email,
        `<a href='${url}'> plz follow me to confirm u account</a>
        <br>
        <a href='${url2}'>re-send confirmationEmail</a></a>
        `);
    res.status(201).json({ message: "Done check u email" });
} catch (error) {
    if (error.keyValue?.email) {
        res.status(409).json({ message: "email exist" })
    } else {
        res.status(500).json({ message: "catch error", error })
        console.log(error);
    }
}
}
const refreshEmail = async (req,res)=>{
   const id= req.params.id
   try {
    const user = await userModel.findById(id).select('confirmEmail email')
   if (!user) {
    res.status(404).json({ message: "in-valid account" })
   } else {
    if (user.confirmEmail) {
        res.status(400).json({ message: "already confirmed" })
    } else {
        const token = jwt.sign({id:user._id},process.env.emailToken,{expiresIn:2 * 60})
        const url = `${req.protocol}://${req.headers.host}/api/v1/auth/confirmEmail/${token}`
        const url2 = `${req.protocol}://${req.headers.host}/api/v1/auth/refreshEmail/${user._id}`
        const message =  `<a href='${url}'> plz follow me to confirm u account</a>
        <br>
        <a href='${url2}'>re-send confirmationEmail</a></a>
        `
        await sendEmail(user.email,message);
    }
   }
   } catch (error) {
    console.log(error);
   }
}
const confirmEmail = async (req,res)=>{
    const {token} = req.params;
    try {
        if (!token||token == null || token == undefined) {
            res.status(403).json({message:"In-valid email token"})
        } else {
            const decoded = jwt.verify(token,process.env.emailToken)
            if (!decoded) {
                res.status(403).json({message:"In-valid decoded token"})
            } else {
                const findUser = await userModel.findById(decoded.id).select('confirmEmail')
                if (!findUser) {
                    res.status(400).json({message:"In-valid acount"})
                } else {
                    if (findUser.confirmEmail) {
                        res.status(400).json({message:"acount already confirmed plz login"})
                    } else {
                        await userModel.updateOne({_id:findUser._id},{confirmEmail:true},{new:true})
                        res.status(200).json({message:"confirmed success plz login"})
                    }
                }
            }
        }
    } catch (error) {
        
    }
}
const login = async (req,res)=>{
    const {email, password} = req.body;
try {
    const user = await userModel.findOne({email})
    if (!user) {
        res.status(400).json({message:'in-valid email'})
    } else {
        if (!user.confirmEmail) {
            res.status(400).json({message:'plz comfirm ur email'})
        }
        const match = await bcrypt.compare(password,user.password)

        if (!match) {
            res.status(400).json({ message: "email password misMatch" })
            } else {
                const token = jwt.sign({ id: user._id, isLoggedIn: true },
                    process.env.secretToken, { expiresIn: '24h' })
                    await userModel.findOneAndUpdate({_id:user._id} , {online:true})
                res.status(200).json({ message: "login success", token })
        }
    }
} catch (error) {
    res.json({msg: 'catch error',error})
    console.log(error);
}
}
const sendCode = async (req,res)=>{
    const {email} = req.body;
    
    try {
        const user = await userModel.findOne({email})
    if(!user){
        res.status(404).json({message:"in-valid email"})
    }else{
        const code = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000) //4589
        await userModel.findByIdAndUpdate(user._id , {code})
        const message = `<p>use this code to update u password : ${code}</p>`
        sendEmail(email,message)
        res.status(200).json({ message: "Done" })
    }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })   
        console.log(error);

    }
}

const forgetPassword = async (req,res)=>{
    try {
        const {code, email, newPassword} = req.body;
        const user = await userModel.findOne({email})
        if (!user) {
            res.status(404).json({message:'in-valid'})
        } else {
            if (user.code != code) {
                res.status(400).json({ message: "In-valid auth code" })
            } else {
                const hashPassword = await bcrypt.hash(newPassword,parseInt(process.env.saltRound))
                await userModel.findByIdAndUpdate(user._id, {password : hashPassword,code:""})
                res.status(200).json({ message: "Done"})
            }
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })   
        console.log(error);

    }
}

module.exports = {
    signup,confirmEmail,
    login,refreshEmail,
    sendCode,forgetPassword}