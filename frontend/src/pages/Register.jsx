import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { login }  = useAuth();
  const navigate   = useNavigate();
  const [role, setRole]   = useState('donor');
  const [form, setForm]   = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.'); return;
    }
    setLoading(true); setError('');
    try {
      const res = await API.post('/api/auth/register', {
        name: form.name, email: form.email, password: form.password,
      });
      login(res.data.token, res.data.name);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full flex flex-col">
      <div className="p-6">
        <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to home
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 pb-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="user-plus" size={22} className="text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Create an account</h1>
            <p className="text-sm text-gray-400 mt-1">Join NGO Connect and start making a difference.</p>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            {error && (
              <div className="flex items-start gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 border border-red-100">
                <Icon name="circle-alert" size={14} className="flex-shrink-0 mt-0.5" />
                {error}
              </div>
            )}

            {/* Role selector */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">I want to</label>
              <div className="space-y-2">
                {[
                  { id: 'donor', icon: 'heart', title: 'Support NGOs as a donor', desc: 'Discover and donate to campaigns' },
                  { id: 'ngo',   icon: 'building-2', title: 'Register my NGO', desc: 'Manage campaigns and connect with donors' },
                ].map(r => (
                  <button key={r.id} type="button" onClick={() => setRole(r.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      role === r.id
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      role === r.id ? 'bg-green-600' : 'bg-gray-100'
                    }`}>
                      <Icon name={r.icon} size={15} className={role === r.id ? 'text-white' : 'text-gray-500'} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{r.title}</p>
                      <p className="text-xs text-gray-400">{r.desc}</p>
                    </div>
                    {role === r.id && (
                      <Icon name="circle-check" size={16} className="text-green-600 ml-auto flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
                <div className="relative">
                  <Icon name="user" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input type="text" required placeholder="John Doe"
                    value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email address</label>
                <div className="relative">
                  <Icon name="mail" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input type="email" required placeholder="you@example.com"
                    value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
                <div className="relative">
                  <Icon name="lock" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input type="password" required placeholder="Create a strong password"
                    value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm password</label>
                <div className="relative">
                  <Icon name="lock" size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                  <input type="password" required placeholder="Re-enter your password"
                    value={form.confirmPassword} onChange={e => setForm({ ...form, confirmPassword: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 disabled:opacity-60 transition-colors mt-2">
                {loading
                  ? <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Creating...</>
                  : <><Icon name="user-check" size={15} />Create Account</>
                }
              </button>
            </form>

            <p className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-green-600 font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
          <p className="text-center text-xs text-gray-300 mt-5">
            By creating an account, you agree to our{' '}
            <a href="#" className="hover:text-gray-400">Terms of Service</a> and{' '}
            <a href="#" className="hover:text-gray-400">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
}