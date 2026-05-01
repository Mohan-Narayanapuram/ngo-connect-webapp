import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
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
  const location = useLocation();

  const [ngos, setNgos]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');

  // ✅ Read cause from URL query param on first render
  const [causeFilter, setCause] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get('cause') || 'All';
  });

  // ✅ Re-sync if user navigates from Home → Discover with a different cause
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cause = params.get('cause');
    if (cause) setCause(cause);
  }, [location.search]);

  useEffect(() => {
    axios.get('/api/ngos')
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

  const allCampaigns = ngos.flatMap(n =>
    (n.campaigns || []).map(c => ({ ...c, ngoName: n.name, ngoId: n._id }))
  ).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-14 lg:py-18">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Icon name="shield-check" size={13} />
              Verified Organizations
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight tracking-tight">
              Discover local NGOs<br />making a difference
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connect with verified organizations in your community. Support campaigns that matter
              and create lasting impact through transparent, secure donations.
            </p>
          </div>
        </div>
      </section>

      {/* Search + Filter */}
      <section className="bg-gray-50 border-b border-gray-100 sticky top-14 z-40">
        <div className="max-w-5xl mx-auto px-6 py-3">
          <div className="flex flex-col gap-3">

            {/* Top row — search + count */}
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Icon name="search" size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search NGOs..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm"
                />
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1.5">
                <Icon name="building-2" size={13} />
                {filtered.length} found
              </span>
              {/* ✅ Show active filter badge + clear button */}
              {causeFilter !== 'All' && (
                <div className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                  {causeFilter}
                  <button onClick={() => setCause('All')} className="hover:text-gray-300 transition-colors">
                    <Icon name="x" size={10} />
                  </button>
                </div>
              )}
            </div>

            {/* Bottom row — filter pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {causes.map(cause => (
                <button
                  key={cause}
                  onClick={() => setCause(cause)}
                  className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all whitespace-nowrap ${
                    causeFilter === cause
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400 hover:text-gray-800'
                  }`}>
                  {cause}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-10">

        {/* Active Campaigns */}
        {!loading && allCampaigns.length > 0 && (
          <section className="mb-12">
            <div className="mb-5">
              <h2 className="text-base font-bold text-gray-900">Active Campaigns</h2>
              <p className="text-xs text-green-600 mt-0.5">Support ongoing initiatives that need your help</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allCampaigns.map((c, i) => (
                <div key={c._id || i} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all group flex flex-col">
                  <Link to={`/ngo/${c.ngoId}`} className="block">
                    <div className="h-32 bg-gray-100 overflow-hidden">
                      <img src={c.image || `https://picsum.photos/seed/camp${i}/300/150`} alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = `https://picsum.photos/seed/camp${i}/300/150`; }} />
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-green-600 font-medium mb-0.5">{c.ngoName}</p>
                      <h3 className="text-xs font-bold text-gray-900 mb-2 line-clamp-2">{c.title}</h3>
                      <div className="w-full bg-gray-100 rounded-full h-1 mb-1.5">
                        <div className="bg-green-500 h-1 rounded-full"
                          style={{ width: `${Math.min(((c.raised||0)/(c.goal||1))*100,100)}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mb-3">
                        <span className="font-semibold text-gray-700">Rs. {(c.raised||0).toLocaleString()}</span>
                        <span>{Math.round(((c.raised||0)/(c.goal||1))*100)}%</span>
                      </div>
                    </div>
                  </Link>

                  {/* Donate to this specific campaign */}
                  <div className="px-3 pb-3 mt-auto">
                    <Link
                      to={`/donate/${c.ngoId}/${c._id}`}
                      className="w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-green-600 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                      <Icon name="heart" size={11} />
                      Donate
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* NGO Grid */}
        <section>
          <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-100">
            <Icon name="map-pin" size={14} className="text-green-500" />
            <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">Local Organizations</h2>
            <span className="text-xs text-gray-400 ml-1">· Verified NGOs making an impact</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1,2,3].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="search-x" size={22} className="text-gray-300" />
              </div>
              <p className="font-semibold text-gray-700 text-sm">No NGOs found</p>
              <p className="text-xs text-gray-400 mt-1 mb-4">Try adjusting your search or filter.</p>
              <button onClick={() => { setSearch(''); setCause('All'); }}
                className="text-xs text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(ngo => <NgoCard key={ngo._id} ngo={ngo} />)}
            </div>
          )}
        </section>

        {/* NGO CTA */}
        <section className="mt-14 bg-gray-50 border border-gray-100 rounded-2xl p-8 text-center">
          <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
            <Icon name="building-2" size={20} className="text-green-600" />
          </div>
          <h3 className="text-base font-bold text-gray-900 mb-1.5">Are you an NGO?</h3>
          <p className="text-gray-400 text-xs mb-5 max-w-sm mx-auto leading-relaxed">
            Join NGO Connect to increase your visibility, manage campaigns, and connect with donors who care about your cause.
          </p>
          <Link to="/register"
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg font-semibold text-xs hover:bg-green-700 transition-colors">
            <Icon name="circle-plus" size={14} />
            Register Your Organization
          </Link>
        </section>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}