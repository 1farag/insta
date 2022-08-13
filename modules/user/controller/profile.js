const userModel = require("../../../DB/model/User")

const displayProfile = async (req, res) => {
    try {
        const user = await userModel.findById(req.user._id);
        res.status(200).json({ message: "Done", user })
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
        console.log(error);

    }
}


const profilePIc = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        
        } else {
            const imgUrl = `${req.finalDestination}/${req.file.filename}`
            const user = await userModel.findByIdAndUpdate(req.user._id,{profilePic:imgUrl}, { new: true })
            res.status(200).json({ message: "Done" })
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
    }

}

const coverPIC = async (req,res)=>{
    try {
        if (req.fileErr) {
            res.status(400).json({ message: "in-valid format" })
        
        } else {
            const url = []
            req.files.forEach(file => {
                url.push(`${req.finalDestination}/${file.filename}`)
            });
            const user = await userModel.findByIdAndUpdate(req.user._id,{coverPic:url}, { new: true })
            res.status(200).json({ message: "Done" , user})
        }
    } catch (error) {
        res.status(500).json({ message: "catch error", error })
        console.log(error);
    }

}
const QRCode  = require("qrcode")

const qr = async (req,res)=>{
    const user = await userModel.findById(req.user._id).select("userName email phone")
    QRCode.toDataURL(`${user}`,function(err,url){
        if (err) {
            res.status(400).json({ message: "QR err" })
        } else {
            console.log(url)
            res.json({ message: "QR", url })
        }
    })
  


}


module.exports = {displayProfile,profilePIc,coverPIC,qr}