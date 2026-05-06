// LegalTerms.jsx

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

export default function TermsOfService() {
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
            Terms of Service
          </h1>

          <p className="text-xs text-gray-400">
            Effective date: 1 May 2026 · Last updated: 1 May 2026
          </p>
        </div>

        {/* Academic notice */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl px-5 py-4 mb-10">
          <p className="text-xs text-amber-700 leading-relaxed">
            <span className="font-bold">Academic Project Notice:</span>{' '}
            NGOConnect is an academic full-stack web application developed as
            part of the course{' '}
            <span className="font-semibold">
              Full Stack Development (21CSS301T)
            </span>.
            The platform is intended for educational and demonstration purposes.
          </p>
        </div>

        <div className="prose prose-sm max-w-none space-y-8 text-gray-600">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              1. Acceptance of Terms
            </h2>

            <p className="text-sm leading-relaxed">
              By accessing or using NGOConnect, you agree to comply with these
              Terms of Service. These terms apply to all visitors, registered
              users, and anyone interacting with the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              2. Nature of the Platform
            </h2>

            <p className="text-sm leading-relaxed">
              NGOConnect is an academic project developed for educational
              evaluation and demonstration purposes. The platform allows users to
              explore NGOs, view campaigns, and simulate donation workflows.
              While the application demonstrates donation-related functionality,
              it is not a registered payment processor, financial institution,
              or charitable intermediary.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              3. User Accounts
            </h2>

            <p className="text-sm leading-relaxed mb-3">
              When creating an account, users agree to:
            </p>

            <ul className="space-y-1.5 text-sm list-none pl-0">
              {[
                'Provide accurate and truthful registration information',
                'Maintain the confidentiality of account credentials',
                'Not impersonate any person or organisation',
                'Not use the platform for unlawful or harmful activities',
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
              4. Donations and Transactions
            </h2>

            <p className="text-sm leading-relaxed">
              NGOConnect currently demonstrates donation workflows and donation
              record management as part of the application functionality.
              Users are responsible for ensuring that any information entered
              into the platform is accurate. Future versions of the platform may
              integrate third-party payment gateway services.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              5. Intellectual Property
            </h2>

            <p className="text-sm leading-relaxed">
              The platform source code, UI design, branding, and related content
              were developed as part of an academic project. Open-source
              libraries and third-party tools used in the application retain
              their respective licenses and ownership.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              6. Limitation of Liability
            </h2>

            <p className="text-sm leading-relaxed">
              NGOConnect is provided on an “as is” and “as available” basis.
              The development team does not guarantee uninterrupted availability,
              absolute accuracy, or complete reliability of the platform.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              7. Changes to Terms
            </h2>

            <p className="text-sm leading-relaxed">
              These Terms of Service may be updated periodically to reflect
              platform improvements, feature additions, or academic requirements.
              Continued use of the platform after updates constitutes acceptance
              of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-2">
              8. Contact
            </h2>

            <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-sm space-y-2">
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