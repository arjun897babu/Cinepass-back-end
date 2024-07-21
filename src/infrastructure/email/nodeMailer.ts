import nodemailer from 'nodemailer'
import { config } from '../../config/envConfig'


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.app.email,
    pass: config.app.password
  }
});

const sendMail = async (email: string, action: string, template: string) => {
  try {
    let info = await transporter.sendMail({
      from: 'CINEPASS',
      to: email,
      subject: action,
      html: template,
    });

  } catch (error) {
    throw error
  }
};

const resetPasswordTemplate = (buttonUrl: string) => {
  return `<!DOCTYPE html>
  <html>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
          <div style="padding: 20px;">
            <h2 style="text-align: center; color: #1a1b3a;">Please reset your password</h2>
            <p>Hello,</p>
            <p>We have sent you this email in response to your request to reset your password on our website.</p>
            <p>To reset your password, please follow the link below:</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${buttonUrl}" target="_blank" style="display: inline-block; background-color: #1a1b3a; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
            </div>
            <p style="text-align: left;">
              If you are unable to click the above button, copy and paste the below Link
            </p>
            <a href="${buttonUrl}" target="_blank">
              <p style="margin: 0px; text-align: left; font-size: 10px; text-decoration: none; color: #1a1b3a;">
                ${buttonUrl}
              </p>
            </a>
            <small>Please ignore this email if you did not request a password change.</small>
          </div>
        </div>
      </body>
    </html>`;
};

const OTPTemplate = (OTP: string) => {
  return `<html>
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
      </html>`
}



export {
  sendMail,
  OTPTemplate,
  resetPasswordTemplate
}