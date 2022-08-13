const nodeoutlook = require('nodejs-nodemailer-outlook');

async function sendEmail(dest,message) {
    try {
    nodeoutlook.sendEmail({
        auth: {
            user: process.env.senderMail,
            pass: process.env.mailPass
        },
        from:process.env.senderMail,
        to: dest ,
        subject: 'Hey you, awesome!',
        html: message,
        text: 'This is text version!',
    
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
}


);
    } catch (err) {
        console.log(`catch err ${err}`);

    }
}

module.exports = sendEmail











// const nodemailer = require("nodemailer");

// async function main() {
//     // Generate test SMTP service account from ethereal.email
//     // Only needed if you don't have a real mail account for testing
//     let testAccount = await nodemailer.createTestAccount();
  
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//       host: "smtp.ethereal.email",
//       port: 587,
//       secure: false, // true for 465, false for other ports
//       auth: {
//         user: process.env.senderMail, // generated ethereal user
//         pass: process.env.mailPass, // generated ethereal password
//       },
//     });
  
//     // send mail with defined transport object
//     let info = await transporter.sendMail({
//       from: '"Fred Foo 👻" <foo@example.com>', // sender address
//       to: "bar@example.com, baz@example.com", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>", // html body
//     });
// }