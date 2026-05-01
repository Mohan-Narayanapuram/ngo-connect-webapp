import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-6">
        <div className="w-20 h-20 bg-gray-100 rounded-3xl flex items-center justify-center mb-6">
          <Icon name="file-question" size={36} className="text-gray-300" />
        </div>
        <h1 className="text-6xl font-bold text-gray-900 mb-3">404</h1>
        <p className="text-lg font-semibold text-gray-700 mb-2">Page not found</p>
        <p className="text-sm text-gray-400 mb-8 max-w-sm">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/discover"
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-green-700 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to Home
        </Link>
      </div>
    </div>
  );
}