import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 lg:px-8 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-xs text-gray-400">Effective date: 1 May 2026 · Last updated: 1 May 2026</p>
        </div>

        {/* Academic notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-10">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Academic Project Notice:</span> NGOConnect is a student project developed as part of the course{' '}
            <span className="font-semibold">Full Stack Development (21CSS301T)</span> at{' '}
            <span className="font-semibold">SRM Institute of Science and Technology, Kattankulathur</span>.
            All donations are simulated and no real financial transactions occur on this platform.
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Information We Collect</h2>
            <p className="text-sm leading-relaxed mb-3">When you register and use NGOConnect, we collect the following information:</p>
            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'Full name and email address provided during registration',
                'Password (stored as a secure hash — never in plain text)',
                'Donation records including NGO, campaign, amount, and timestamp',
                'Payment method type selected (card, UPI, net banking, wallet)',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. How We Use Your Information</h2>
            <p className="text-sm leading-relaxed mb-3">Your information is used solely for the following purposes:</p>
            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'To create and manage your donor account',
                'To process and record simulated donation transactions',
                'To display your donation history on your dashboard',
                'To send simulated donation receipt confirmations',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. Data Storage</h2>
            <p className="text-sm leading-relaxed">
              All data is stored in a MongoDB database hosted locally or on a development server as part of this academic project.
              No data is shared with, sold to, or accessed by any third party. This platform is not intended for production use.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. Authentication & Security</h2>
            <p className="text-sm leading-relaxed">
              User sessions are managed using JSON Web Tokens (JWT). Passwords are hashed using bcrypt before storage.
              No raw passwords are stored at any point in the system.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Your Rights</h2>
            <p className="text-sm leading-relaxed">
              As this is an academic project, you may request deletion of your account data at any time by contacting the development team.
              You may also update your name and email from the Dashboard.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">6. Contact</h2>
            <p className="text-sm leading-relaxed">
              For any privacy-related queries, contact the project team:
            </p>
            <div className="mt-3 bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm space-y-1">
              <p><span className="font-semibold text-gray-700">Mohan Narayanapuram (RA2311056010126)</span> · <span className="text-gray-400">SRM IST, Kattankulathur</span></p>
              <p><span className="font-semibold text-gray-700">D. Pujith Ram Reddy (RA2311056010153)</span> · <span className="text-gray-400">SRM IST, Kattankulathur</span></p>
              <p className="text-gray-400 text-xs mt-2">Course: Full Stack Development (21CSS301T) · Faculty: Dr. Varun P (103189)</p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}