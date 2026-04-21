import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function NgoProfile() {
  const { id }   = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ngo, setNgo]         = useState(null);
  const [amount, setAmount]   = useState('');
  const [msg, setMsg]         = useState('');
  const [msgType, setMsgType] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`/api/ngos/${id}`)
      .then(res => setNgo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleDonate = async () => {
    if (!user) { setMsg('Please sign in to donate.'); setMsgType('error'); return; }
    if (!amount || amount <= 0) { setMsg('Enter a valid amount.'); setMsgType('error'); return; }
    try {
      await axios.post('/api/donate',
        { ngoId: id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setMsg('Donation successful. Thank you for your support.');
      setMsgType('success');
      setAmount('');
    } catch (err) {
      setMsg(err.response?.data?.message || 'Donation failed.');
      setMsgType('error');
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        <div className="h-72 bg-gray-100 rounded-2xl animate-pulse" />
        <div className="h-6 bg-gray-100 rounded animate-pulse w-1/3" />
        <div className="h-4 bg-gray-100 rounded animate-pulse w-1/4" />
      </div>
    </div>
  );

  if (!ngo) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96 gap-3 text-gray-400">
        <Icon name="building-2" size={40} className="text-gray-200" />
        <p className="font-medium text-gray-600">NGO not found</p>
        <Link to="/" className="text-sm text-green-600 hover:underline">Back to listing</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to NGOs
        </Link>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-8 bg-gray-100">
          <img src={ngo.image} alt={ngo.name}
            className="w-full h-full object-cover"
            onError={e => { e.target.src = 'https://placehold.co/800x400/f3f4f6/9ca3af?text=NGO'; }} />
          {ngo.verified && (
            <span className="absolute top-4 right-4 bg-white text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-green-100">
              <Icon name="shield-check" size={13} className="text-green-600" />
              Verified NGO
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            {/* NGO Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <h1 className="text-2xl font-bold text-gray-900">{ngo.name}</h1>
                <span className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium border border-blue-100">
                  {ngo.cause}
                </span>
              </div>
              <p className="text-sm text-gray-400 flex items-center gap-1.5 mb-4">
                <Icon name="map-pin" size={13} className="text-gray-300" />
                {ngo.location}
              </p>
              <p className="text-sm text-gray-600 leading-relaxed mb-5">{ngo.description}</p>

              {/* Mission */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 flex gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon name="target" size={15} className="text-green-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mission Statement</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{ngo.mission}</p>
                </div>
              </div>
            </div>

            {/* Campaigns */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="megaphone" size={16} className="text-gray-400" />
                <h2 className="text-base font-bold text-gray-900">Active Campaigns</h2>
                <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">
                  {ngo.campaigns?.length || 0}
                </span>
              </div>

              {!ngo.campaigns?.length ? (
                <div className="bg-white rounded-2xl border border-gray-100 flex flex-col items-center py-12 text-center px-6">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                    <Icon name="megaphone-off" size={20} className="text-gray-300" />
                  </div>
                  <p className="text-gray-600 font-medium text-sm">No active campaigns</p>
                  <p className="text-xs text-gray-400 mt-1">Check back later for upcoming campaigns.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {ngo.campaigns.map((c, i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                      {c.image && (
                        <img src={c.image} alt={c.title}
                          className="w-full h-40 object-cover"
                          onError={e => { e.target.style.display = 'none'; }} />
                      )}
                      <div className="p-5">
                        <h3 className="font-bold text-gray-900 mb-1 text-sm">{c.title}</h3>
                        <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description}</p>
                        <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                          <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((c.raised / c.goal) * 100, 100)}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-400">
                          <span className="font-semibold text-gray-700">
                            Rs. {c.raised?.toLocaleString()} raised
                          </span>
                          <span>{Math.round((c.raised / c.goal) * 100)}% of Rs. {c.goal?.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Donate Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Support this NGO</h2>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Your donation goes directly to {ngo.name}.
              </p>

              {/* Preset Amounts */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[100, 500, 1000, 2000, 5000, 10000].map(preset => (
                  <button key={preset} onClick={() => setAmount(preset)}
                    className={`text-xs py-2 rounded-lg border font-semibold transition-all ${
                      Number(amount) === preset
                        ? 'bg-green-600 text-white border-green-600'
                        : 'bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-600'
                    }`}>
                    Rs.{preset >= 1000 ? `${preset/1000}K` : preset}
                  </button>
                ))}
              </div>

              {/* Custom Amount */}
              <div className="relative mb-4">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-medium">Rs.</span>
                <input type="number" placeholder="Custom amount"
                  value={amount} onChange={e => setAmount(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
              </div>

              <button onClick={() => navigate('/donate', { state: { ngo } })}
                className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Icon name="heart" size={15} className="text-white" />
                Donate Now
              </button>

              {msg && (
                <div className={`mt-4 text-sm px-4 py-3 rounded-xl border flex items-start gap-2 ${
                  msgType === 'success'
                    ? 'bg-green-50 text-green-700 border-green-100'
                    : 'bg-red-50 text-red-600 border-red-100'
                }`}>
                  <Icon name={msgType === 'success' ? 'circle-check' : 'circle-x'} size={15} className="flex-shrink-0 mt-0.5" />
                  <span>{msg}</span>
                </div>
              )}

              {!user && (
                <p className="text-xs text-gray-400 text-center mt-4">
                  <Link to="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
                  {' '}required to donate
                </p>
              )}

              {/* Trust */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-2.5">
                {[
                  { icon: 'shield', label: 'Secure & transparent' },
                  { icon: 'badge-check', label: ngo.verified ? 'Verified organization' : 'Pending verification' },
                  { icon: 'indian-rupee', label: '100% goes to the NGO' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon name={item.icon} size={13} className="text-green-500 flex-shrink-0" />
                    {item.label}
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