import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await API.post('/api/auth/login', form);
      login(res.data.token, res.data.name);
      setSuccess(true);
      setTimeout(() => navigate('/'), 2500);
    } catch (err) {
      if (err.response?.data?.message === 'EMAIL_NOT_VERIFIED') {
        navigate('/verify-otp', { state: { email: form.email } });
        return;
      }
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col">

      <div className="flex justify-center pt-6 px-4">
        <div className="w-full max-w-sm">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 transition-colors">
            <Icon name="arrow-left" size={15} />
            Back to home
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12 pt-6">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
              <Icon name="heart-handshake" size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-400 mt-1">Sign in to continue donating</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

            {success ? (
              <div className="flex flex-col items-center py-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-5">
                  <Icon name="circle-check" size={36} className="text-green-600" />
                </div>
                <h2 className="text-xl font-black text-gray-900 mb-1">Welcome back!</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Signed in successfully.<br />Redirecting you to home…
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

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                    <div className="relative">
                      <Icon name="mail" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                      <input
                        type="email" required placeholder="you@example.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value.toLowerCase() })}
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-shadow"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-sm font-semibold text-gray-700">Password</label>
                      <Link
                        to="/forgot-password"
                        className="text-xs text-green-600 hover:underline font-medium"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Icon name="lock" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                      <input
                        type={showPw ? 'text' : 'password'} required placeholder="Enter your password"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl pl-10 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-shadow"
                      />
                      <button type="button" onClick={() => setShowPw(p => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                        <Icon name={showPw ? 'eye-off' : 'eye'} size={15} />
                      </button>
                    </div>
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95 transition-all">
                    {loading
                      ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Signing in…</>
                      : <><Icon name="log-in" size={15} />Sign In</>
                    }
                  </button>
                </form>

                <p className="text-center text-sm text-gray-400 mt-6">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-green-600 font-semibold hover:underline">Sign up free</Link>
                </p>
              </>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}