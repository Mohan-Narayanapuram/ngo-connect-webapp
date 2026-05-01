import { Link, useLocation } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

export default function UnderConstruction() {
  const location = useLocation();
  const from = location.state?.from || '/';

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-md w-full text-center">

          {/* Animated icon */}
          <div className="relative w-24 h-24 mx-auto mb-8">
            <div className="absolute inset-0 bg-amber-100 rounded-3xl animate-pulse" />
            <div className="relative w-24 h-24 bg-amber-50 border-2 border-amber-200 rounded-3xl flex items-center justify-center">
              <Icon name="construction" size={40} className="text-amber-500" />
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold px-3 py-1.5 rounded-full mb-5 uppercase tracking-widest">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
            Coming Soon
          </div>

          <h1 className="text-2xl font-black text-gray-900 mb-3 tracking-tight">
            This feature is under development
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed mb-3 max-w-sm mx-auto">
            NGO registration and management is being built. We're working hard to bring it to you soon.
          </p>
          <p className="text-xs text-gray-300 mb-10">
            Part of{' '}
            <span className="font-semibold text-gray-400">Full Stack Development (21CSS301T)</span>
            {' '}· SRM IST, Kattankulathur
          </p>

          {/* Progress bar (decorative) */}
          <div className="bg-gray-100 rounded-full h-1.5 mb-2 max-w-xs mx-auto overflow-hidden">
            <div className="bg-amber-400 h-1.5 rounded-full w-[62%] relative">
              <div className="absolute right-0 top-0 h-full w-4 bg-amber-300 animate-pulse rounded-full" />
            </div>
          </div>
          <p className="text-xs text-gray-300 mb-10">62% complete</p>

          {/* What's coming */}
          <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5 mb-8 text-left">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">What's being built</p>
            <ul className="space-y-2.5">
            {[
              { icon: 'building-2',   label: 'NGO registration & verification' },
              { icon: 'megaphone',    label: 'Campaign creation & management' },
              { icon: 'chart-bar', label: 'Donation analytics dashboard' },
              { icon: 'users',        label: 'Donor connect & communication' },
            ].map(({ icon, label }) => (
              <li key={icon} className="flex items-center gap-3">
                <div className="w-7 h-7 bg-white border border-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={icon} size={13} className="text-gray-400" />
                </div>
                {label}
              </li>
            ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/"
              className="inline-flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
              <Icon name="house" size={14} />
              Back to Home
            </Link>
            <Link to="/discover"
              className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-600 px-6 py-2.5 rounded-xl text-sm font-semibold hover:border-gray-400 transition-colors">
              <Icon name="search" size={14} />
              Discover NGOs
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}