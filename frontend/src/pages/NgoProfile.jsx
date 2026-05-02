import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

/* ── Image Carousel ─────────────────────────────────────── */
function ImageCarousel({ images, ngoName, verified }) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  if (total === 1) return (
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-8 bg-gray-100">
      <img src={images[0]} alt={ngoName}
        className="w-full h-full object-cover"
        onError={e => { e.target.src = 'https://picsum.photos/seed/ngo/800/400'; }} />
      {verified && (
        <span className="absolute top-4 right-4 bg-white text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-green-100">
          <Icon name="shield-check" size={13} className="text-green-600" />
          Verified NGO
        </span>
      )}
    </div>
  );

  return (
    <div className="relative rounded-2xl overflow-hidden h-64 md:h-80 mb-8 bg-gray-100 group">
      {/* Slides */}
      {images.map((src, i) => (
        <img key={i} src={src} alt={`${ngoName} ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onError={e => { e.target.src = 'https://picsum.photos/seed/ngo/800/400'; }} />
      ))}

      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Prev */}
      <button onClick={() => setCurrent(p => (p - 1 + total) % total)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
        <Icon name="chevron-left" size={16} className="text-gray-700" />
      </button>

      {/* Next */}
      <button onClick={() => setCurrent(p => (p + 1) % total)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
        <Icon name="chevron-right" size={16} className="text-gray-700" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            className={`rounded-full transition-all ${
              i === current ? 'w-4 h-1.5 bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`} />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-3 left-4 bg-black/40 backdrop-blur-sm text-white text-xs font-semibold px-2.5 py-1 rounded-full">
        {current + 1} / {total}
      </div>

      {/* Verified badge */}
      {verified && (
        <span className="absolute top-3 right-4 bg-white text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5 border border-green-100">
          <Icon name="shield-check" size={13} className="text-green-600" />
          Verified NGO
        </span>
      )}
    </div>
  );
}

/* ── Main Page ───────────────────────────────────────────── */
export default function NgoProfile() {
  const { id }   = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [ngo, setNgo]         = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get(`/api/ngos/${id}`)
      .then(res => setNgo(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

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
        <Link to="/discover" className="text-sm text-green-600 hover:underline">Back to listing</Link>
      </div>
    </div>
  );

  // Build carousel image array: main image + all campaign images
  const carouselImages = [
    ngo.image,
    ...(ngo.campaigns?.map(c => c.image).filter(Boolean) || []),
  ].filter(Boolean);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Back */}
        <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to NGOs
        </Link>

        {/* Hero Carousel */}
        <ImageCarousel
          images={carouselImages}
          ngoName={ngo.name}
          verified={ngo.verified}
        />

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
              {ngo.mission && (
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-4 flex gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Icon name="target" size={15} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">Mission Statement</p>
                    <p className="text-sm text-gray-700 leading-relaxed">{ngo.mission}</p>
                  </div>
                </div>
              )}
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
                  {ngo.campaigns.map((c, i) => {
                    const pct = Math.min(Math.round(((c.raised || 0) / (c.goal || 1)) * 100), 100);
                    return (
                      <div key={c._id || i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                        {c.image && (
                          <img src={c.image} alt={c.title}
                            className="w-full h-40 object-cover"
                            onError={e => { e.target.style.display = 'none'; }} />
                        )}
                        <div className="p-5">
                          <h3 className="font-bold text-gray-900 mb-1 text-sm">{c.title}</h3>
                          <p className="text-sm text-gray-500 mb-4 leading-relaxed">{c.description}</p>

                          {/* Progress bar */}
                          <div className="w-full bg-gray-100 rounded-full h-1.5 mb-2">
                            <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${pct}%` }} />
                          </div>
                          <div className="flex justify-between text-xs text-gray-400 mb-4">
                            <span className="font-semibold text-gray-700">
                              ₹{(c.raised || 0).toLocaleString()} raised
                            </span>
                            <span>{pct}% of ₹{(c.goal || 0).toLocaleString()}</span>
                          </div>

                          <button
                            onClick={() => user ? navigate(`/donate/${ngo._id}/${c._id}`) : navigate('/login')}
                            className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-white bg-green-600 py-2.5 rounded-xl hover:bg-green-700 transition-colors">
                            <Icon name="heart" size={13} />
                            Donate to this Campaign
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT — Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-base font-bold text-gray-900 mb-1">Support this NGO</h2>
              <p className="text-xs text-gray-400 mb-5 leading-relaxed">
                Donate directly to {ngo.name} without targeting a specific campaign.
              </p>

              <button
                onClick={() => user ? navigate(`/donate/${ngo._id}`) : navigate('/login')}
                className="w-full bg-green-600 text-white py-3 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 mb-5">
                <Icon name="heart" size={15} className="text-white" />
                Donate to NGO
              </button>

              {!user && (
                <p className="text-xs text-gray-400 text-center mb-5">
                  <Link to="/login" className="text-green-600 font-medium hover:underline">Sign in</Link>
                  {' '}required to donate
                </p>
              )}

              {/* Trust signals */}
              <div className="pt-4 border-t border-gray-100 space-y-2.5">
                {[
                  { icon: 'shield',       label: 'Secure & transparent' },
                  { icon: 'badge-check',  label: ngo.verified ? 'Verified organization' : 'Pending verification' },
                  { icon: 'indian-rupee', label: '100% goes to the NGO' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                    <Icon name={item.icon} size={13} className="text-green-500 flex-shrink-0" />
                    {item.label}
                  </div>
                ))}
              </div>

              {/* Campaign quick-links */}
              {ngo.campaigns?.length > 0 && (
                <div className="mt-5 pt-5 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 mb-3">Or donate to a campaign:</p>
                  <div className="space-y-2">
                    {ngo.campaigns.map((c, i) => (
                      <button key={c._id || i}
                        onClick={() => user ? navigate(`/donate/${ngo._id}/${c._id}`) : navigate('/login')}
                        className="w-full text-left text-xs px-3 py-2 rounded-lg border border-gray-100 hover:border-green-300 hover:bg-green-50 text-gray-600 hover:text-green-700 transition-all flex items-center justify-between gap-2">
                        <span className="line-clamp-1">{c.title}</span>
                        <Icon name="arrow-right" size={12} className="flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
      <Footer />
    </div>
  );
}