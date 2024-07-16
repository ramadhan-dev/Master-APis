require('dotenv').config();
const nodemailer = require('nodemailer');

const SendEmailUtility= async (EmailTo, EmailText) => {


        //transporter
        let transporter = await nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 465, false for other ports //587,
            auth: {
                user: 'fikriramadhan002@gmail.com',
                pass: 'namakurama'
            },
        })

	
	
        let mailOptions = {
            from: `fikriramadhan002@gmail.com`, //sender email address//smtp-username
            to: EmailTo, //receiver email address
            subject: "Diagnostics Center",
            html: `<p>Your Verification Code is: <span style="font-size: 16px; font-weight: bold;">${EmailText}</span>
                The code will expire in 10 minutes.</p>`
        };


	    return await transporter.sendMail(mailOptions);

}
module.exports=SendEmailUtility
