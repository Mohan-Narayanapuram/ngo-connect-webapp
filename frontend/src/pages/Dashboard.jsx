import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';


// ── Animated counter ───────────────────────────────────────────────
function useCountUp(target, duration = 900) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setValue(target);
    };
    requestAnimationFrame(step);
  }, [target, duration]);
  return value;
}


// ── Donation Detail Modal ──────────────────────────────────────────
function DonationModal({ donation, onClose }) {
  const ref = useRef(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!donation) return null;
  const date = new Date(donation.createdAt);

  const rows = [
    { label: 'NGO',            value: donation.ngoId?.name || 'Unknown NGO', bold: true },
    { label: 'Cause',          value: donation.ngoId?.cause || '—' },
    { label: 'Campaign',       value: donation.campaignTitle || 'General donation' },
    { label: 'Date',           value: date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) },
    { label: 'Time',           value: date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) },
    { label: 'Transaction ID', value: donation._id?.slice(-10).toUpperCase(), mono: true },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Donation receipt"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        ref={ref}
        className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl z-10 overflow-hidden fade-in"
        onClick={e => e.stopPropagation()}
      >
        {/* Green accent top bar */}
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-500" />

        {/* Header */}
        <div className="flex items-start justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-1">Donation Receipt</p>
            <p className="text-2xl font-black text-gray-900 tracking-tight">
              ₹{donation.amount?.toLocaleString('en-IN')}
            </p>
          </div>
          <button onClick={onClose} aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors mt-0.5">
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Details */}
        <div className="px-6 py-4 space-y-3">
          {rows.map(({ label, value, bold, mono }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="text-xs text-gray-400 font-medium flex-shrink-0 pt-0.5">{label}</span>
              <span className={`text-sm text-right ${bold ? 'font-bold text-gray-900' : 'font-medium text-gray-700'} ${mono ? 'font-mono text-xs text-gray-500' : ''}`}>
                {value}
              </span>
            </div>
          ))}
          <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-100">
            <span className="text-xs text-gray-400 font-medium">Status</span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-green-50 border border-green-100 px-2.5 py-1 rounded-full">
              <Icon name="circle-check" size={11} />
              Successful
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="px-6 pb-6 pt-2 flex flex-col sm:flex-row gap-2">
          <Link
            to={`/ngo/${donation.ngoId?._id}`}
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-semibold hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all"
          >
            <Icon name="building-2" size={14} />
            View NGO
          </Link>
          <Link
            to={`/donate/${donation.ngoId?._id}`}
            onClick={onClose}
            className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 active:scale-95 transition-all"
          >
            <Icon name="heart" size={14} />
            Donate Again
          </Link>
        </div>
      </div>
    </div>
  );
}


