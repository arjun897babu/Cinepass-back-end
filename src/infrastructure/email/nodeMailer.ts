import nodemailer from 'nodemailer'
import { config } from '../../config/envConfig'

//nodemailer transported
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.app.email,
    pass: config.app.password
  }
});

const sendMail = async (email: string, OTP: string) => {
  try {
    let info = await transporter.sendMail({
      from: 'CINEPASS',
      to: email,
      subject: ' CINEPASS OTP VERIFICATION ',
      html: `<html>
        <head>
          <style>
            body {
              font-family: 'Arial', sans-serif;
              background-color: #f4f4f4;
              color: #333;
              margin: 0;
              padding: 0;
            }
            h1 {
              color: #007bff;
            }
            p {
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <h1>Please confirm your OTP</h1>
          <p>Dear Cinepass customer,</p>
          <p>Here is your OTP code for verification: <strong>${OTP}</strong></p>
          <p>This OTP is required to complete your verification process.</p>
        </body>
      </html>`,
    });
    console.log('email info : ', info.accepted)
  } catch (error) {
    throw error
  }
};

export {
  sendMail
}