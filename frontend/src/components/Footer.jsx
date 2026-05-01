import { Link } from 'react-router-dom';
import Icon from './Icon';

const FOOTER_LINKS = {
  Platform: [
    { label: 'Discover NGOs', to: '/discover'     },
    { label: 'How It Works',  to: '/about'         },
    { label: 'Register NGO',  to: '/register-ngo'  },
  ],
  Support: [
    { label: 'Help Center', to: '/faq'         },
    { label: 'Contact Us',  to: '/contact'     },
    { label: 'For NGOs',    to: '/register-ngo' },
  ],
};

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-gray-100 mt-auto">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">

        {/* Main footer content */}
        <div className="py-10 flex flex-col md:flex-row justify-between gap-10">

          {/* Brand column */}
          <div className="max-w-xs">
            <Link to="/" className="flex items-center gap-2 mb-3 group w-fit">
              <div className="w-7 h-7 bg-green-600 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105">
                <Icon name="heart-handshake" size={14} className="text-white" />
              </div>
              <span className="font-bold text-gray-900 text-sm">
                NGO<span className="text-green-600">Connect</span>
              </span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed mb-4">
              Connecting donors with verified NGOs across India. Every rupee is tracked and goes directly to the cause.
            </p>
            {/* Trust badges */}
            <div className="flex items-center gap-1.5">
              <span className="inline-flex items-center gap-1 text-xs text-green-700 bg-green-50 border border-green-100 px-2 py-1 rounded-full font-medium">
                <Icon name="shield-check" size={10} />
                Verified NGOs
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-1 rounded-full font-medium">
                <Icon name="lock" size={10} />
                Secure
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="flex gap-12 sm:gap-16 text-xs">
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <p className="font-bold text-gray-700 mb-3 uppercase tracking-widest text-xs">
                  {section}
                </p>
                <ul className="space-y-2.5">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to}
                        className="text-gray-400 hover:text-gray-800 transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} NGOConnect. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy"  className="text-xs text-gray-300 hover:text-gray-500 transition-colors">Privacy Policy</Link>
            <Link to="/terms"    className="text-xs text-gray-300 hover:text-gray-500 transition-colors">Terms of Service</Link>
            <Link to="/cookies"  className="text-xs text-gray-300 hover:text-gray-500 transition-colors">Cookie Policy</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}