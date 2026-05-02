import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import NgoCard from '../components/NgoCard';

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="h-48 skeleton" />
      <div className="p-5 space-y-3">
        <div className="h-4 skeleton w-3/4" />
        <div className="h-3 skeleton w-1/2" />
        <div className="h-12 skeleton" />
        <div className="h-8 skeleton" />
      </div>
    </div>
  );
}

export default function NgoList() {
  const [ngos, setNgos]         = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [causeFilter, setCause] = useState('All');

  useEffect(() => {
    API.get('/api/ngos')
      .then(res => setNgos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const causes   = ['All', ...new Set(ngos.map(n => n.cause).filter(Boolean))];
  const filtered = ngos.filter(n => {
    const s = search.toLowerCase();
    const matchSearch = n.name.toLowerCase().includes(s) || n.cause?.toLowerCase().includes(s);
    const matchCause  = causeFilter === 'All' || n.cause === causeFilter;
    return matchSearch && matchCause;
  });

  // All campaigns flattened for active campaigns section
  const allCampaigns = ngos.flatMap(n =>
    (n.campaigns || []).map(c => ({ ...c, ngoName: n.name, ngoId: n._id }))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="w-full px-6 lg:px-10 py-16 lg:py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Icon name="shield-check" size={13} />
              Verified Organizations
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-5 leading-tight tracking-tight">
              Discover local NGOs<br />making a difference
            </h1>
            <p className="text-gray-400 text-base leading-relaxed max-w-lg">
              Connect with verified organizations in your community. Support campaigns that matter
              and create lasting impact through transparent, secure donations.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="w-full bg-gray-50 border-b border-gray-100 sticky top-16 z-40">
        <div className="w-full px-6 lg:px-10 py-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
            <div className="relative flex-1 max-w-md">
              <Icon name="search" size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
              <input type="text" placeholder="Search NGOs or campaigns..."
                value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm" />
            </div>
            <div className="flex gap-2 flex-wrap">
              {causes.map(cause => (
                <button key={cause} onClick={() => setCause(cause)}
                  className={`text-xs px-4 py-2 rounded-full border font-semibold transition-all ${
                    causeFilter === cause
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                  }`}>
                  {cause}
                </button>
              ))}
            </div>
            <span className="text-xs text-gray-400 flex items-center gap-1.5 ml-auto flex-shrink-0">
              <Icon name="building-2" size={13} />
              {filtered.length} found
            </span>
          </div>
        </div>
      </section>

      <div className="w-full px-6 lg:px-10 py-10">

        {/* Active Campaigns */}
        {!loading && allCampaigns.length > 0 && (
          <section className="mb-12">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-gray-900">Active Campaigns</h2>
              <p className="text-sm text-green-600 mt-0.5">Support ongoing initiatives that need your help</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allCampaigns.map((c, i) => (
                <Link to={`/ngo/${c.ngoId}`} key={i}
                  className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all group">
                  <div className="h-36 bg-gray-100 overflow-hidden">
                    <img src={c.image || `https://picsum.photos/seed/camp${i}/300/150`} alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.target.src = `https://picsum.photos/seed/camp${i}/300/150`; }} />
                  </div>
                  <div className="p-4">
                    <p className="text-xs text-green-600 font-medium mb-1">{c.ngoName}</p>
                    <h3 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{c.title}</h3>
                    <div className="w-full bg-gray-100 rounded-full h-1 mb-2">
                      <div className="bg-green-500 h-1 rounded-full"
                        style={{ width: `${Math.min(((c.raised||0)/(c.goal||1))*100,100)}%` }} />
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <span className="font-semibold text-gray-700">
                        Rs. {(c.raised||0).toLocaleString()}
                      </span>
                      <span>{Math.round(((c.raised||0)/(c.goal||1))*100)}% of Rs. {(c.goal||0).toLocaleString()}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* NGO Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Icon name="map-pin" size={15} className="text-green-500" />
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest">Local Organizations</h2>
            <span className="text-xs text-gray-400 ml-1">· Verified NGOs making an impact in your community</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="search-x" size={24} className="text-gray-300" />
              </div>
              <p className="font-semibold text-gray-700">No NGOs found</p>
              <p className="text-sm text-gray-400 mt-1 mb-5">Try adjusting your search or filter.</p>
              <button onClick={() => { setSearch(''); setCause('All'); }}
                className="text-sm text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(ngo => <NgoCard key={ngo._id} ngo={ngo} />)}
            </div>
          )}
        </section>

        {/* Are you an NGO? CTA */}
        <section className="mt-16 bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
          <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
            <Icon name="building-2" size={22} className="text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Are you an NGO?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Join NGO Connect to increase your visibility, manage campaigns, and connect with donors
            who care about your cause.
          </p>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors">
            <Icon name="plus-circle" size={16} />
            Register Your Organization
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-12">
        <div className="w-full px-6 lg:px-10 py-12">
          <div className="flex flex-col md:flex-row justify-between gap-10">
            <div className="max-w-xs">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center">
                  <Icon name="heart-handshake" size={14} className="text-white" />
                </div>
                <span className="font-bold text-gray-900">NGO Connect</span>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                Connecting donors with local NGOs to create meaningful impact. Transparent, accessible, and community-driven.
              </p>
            </div>
            <div className="flex gap-16 text-xs">
              <div>
                <p className="font-bold text-gray-700 mb-3 uppercase tracking-widest text-xs">Platform</p>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/discover" className="hover:text-gray-700">Discover NGOs</Link></li>
                  <li><a href="#" className="hover:text-gray-700">Active Campaigns</a></li>
                  <li><Link to="/about" className="hover:text-gray-700">How It Works</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3 uppercase tracking-widest text-xs">Support</p>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/contact" className="hover:text-gray-700">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-700">Contact Us</Link></li>
                  <li><Link to="/register" className="hover:text-gray-700">For NGOs</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between text-xs text-gray-300 gap-2">
            <span>© 2026 NGO Connect. All rights reserved.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-gray-500">Privacy Policy</a>
              <a href="#" className="hover:text-gray-500">Terms of Service</a>
              <a href="#" className="hover:text-gray-500">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}