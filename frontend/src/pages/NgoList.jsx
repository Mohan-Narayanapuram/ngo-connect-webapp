import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import API from '../api';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import NgoCard from '../components/NgoCard';

const NGOS_INITIAL = 6;
const NGOS_PER_LOAD = 6;

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

  useEffect(() => { setInputVal(search); }, [search]);

  const handleInput = (val) => {
    setInputVal(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => onSearch(val), 250);
  };

  return (
    <section className="w-full bg-white border-b border-gray-100 sticky top-14 z-40 shadow-sm">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Row 1 */}
        <div className="flex items-center gap-2 py-3 border-b border-gray-100 flex-wrap">
          <div className="relative group flex-shrink-0">
            <Icon name="search" size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-green-500 pointer-events-none transition-colors" />
            <input
              type="text"
              placeholder="Search NGOs or causes…"
              value={inputVal}
              onChange={e => handleInput(e.target.value)}
              className="w-56 pl-9 pr-8 py-2 text-xs border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition-shadow placeholder:text-gray-300"
            />
            {inputVal && (
              <button onClick={() => { setInputVal(''); onSearch(''); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-600 transition-colors">
                <Icon name="x" size={12} />
              </button>
            )}
          </div>

          {[...selectedCauses].map(cause => (
            <div key={cause} className="flex items-center gap-1.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
              <Icon name="tag" size={10} />
              {cause}
              <button onClick={() => onToggleCause(cause)} className="ml-0.5 hover:text-gray-300 transition-colors">
                <Icon name="x" size={10} />
              </button>
            </div>
          ))}

          {hasActiveFilter && (
            <button onClick={onClear}
              className="text-xs text-gray-400 hover:text-red-500 transition-colors flex items-center gap-1 flex-shrink-0">
              <Icon name="Funnel-X" size={12} />
              Clear all
            </button>
          )}

          <div className="flex-1" />

          <div className="flex items-center gap-2 flex-shrink-0">
            {hasActiveFilter && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
            <span className="text-xs font-semibold text-gray-400 tabular-nums">
              {resultCount} <span className="font-normal">NGO{resultCount !== 1 ? 's' : ''}</span>
            </span>
          </div>
        </div>

        {/* Row 2 — Cause pills */}
        <div className="relative">
          <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white to-transparent z-10" />
          <div className="flex items-center gap-1.5 py-2.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {causes.filter(c => c !== 'All').map(cause => {
              const active = selectedCauses.has(cause);
              return (
                <button key={cause} onClick={() => onToggleCause(cause)}
                  className={`flex-shrink-0 text-xs px-3.5 py-1.5 rounded-full border font-semibold transition-all whitespace-nowrap ${
                    active
                      ? 'bg-gray-900 text-white border-gray-900 shadow-sm'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400 hover:text-gray-800 hover:bg-gray-50'
                  }`}>
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

// ── Horizontal Campaign Scroll ────────────────────────────────────────────────
function CampaignScroll({ campaigns }) {
  const scrollRef = useRef(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    return () => el.removeEventListener('scroll', updateArrows);
  }, [campaigns]);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  };

  if (!campaigns.length) return null;

  return (
    <section className="w-full border-b border-gray-100 bg-gray-50/40 py-8">
      <div className="max-w-5xl mx-auto px-6 lg:px-10">

        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-sm font-black text-gray-900">Active Campaigns</h2>
            <p className="text-xs text-green-600 font-medium mt-0.5">
              {campaigns.length} ongoing initiative{campaigns.length !== 1 ? 's' : ''} need your help
            </p>
          </div>
          {/* Arrow buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll(-1)}
              disabled={!canLeft}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                canLeft
                  ? 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
                  : 'border-gray-100 text-gray-200 cursor-not-allowed'
              }`}
            >
              <Icon name="chevron-left" size={14} />
            </button>
            <button
              onClick={() => scroll(1)}
              disabled={!canRight}
              className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                canRight
                  ? 'border-gray-300 text-gray-600 hover:border-gray-900 hover:text-gray-900 hover:bg-gray-50'
                  : 'border-gray-100 text-gray-200 cursor-not-allowed'
              }`}
            >
              <Icon name="chevron-right" size={14} />
            </button>
          </div>
        </div>

        {/* Horizontal scroll row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {campaigns.map((c, i) => {
            const pct = Math.min(Math.round(((c.raised || 0) / (c.goal || 1)) * 100), 100);
            return (
              <div key={i}
                className="flex-shrink-0 w-60 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md overflow-hidden transition-all group flex flex-col">
                <div className="h-32 bg-gray-100 overflow-hidden flex-shrink-0">
                  <img
                    src={c.image || `https://picsum.photos/seed/camp${i}/240/128`}
                    alt={c.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={e => { e.target.src = `https://picsum.photos/seed/camp${i}/240/128`; }}
                  />
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <p className="text-[10px] text-green-600 font-bold mb-1 truncate uppercase tracking-wide">{c.ngoName}</p>
                  <h3 className="text-xs font-bold text-gray-900 mb-3 line-clamp-2 leading-snug flex-1">{c.title}</h3>
                  <div className="w-full bg-gray-100 rounded-full h-1 mb-1.5">
                    <div className="bg-green-500 h-1 rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mb-3">
                    <span className="font-bold text-gray-800">₹{(c.raised || 0).toLocaleString('en-IN')}</span>
                    <span>{pct}%</span>
                  </div>
                  <Link to={`/donate/${c.ngoId}/${c._id}`}
                    className="flex items-center justify-center gap-1.5 w-full bg-green-600 text-white text-[11px] font-bold py-2 rounded-xl hover:bg-green-700 active:scale-95 transition-all">
                    <Icon name="heart" size={11} />
                    Donate
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function NgoList() {
  const [searchParams] = useSearchParams();

  const [ngos, setNgos]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch]   = useState('');
  const [selectedCauses, setSelectedCauses] = useState(() => {
    const c = searchParams.get('cause');
    return c ? new Set([c]) : new Set();
  });
  const [ngosVisible, setNgosVisible] = useState(NGOS_INITIAL);

  const urlCauseApplied = useRef(false);

  useEffect(() => {
    API.get('/api/ngos')
      .then(res => setNgos(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const c = searchParams.get('cause');
    if (c && ngos.length > 0 && !urlCauseApplied.current) {
      setSelectedCauses(new Set([c]));
      urlCauseApplied.current = true;
    }
  }, [ngos]);

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

  // Reset visible count when filter changes
  useEffect(() => { setNgosVisible(NGOS_INITIAL); }, [search, selectedCauses]);

  const allCampaigns = useMemo(() =>
    ngos.flatMap(n => (n.campaigns || []).map(c => ({ ...c, ngoName: n.name, ngoId: n._id }))),
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

  const hasActiveFilter = selectedCauses.size > 0 || search.trim() !== '';
  const visibleNgos     = filtered.slice(0, ngosVisible);
  const hasMoreNgos     = ngosVisible < filtered.length;

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

      {/* ── Campaigns horizontal scroll — between filters and NGOs, hidden when filter active ── */}
      {!loading && !hasActiveFilter && <CampaignScroll campaigns={allCampaigns} />}

      {/* ── NGO Grid ── */}
      <div className="flex-1 max-w-5xl mx-auto w-full px-6 lg:px-10 py-10">
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
              <button onClick={handleClear}
                className="text-xs text-green-600 border border-green-200 px-4 py-2 rounded-lg hover:bg-green-50 font-semibold transition-colors">
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {visibleNgos.map(ngo => <NgoCard key={ngo._id} ngo={ngo} />)}
              </div>

              {/* ── View More NGOs button ── */}
              {filtered.length > NGOS_INITIAL && (
                <div className="flex flex-col items-center gap-2 mt-10">
                  {/* progress indicator */}
                  <p className="text-xs text-gray-400 font-medium tabular-nums">
                    Showing <span className="font-black text-gray-700">{Math.min(ngosVisible, filtered.length)}</span> of <span className="font-black text-gray-700">{filtered.length}</span> NGOs
                  </p>
                  <div className="w-48 h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-1 bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${(Math.min(ngosVisible, filtered.length) / filtered.length) * 100}%` }}
                    />
                  </div>

                  {hasMoreNgos ? (
                    <button
                      onClick={() => setNgosVisible(v => v + NGOS_PER_LOAD)}
                      className="mt-2 inline-flex items-center gap-2 bg-white border border-gray-200 hover:border-gray-900 text-gray-600 hover:text-gray-900 font-bold text-xs px-6 py-3 rounded-2xl transition-all hover:shadow-md active:scale-95 group"
                    >
                      <Icon name="chevron-down" size={14} className="group-hover:translate-y-0.5 transition-transform" />
                      Load {Math.min(NGOS_PER_LOAD, filtered.length - ngosVisible)} more NGOs
                    </button>
                  ) : (
                    <button
                      onClick={() => setNgosVisible(NGOS_INITIAL)}
                      className="mt-2 inline-flex items-center gap-2 text-gray-400 hover:text-gray-700 font-semibold text-xs px-6 py-3 rounded-2xl transition-all hover:bg-gray-50 active:scale-95 group"
                    >
                      <Icon name="chevron-up" size={14} className="group-hover:-translate-y-0.5 transition-transform" />
                      Show less
                    </button>
                  )}
                </div>
              )}
            </>
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
              <Icon name="circle-plus" size={16} />
              Register Your Organization
            </Link>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}