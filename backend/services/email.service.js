const nodemailer = require('nodemailer');
const fs         = require('fs');
const path       = require('path');

const transporter = nodemailer.createTransport({
  host:   'smtp-relay.brevo.com',
  port:   587,
  secure: false,
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

// Verify SMTP connection on server start
transporter.verify((error, success) => {
  if (error) {
    console.error('❌ SMTP connection failed:', error.message);
  } else {
    console.log('✅ SMTP server is ready to send emails');
  }
});

const sendEmail = async ({ to, subject, templateName, variables = {} }) => {
  try {
    const templatePath = path.join(__dirname, '..', 'templates', `${templateName}.html`);
    let html = fs.readFileSync(templatePath, 'utf-8');

    Object.entries(variables).forEach(([key, val]) => {
      html = html.replaceAll(`{{${key}}}`, val ?? '');
    });

    html = html
      .replaceAll('{{APP_NAME}}', process.env.APP_NAME || 'NGO Connect')
      .replaceAll('{{APP_URL}}',  process.env.APP_URL  || 'https://ngo-connect-webapp.vercel.app')
      .replaceAll('{{YEAR}}',     new Date().getFullYear());

    await transporter.sendMail({
      from:    `"${process.env.APP_NAME || 'NGO Connect'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent → ${to} [${templateName}]`);
  } catch (err) {
    console.error(`❌ Email failed → ${to} [${templateName}]`);
    console.error('Error code    :', err.code);
    console.error('Error message :', err.message);
    console.error('Full error    :', err);
  }
};

module.exports = { sendEmail };