import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../api';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

export default function NgoProfile() {
  const { id }      = useParams();
  const navigate    = useNavigate();

  const [ngo,     setNgo]     = useState(null);
  const [loading, setLoading] = useState(true);
  const [slideIdx, setSlideIdx] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    API.get(`/api/ngos/${id}`)
      .then(res => setNgo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  // Build slides: NGO image + campaign images
  const slides = ngo
    ? [
        ngo.image || `https://picsum.photos/seed/${ngo._id}/1200/300`,
        ...(ngo.campaigns || []).filter(c => c.image).map(c => c.image).slice(0, 4),
      ]
    : [];

  // Auto-advance carousel
  useEffect(() => {
    if (slides.length <= 1) return;
    timerRef.current = setInterval(() => {
      setSlideIdx(i => (i + 1) % slides.length);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  const goTo = (i) => {
    clearInterval(timerRef.current);
    setSlideIdx(i);
    timerRef.current = setInterval(() => {
      setSlideIdx(prev => (prev + 1) % slides.length);
    }, 3500);
  };

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full px-6 lg:px-10 py-10 space-y-6">
        <div className="h-8 skeleton w-32 rounded-lg" />
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

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="max-w-5xl mx-auto w-full px-6 lg:px-10">

        {/* ── Back button ── */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-400 hover:text-gray-700 transition-colors mt-6 mb-4 group"
        >
          <Icon name="arrow-left" size={13} className="group-hover:-translate-x-0.5 transition-transform" />
          Back to Discover
        </button>

        {/* ── Hero Carousel ── */}
        <div className="w-full h-56 bg-gray-100 relative overflow-hidden rounded-2xl mb-6 group">

          {slides.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`${ngo.name} image ${i + 1}`}
              onError={e => { e.target.src = `https://picsum.photos/seed/${ngo._id}${i}/1200/300`; }}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                i === slideIdx ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

          {/* Verified badge */}
          {ngo.verified && (
            <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 border border-green-100 shadow-sm">
              <Icon name="badge-check" size={12} className="text-green-600" />
              Verified NGO
            </span>
          )}

          {/* Prev / Next arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={() => goTo((slideIdx - 1 + slides.length) % slides.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Previous image"
              >
                <Icon name="chevron-left" size={14} className="text-gray-700" />
              </button>
              <button
                onClick={() => goTo((slideIdx + 1) % slides.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                aria-label="Next image"
              >
                <Icon name="chevron-right" size={14} className="text-gray-700" />
              </button>
            </>
          )}

          {/* Dot indicators */}
          {slides.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === slideIdx
                      ? 'w-5 h-1.5 bg-white'
                      : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start pb-16">

          {/* ── Left column ── */}
          <div className="flex-1 min-w-0">

            {/* Identity card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 flex-shrink-0">
                  <Icon name="building-2" size={24} className="text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl font-black text-gray-900 leading-tight mb-2">{ngo.name}</h1>
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
            <div className="mb-6" id="campaigns-section">
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
                    const pct = Math.min(Math.round(((c.raised || 0) / (c.goal || 1)) * 100), 100);
                    return (
                      <div key={c._id || i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col">
                        {c.image && (
                          <div className="h-28 rounded-lg overflow-hidden mb-3 bg-gray-100">
                            <img
                              src={c.image} alt={c.title}
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

          {/* ── Right column — CTA widget ── */}
          <div className="w-full lg:w-72 flex-shrink-0 sticky top-20">
            <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-5">

              {/* NGO identity summary */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center border border-green-100 flex-shrink-0">
                  <Icon name="building-2" size={18} className="text-green-600" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-900 truncate">{ngo.name}</p>
                  {ngo.cause && (
                    <p className="text-xs text-green-600 font-medium truncate">{ngo.cause}</p>
                  )}
                </div>
              </div>

              <h2 className="text-sm font-black text-gray-900 mb-1">Make a Difference</h2>
              <p className="text-xs text-gray-400 mb-4 leading-relaxed">
                Support {ngo.name} and help them create lasting impact in your community.
              </p>

              {/* Primary CTA — goes to DonatePage */}
              <button
                onClick={() => navigate(`/donate/${ngo._id}`)}
                className="w-full flex items-center justify-center gap-2 bg-green-600 text-white text-xs font-bold py-3 rounded-xl hover:bg-green-700 active:scale-95 transition-all mb-2"
              >
                <Icon name="heart" size={13} />
                Donate to {ngo.name}
              </button>

              {/* Scroll to campaigns */}
              {ngo.campaigns?.length > 0 && (
                <button
                  onClick={() => document.getElementById('campaigns-section')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-gray-600 border border-gray-200 py-2.5 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all"
                >
                  <Icon name="megaphone" size={12} className="text-green-500" />
                  View {ngo.campaigns.length} Campaign{ngo.campaigns.length !== 1 ? 's' : ''}
                </button>
              )}

              {/* Trust badges */}
              <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
                {[
                  { icon: 'shield-check', text: 'Verified organization' },
                  { icon: 'lock',         text: 'Secure payment'        },
                  { icon: 'receipt',      text: 'Every rupee tracked'   },
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