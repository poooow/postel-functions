import * as logger from "firebase-functions/logger"
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env.NODEMAILER_HOST,
  secure: false,
  port: process.env.NODEMAILER_PORT,
  auth: {
    user: process.env.NODEMAILER_SMTP_USER,
    pass: process.env.NODEMAILER_SMTP_PASS
  }
})

interface Email {
  body: {
    subject: string
    text: string
    html: string
  }
  to: string
}

export default function sendEmail(email: Email) {
  const msg = {
    to: email.to,
    from: process.env.NODEMAILER_EMAIL_FROM,
    subject: email.body.subject,
    text: email.body.text,
    html: email.body.html
  }

  transporter.sendMail(msg).then(() => {
    logger.info("Email sent", { structuredData: true })
  }).catch((error: any) => {
    logger.info(error.toString(), { structuredData: true })
  })
}