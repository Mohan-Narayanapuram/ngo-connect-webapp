import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function NgoCard({ ngo }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col group">
      
      {/* Image */}
      <div className="relative h-48 bg-gray-100 overflow-hidden flex-shrink-0">
        <img
          src={ngo.image}
          alt={ngo.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = `https://picsum.photos/seed/${ngo._id}/400/200`; }}
        />
        {/* Cause badge */}
        <span className="absolute bottom-3 left-3 text-xs font-semibold bg-white/95 backdrop-blur-sm text-green-700 border border-green-100 px-2.5 py-1 rounded-full">
          {ngo.cause}
        </span>
        {ngo.verified && (
          <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-green-100 shadow-sm">
            <Icon name="badge-check" size={11} className="text-green-600" />
            Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-sm font-bold text-gray-900 leading-snug mb-1.5 line-clamp-2">
          {ngo.name}
        </h3>

        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1">
          <Icon name="map-pin" size={11} className="text-gray-300 flex-shrink-0" />
          <span className="line-clamp-1">{ngo.location}</span>
        </p>

        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {ngo.description}
        </p>

        {/* Campaign count */}
        {ngo.campaigns?.length > 0 && (
          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <Icon name="megaphone" size={11} className="text-green-400" />
              {ngo.campaigns.length} active campaign{ngo.campaigns.length !== 1 ? 's' : ''}
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link
            to={`/ngo/${ngo._id}`}
            className="flex-1 text-center text-xs font-semibold text-gray-600 border border-gray-200 px-3 py-2 rounded-xl hover:border-gray-400 hover:text-gray-900 hover:bg-gray-50 transition-all"
          >
            View Profile
          </Link>
          <button
            onClick={() => navigate(`/donate/${ngo._id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-green-600 px-3 py-2 rounded-xl hover:bg-green-700 active:scale-95 transition-all"
          >
            <Icon name="heart" size={12} />
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}