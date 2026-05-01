import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">

        <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-800 mb-6 transition-colors">
          <Icon name="arrow-left" size={15} />
          Back to home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Left Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Get in touch</h1>
            <p className="text-gray-400 text-sm leading-relaxed mb-8">
              Have questions about NGO Connect? Want to register your organization?
              We're here to help.
            </p>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="mail" size={18} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Email us</p>
                  <p className="text-xs text-gray-400 mt-0.5">Our team typically responds within 24 hours</p>
                  <a href="mailto:hello@ngoconnect.org" className="text-sm text-green-600 font-medium mt-1 block hover:underline">
                    hello@ngoconnect.org
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="message-square" size={18} className="text-blue-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">For NGOs</p>
                  <p className="text-xs text-gray-400 mt-0.5">Interested in registering your organization?</p>
                  <a href="mailto:ngos@ngoconnect.org" className="text-sm text-green-600 font-medium mt-1 block hover:underline">
                    ngos@ngoconnect.org
                  </a>
                </div>
              </div>

              <div className="bg-gray-50 border border-gray-100 rounded-xl p-5">
                <p className="font-semibold text-gray-900 text-sm mb-1">Frequently Asked Questions</p>
                <p className="text-xs text-gray-400 leading-relaxed mb-3">
                  Looking for quick answers? Check out our FAQ section for common questions
                  about donations, verification, and how NGO Connect works.
                </p>
                <Link to="/faq"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 border border-gray-200 px-4 py-2 rounded-lg hover:border-green-400 hover:text-green-700 transition-colors">
                  <Icon name="circle-help" size={14} />
                  View FAQ
                </Link>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Send us a message</h2>

            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                  <Icon name="circle-check" size={28} className="text-green-600" />
                </div>
                <p className="font-bold text-gray-900 mb-1">Message sent!</p>
                <p className="text-sm text-gray-400">We'll get back to you within 24 hours.</p>
                <button onClick={() => setSent(false)}
                  className="mt-5 text-sm text-green-600 hover:underline">
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { label: 'Name', key: 'name', type: 'text', placeholder: 'Your name', icon: 'user' },
                  { label: 'Email', key: 'email', type: 'email', placeholder: 'your@email.com', icon: 'mail' },
                  { label: 'Subject', key: 'subject', type: 'text', placeholder: "What's this about?", icon: 'tag' },
                ].map(f => (
                  <div key={f.key}>
                    <label className="block text-xs font-semibold text-gray-600 mb-1.5">{f.label}</label>
                    <div className="relative">
                      <Icon name={f.icon} size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300 pointer-events-none" />
                      <input type={f.type} required placeholder={f.placeholder}
                        value={form[f.key]}
                        onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                        className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent" />
                    </div>
                  </div>
                ))}

                <div>
                  <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
                  <textarea required placeholder="Tell us more..." rows={4}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent resize-none" />
                </div>

                <button type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors">
                  <Icon name="send" size={15} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}