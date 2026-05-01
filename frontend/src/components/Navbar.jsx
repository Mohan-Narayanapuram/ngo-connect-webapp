import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Icon from './Icon';

const NAV_LINKS = [
  { path: '/discover', label: 'Discover' },
  { path: '/about',    label: 'About'    },
  { path: '/contact',  label: 'Contact'  },
];

export default function Navbar() {
  const { user, logout }    = useAuth();
  const navigate            = useNavigate();
  const location            = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isActive = (path) => location.pathname === path;

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target))
        setDropdownOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
    : '?';

  return (
    <>
      <header className={`sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-shadow duration-200 ${scrolled ? 'shadow-sm' : ''}`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <Link to="/" className="flex items-center gap-2.5 flex-shrink-0 group">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <Icon name="heart-handshake" size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm tracking-tight">
                NGO<span className="text-green-600">Connect</span>
              </span>
            </Link>

            {/* ── Desktop Nav Links ── */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ path, label }) => (
                <Link key={path} to={path}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(path)
                      ? 'text-gray-900 bg-gray-100'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'
                  }`}>
                  {label}
                  {isActive(path) && (
                    <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full" />
                  )}
                </Link>
              ))}
            </nav>

            {/* ── Desktop Right Section ── */}
            <div className="hidden md:flex items-center gap-2">
              {user ? (
                <div
                  className="relative"
                  ref={dropdownRef}
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <button
                    onClick={() => setDropdownOpen(o => !o)}
                    className="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all"
                    aria-label="Account menu"
                  >
                    {/* Circle avatar */}
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-sm">
                      <span className="text-white text-xs font-black leading-none">{initials}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      Hi, {user.name.split(' ')[0]}
                    </span>
                    <Icon
                      name="chevron-down"
                      size={12}
                      className={`text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0 top-full pt-1 w-52 z-50">
                      {/* invisible bridge so hover doesn't gap-out */}
                      <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden fade-in">
                        {/* User info */}
                        <div className="px-4 py-3 border-b border-gray-50">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                              <span className="text-white text-xs font-black">{initials}</span>
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-black text-gray-900 truncate">{user.name}</p>
                              <p className="text-xs text-gray-400 truncate">{user.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Menu items */}
                        <div className="p-1">
                          <Link
                            to="/dashboard"
                            onClick={() => setDropdownOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                          >
                            <Icon name="layout-dashboard" size={14} className="text-gray-400" />
                            My Dashboard
                          </Link>
                        </div>

                        <div className="p-1 border-t border-gray-50">
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Icon name="log-out" size={14} />
                            Sign Out
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login"
                    className="px-3.5 py-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register"
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors">
                    Get Started
                    <Icon name="arrow-right" size={13} />
                  </Link>
                </>
              )}
            </div>

            {/* ── Mobile: right side ── */}
            <div className="flex md:hidden items-center gap-2">
              {user && (
                <div className="w-7 h-7 rounded-lg bg-green-600 flex items-center justify-center">
                  <span className="text-white text-xs font-bold leading-none">{initials}</span>
                </div>
              )}
              <button
                onClick={() => setMobileOpen(o => !o)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="Toggle menu">
                <Icon name={mobileOpen ? 'x' : 'menu'} size={18} className="text-gray-600" />
              </button>
            </div>

          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white">
            <div className="max-w-6xl mx-auto px-4 py-3 space-y-1">

              {NAV_LINKS.map(({ path, label }) => (
                <Link key={path} to={path}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                    isActive(path)
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}>
                  {label}
                </Link>
              ))}

              {user ? (
                <>
                  <div className="h-px bg-gray-100 my-2" />
                  {/* User info */}
                  <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">{initials}</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-400">{user.email}</p>
                    </div>
                  </div>
                  <Link to="/dashboard"
                    className="flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    <Icon name="layout-dashboard" size={15} className="text-gray-400" />
                    Dashboard
                  </Link>
                  <button onClick={handleLogout}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Icon name="log-out" size={15} />
                    Sign Out
                  </button>
                </>
              ) : (
                <>
                  <div className="h-px bg-gray-100 my-2" />
                  <Link to="/login"
                    className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                    Sign In
                  </Link>
                  <Link to="/register"
                    className="flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                    Get Started
                    <Icon name="arrow-right" size={13} />
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}