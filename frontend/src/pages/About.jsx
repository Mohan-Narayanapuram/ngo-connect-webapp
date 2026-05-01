import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-8">

        <Link to="/discover" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to home
        </Link>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">About NGO Connect</h1>
          <p className="text-gray-500 text-base leading-relaxed mb-10">
            NGO Connect is a platform dedicated to bridging the gap between donors and non-governmental
            organizations. We believe in the power of local action and the importance of making charitable
            giving transparent, accessible, and impactful.
          </p>

          {/* Mission / Vision / Values grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {[
              { icon: 'heart', title: 'Our Mission', desc: 'To empower local NGOs with digital visibility and connect them with donors who share their vision for positive change.' },
              { icon: 'target', title: 'Our Vision', desc: 'A world where every organization, regardless of size, has the tools and connections needed to create meaningful impact.' },
              { icon: 'shield-check', title: 'Transparency', desc: 'We verify organizations and ensure donors have clear visibility into how their contributions are being used.' },
              { icon: 'users', title: 'Community Focus', desc: 'We prioritize local NGOs that often lack digital presence but are making real differences in their communities.' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <div className="w-9 h-9 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={item.icon} size={18} className="text-green-600" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Why NGO Connect?</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Many small and local NGOs struggle with digital visibility. They do incredible work but lack
            the resources to build an online presence. At the same time, donors want to support local
            causes but don't know where to start.
          </p>
          <p className="text-gray-500 text-sm leading-relaxed mb-10">
            NGO Connect solves both problems. We provide NGOs with a professional platform to showcase
            their work and manage campaigns, while giving donors an easy way to discover verified
            organizations and track the impact of their contributions.
          </p>

          <h2 className="text-xl font-bold text-gray-900 mb-4">Our Commitment</h2>
          <div className="space-y-3 mb-8">
            {[
              'Every NGO is manually verified before listing',
              'Donation records are transparent and accessible to donors',
              '100% of donations go directly to the chosen NGO',
              'We never sell donor data to third parties',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-gray-600">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="check" size={11} className="text-green-600" />
                </div>
                {item}
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <Link to="/discover"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors">
              <Icon name="search" size={15} />
              Discover NGOs
            </Link>
            <Link to="/contact"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-lg text-sm font-semibold hover:border-gray-400 transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}