import { Link, useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function NgoCard({ ngo }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col group">

      {/* Image */}
      <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
        <img
          src={ngo.image}
          alt={ngo.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={e => { e.target.src = 'https://placehold.co/400x200/f3f4f6/9ca3af?text=NGO'; }}
        />
        {ngo.verified && (
          <span className="absolute top-3 right-3 bg-white text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm flex items-center gap-1 border border-green-100">
            <Icon name="badge-check" size={12} className="text-green-600" />
            Verified
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-gray-900 mb-1 leading-snug">{ngo.name}</h3>

        <p className="text-xs text-gray-400 mb-3 flex items-center gap-1.5">
          <Icon name="map-pin" size={12} className="text-gray-300 flex-shrink-0" />
          {ngo.location}
        </p>

        <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {ngo.description}
        </p>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs bg-blue-50 text-blue-600 px-2.5 py-1 rounded-full font-medium border border-blue-100">
            {ngo.cause}
          </span>
          <span className="flex items-center gap-1 text-xs text-gray-400">
            <Icon name="megaphone" size={11} className="text-gray-300" />
            {ngo.campaigns?.length || 0} campaign{ngo.campaigns?.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex gap-2 mt-auto">
          <Link to={`/ngo/${ngo._id}`}
            className="flex-1 text-center text-sm font-medium text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:border-gray-400 hover:text-gray-900 transition-all">
            View Details
          </Link>
          <button
            onClick={() => navigate(`/ngo/${ngo._id}`)}
            className="flex-1 flex items-center justify-center gap-1.5 text-sm font-medium text-white bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            <Icon name="heart" size={13} />
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}