import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import NgoCard from '../components/NgoCard';

export default function NgoList() {
  const [ngos, setNgos]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [causeFilter, setCause] = useState('All');

  useEffect(() => {
    axios.get('/api/ngos')
      .then(res => setNgos(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const causes   = ['All', ...new Set(ngos.map(n => n.cause).filter(Boolean))];
  const filtered = ngos.filter(ngo => {
    const matchSearch = ngo.name.toLowerCase().includes(search.toLowerCase()) ||
                        ngo.cause?.toLowerCase().includes(search.toLowerCase());
    const matchCause  = causeFilter === 'All' || ngo.cause === causeFilter;
    return matchSearch && matchCause;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
            <Icon name="shield-check" size={13} />
            Verified Organizations
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
            Discover local NGOs<br className="hidden md:block" /> making a difference
          </h1>
          <p className="text-gray-400 text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Connect with verified organizations in your community. Support campaigns that matter
            and create lasting impact through transparent donations.
          </p>

          {/* Search */}
          <div className="max-w-lg mx-auto relative">
            <Icon name="search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
            <input
              type="text"
              placeholder="Search NGOs or campaigns..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent bg-white shadow-sm"
            />
          </div>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex flex-wrap items-center gap-2">
          {causes.map(cause => (
            <button key={cause} onClick={() => setCause(cause)}
              className={`text-sm px-4 py-1.5 rounded-full border font-medium transition-all ${
                causeFilter === cause
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}>
              {cause}
            </button>
          ))}
          <span className="ml-auto flex items-center gap-1.5 text-sm text-gray-400">
            <Icon name="building-2" size={14} />
            {filtered.length} organizations found
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
          <Icon name="map-pin" size={15} className="text-gray-300" />
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-widest">Local Organizations</h2>
          <span className="text-xs text-gray-400">· Verified NGOs making an impact in your community</span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                <div className="h-48 bg-gray-100 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-gray-100 rounded animate-pulse w-3/4" />
                  <div className="h-3 bg-gray-100 rounded animate-pulse w-1/2" />
                  <div className="h-10 bg-gray-100 rounded animate-pulse" />
                  <div className="h-8 bg-gray-100 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center py-24 text-center">
            <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
              <Icon name="search-x" size={24} className="text-gray-300" />
            </div>
            <p className="text-gray-600 font-semibold">No NGOs found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or filter.</p>
            <button onClick={() => { setSearch(''); setCause('All'); }}
              className="mt-4 text-sm text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(ngo => <NgoCard key={ngo._id} ngo={ngo} />)}
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 bg-gray-900 rounded-2xl p-10 text-center text-white">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="building-2" size={22} className="text-white" />
          </div>
          <h3 className="text-2xl font-bold mb-2">Are you an NGO?</h3>
          <p className="text-gray-400 mb-6 text-sm max-w-md mx-auto">
            Join NGO Connect to increase your visibility, manage campaigns, and connect with donors who care about your cause.
          </p>
          <button className="inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
            <Icon name="plus-circle" size={16} />
            Register Your Organization
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8 text-sm text-gray-400">
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                <Icon name="heart-handshake" size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-900">NGO Connect</span>
            </div>
            <p className="leading-relaxed text-xs">Connecting donors with local NGOs to create meaningful impact. Transparent, accessible, and community-driven.</p>
          </div>
          <div className="flex gap-16">
            <div>
              <p className="font-semibold text-gray-700 mb-3 text-xs uppercase tracking-widest">Platform</p>
              <ul className="space-y-2 text-xs">
                <li><Link to="/" className="hover:text-gray-700">Discover NGOs</Link></li>
                <li><a href="#" className="hover:text-gray-700">Active Campaigns</a></li>
                <li><a href="#" className="hover:text-gray-700">How It Works</a></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-gray-700 mb-3 text-xs uppercase tracking-widest">Support</p>
              <ul className="space-y-2 text-xs">
                <li><a href="#" className="hover:text-gray-700">Help Center</a></li>
                <li><a href="#" className="hover:text-gray-700">Contact Us</a></li>
                <li><a href="#" className="hover:text-gray-700">For NGOs</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-100 flex justify-between text-xs text-gray-300">
          <span>© 2026 NGO Connect. All rights reserved.</span>
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-500">Privacy Policy</a>
            <a href="#" className="hover:text-gray-500">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}