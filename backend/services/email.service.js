const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = async ({ to, subject, templateName, variables = {} }) => {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
    let html = fs.readFileSync(templatePath, 'utf-8');

    Object.entries(variables).forEach(([key, val]) => {
      html = html.replaceAll(`{{${key}}}`, val ?? '');
    });

    html = html
      .replaceAll('{{APP_NAME}}', process.env.APP_NAME || 'NGO Connect WebApp')
      .replaceAll('{{APP_URL}}',  process.env.APP_URL  || 'https://ngo-connect-webapp.vercel.app')
      .replaceAll('{{YEAR}}',     new Date().getFullYear());

    await transporter.sendMail({
      from: `"${process.env.APP_NAME || 'NGO Connect'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`Email sent → ${to} [${templateName}]`);
 } catch (err) {
  console.error('EMAIL ERROR FULL:', err); // ← change this line, log full error not just message
}
};

module.exports = { sendEmail };