const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'NGO Connect <onboarding@resend.dev>',
      to,
      subject,
      html,
    });

    if (error) {
      console.error(`❌ Email failed → ${to}\n`, error);
      return;
    }

    console.log(`✅ Email sent → ${to} [${subject}]`);
  } catch (err) {
    console.error(`❌ Email error → ${err.message}`);
  }
};

module.exports = sendEmail;