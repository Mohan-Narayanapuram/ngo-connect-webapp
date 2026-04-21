import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="w-full border-b border-gray-100 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <Icon name="heart-handshake" size={16} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 tracking-tight">
            NGO <span className="text-green-600">Connect</span>
          </span>
        </Link>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-500 font-medium">
          <Link to="/" className="hover:text-gray-900 transition-colors">Discover</Link>
          <Link to="/about" className="hover:text-gray-900 transition-colors">About</Link>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact</Link>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link to="/dashboard"
                className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                <Icon name="layout-dashboard" size={15} />
                Dashboard
              </Link>
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon name="user" size={12} className="text-green-700" />
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
              <button onClick={() => { logout(); navigate('/'); }}
                className="flex items-center gap-1.5 text-sm text-gray-500 border border-gray-200 px-3 py-1.5 rounded-lg hover:border-gray-300 hover:text-gray-800 transition-all">
                <Icon name="log-out" size={14} />
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/login"
                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors px-3 py-1.5">
                Sign In
              </Link>
              <Link to="/register"
                className="flex items-center gap-1.5 text-sm bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 font-medium transition-colors">
                <Icon name="arrow-right" size={14} />
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}