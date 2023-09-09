const nodeMailer = require('nodemailer');
const SMPT_MAIL = "raheelmughal018@gmail.com";
const SMPT_PASSWORD = "ronaldoCr7";
const SMPT_SERVICE = "gmail"

const sendEmail = async (options)=>{
    let transporter=nodeMailer.createTransport({
        service:SMPT_SERVICE,
        auth:{
            user: SMPT_MAIL,
            pass:SMPT_PASSWORD
        }

    })
    const mailOptions = {
        from:SMPT_MAIL, // sender address
        to: options.email,
        subject: options.subject,
        text:options.message

    }
    await transporter.sendMail(mailOptions)
}

module.exports = sendEmail