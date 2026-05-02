import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const METHODS = [
  { id: 'card',       icon: 'credit-card',  label: 'Credit / Debit Card' },
  { id: 'upi',        icon: 'smartphone',   label: 'UPI' },
  { id: 'netbanking', icon: 'landmark',     label: 'Net Banking' },
  { id: 'wallet',     icon: 'wallet',       label: 'Wallet' },
];

const AMOUNTS = [100, 250, 500, 1000, 2500, 5000];

export default function DonatePage() {
  const { ngoId, campaignId } = useParams();
  const { user }    = useAuth();
  const navigate    = useNavigate();

  const [ngo, setNgo]               = useState(null);
  const [campaign, setCampaign]     = useState(null);
  const [loading, setLoading]       = useState(true);
  const [amount, setAmount]         = useState('');
  const [custom, setCustom]         = useState(false);
  const [method, setMethod]         = useState('card');
  const [step, setStep]             = useState(1); // 1=amount, 2=payment, 3=success
  const [submitting, setSubmitting] = useState(false);
  const [error, setError]           = useState('');

  useEffect(() => {
    if (!ngoId) return;
    API.get(`/api/ngos/${ngoId}`)
      .then(res => {
        setNgo(res.data);
        if (campaignId) {
          const found = res.data.campaigns?.find(c => c._id === campaignId);
          setCampaign(found || null);
        }
      })
      .catch(() => setError('Could not load NGO details.'))
      .finally(() => setLoading(false));
  }, [ngoId, campaignId]);

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || Number(amount) < 1) {
      setError('Please enter a valid amount.'); return;
    }
    setSubmitting(true); setError('');
    try {
      await API.post('/api/donate', {
        ngoId,
        campaignId: campaignId || undefined,
        amount: Number(amount),
        paymentMethod: method,
      }, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setStep(3);
    } catch (err) {
      setError(err.response?.data?.message || 'Donation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );

  if (error && !ngo) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-64 gap-4">
        <p className="text-red-500">{error}</p>
        <Link to="/discover" className="text-green-600 hover:underline text-sm">← Back to NGOs</Link>
      </div>
    </div>
  );

  const pct = campaign
    ? Math.min(100, Math.round(((campaign.raised || 0) / (campaign.goal || 1)) * 100))
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">

        <Link to={`/ngo/${ngoId}`}
          className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to {ngo?.name}
        </Link>

        {/* Donation context banner */}
        <div className={`mb-6 px-4 py-3 rounded-xl border flex items-center gap-3 text-sm ${
          campaign
            ? 'bg-green-50 border-green-100 text-green-800'
            : 'bg-blue-50 border-blue-100 text-blue-800'
        }`}>
          <Icon name={campaign ? 'megaphone' : 'building-2'} size={16} className="flex-shrink-0" />
          <span>
            {campaign ? (
              <>Donating to campaign: <strong>{campaign.title}</strong> · {ngo?.name}</>
            ) : (
              <>Donating directly to: <strong>{ngo?.name}</strong></>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left — NGO / Campaign info */}
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <img
                src={campaign?.image || ngo?.image || `https://picsum.photos/seed/${ngoId}/600/300`}
                alt={ngo?.name}
                className="w-full h-40 object-cover"
              />
              <div className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">
                    {ngo?.cause}
                  </span>
                  {ngo?.verified && (
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Icon name="shield-check" size={10} /> Verified
                    </span>
                  )}
                </div>
                <h2 className="font-bold text-gray-900 text-base">{ngo?.name}</h2>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Icon name="map-pin" size={11} /> {ngo?.location}
                </p>

                {/* Campaign details */}
                {campaign ? (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 mb-2">
                      <Icon name="megaphone" size={12} className="text-green-600" />
                      <p className="text-xs font-semibold text-green-700">Campaign</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{campaign.title}</p>
                    {campaign.description && (
                      <p className="text-xs text-gray-400 mb-3 leading-relaxed line-clamp-2">{campaign.description}</p>
                    )}
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Rs. {(campaign.raised || 0).toLocaleString()} raised</span>
                      <span>{pct}%</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5">
                      <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${pct}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Goal: Rs. {(campaign.goal || 0).toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <Icon name="info" size={12} className="text-blue-500" />
                      <p className="text-xs text-blue-600">General donation to the NGO</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Security note */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Icon name="shield-check" size={16} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-green-800 mb-1">100% Secure & Transparent</p>
                  <p className="text-xs text-green-700 leading-relaxed">
                    Every rupee goes directly to {ngo?.name}. Receipts emailed within 24 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Donation form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

              {/* Success screen */}
              {step === 3 ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                    <Icon name="circle-check" size={40} className="text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank you, {user?.name}! </h2>
                  <p className="text-gray-400 mb-1">
                    Your donation of{' '}
                    <span className="font-bold text-green-600">Rs. {Number(amount).toLocaleString()}</span>
                    {campaign ? (
                      <> to <span className="font-semibold text-gray-700">{campaign.title}</span></>
                    ) : (
                      <> to <span className="font-semibold text-gray-700">{ngo?.name}</span></>
                    )}{' '}was successful.
                  </p>
                  <p className="text-sm text-gray-400 mb-8">A receipt has been sent to your email.</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Link to="/dashboard"
                      className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                      <Icon name="layout-dashboard" size={15} />
                      View Dashboard
                    </Link>
                    <Link to="/discover"
                      className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 px-6 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors">
                      Discover More NGOs
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step indicator */}
                  <div className="flex items-center gap-3 mb-8">
                    {['Choose Amount', 'Payment'].map((label, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                          step > i + 1 ? 'bg-green-600 text-white' :
                          step === i + 1 ? 'bg-green-600 text-white' :
                          'bg-gray-100 text-gray-400'
                        }`}>
                          {step > i + 1 ? <Icon name="check" size={12} /> : i + 1}
                        </div>
                        <span className={`text-sm font-semibold ${step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>
                          {label}
                        </span>
                        {i < 1 && <div className="w-8 h-px bg-gray-200 mx-1" />}
                      </div>
                    ))}
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-5 border border-red-100">
                      <Icon name="circle-alert" size={14} className="flex-shrink-0" />
                      {error}
                    </div>
                  )}

                  {/* Step 1 — Amount */}
                  {step === 1 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Choose amount</h2>
                      <p className="text-sm text-gray-400 mb-6">
                        {campaign
                          ? `Supporting: ${campaign.title}`
                          : `Donating to: ${ngo?.name}`}
                      </p>

                      <div className="grid grid-cols-3 gap-3 mb-5">
                        {AMOUNTS.map(a => (
                          <button key={a}
                            onClick={() => { setAmount(String(a)); setCustom(false); setError(''); }}
                            className={`py-3 rounded-xl text-sm font-bold border transition-all ${
                              amount === String(a) && !custom
                                ? 'bg-green-600 text-white border-green-600'
                                : 'border-gray-200 text-gray-700 hover:border-green-400 hover:text-green-700'
                            }`}>
                            ₹{a.toLocaleString()}
                          </button>
                        ))}
                      </div>

                      <div className="mb-6">
                        <label className="block text-xs font-semibold text-gray-600 mb-1.5">
                          Custom amount (₹)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">₹</span>
                          <input
                            type="number" min="1" placeholder="Enter any amount"
                            value={custom ? amount : ''}
                            onChange={e => { setAmount(e.target.value); setCustom(true); setError(''); }}
                            onFocus={() => { setCustom(true); setAmount(''); }}
                            className="w-full border border-gray-200 rounded-xl pl-8 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent"
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          if (!amount || isNaN(amount) || Number(amount) < 1) {
                            setError('Please select or enter a valid amount.'); return;
                          }
                          setError(''); setStep(2);
                        }}
                        className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                        Continue to Payment
                        <Icon name="arrow-right" size={15} />
                      </button>
                    </div>
                  )}

                  {/* Step 2 — Payment */}
                  {step === 2 && (
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">Payment method</h2>
                      <p className="text-sm text-gray-400 mb-6">
                        Donating <span className="font-bold text-green-600">₹{Number(amount).toLocaleString()}</span>
                        {campaign ? <> to <span className="font-medium text-gray-700">{campaign.title}</span></> : ''}
                      </p>

                      <div className="space-y-3 mb-6">
                        {METHODS.map(m => (
                          <button key={m.id}
                            onClick={() => setMethod(m.id)}
                            className={`w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all ${
                              method === m.id
                                ? 'border-green-500 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}>
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              method === m.id ? 'bg-green-600' : 'bg-gray-100'
                            }`}>
                              <Icon name={m.icon} size={16} className={method === m.id ? 'text-white' : 'text-gray-500'} />
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{m.label}</span>
                            {method === m.id && (
                              <Icon name="circle-check" size={16} className="text-green-600 ml-auto" />
                            )}
                          </button>
                        ))}
                      </div>

                      {method === 'card' && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-5 space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Card Number</label>
                            <input type="text" placeholder="4242 4242 4242 4242" maxLength={19}
                              className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Expiry</label>
                              <input type="text" placeholder="MM / YY"
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-600 mb-1.5">CVV</label>
                              <input type="password" placeholder="•••"
                                className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                            </div>
                          </div>
                        </div>
                      )}

                      {method === 'upi' && (
                        <div className="bg-gray-50 rounded-xl p-4 mb-5">
                          <label className="block text-xs font-semibold text-gray-600 mb-1.5">UPI ID</label>
                          <input type="text" placeholder="yourname@upi"
                            className="w-full border border-gray-200 bg-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button onClick={() => setStep(1)}
                          className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl font-semibold text-sm hover:border-gray-400 transition-colors">
                          Back
                        </button>
                        <button onClick={handleDonate} disabled={submitting}
                          className="flex-[2] bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 disabled:opacity-60 transition-colors flex items-center justify-center gap-2">
                          {submitting ? (
                            <>
                              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                              </svg>
                              Processing...
                            </>
                          ) : (
                            <>
                              <Icon name="heart" size={15} />
                              Donate ₹{Number(amount).toLocaleString()}
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}