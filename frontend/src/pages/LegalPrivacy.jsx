// LegalPrivacy.jsx

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 lg:px-8 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">
            Legal
          </p>

          <h1 className="text-3xl font-black text-gray-900 mb-3">
            Privacy Policy
          </h1>

          <p className="text-xs text-gray-400">
            Effective date: 1 May 2026 · Last updated: 1 May 2026
          </p>
        </div>

        {/* Academic notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-10">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Academic Project Notice:</span>{' '}
            NGOConnect is a full-stack MERN web application developed for
            educational purposes as part of the course{' '}
            <span className="font-semibold">
              Full Stack Development (21CSS301T)
            </span>.
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              1. Information We Collect
            </h2>

            <p className="text-sm leading-relaxed mb-3">
              NGOConnect may collect the following information when users
              register and interact with the platform:
            </p>

            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'User registration details including name and email address',
                'Encrypted authentication credentials',
                'Donation history and NGO interaction records',
                'Basic application usage data required for platform functionality',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              2. How We Use Your Information
            </h2>

            <p className="text-sm leading-relaxed mb-3">
              Information collected through the platform is used to:
            </p>

            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'Authenticate and manage user accounts',
                'Display NGO and donation-related information',
                'Maintain donation history and dashboard functionality',
                'Improve application performance and user experience',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              3. Data Storage
            </h2>

            <p className="text-sm leading-relaxed">
              Application data is stored using MongoDB database services hosted
              for development and deployment purposes. Reasonable efforts are
              made to protect stored information; however, no system can
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              4. Authentication & Security
            </h2>

            <p className="text-sm leading-relaxed">
              NGOConnect uses JSON Web Tokens (JWT) for authentication and
              bcrypt-based password hashing for credential security. Passwords
              are never stored in plain text.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              5. Data Sharing
            </h2>

            <p className="text-sm leading-relaxed">
              NGOConnect does not sell, trade, or share user information with
              third parties for advertising or marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              6. User Rights
            </h2>

            <p className="text-sm leading-relaxed">
              Users may request modification or deletion of their account-related
              information by contacting the development team. Users are also
              responsible for maintaining the confidentiality of their account
              credentials.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              7. Contact
            </h2>

            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm space-y-2">
              <div>
                <p className="font-semibold text-gray-700">
                  Mohan Narayanapuram (RA2311056010126)
                </p>

                <p className="text-gray-400">
                  SRM Institute of Science and Technology, Kattankulathur
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  D. Pujith Ram Reddy (RA2311056010153)
                </p>

                <p className="text-gray-400">
                  SRM Institute of Science and Technology, Kattankulathur
                </p>
              </div>

              <div className="pt-2">
                <p className="text-gray-400 text-xs">
                  Course: Full Stack Development (21CSS301T)
                </p>

                <p className="text-gray-400 text-xs">
                  Faculty: Dr. Varun P (103189)
                </p>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}