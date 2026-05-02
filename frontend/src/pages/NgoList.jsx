import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../api';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import NgoCard from '../components/NgoCard';

// ── Skeleton ──────────────────────────────────────────────────────────────────
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

// ── Filter Bar ────────────────────────────────────────────────────────────────
function FilterBar({ search, onSearch, causes, selectedCauses, onToggleCause, resultCount, onClear }) {
  const [inputVal, setInputVal] = useState(search);
  const debounceRef = useRef(null);
  const hasActiveFilter = selectedCauses.size > 0 || search.trim() !== '';

  const handleInput = (val) => {
    setInputVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(val), 250);
  };

  const handleClear = () => {
    setInputVal('');
    onClear();
  };

  return (
    <section className="w-full bg-white border-b border-gray-100 sticky top-14 z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Row 1 — Search + active chips + meta */}
        <div className="flex items-center gap-2 py-3 border-b border-gray-100 flex-wrap">

          {/* Search */}
          <div className="relative group flex-shrink-0">
            <Icon
              name="search" size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 pointer-events-none transition-colors"
            />
            <input
              type="text"
              placeholder="Search NGOs or causes…"
              value={inputVal}
              onChange={e => handleInput(e.target.value)}
              className="w-56 pl-9 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-shadow placeholder:text-gray-300"
            />
            {inputVal && (
              <button
                onClick={() => { setInputVal(''); onSearch(''); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors"
                aria-label="Clear search"
              >
                <Icon name="x" size={12} />
              </button>
            )}
          </div>

          {/* Active cause chips */}
          {[...selectedCauses].map(cause => (
            <div key={cause} className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
              <Icon name="tag" size={10} />
              {cause}
              <button
                onClick={() => onToggleCause(cause)}
                className="ml-0.5 hover:text-gray-300 transition-colors"
                aria-label={`Remove ${cause}`}
              >
                <Icon name="x" size={10} />
              </button>
            </div>
          ))}

          {/* Clear all */}
          {hasActiveFilter && (
            <button
              onClick={handleClear}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 flex-shrink-0"
            >
              <Icon name="filter-x" size={12} />
              Clear all
            </button>
          )}

          <div className="flex-1" />

          {/* Result count */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {hasActiveFilter && (
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            )}
            <span className="text-xs font-semibold text-gray-400 tabular-nums">
              {resultCount} <span className="font-normal">NGO{resultCount !== 1 ? 's' : ''}</span>
            </span>
          </div>
        </div>

        {/* Row 2 — Cause pills (multi-select, horizontally scrollable) */}
        <div className="relative">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />
          <div
            className="flex items-center gap-1.5 py-2.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {causes.filter(c => c !== 'All').map(cause => {
              const active = selectedCauses.has(cause);
              return (
                <button
                  key={cause}
                  onClick={() => onToggleCause(cause)}
                  className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  {active && <span className="mr-1 opacity-70">✓</span>}
                  {cause}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NgoList() {
  const [ngos, setNgos]                   = useState([]);
  const [loading, setLoading]             = useState(true);
  const [search, setSearch]               = useState('');
  const [selectedCauses, setSelectedCauses] = useState(new Set());

  useEffect(() => {
    API.get('/api/ngos')
      .then(res => setNgos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const causes = useMemo(
    () => ['All', ...new Set(ngos.map(n => n.cause).filter(Boolean))],
    [ngos]
  );

  const filtered = useMemo(() => ngos.filter(n => {
    const s = search.toLowerCase();
    const matchSearch = !s
      || n.name.toLowerCase().includes(s)
      || n.cause?.toLowerCase().includes(s)
      || n.location?.toLowerCase().includes(s);
    const matchCause = selectedCauses.size === 0 || selectedCauses.has(n.cause);
    return matchSearch && matchCause;
  }), [ngos, search, selectedCauses]);

  const allCampaigns = useMemo(() =>
    ngos.flatMap(n => (n.campaigns || []).map(c => ({ ...c, ngoName: n.name, ngoId: n._id }))).slice(0, 4),
    [ngos]
  );

  const toggleCause = (cause) => {
    setSelectedCauses(prev => {
      const next = new Set(prev);
      if (next.has(cause)) next.delete(cause);
      else next.add(cause);
      return next;
    });
  };

  const handleClear = () => {
    setSearch('');
    setSelectedCauses(new Set());
  };

  return (
    <div className="min-h-screen bg-white w-full flex flex-col">
      <Navbar />

      {/* ── Hero ── */}
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
              <Icon name="shield-check" size={13} />
              Verified Organizations
            </div>
            <h1 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3 leading-tight tracking-tight">
              Discover local NGOs<br />making a difference
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed">
              Browse verified organizations, support campaigns, and donate securely — every rupee tracked.
            </p>
          </div>
        </div>
      </section>

      {/* ── Filter Bar ── */}
      <FilterBar
        search={search}
        onSearch={setSearch}
        causes={causes}
        selectedCauses={selectedCauses}
        onToggleCause={toggleCause}
        resultCount={filtered.length}
        onClear={handleClear}
      />

      {/* ── Main content ── */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 lg:px-10 py-10">

        {/* Active Campaigns */}
        {!loading && allCampaigns.length > 0 && (
          <section className="mb-12" id="campaigns">
            <div className="mb-5">
              <h2 className="text-base font-black text-gray-900">Active Campaigns</h2>
              <p className="text-xs text-green-600 font-medium mt-0.5">Support ongoing initiatives that need your help</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {allCampaigns.map((c, i) => {
                const pct = Math.min(Math.round(((c.raised || 0) / (c.goal || 1)) * 100), 100);
                return (
                  <div key={i} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all group flex flex-col">
                    <div className="h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                      <img
                        src={c.image || `https://picsum.photos/seed/camp${i}/300/150`}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.target.src = `https://picsum.photos/seed/camp${i}/300/150`; }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-1">
                      <p className="text-xs text-green-600 font-semibold mb-1 truncate">{c.ngoName}</p>
                      <h3 className="text-sm font-bold text-gray-900 mb-2.5 line-clamp-2 leading-snug flex-1">{c.title}</h3>
                      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                        <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                      </div>
                      <div className="flex justify-between text-xs text-gray-400 mb-3">
                        <span className="font-bold text-gray-800">₹{(c.raised || 0).toLocaleString('en-IN')}</span>
                        <span>{pct}%</span>
                      </div>
                      <Link
                        to={`/donate/${c.ngoId}/${c._id}`}
                        className="flex items-center justify-center gap-1.5 w-full bg-green-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-700 active:scale-95 transition-all"
                      >
                        <Icon name="heart" size={12} />
                        Donate to Campaign
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* NGO Grid */}
        <section>
          <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
            <Icon name="map-pin" size={13} className="text-green-500 flex-shrink-0" />
            <h2 className="text-xs font-black text-gray-600 uppercase tracking-widest">Local Organizations</h2>
            <span className="text-xs text-gray-300 hidden sm:inline">· Verified NGOs making an impact in your community</span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1,2,3,4,5,6].map(i => <SkeletonCard key={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="w-14 h-14 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Icon name="search-x" size={24} className="text-gray-300" />
              </div>
              <p className="font-bold text-gray-700 text-sm">No NGOs found</p>
              <p className="text-xs text-gray-400 mt-1 mb-5">Try adjusting your search or filter.</p>
              <button
                onClick={handleClear}
                className="text-xs text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50 font-semibold transition-colors"
              >
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
        {!loading && (
          <section className="mt-16 bg-gray-50 border border-gray-100 rounded-2xl p-10 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Icon name="building-2" size={22} className="text-green-600" />
            </div>
            <h3 className="text-lg font-black text-gray-900 mb-2">Are you an NGO?</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto leading-relaxed">
              Join NGO Connect to increase your visibility, manage campaigns, and connect with donors who care about your cause.
            </p>
            <Link to="/register"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all">
              <Icon name="plus-circle" size={16} />
              Register Your Organization
            </Link>
          </section>
        )}
      </div>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-gray-100 mt-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10">
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
                  <li><Link to="/discover" className="hover:text-gray-700 transition-colors">Discover NGOs</Link></li>
                  <li><a href="#campaigns" className="hover:text-gray-700 transition-colors">Active Campaigns</a></li>
                  <li><Link to="/about" className="hover:text-gray-700 transition-colors">How It Works</Link></li>
                </ul>
              </div>
              <div>
                <p className="font-bold text-gray-700 mb-3 uppercase tracking-widest text-xs">Support</p>
                <ul className="space-y-2 text-gray-400">
                  <li><Link to="/contact" className="hover:text-gray-700 transition-colors">Help Center</Link></li>
                  <li><Link to="/contact" className="hover:text-gray-700 transition-colors">Contact Us</Link></li>
                  <li><Link to="/register" className="hover:text-gray-700 transition-colors">For NGOs</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between text-xs text-gray-300 gap-2">
            <span>© 2026 NGO Connect. All rights reserved.</span>
            <div className="flex gap-4">
              <Link to="/privacy" className="hover:text-gray-500 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-gray-500 transition-colors">Terms of Service</Link>
              <a href="#" className="hover:text-gray-500 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}