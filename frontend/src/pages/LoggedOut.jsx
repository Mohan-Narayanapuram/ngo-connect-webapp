import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

export default function LoggedOut() {
return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-center">

    {/* Icon */}
    <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-6">
        <Icon name="log-out" size={28} className="text-gray-400" />
    </div>

    {/* Text */}
    <h1 className="text-xl font-black text-gray-900 mb-2">You've been logged out</h1>
    <p className="text-sm text-gray-400 mb-8 max-w-xs leading-relaxed">
        Thanks for using NGOConnect. You've been signed out successfully.
    </p>

    {/* CTA */}
    <Link
        to="/"
        className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-green-700 active:scale-95 transition-all"
    >
        <Icon name="house" size={15} />
        Return to Home
    </Link>

    {/* Secondary */}
    <div className="mt-4 flex items-center gap-4 text-xs text-gray-400">
        <Link to="/login" className="hover:text-gray-700 transition-colors font-medium">Sign in again</Link>
        <span>·</span>
        <Link to="/discover" className="hover:text-gray-700 transition-colors font-medium">Browse NGOs</Link>
    </div>

    </div>
);
}