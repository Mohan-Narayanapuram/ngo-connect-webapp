const User          = require('../models/User');
const jwt           = require('jsonwebtoken');
const bcrypt        = require('bcryptjs');
const crypto        = require('crypto');
const { sendEmail } = require('../services/email.service');

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

const generateOTP = () =>
  crypto.randomInt(100000, 999999).toString();

// ── POST /api/auth/register ───────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required.' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const existing = await User.findOne({ email: email.toLowerCase() });

    if (existing && existing.isVerified)
      return res.status(409).json({ message: 'An account with this email already exists.' });

    const otp          = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);
    const hashed       = await bcrypt.hash(password, 10);

    if (existing && !existing.isVerified) {
      existing.name         = name;
      existing.password     = hashed;
      existing.otp          = otp;
      existing.otpExpiresAt = otpExpiresAt;
      await existing.save();
    } else {
      await User.create({
        name,
        email:        email.toLowerCase(),
        password:     hashed,
        isVerified:   false,
        otp,
        otpExpiresAt,
      });
    }

    await sendEmail({
      to:           email.toLowerCase(),
      subject:      'Your NGO Connect verification code',
      templateName: 'otpVerification',
      variables:    { name, otp },
    });

    res.status(200).json({ message: 'OTP sent to your email.', email: email.toLowerCase() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
};

// ── POST /api/auth/verify-otp ─────────────────────────────────────
exports.verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: 'Email and OTP are required.' });

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res.status(404).json({ message: 'No account found with this email.' });

    if (user.isVerified)
      return res.status(400).json({ message: 'Email is already verified.' });

    if (!user.otp || user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP. Please check and try again.' });

    if (new Date() > user.otpExpiresAt)
      return res.status(400).json({ message: 'OTP has expired. Please register again.' });

    user.isVerified   = true;
    user.otp          = null;
    user.otpExpiresAt = null;
    await user.save();

    await sendEmail({
      to:           user.email,
      subject:      'Welcome to NGO Connect',
      templateName: 'welcome',
      variables:    { name: user.name },
    });

    res.status(200).json({
      token: generateToken(user._id),
      name:  user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Verification failed. Please try again.' });
  }
};

// ── POST /api/auth/resend-otp ─────────────────────────────────────
exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res.status(404).json({ message: 'No account found with this email.' });

    if (user.isVerified)
      return res.status(400).json({ message: 'Email is already verified.' });

    const otp          = generateOTP();
    const otpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp          = otp;
    user.otpExpiresAt = otpExpiresAt;
    await user.save();

    await sendEmail({
      to:           user.email,
      subject:      'Your new NGO Connect verification code',
      templateName: 'otpVerification',
      variables:    { name: user.name, otp },
    });

    res.status(200).json({ message: 'New OTP sent to your email.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to resend OTP. Please try again.' });
  }
};

// ── POST /api/auth/login ──────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user)
      return res.status(401).json({ message: 'No account found with this email.' });

    if (!user.isVerified)
      return res.status(403).json({ message: 'EMAIL_NOT_VERIFIED', email: user.email });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ message: 'Incorrect password. Please try again.' });

    await sendEmail({
      to:           user.email,
      subject:      'New sign-in to your NGO Connect account',
      templateName: 'loginAlert',
      variables: {
        name:   user.name,
        time:   new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        device: req.headers['user-agent'] || 'Unknown device',
      },
    });

    res.json({
      token: generateToken(user._id),
      name:  user.name,
      email: user.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
};

// ── POST /api/auth/forgot-password ────────────────────────────────
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: 'Email is required.' });

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always respond with success — don't reveal if email exists
    if (!user || !user.isVerified) {
      return res.status(200).json({ message: 'If this email exists, a reset code has been sent.' });
    }

    const otp               = generateOTP();
    const resetOtpExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.resetOtp          = otp;
    user.resetOtpExpiresAt = resetOtpExpiresAt;
    await user.save();

    await sendEmail({
      to:           user.email,
      subject:      'Reset your NGO Connect password',
      templateName: 'passwordReset',
      variables:    { name: user.name, otp },
    });

    res.status(200).json({ message: 'If this email exists, a reset code has been sent.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send reset code. Please try again.' });
  }
};

// ── POST /api/auth/reset-password ─────────────────────────────────
exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword)
      return res.status(400).json({ message: 'All fields are required.' });

    if (newPassword.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user)
      return res.status(404).json({ message: 'No account found with this email.' });

    if (!user.resetOtp || user.resetOtp !== otp)
      return res.status(400).json({ message: 'Invalid code. Please check and try again.' });

    if (new Date() > user.resetOtpExpiresAt)
      return res.status(400).json({ message: 'Code has expired. Please request a new one.' });

    user.password          = await bcrypt.hash(newPassword, 10);
    user.resetOtp          = null;
    user.resetOtpExpiresAt = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to reset password. Please try again.' });
  }
};