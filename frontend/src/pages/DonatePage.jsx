import axios from 'axios';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function DonatePage() {
  const { user }   = useAuth();
  const navigate   = useNavigate();
  const location   = useLocation();
  const ngo        = location.state?.ngo || null;

  const [step, setStep]       = useState(1);
  const [amount, setAmount]   = useState('');
  const [method, setMethod]   = useState('card');
  const [card, setCard]       = useState({ number: '', expiry: '', cvv: '', name: '' });
  const [upi, setUpi]         = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult]   = useState(null);
  const [msg, setMsg]         = useState('');

  if (!user) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Icon name="lock" size={24} className="text-gray-300" />
        </div>
        <p className="text-gray-600 font-medium">Sign in to make a donation</p>
        <Link to="/login" className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-green-700">
          <Icon name="log-in" size={15} />
          Sign In
        </Link>
      </div>
    </div>
  );

  const handlePayment = async () => {
    if (!amount || amount <= 0) { setMsg('Enter a valid amount.'); return; }
    setLoading(true); setMsg('');
    try {
      await axios.post('/api/donate',
        { ngoId: ngo?._id, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      setResult('success'); setStep(3);
    } catch (err) {
      setMsg(err.response?.data?.message || 'Payment failed.');
      if (err.response?.status === 402) { setResult('failed'); setStep(3); }
    } finally {
      setLoading(false);
    }
  };

  const formatCard   = v => v.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim();
  const formatExpiry = v => v.replace(/\D/g,'').slice(0,4).replace(/^(\d{2})(\d)/,'$1/$2');

  const stepLabels = ['Amount', 'Payment', 'Confirmation'];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-lg mx-auto px-6 py-10">

        {step < 3 && (
          <button onClick={() => step > 1 ? setStep(s => s-1) : navigate(-1)}
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
            <Icon name="arrow-left" size={15} />
            {step === 1 ? 'Back to NGO' : 'Back'}
          </button>
        )}

        {/* Progress */}
        {step < 3 && (
          <div className="flex items-center mb-8">
            {stepLabels.map((label, i) => (
              <div key={i} className="flex items-center flex-1 last:flex-none">
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 transition-all ${
                    i + 1 < step ? 'bg-green-600 text-white' :
                    i + 1 === step ? 'bg-green-600 text-white ring-4 ring-green-100' :
                    'bg-gray-100 text-gray-400'
                  }`}>
                    {i + 1 < step
                      ? <Icon name="check" size={12} className="text-white" />
                      : i + 1}
                  </div>
                  <span className={`text-xs font-medium hidden sm:block ${i + 1 <= step ? 'text-green-600' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < 2 && <div className={`h-px flex-1 mx-3 ${i + 1 < step ? 'bg-green-500' : 'bg-gray-200'}`} />}
              </div>
            ))}
          </div>
        )}

        {/* NGO Banner */}
        {ngo && step < 3 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-4 mb-6 shadow-sm">
            <img src={ngo.image} alt={ngo.name}
              className="w-12 h-12 rounded-xl object-cover bg-gray-100 flex-shrink-0"
              onError={e => { e.target.style.display='none'; }} />
            <div>
              <p className="font-semibold text-gray-900 text-sm">{ngo.name}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                <Icon name="map-pin" size={11} className="text-gray-300" />
                {ngo.cause} · {ngo.location}
              </p>
            </div>
          </div>
        )}

        {/* Step 1 — Amount */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Select Amount</h2>
            <p className="text-sm text-gray-400 mb-6">Choose a preset or enter a custom amount.</p>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[100, 500, 1000, 2000, 5000, 10000].map(preset => (
                <button key={preset} onClick={() => setAmount(preset)}
                  className={`py-3 rounded-xl text-sm font-semibold border transition-all ${
                    Number(amount) === preset
                      ? 'bg-green-600 text-white border-green-600'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-green-400 hover:text-green-600'
                  }`}>
                  Rs. {preset >= 1000 ? `${preset/1000}K` : preset}
                </button>
              ))}
            </div>

            <div className="relative mb-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 font-medium">Rs.</span>
              <input type="number" placeholder="Enter custom amount"
                value={amount} onChange={e => setAmount(e.target.value)}
                className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
            </div>
            {msg && (
              <p className="flex items-center gap-1.5 text-red-500 text-xs mt-2">
                <Icon name="circle-alert" size={13} />{msg}
              </p>
            )}

            <button onClick={() => { if (!amount || amount <= 0) { setMsg('Enter a valid amount'); return; } setMsg(''); setStep(2); }}
              className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
              Continue
              <Icon name="arrow-right" size={15} />
            </button>
          </div>
        )}

        {/* Step 2 — Payment */}
        {step === 2 && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-1">
              <h2 className="text-lg font-bold text-gray-900">Payment Details</h2>
              <span className="text-sm font-bold text-green-600">Rs. {Number(amount).toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">This is a simulated payment — no real charges.</p>

            {/* Method Tabs */}
            <div className="flex gap-2 p-1 bg-gray-50 rounded-xl mb-6 border border-gray-100">
              {[
                { id: 'card',       label: 'Card',       icon: 'credit-card' },
                { id: 'upi',        label: 'UPI',        icon: 'smartphone' },
                { id: 'netbanking', label: 'Net Banking', icon: 'landmark' },
              ].map(m => (
                <button key={m.id} onClick={() => setMethod(m.id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                    method === m.id
                      ? 'bg-white text-gray-900 shadow-sm border border-gray-200'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}>
                  <Icon name={m.icon} size={13} />
                  {m.label}
                </button>
              ))}
            </div>

            {/* Card Form */}
            {method === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Cardholder Name</label>
                  <input type="text" placeholder="As on card"
                    value={card.name} onChange={e => setCard({...card, name: e.target.value})}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">Card Number</label>
                  <div className="relative">
                    <Icon name="credit-card" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                    <input type="text" placeholder="1234 5678 9012 3456" maxLength={19}
                      value={card.number}
                      onChange={e => setCard({...card, number: formatCard(e.target.value)})}
                      className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm font-mono tracking-widest focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Expiry</label>
                    <input type="text" placeholder="MM / YY" maxLength={5}
                      value={card.expiry}
                      onChange={e => setCard({...card, expiry: formatExpiry(e.target.value)})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">CVV</label>
                    <input type="password" placeholder="3 digits" maxLength={3}
                      value={card.cvv}
                      onChange={e => setCard({...card, cvv: e.target.value.slice(0,3)})}
                      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                  </div>
                </div>
              </div>
            )}

            {/* UPI Form */}
            {method === 'upi' && (
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">UPI ID</label>
                <div className="relative">
                  <Icon name="at-sign" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" />
                  <input type="text" placeholder="yourname@upi"
                    value={upi} onChange={e => setUpi(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400" />
                </div>
              </div>
            )}

            {/* Net Banking */}
            {method === 'netbanking' && (
              <div className="grid grid-cols-3 gap-2">
                {['SBI', 'HDFC', 'ICICI', 'Axis', 'Kotak', 'PNB'].map(bank => (
                  <button key={bank}
                    className="border border-gray-200 rounded-xl py-3 text-sm font-semibold text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50 transition-all">
                    {bank}
                  </button>
                ))}
              </div>
            )}

            {/* Security note */}
            <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-gray-300">
              <Icon name="lock" size={12} />
              Simulated payment — no real data stored
            </div>

            {msg && (
              <div className="flex items-center gap-2 bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mt-4 border border-red-100">
                <Icon name="circle-alert" size={15} className="flex-shrink-0" />
                {msg}
              </div>
            )}

            <button onClick={handlePayment} disabled={loading}
              className="w-full mt-5 bg-green-600 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2">
              {loading ? (
                <><svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>Processing...</>
              ) : (
                <><Icon name="shield-check" size={15} />Pay Rs. {Number(amount).toLocaleString()}</>
              )}
            </button>
          </div>
        )}

        {/* Step 3 — Result */}
        {step === 3 && result === 'success' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Icon name="circle-check" size={32} className="text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Donation Successful</h2>
            <p className="text-gray-400 text-sm mb-1">
              You donated <span className="font-semibold text-gray-800">Rs. {Number(amount).toLocaleString()}</span> to
            </p>
            <p className="font-bold text-gray-900 text-base mb-6">{ngo?.name}</p>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 mb-6 text-left space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Transaction Summary</p>
              {[
                { label: 'Organization', value: ngo?.name },
                { label: 'Amount', value: `Rs. ${Number(amount).toLocaleString()}` },
                { label: 'Date', value: new Date().toLocaleDateString('en-IN', { day:'numeric', month:'long', year:'numeric' }) },
                { label: 'Status', value: 'Successful' },
              ].map((row, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-400">{row.label}</span>
                  <span className={`font-medium ${row.label === 'Status' ? 'text-green-600' : 'text-gray-700'}`}>{row.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <Link to="/"
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:border-gray-400 transition-all">
                <Icon name="search" size={14} />
                More NGOs
              </Link>
              <Link to="/dashboard"
                className="flex-1 flex items-center justify-center gap-1.5 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                <Icon name="layout-dashboard" size={14} />
                Dashboard
              </Link>
            </div>
          </div>
        )}

        {step === 3 && result === 'failed' && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <Icon name="circle-x" size={32} className="text-red-500" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Payment Failed</h2>
            <p className="text-gray-400 text-sm mb-6">Your transaction could not be processed. Please try again.</p>
            <div className="flex gap-3">
              <button onClick={() => { setStep(2); setResult(null); setMsg(''); }}
                className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700">
                <Icon name="refresh-cw" size={14} />
                Try Again
              </button>
              <Link to="/"
                className="flex-1 flex items-center justify-center gap-2 border border-gray-200 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:border-gray-400">
                <Icon name="arrow-left" size={14} />
                Go Back
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}