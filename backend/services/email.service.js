const axios  = require('axios');
const fs     = require('fs');
const path   = require('path');

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

    await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender:      { name: process.env.APP_NAME || 'NGO Connect', email: process.env.EMAIL_USER },
        to:          [{ email: to }],
        subject,
        htmlContent: html,
      },
      {
        headers: {
          'api-key':     process.env.BREVO_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log(`✅ Email sent → ${to} [${templateName}]`);
  } catch (err) {
    console.error(`❌ Email failed → ${to} [${templateName}]`);
    console.error('Error code    :', err.code);
    console.error('Error message :', err.response?.data || err.message);
  }
};

module.exports = { sendEmail };