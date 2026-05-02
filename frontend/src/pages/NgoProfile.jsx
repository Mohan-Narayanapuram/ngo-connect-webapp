import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function NgoProfile() {
  const { id }       = useParams();
  const { user }     = useAuth();
  const navigate     = useNavigate();

  const [ngo,     setNgo]     = useState(null);
  const [amount,  setAmount]  = useState('');
  const [msg,     setMsg]     = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/ngos/${id}`)
      .then(res => setNgo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDonate = async () => {
    if (!user) { navigate('/login'); return; }
    if (!amount || amount <= 0) {
      setMsg('Enter a valid amount.');
      setMsgType('error');
      return;
    }
    try {
      await API.post(
        '/api/donate',
        { ngoId: id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMsg('Donation successful. Thank you! 🎉');
      setMsgType('success');
      setAmount('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Donation failed.');
      setMsgType('error');
    }
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full px-6 lg:px-10 py-10 space-y-6">
        <div className="h-56 skeleton rounded-2xl" />
        <div className="flex gap-8">
          <div className="flex-1 space-y-4">
            <div className="h-32 skeleton rounded-2xl" />
            <div className="h-24 skeleton rounded-2xl" />
            <div className="h-48 skeleton rounded-2xl" />
          </div>
          <div className="w-72 h-72 skeleton rounded-2xl flex-shrink-0" />
        </div>
      </div>
    </div>
  );

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!ngo) return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1 py-24 text-center px-6">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
          <Icon name="building-2" size={24} className="text-gray-300" />
        </div>
        <p className="font-bold text-gray-700 text-sm mb-1">NGO not found</p>
        <p className="text-xs text-gray-400 mb-5">
          This organization may have been removed or the link is broken.
        </p>
        <Link
          to="/discover"
          className="text-xs text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50 font-semibold transition-colors"
        >
          Back to listing
        </Link>
      </div>
    </div>
  );

  const PRESETS = [100, 250, 500, 1000];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      {/* ── Constrained wrapper — matches all other pages ── */}
      <div className="max-w-5xl mx-auto w-full px-6 lg:px-10">

        {/* ── Hero Banner ── */}
        <div className="w-full h-56 bg-gray-100 relative overflow-hidden rounded-2xl mt-8">
          <img
            src={ngo.image}
            alt={ngo.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = `https://picsum.photos/seed/${ngo._id}/1200/300`; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          {ngo.verified && (
            <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-100 shadow-sm">
              <Icon name="badge-check" size={12} className="text-green-600" />
              Verified NGO
            </span>
          )}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6 pb-16">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0">

            {/* Identity card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 flex-shrink-0">
                  <Icon name="building-2" size={24} className="text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-black text-gray-900 leading-tight mb-2">
                    {ngo.name}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {ngo.cause && (
                      <span className="text-xs font-semibold bg-green-50 text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
                        {ngo.cause}
                      </span>
                    )}
                    {ngo.location && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Icon name="map-pin" size={11} className="text-gray-300" />
                        {ngo.location}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{ngo.description}</p>
                </div>
              </div>
            </div>

            {/* Mission */}
            {ngo.mission && (
              <div className="bg-green-50 border border-green-100 rounded-2xl p-5 mb-6">
                <h2 className="text-xs font-black text-green-800 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                  <Icon name="target" size={12} />
                  Mission Statement
                </h2>
                <p className="text-sm text-green-900 leading-relaxed">{ngo.mission}</p>
              </div>
            )}

            {/* Active Campaigns */}
            <div className="mb-6">
              <h2 className="text-sm font-black text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="megaphone" size={14} className="text-green-500" />
                Active Campaigns
              </h2>

              {!ngo.campaigns?.length ? (
                <div className="bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
                  <Icon name="megaphone" size={22} className="text-gray-200 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-gray-400">No active campaigns</p>
                  <p className="text-xs text-gray-300 mt-1">Check back later for upcoming campaigns.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ngo.campaigns.map((c, i) => {
                    const pct = Math.min(
                      Math.round(((c.raised || 0) / (c.goal || 1)) * 100),
                      100
                    );
                    return (
                      <div
                        key={c._id || i}
                        className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col"
                      >
                        {c.image && (
                          <div className="h-28 rounded-lg overflow-hidden mb-3 bg-gray-100">
                            <img
                              src={c.image}
                              alt={c.title}
                              className="w-full h-full object-cover"
                              onError={e => { e.target.src = `https://picsum.photos/seed/c${i}/300/150`; }}
                            />
                          </div>
                        )}
                        <h3 className="text-sm font-bold text-gray-900 mb-1 line-clamp-2">{c.title}</h3>
                        <p className="text-xs text-gray-400 mb-3 line-clamp-2 flex-1">{c.description}</p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                          <div
                            className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mb-3">
                          <span className="font-bold text-gray-800">
                            ₹{(c.raised || 0).toLocaleString('en-IN')}
                          </span>
                          <span>Goal: ₹{(c.goal || 0).toLocaleString('en-IN')}</span>
                        </div>
                        <button
                          onClick={() => navigate(`/donate/${ngo._id}/${c._id}`)}
                          className="w-full flex items-center justify-center gap-1.5 text-xs font-bold text-white bg-green-600 py-2 rounded-lg hover:bg-green-700 active:scale-95 transition-all"
                        >
                          <Icon name="heart" size={12} />
                          Donate to Campaign
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* ── Right column — Donate widget ── */}
          <div className="w-full lg:w-72 flex-shrink-0 sticky top-20">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">
              <h2 className="text-sm font-black text-gray-900 mb-1">Support {ngo.name}</h2>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Your donation goes directly to {ngo.name}.
              </p>

              {/* Preset amounts */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {PRESETS.map(p => (
                  <button
                    key={p}
                    onClick={() => setAmount(String(p))}
                    className={`text-xs font-bold py-2 rounded-xl border transition-all ${
                      amount === String(p)
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    ₹{p.toLocaleString('en-IN')}
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div className="relative mb-3">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-semibold pointer-events-none">₹</span>
                <input
                  type="number"
                  placeholder="Custom amount"
                  value={amount}
                  onChange={e => setAmount(e.target.value)}
                  className="w-full pl-7 pr-4 py-2.5 text-xs border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                  min="1"
                />
              </div>

              {/* Feedback */}
              {msg && (
                <div className={`text-xs px-3 py-2 rounded-lg mb-3 font-medium ${
                  msgType === 'success'
                    ? 'bg-green-50 text-green-700 border border-green-100'
                    : 'bg-red-50 text-red-600 border border-red-100'
                }`}>
                  {msg}
                </div>
              )}

              {user ? (
                <button
                  onClick={handleDonate}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-green-700 active:scale-95 transition-all"
                >
                  <Icon name="heart" size={13} />
                  Donate Now
                </button>
              ) : (
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-2">
                    <Link to="/login" className="text-green-600 font-semibold hover:underline">
                      Sign in
                    </Link>{' '}
                    required to donate
                  </p>
                  <Link
                    to="/login"
                    className="block w-full text-center text-xs font-bold text-white bg-green-600 py-3 rounded-xl hover:bg-green-700 transition-all"
                  >
                    Sign in to Donate
                  </Link>
                </div>
              )}

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {[
                  { icon: 'shield-check', text: 'Verified organization' },
                  { icon: 'lock',         text: 'Secure payment' },
                  { icon: 'receipt',      text: 'Every rupee tracked' },
                ].map(b => (
                  <div key={b.icon} className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon name={b.icon} size={12} className="text-green-500 flex-shrink-0" />
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}