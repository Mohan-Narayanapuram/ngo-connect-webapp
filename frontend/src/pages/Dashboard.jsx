import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile]     = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading]     = useState(true);

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    const headers = { Authorization: `Bearer ${user.token}` };
    Promise.all([
      axios.get('/api/users/me',        { headers }),
      axios.get('/api/users/donations', { headers }),
    ])
      .then(([p, d]) => { setProfile(p.data); setDonations(d.data); })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [user]);

  const totalDonated  = donations.reduce((sum, d) => sum + d.amount, 0);
  const ngosSupported = new Set(donations.map(d => d.ngoId?._id)).size;

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-4">
        {[1,2,3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />)}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-400 mt-0.5">Welcome back, {user?.name}</p>
          </div>
          <Link to="/"
            className="inline-flex items-center gap-2 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium">
            <Icon name="search" size={14} />
            Discover NGOs
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Donated', value: `Rs. ${totalDonated.toLocaleString()}`, icon: 'indian-rupee', color: 'text-green-600', bg: 'bg-green-50' },
            { label: 'NGOs Supported', value: ngosSupported, icon: 'building-2', color: 'text-blue-600', bg: 'bg-blue-50' },
            { label: 'Donations Made', value: donations.length, icon: 'heart', color: 'text-rose-500', bg: 'bg-rose-50' },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex items-center gap-4">
              <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                <Icon name={stat.icon} size={18} className={stat.color} />
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="receipt-text" size={16} className="text-gray-400" />
              <h2 className="text-sm font-bold text-gray-900">Donation History</h2>
            </div>
            <span className="text-xs text-gray-400">{donations.length} records</span>
          </div>

          {donations.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center px-6">
              <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-3">
                <Icon name="heart" size={22} className="text-gray-200" />
              </div>
              <p className="font-semibold text-gray-600 text-sm">No donations yet</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">Support an NGO to see your history here.</p>
              <Link to="/" className="inline-flex items-center gap-2 bg-green-600 text-white text-sm px-5 py-2 rounded-lg hover:bg-green-700">
                <Icon name="search" size={14} />
                Browse NGOs
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {/* Table header */}
              <div className="grid grid-cols-12 px-6 py-2 bg-gray-50 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                <span className="col-span-5">Organization</span>
                <span className="col-span-3">Date</span>
                <span className="col-span-2 text-right">Amount</span>
                <span className="col-span-2 text-right">Status</span>
              </div>
              {donations.map((d, i) => (
                <div key={i} className="grid grid-cols-12 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="col-span-5 flex items-center gap-3">
                    <img src={d.ngoId?.image} alt={d.ngoId?.name}
                      className="w-9 h-9 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                      onError={e => { e.target.style.display='none'; }} />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{d.ngoId?.name || 'NGO'}</p>
                      <p className="text-xs text-gray-400 truncate">{d.ngoId?.cause}</p>
                    </div>
                  </div>
                  <span className="col-span-3 text-xs text-gray-500">
                    {new Date(d.date).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                  </span>
                  <span className="col-span-2 text-right text-sm font-bold text-gray-900">
                    Rs. {d.amount.toLocaleString()}
                  </span>
                  <div className="col-span-2 flex justify-end">
                    <span className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full border border-green-100 font-medium">
                      <Icon name="check" size={10} />
                      Success
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Account Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center gap-2 mb-5">
            <Icon name="user-circle" size={16} className="text-gray-400" />
            <h2 className="text-sm font-bold text-gray-900">Account Details</h2>
          </div>
          <div className="space-y-3">
            {[
              { label: 'Full Name', value: profile?.name, icon: 'user' },
              { label: 'Email Address', value: profile?.email, icon: 'mail' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Icon name={item.icon} size={14} className="text-gray-300" />
                  {item.label}
                </div>
                <span className="text-sm font-medium text-gray-800">{item.value}</span>
              </div>
            ))}
          </div>
          <button onClick={() => { logout(); navigate('/'); }}
            className="mt-5 w-full flex items-center justify-center gap-2 text-sm text-red-500 border border-red-100 py-2.5 rounded-xl hover:bg-red-50 transition-colors font-medium">
            <Icon name="log-out" size={15} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}