// ── Edit Profile Modal ─────────────────────────────────────────────
function EditProfileModal({ profile, token, onClose, onSaved }) {
  const [name, setName]           = useState(profile?.name || '');
  const [email, setEmail]         = useState(profile?.email || '');
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw]         = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [tab, setTab]             = useState('profile');
  const [saving, setSaving]       = useState(false);
  const [error, setError]         = useState('');
  const [success, setSuccess]     = useState('');

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  async function handleSaveProfile(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    setSaving(true);
    try {
      const res = await API.put('/api/users/me',
        { name, email },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Profile updated successfully.');
      onSaved(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally { setSaving(false); }
  }

  async function handleChangePassword(e) {
    e.preventDefault();
    setError(''); setSuccess('');
    if (newPw !== confirmPw) { setError('New passwords do not match.'); return; }
    if (newPw.length < 6)    { setError('Password must be at least 6 characters.'); return; }
    setSaving(true);
    try {
      await API.put('/api/users/password',
        { currentPassword: currentPw, newPassword: newPw },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess('Password changed successfully.');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to change password.');
    } finally { setSaving(false); }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={onClose}
      role="dialog" aria-modal="true" aria-label="Edit profile"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl z-10 overflow-hidden fade-in"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1 w-full bg-gradient-to-r from-green-400 to-emerald-500" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-gray-100">
          <h2 className="text-base font-black text-gray-900">Edit Profile</h2>
          <button onClick={onClose} aria-label="Close"
            className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
            <Icon name="x" size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 px-6 pt-4">
          {[['profile', 'Profile Info'], ['password', 'Change Password']].map(([key, label]) => (
            <button key={key}
              onClick={() => { setTab(key); setError(''); setSuccess(''); }}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                tab === key ? 'bg-green-600 text-white' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
              }`}>
              {label}
            </button>
          ))}
        </div>

        <div className="px-6 py-5">
          {error   && (
            <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 border border-red-100 rounded-xl px-3 py-2.5 mb-4">
              <Icon name="circle-alert" size={13} className="flex-shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div className="flex items-center gap-2 text-xs text-green-700 bg-green-50 border border-green-100 rounded-xl px-3 py-2.5 mb-4">
              <Icon name="circle-check" size={13} className="flex-shrink-0" />
              {success}
            </div>
          )}

          {tab === 'profile' ? (
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Full Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 transition-shadow" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">Email Address</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 transition-shadow" />
              </div>
              <button type="submit" disabled={saving}
                className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-60 active:scale-95 transition-all">
                {saving ? 'Saving…' : 'Save Changes'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleChangePassword} className="space-y-4">
              {[
                { label: 'Current Password',     val: currentPw, set: setCurrentPw },
                { label: 'New Password',          val: newPw,     set: setNewPw     },
                { label: 'Confirm New Password',  val: confirmPw, set: setConfirmPw },
              ].map(({ label, val, set }) => (
                <div key={label}>
                  <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wide">{label}</label>
                  <div className="relative">
                    <input type={showPw ? 'text' : 'password'} value={val} onChange={e => set(e.target.value)} required
                      className="w-full border border-gray-200 rounded-xl px-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-gray-50 transition-shadow" />
                    <button type="button" onClick={() => setShowPw(p => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors">
                      <Icon name={showPw ? 'eye-off' : 'eye'} size={14} />
                    </button>
                  </div>
                </div>
              ))}
              <button type="submit" disabled={saving}
                className="w-full bg-green-600 text-white py-2.5 rounded-xl text-sm font-bold hover:bg-green-700 disabled:opacity-60 active:scale-95 transition-all">
                {saving ? 'Updating…' : 'Change Password'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}


// ── Avatar initials helper ─────────────────────────────────────────
function getInitials(name = '') {
  return name.trim().split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';
}


// ── Main Dashboard ─────────────────────────────────────────────────
export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile]                   = useState(null);
  const [donations, setDonations]               = useState([]);
  const [loading, setLoading]                   = useState(true);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [editOpen, setEditOpen]                 = useState(false);
  const [filter, setFilter]                     = useState('all');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const headers = { Authorization: `Bearer ${user.token}` };
    Promise.all([
      API.get('/api/users/me',        { headers }),
      API.get('/api/users/donations', { headers }),
    ])
      .then(([p, d]) => { setProfile(p.data); setDonations(d.data); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  const totalDonated  = donations.reduce((sum, d) => sum + (d.amount || 0), 0);
  const ngosSupported = new Set(donations.map(d => d.ngoId?._id).filter(Boolean)).size;

  // Animated stat counters
  const animatedTotal  = useCountUp(totalDonated);
  const animatedNgos   = useCountUp(ngosSupported);
  const animatedCount  = useCountUp(donations.length);

  // Grouping by month
  const grouped = donations.reduce((acc, d) => {
    const key = new Date(d.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(d);
    return acc;
  }, {});

  // Filter options
  const uniqueNgos = [...new Set(donations.map(d => d.ngoId?.name).filter(Boolean))];
  const filteredDonations = filter === 'all'
    ? donations
    : donations.filter(d => d.ngoId?.name === filter);

  // Filtered grouped
  const filteredGrouped = filteredDonations.reduce((acc, d) => {
    const key = new Date(d.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
    if (!acc[key]) acc[key] = [];
    acc[key].push(d);
    return acc;
  }, {});

  // ── Loading skeleton ──
  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="w-full max-w-5xl mx-auto px-6 lg:px-10 py-10">
        {/* Header skeleton */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="skeleton w-14 h-14 rounded-2xl" />
            <div>
              <div className="skeleton h-3 w-20 mb-2 rounded" />
              <div className="skeleton h-6 w-36 mb-1.5 rounded" />
              <div className="skeleton h-3 w-28 rounded" />
            </div>
          </div>
          <div className="skeleton h-9 w-28 rounded-xl" />
        </div>
        {/* Stats skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[1,2,3].map(i => <div key={i} className="skeleton h-24 rounded-2xl" />)}
        </div>
        {/* Table skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <div className="skeleton h-4 w-32 rounded" />
            <div className="skeleton h-4 w-20 rounded" />
          </div>
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <div className="flex items-center gap-4">
                <div className="skeleton w-10 h-10 rounded-xl flex-shrink-0" />
                <div>
                  <div className="skeleton h-3.5 w-36 mb-2 rounded" />
                  <div className="skeleton h-3 w-24 rounded" />
                </div>
              </div>
              <div className="text-right">
                <div className="skeleton h-4 w-20 mb-1.5 rounded" />
                <div className="skeleton h-3 w-16 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const displayName = profile?.name || user?.name || 'Donor';
  const memberSince = profile?.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    : null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 lg:px-10 py-10">

        {/* ── Page Header ── */}
        <div className="flex items-start justify-between mb-8 gap-4">
          <div className="flex items-center gap-4">
            {/* Large avatar */}
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-100">
              <span className="text-white text-lg font-black">{getInitials(displayName)}</span>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium mb-0.5">Welcome back</p>
              <h1 className="text-xl font-black text-gray-900 leading-tight">{displayName}</h1>
              <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1.5">
                <Icon name="mail" size={11} className="text-gray-300" />
                {profile?.email}
                {memberSince && (
                  <>
                    <span className="text-gray-200">·</span>
                    <Icon name="calendar" size={11} className="text-gray-300" />
                    Member since {memberSince}
                  </>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => setEditOpen(true)}
              className="inline-flex items-center gap-1.5 border border-gray-200 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold hover:border-green-400 hover:text-green-700 hover:bg-green-50 transition-all">
              <Icon name="pencil" size={13} />
              Edit Profile
            </button>
            <Link to="/discover"
              className="inline-flex items-center gap-1.5 bg-green-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-700 active:scale-95 transition-all shadow-sm shadow-green-100">
              <Icon name="heart" size={13} />
              Donate
            </Link>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              label:    'Total Donated',
              value:    `₹${animatedTotal.toLocaleString('en-IN')}`,
              raw:      totalDonated,
              icon:     'indian-rupee',
              iconBg:   'bg-green-100',
              iconText: 'text-green-600',
              accent:   'border-green-100',
              hint:     donations.length > 0 ? `Across ${ngosSupported} NGO${ngosSupported !== 1 ? 's' : ''}` : 'No donations yet',
            },
            {
              label:    'NGOs Supported',
              value:    animatedNgos,
              raw:      ngosSupported,
              icon:     'building-2',
              iconBg:   'bg-blue-100',
              iconText: 'text-blue-600',
              accent:   'border-blue-100',
              hint:     ngosSupported > 0 ? 'Unique organisations' : 'Make your first donation',
            },
            {
              label:    'Donations Made',
              value:    animatedCount,
              raw:      donations.length,
              icon:     'heart',
              iconBg:   'bg-purple-100',
              iconText: 'text-purple-600',
              accent:   'border-purple-100',
              hint:     donations.length > 0
                ? `Last: ${new Date(donations[0]?.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}`
                : 'Start contributing',
            },
          ].map((stat, i) => (
            <div key={i}
              className={`bg-white rounded-2xl border ${stat.accent} p-5 flex items-center gap-4 hover:shadow-sm transition-shadow`}>
              <div className={`w-12 h-12 ${stat.iconBg} ${stat.iconText} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                <Icon name={stat.icon} size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-2xl font-black text-gray-900 tracking-tight leading-none tabular-nums">
                  {stat.value}
                </p>
                <p className="text-xs font-semibold text-gray-500 mt-1">{stat.label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{stat.hint}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Donation History ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Table header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100">
            <div>
              <h2 className="text-sm font-black text-gray-900">Donation History</h2>
              <p className="text-xs text-gray-400 mt-0.5">
                {donations.length === 0 ? 'No donations yet' : `${donations.length} donation${donations.length !== 1 ? 's' : ''} · ₹${totalDonated.toLocaleString('en-IN')} total`}
              </p>
            </div>

            {/* NGO filter */}
            {uniqueNgos.length > 1 && (
              <div className="flex items-center gap-1.5 flex-wrap">
                <button
                  onClick={() => setFilter('all')}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                    filter === 'all' ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-100'
                  }`}>
                  All
                </button>
                {uniqueNgos.slice(0, 4).map(name => (
                  <button key={name}
                    onClick={() => setFilter(name)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors max-w-[120px] truncate ${
                      filter === name ? 'bg-green-600 text-white' : 'text-gray-500 hover:bg-gray-100'
                    }`}>
                    {name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Empty state */}
          {donations.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center px-6">
              <div className="w-16 h-16 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="heart" size={28} className="text-gray-200" />
              </div>
              <h3 className="font-black text-gray-900 mb-1.5 text-sm">No donations yet</h3>
              <p className="text-xs text-gray-400 mb-6 max-w-xs leading-relaxed">
                Every rupee you donate goes directly to verified NGOs. Start by discovering a cause you care about.
              </p>
              <Link to="/discover"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl text-xs font-bold hover:bg-green-700 active:scale-95 transition-all shadow-sm shadow-green-100">
                <Icon name="compass" size={14} />
                Discover NGOs
              </Link>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="flex flex-col items-center py-14 text-center px-6">
              <Icon name="filter-x" size={28} className="text-gray-200 mb-3" />
              <p className="text-sm font-bold text-gray-600 mb-1">No donations to {filter}</p>
              <button onClick={() => setFilter('all')} className="text-xs text-green-600 hover:underline">Clear filter</button>
            </div>
          ) : (
            <div>
              {Object.entries(filteredGrouped).map(([month, items]) => (
                <div key={month}>
                  {/* Month separator */}
                  <div className="px-6 py-2.5 bg-gray-50/70 border-b border-gray-100 flex items-center gap-2">
                    <Icon name="calendar" size={11} className="text-gray-300" />
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{month}</span>
                    <span className="ml-auto text-xs font-semibold text-gray-400">
                      ₹{items.reduce((s, d) => s + d.amount, 0).toLocaleString('en-IN')}
                    </span>
                  </div>
                  {/* Rows */}
                  {items.map((d, i) => {
                    const date = new Date(d.createdAt);
                    return (
                      <div key={d._id || i}
                        className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer group border-b border-gray-50 last:border-0"
                        onClick={() => setSelectedDonation(d)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={e => e.key === 'Enter' && setSelectedDonation(d)}
                      >
                        <div className="flex items-center gap-4 min-w-0">
                          <div className="w-10 h-10 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                            <Icon name="heart" size={15} className="text-green-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900 truncate">{d.ngoId?.name || 'NGO'}</p>
                            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
                              {d.ngoId?.cause && (
                                <span className="text-xs text-gray-400">{d.ngoId.cause}</span>
                              )}
                              {d.campaignTitle && (
                                <>
                                  <span className="text-gray-200 text-xs">·</span>
                                  <span className="text-xs text-green-600 font-medium">{d.campaignTitle}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0 ml-4">
                          <div className="text-right">
                            <p className="text-sm font-black text-gray-900 tabular-nums">
                              ₹{d.amount?.toLocaleString('en-IN')}
                            </p>
                            <p className="text-xs text-gray-400 mt-0.5">
                              {date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                              {' · '}
                              {date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                          <Icon name="chevron-right" size={14}
                            className="text-gray-200 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Footer total */}
              <div className="flex items-center justify-between px-6 py-4 bg-gray-50/60 border-t border-gray-100">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {filteredDonations.length} donation{filteredDonations.length !== 1 ? 's' : ''}
                  {filter !== 'all' ? ` to ${filter}` : ' total'}
                </span>
                <span className="text-sm font-black text-gray-900 tabular-nums">
                  ₹{filteredDonations.reduce((s, d) => s + d.amount, 0).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          )}
        </div>

      </main>

      {/* Modals */}
      {selectedDonation && (
        <DonationModal donation={selectedDonation} onClose={() => setSelectedDonation(null)} />
      )}
      {editOpen && (
        <EditProfileModal
          profile={profile}
          token={user?.token}
          onClose={() => setEditOpen(false)}
          onSaved={(updated) => { setProfile(updated); setEditOpen(false); }}
        />
      )}

      <Footer />
    </div>
  );
}