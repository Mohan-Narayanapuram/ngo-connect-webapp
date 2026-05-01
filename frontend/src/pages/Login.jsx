import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [form, setForm]       = useState({ email: '', password: '' });
  const [showPw, setShowPw]   = useState(false);
  const [error, setError]     = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); setError('');
    try {
      const res = await axios.post('/api/auth/login', form);
      login(res.data.token, res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col">
      <div className="p-6">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-100">
              <Icon name="heart-handshake" size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-black text-gray-900">Welcome back</h1>
            <p className="text-sm text-gray-400 mt-1">Sign in to continue donating</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
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
                  <a href="#" className="text-xs text-green-600 hover:underline">Forgot password?</a>
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
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-60 active:scale-95 transition-all mt-2">
                {loading ? (
                  <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Signing in...</>
                ) : (
                  <><Icon name="log-in" size={15} />Sign In</>
                )}
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Don't have an account?{' '}
              <Link to="/register" className="text-green-600 font-semibold hover:underline">Sign up free</Link>
            </p>
          </div>

          <p className="text-center text-xs text-gray-300 mt-5">
            By signing in, you agree to our{' '}
            <Link to="/terms" className="hover:text-gray-400">Terms</Link> and{' '}
            <Link to="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}