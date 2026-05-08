const { sendEmail } = require('../services/email.service');

exports.submitContact = async (req, res) => {
try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message)
    return res.status(400).json({ message: 'Name, email and message are required.' });

    // To admin
    await sendEmail({
    to:           process.env.ADMIN_EMAIL,
    subject:      `Contact Form: ${subject || 'No subject'}`,
    templateName: 'contactAdmin',
    variables: {
        senderName:  name,
        senderEmail: email,
        subject:     subject || 'No subject',
        message,
    },
    });

    // Acknowledgment to user
    await sendEmail({
    to:           email,
    subject:      'We received your message — NGOConnect',
    templateName: 'contactAck',
    variables:    { name },
    });

    res.status(200).json({ message: 'Message sent successfully.' });
} catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ message: 'Failed to send message.' });
}
};