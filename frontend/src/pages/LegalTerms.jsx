import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 w-full max-w-3xl mx-auto px-6 lg:px-8 py-14">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Legal</p>
          <h1 className="text-3xl font-black text-gray-900 mb-3">Terms of Service</h1>
          <p className="text-xs text-gray-400">Effective date: 1 May 2026 · Last updated: 1 May 2026</p>
        </div>

        {/* Academic notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-10">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Academic Project Notice:</span> NGOConnect is a simulated platform built for educational purposes as part of{' '}
            <span className="font-semibold">Full Stack Development (21CSS301T)</span> at{' '}
            <span className="font-semibold">SRM Institute of Science and Technology, Kattankulathur</span>.
            No real money is involved. All transactions are demonstrative only.
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed">
              By accessing or using NGOConnect, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use the platform. These terms apply to all visitors,
              registered users, and anyone who interacts with the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">2. Nature of the Platform</h2>
            <p className="text-sm leading-relaxed">
              NGOConnect is an academic project and simulation platform. It is not a registered financial
              institution, payment gateway, or non-profit intermediary. All NGO listings, campaigns, and
              donation transactions on this platform are for demonstration purposes only.
              No real funds are collected or disbursed.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">3. User Accounts</h2>
            <p className="text-sm leading-relaxed mb-3">When creating an account, you agree to:</p>
            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'Provide accurate and truthful registration information',
                'Keep your password confidential and not share it with others',
                'Not impersonate any person or organization',
                'Not use the platform for any unlawful or harmful purpose',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">4. Simulated Donations</h2>
            <p className="text-sm leading-relaxed">
              All donation flows on NGOConnect — including amount selection, payment method selection,
              and receipt generation — are entirely simulated. No actual payment is processed,
              no real money is deducted from any account, and no funds are transferred to any NGO.
              Donation receipts generated are for demonstration purposes only and hold no legal or financial value.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">5. Intellectual Property</h2>
            <p className="text-sm leading-relaxed">
              All code, UI design, and content on this platform was created by the project team as part of an
              academic course. Unauthorized reproduction for commercial purposes is not permitted.
              The platform may use open-source libraries which retain their respective licenses.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">6. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed">
              NGOConnect is provided "as is" for academic evaluation purposes. The development team makes no
              warranties regarding the availability, accuracy, or reliability of the platform.
              We are not liable for any loss or damage arising from your use of this platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">7. Changes to Terms</h2>
            <p className="text-sm leading-relaxed">
              As this is an academic project with a fixed scope, these terms are unlikely to change.
              Any updates will be reflected on this page with a revised effective date.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">8. Contact</h2>
            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm space-y-1">
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