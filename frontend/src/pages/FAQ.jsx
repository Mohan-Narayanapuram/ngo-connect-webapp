import { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

const FAQS = [
  {
    category: 'Donations',
    icon: 'indian-rupee',
    color: 'bg-green-50 text-green-600',
    items: [
      {
        q: 'How do I make a donation?',
        a: 'Browse NGOs on the Discover page, click on any organization or campaign, and click "Donate Now". You can choose a preset amount or enter a custom amount, then complete payment via card, UPI, net banking, or wallet.',
      },
      {
        q: 'Is my donation secure?',
        a: '100% of your donation goes directly to the chosen NGO. All transactions are encrypted and processed securely. You will receive an email receipt within 24 hours of your donation.',
      },
      {
        q: 'Can I donate to a specific campaign?',
        a: 'Yes! Each NGO has individual campaigns. You can donate to a specific campaign from the NGO profile page, and your donation will be tracked toward that campaign\'s goal.',
      },
      {
        q: 'Will I get a receipt for my donation?',
        a: 'Yes, an email receipt is automatically sent to your registered email within 24 hours. You can also view all your donation history in your Dashboard.',
      },
      {
        q: 'What payment methods are accepted?',
        a: 'We accept Credit/Debit cards, UPI (Google Pay, PhonePe, Paytm), Net Banking from all major Indian banks, and digital wallets.',
      },
    ],
  },
  {
    category: 'NGO Verification',
    icon: 'shield-check',
    color: 'bg-blue-50 text-blue-600',
    items: [
      {
        q: 'How are NGOs verified?',
        a: 'Every NGO on NGO Connect is manually reviewed by our team before being listed. We verify legal registration (80G/12A certificates), organizational legitimacy, and active operations.',
      },
      {
        q: 'What does the "Verified" badge mean?',
        a: 'The green Verified badge means the NGO has been reviewed and approved by NGO Connect. We have confirmed their registration documents, operational history, and financial transparency.',
      },
      {
        q: 'How do I register my NGO on NGO Connect?',
        a: 'Click "Register my NGO" on the sign-up page and complete your organization profile. Our team will review your documents within 3-5 business days. You can also email ngos@ngoconnect.org.',
      },
    ],
  },
  {
    category: 'Account & Dashboard',
    icon: 'layout-dashboard',
    color: 'bg-purple-50 text-purple-600',
    items: [
      {
        q: 'How do I view my donation history?',
        a: 'Sign in and go to your Dashboard. The "Donation History" section shows all your past donations with dates, amounts, and which NGO received them.',
      },
      {
        q: 'Can I donate without creating an account?',
        a: 'Currently, an account is required to donate so we can send you receipts and track your giving history. Registration is free and takes less than a minute.',
      },
      {
        q: 'How do I update my account details?',
        a: 'Go to Dashboard → Account Details. You can update your name and email from there. For password changes, use the "Forgot Password" option on the Sign In page.',
      },
    ],
  },
  {
    category: 'Privacy & Data',
    icon: 'lock',
    color: 'bg-orange-50 text-orange-500',
    items: [
      {
        q: 'Is my personal data safe?',
        a: 'Yes. We never sell donor data to third parties. Your personal information is used only to process donations, send receipts, and improve your experience on NGO Connect.',
      },
      {
        q: 'Do NGOs see my personal details?',
        a: 'NGOs receive aggregated donation data (total amounts, number of donors) but do not see your personal email or contact details unless you explicitly choose to share them.',
      },
    ],
  },
];

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-4 text-left hover:text-green-700 transition-colors group">
        <span className={`text-sm font-semibold leading-relaxed ${open ? 'text-green-700' : 'text-gray-900'}`}>
          {q}
        </span>
        <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all mt-0.5 ${
          open ? 'border-green-500 bg-green-500' : 'border-gray-300 group-hover:border-green-400'
        }`}>
          <Icon
            name={open ? 'minus' : 'plus'}
            size={10}
            className={open ? 'text-white' : 'text-gray-400 group-hover:text-green-500'}
          />
        </div>
      </button>
      {open && (
        <div className="pb-4 pr-8">
          <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...FAQS.map(f => f.category)];
  const visible = activeCategory === 'All'
    ? FAQS
    : FAQS.filter(f => f.category === activeCategory);

  const totalQuestions = FAQS.reduce((sum, f) => sum + f.items.length, 0);

  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />

      {/* Hero */}
      <section className="w-full bg-gray-50 border-b border-gray-100">
        <div className="w-full max-w-6xl mx-auto px-8 lg:px-12 py-12">
          <Link to="/contact"
            className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
            <Icon name="arrow-left" size={15} />
            Back to Contact
          </Link>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-4 border border-green-200">
                <Icon name="circle-help" size={14} />
                Help Center
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-2">Frequently Asked Questions</h1>
              <p className="text-gray-400 text-sm">
                {totalQuestions} answers to common questions about NGO Connect.
              </p>
            </div>
            <Link to="/contact"
              className="inline-flex items-center gap-2 border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl text-sm font-semibold hover:border-green-400 hover:text-green-700 transition-colors self-start lg:self-auto flex-shrink-0">
              <Icon name="mail" size={14} />
              Still have questions?
            </Link>
          </div>
        </div>
      </section>

      <div className="w-full max-w-6xl mx-auto px-8 lg:px-12 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

          {/* Sidebar — Category filter */}
          <aside className="lg:col-span-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Categories</p>
            <nav className="space-y-1">
              {categories.map(cat => (
                <button key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-green-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}>
                  {cat}
                </button>
              ))}
            </nav>

            {/* Contact CTA */}
            <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-5">
              <div className="w-9 h-9 bg-green-100 rounded-xl flex items-center justify-center mb-3">
                <Icon name="message-circle" size={18} className="text-green-600" />
              </div>
              <p className="text-sm font-bold text-gray-900 mb-1">Can't find an answer?</p>
              <p className="text-xs text-gray-500 mb-3 leading-relaxed">
                Our team typically responds within 24 hours.
              </p>
              <Link to="/contact"
                className="block text-center bg-green-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-green-700 transition-colors">
                Contact us
              </Link>
            </div>
          </aside>

          {/* FAQ list */}
          <div className="lg:col-span-3 space-y-6">
            {visible.map((section, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                {/* Section header */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50">
                  <div className={`w-8 h-8 ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Icon name={section.icon} size={15} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900 text-sm">{section.category}</h2>
                    <p className="text-xs text-gray-400">{section.items.length} questions</p>
                  </div>
                </div>

                {/* Questions */}
                <div className="px-6">
                  {section.items.map((item, j) => (
                    <FaqItem key={j} q={item.q} a={item.a} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}