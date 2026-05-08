import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import API from '../api';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export default function VerifyOtp() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const email      = location.state?.email;

  const [otp, setOtp]             = useState(['', '', '', '', '', '']);
  const [error, setError]         = useState('');
  const [loading, setLoading]     = useState(false);
  const [success, setSuccess]     = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMsg, setResendMsg] = useState('');
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (!email) navigate('/register');
  }, [email, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === 'Backspace' && !otp[i] && i > 0)
      inputRefs.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      setOtp(pasted.split(''));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const code = otp.join('');
    if (code.length < 6) { setError('Please enter the complete 6-digit code.'); return; }
    setLoading(true); setError('');
    try {
      const res = await API.post('/api/auth/verify-otp', { email, otp: code });
      login(res.data.token, res.data.name);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      setError(err.response?.data?.message || 'Verification failed. Please try again.');
    } finally { setLoading(false); }
  };

  const handleResend = async () => {
    setResending(true); setResendMsg(''); setError('');
    try {
      await API.post('/api/auth/resend-otp', { email });
      setResendMsg('A new code has been sent to your email.');
      setCountdown(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to resend. Please try again.');
    } finally { setResending(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      <div className="flex justify-center pt-6 px-4">
        <div className="w-full max-w-sm">
          <Link to="/register" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 transition-colors">
            <Icon name="arrow-left" size={15} />
            Back to Register
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12 pt-6">
        <div className="w-full max-w-sm">

          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
              <Icon name="mail-check" size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Check your email</h1>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              We sent a 6-digit code to<br />
              <span className="font-semibold text-gray-700">{email}</span>
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

            {success ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <Icon name="circle-check" size={36} className="text-green-600" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-1">You're all set!</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Email verified successfully.<br />Redirecting you to home…
                </p>
                <div className="w-full bg-gray-100 rounded-full h-1 overflow-hidden">
                  <div
                    className="h-1 bg-green-500 rounded-full"
                    style={{ animation: 'progress 2.5s linear forwards' }}
                  />
                </div>
                <style>{`
                  @keyframes progress {
                    from { width: 0%; }
                    to   { width: 100%; }
                  }
                `}</style>
              </div>
            ) : (
              <>
                {error && (
                  <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 border border-red-100">
                    <Icon name="circle-alert" size={14} className="flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                )}

                {resendMsg && (
                  <div className="flex items-start gap-2 bg-green-50 text-green-700 text-sm px-4 py-3 rounded-xl mb-5 border border-green-100">
                    <Icon name="circle-check" size={14} className="flex-shrink-0 mt-0.5" />
                    {resendMsg}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="flex gap-2 justify-center mb-6" onPaste={handlePaste}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={el => inputRefs.current[i] = el}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleChange(i, e.target.value)}
                        onKeyDown={e => handleKeyDown(i, e)}
                        className={`w-11 h-12 text-center text-xl font-bold border rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent
                          ${digit ? 'border-green-400 bg-green-50 text-green-700' : 'border-gray-200 text-gray-900'}`}
                      />
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all mb-4"
                  >
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Verifying…</>
                      : <><Icon name="shield-check" size={15} />Verify Email</>
                    }
                  </button>
                </form>

                <div className="text-center">
                  {countdown > 0 ? (
                    <p className="text-sm text-gray-400">
                      Resend code in <span className="font-semibold text-gray-600">{countdown}s</span>
                    </p>
                  ) : (
                    <button
                      onClick={handleResend}
                      disabled={resending}
                      className="text-sm text-green-600 font-semibold hover:underline disabled:opacity-50"
                    >
                      {resending ? 'Sending…' : 'Resend code'}
                    </button>
                  )}
                </div>
              </>
            )}

          </div>

          {!success && (
            <p className="text-center text-xs text-gray-400 mt-4">
              Wrong email?{' '}
              <Link to="/register" className="text-green-600 font-semibold hover:underline">Go back</Link>
            </p>
          )}

        </div>
      </div>
    </div>
  );
}