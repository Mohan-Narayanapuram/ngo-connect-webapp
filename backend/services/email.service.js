const { Resend } = require('resend');
const fs   = require('fs');
const path = require('path');

const resend = new Resend(process.env.RESEND_API_KEY);

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

    await resend.emails.send({
      from: 'NGO Connect <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    console.log(`✅ Email sent → ${to} [${templateName}]`);
  } catch (err) {
    console.error('EMAIL ERROR FULL:', err);
  }
};

module.exports = { sendEmail };