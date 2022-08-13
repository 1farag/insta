const mongoose = require('mongoose');
const connectDB = ()=>{
    return mongoose.connect(process.env.DBURL).
    then(res=> console.log(`Connected DB on url :::: ${process.env.DBURL}`)).
    catch(err=> console.log('fail to connect'))
}
module.exports = connectDB