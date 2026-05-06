// LegalCookies.jsx

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function CookiePolicy() {
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
            Cookie Policy
          </h1>

          <p className="text-xs text-gray-400">
            Effective date: 1 May 2026 · Last updated: 1 May 2026
          </p>
        </div>

        {/* Academic notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-10">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Academic Project Notice:</span>{' '}
            NGOConnect uses minimal browser storage and authentication tokens
            required for core platform functionality. The platform does not use
            advertising, behavioural tracking, or third-party marketing cookies.
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              1. What Are Cookies?
            </h2>

            <p className="text-sm leading-relaxed">
              Cookies are small pieces of data stored in your browser by websites
              you visit. They are commonly used to remember user preferences,
              manage sessions, and improve user experience. NGOConnect uses only
              the minimum storage necessary for authentication and essential
              platform functionality.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              2. How We Use Storage
            </h2>

            <p className="text-sm leading-relaxed mb-4">
              NGOConnect uses browser storage and JSON Web Tokens (JWT) to
              maintain authenticated user sessions and support essential
              application functionality.
            </p>

            <div className="overflow-hidden rounded-xl border border-gray-100">
              <table className="w-full text-xs">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">
                      Type
                    </th>

                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">
                      Purpose
                    </th>

                    <th className="text-left px-4 py-2.5 font-bold text-gray-700">
                      Duration
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {[
                    [
                      'JWT Auth Token',
                      'Maintains authenticated user sessions',
                      'Until logout or session expiry',
                    ],
                    [
                      'Browser Storage',
                      'Stores essential frontend state and session data',
                      'Session / temporary',
                    ],
                  ].map(([type, purpose, duration], i) => (
                    <tr key={i} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-800">
                        {type}
                      </td>

                      <td className="px-4 py-3 text-gray-500">
                        {purpose}
                      </td>

                      <td className="px-4 py-3 text-gray-400">
                        {duration}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              3. What We Do NOT Use
            </h2>

            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'No advertising or marketing cookies',
                'No third-party analytics services',
                'No cross-site tracking',
                'No fingerprinting or behavioural profiling',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              4. Managing Storage
            </h2>

            <p className="text-sm leading-relaxed">
              Users can clear stored authentication and session data at any time
              by logging out of the platform or clearing browser storage and
              cookies through browser settings. Clearing this data may sign the
              user out of the application.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              5. Contact
            </h2>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm space-y-2">
              <div>
                <p className="font-semibold text-gray-700">
                  Mohan Narayanapuram (RA2311056010126)
                </p>

                <p className="text-gray-400">
                  SRM IST, Kattankulathur
                </p>
              </div>

              <div>
                <p className="font-semibold text-gray-700">
                  D. Pujith Ram Reddy (RA2311056010153)
                </p>

                <p className="text-gray-400">
                  SRM IST, Kattankulathur
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