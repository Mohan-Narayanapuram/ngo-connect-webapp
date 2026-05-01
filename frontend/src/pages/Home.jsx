import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const CAUSES = [
    { label: 'Education',   icon: 'book-open',   bg: 'bg-blue-50',   text: 'text-blue-600',   ring: 'hover:ring-blue-200'   },
    { label: 'Healthcare',  icon: 'heart-pulse',  bg: 'bg-red-50',    text: 'text-red-500',    ring: 'hover:ring-red-200'    },
    { label: 'Environment', icon: 'leaf',         bg: 'bg-green-50',  text: 'text-green-600',  ring: 'hover:ring-green-200'  },
    { label: 'Women',       icon: 'users',        bg: 'bg-purple-50', text: 'text-purple-600', ring: 'hover:ring-purple-200' },
    { label: 'Hunger',      icon: 'utensils',     bg: 'bg-orange-50', text: 'text-orange-500', ring: 'hover:ring-orange-200' },
    { label: 'Animals',     icon: 'paw-print',    bg: 'bg-yellow-50', text: 'text-yellow-600', ring: 'hover:ring-yellow-200' },
];

const STATS = [
    { value: '51+',   label: 'Verified NGOs',     icon: 'building-2'   },
    { value: '₹12L+', label: 'Donations Raised',  icon: 'indian-rupee' },
    { value: '16',    label: 'Causes Supported',  icon: 'heart'        },
    { value: '100%',  label: 'Goes to NGOs',      icon: 'shield-check' },
];

const HOW_IT_WORKS = [
    { step: '01', title: 'Discover',  desc: 'Browse verified NGOs filtered by cause, location, or campaign.', icon: 'search'              },
    { step: '02', title: 'Choose',    desc: 'Pick an NGO or a specific campaign you want to support.',         icon: 'mouse-pointer-click' },
    { step: '03', title: 'Donate',    desc: 'Give securely via card, UPI, or net banking — 100% reaches them.', icon: 'heart'             },
];

export default function Home() {
    const { user } = useAuth();

    return (
    <div className="min-h-screen w-full bg-white">

    <Navbar />
    {/* ── Hero ── */}
    <section className="relative w-full overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0fdf4_1px,transparent_1px),linear-gradient(to_bottom,#f0fdf4_1px,transparent_1px)] bg-[size:48px_48px] opacity-50" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(220,252,231,0.6),transparent)]" />

        <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 pt-20 pb-28 text-center">
        {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-green-200 text-green-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-8 shadow-sm">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                100% Verified NGOs · Transparent Donations
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-black text-gray-900 leading-[1.1] tracking-tight mb-6 max-w-3xl mx-auto">
                Give to Causes that{' '}
                    <span className="relative inline-block">
                    <span className="relative z-10 text-green-600">Truly Matters</span>
                    <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                    <path d="M2 9C50 3 100 1 150 4C200 7 250 9 298 5" stroke="#86efac" strokeWidth="3" strokeLinecap="round"/>
                    </svg>
                </span>
            </h1>

            <p className="text-base text-gray-500 max-w-lg mx-auto mb-10 leading-relaxed">
                Discover verified non-profits across India and donate directly — education, environment, healthcare and more. Every rupee tracked.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <Link to="/discover"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-green-700 transition-colors shadow-sm shadow-green-200 active:scale-95">
                <Icon name="compass" size={16} />
                Discover NGOs
                <Icon name="arrow-right" size={14} />
            </Link>
            {!user && (
                <Link to="/register"
                className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-7 py-3 rounded-xl text-sm font-bold hover:border-gray-300 hover:bg-gray-50 transition-colors">
                <Icon name="user-plus" size={16} />
                Join as Donor
                </Link>
            )}
            </div>

            <p className="mt-6 text-xs text-gray-400 flex items-center justify-center gap-1.5">
            <Icon name="lock" size={11} />
            Secure payments · Receipts emailed instantly · No hidden fees
            </p>
        </div>
        </section>

    {/* ── Stats ── */}
        <section className="w-full border-y border-gray-100 bg-gray-50/60">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2">
                <div className="w-10 h-10 bg-white border border-gray-100 rounded-xl flex items-center justify-center shadow-sm mb-1">
                <Icon name={stat.icon} size={18} className="text-green-600" />
                </div>
                <p className="text-3xl font-black text-gray-900 tracking-tight leading-none">{stat.value}</p>
                <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
            </div>
            ))}
        </div>
        </div>
    </section>

    {/* ── How It Works ── */}
    <section className="w-full py-24">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-12">
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Simple process</p>
            <h2 className="text-2xl font-black text-gray-900">How it works</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {HOW_IT_WORKS.map((step, i) => (
            <div key={i} className="relative flex flex-col gap-4 p-6 bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all group">
                <div className="flex items-center justify-between">
                <div className="w-11 h-11 bg-green-50 rounded-xl flex items-center justify-center group-hover:bg-green-100 transition-colors">
                    <Icon name={step.icon} size={20} className="text-green-600" />
                </div>
                <span className="text-4xl font-black text-gray-100 group-hover:text-gray-200 transition-colors select-none">{step.step}</span>
                </div>
                <div>
                <h3 className="text-sm font-bold text-gray-900 mb-1.5">{step.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
                {i < HOW_IT_WORKS.length - 1 && (
                <div className="hidden sm:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-6 h-6 bg-white border border-gray-100 rounded-full items-center justify-center shadow-sm">
                    <Icon name="chevron-right" size={12} className="text-gray-400" />
                </div>
                )}
            </div>
            ))}
        </div>
        </div>
    </section>

    {/* ── Browse by Cause ── */}
    <section className="w-full py-24 bg-gray-50/60 border-y border-gray-100">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
            <div>
            <p className="text-xs font-bold text-green-600 uppercase tracking-widest mb-2">Categories</p>
            <h2 className="text-2xl font-black text-gray-900">Browse by cause</h2>
            </div>
            <Link to="/discover"
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-green-600 transition-colors">
            View all <Icon name="arrow-right" size={12} />
            </Link>
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
            {CAUSES.map((c, i) => (
            <Link key={i} to={`/discover?cause=${c.label}`}
                className={`flex flex-col items-center gap-3 p-4 bg-white border border-gray-100 rounded-2xl hover:shadow-md hover:ring-2 ${c.ring} hover:-translate-y-0.5 transition-all group`}>
                <div className={`w-12 h-12 ${c.bg} ${c.text} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <Icon name={c.icon} size={22} />
                </div>
                <span className="text-xs font-bold text-gray-700">{c.label}</span>
            </Link>
            ))}
        </div>
        </div>
    </section>

    {/* ── CTA Banner ── */}
    <section className="w-full py-24">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden bg-gray-900 rounded-3xl p-10 lg:p-14">
            <div className="absolute top-0 right-0 w-96 h-96 bg-green-600/10 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-72 h-72 bg-green-400/10 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl pointer-events-none" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
            <div className="max-w-lg">
                <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
                <Icon name="sparkles" size={11} />
                Make a difference today
                </div>
                <h2 className="text-2xl lg:text-3xl font-black text-white leading-tight mb-3">
                Ready to create<br />real change?
                </h2>
                <p className="text-sm text-gray-400 leading-relaxed">
                Join donors across India supporting verified NGOs. Every rupee is tracked and goes directly to the cause.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
                <Link to="/discover"
                className="inline-flex items-center justify-center gap-2 bg-green-600 text-white font-bold px-7 py-3 rounded-xl text-sm hover:bg-green-500 active:scale-95 transition-all">
                <Icon name="compass" size={15} />
                Start Discovering
                </Link>
                <Link to="/register-ngo"
                className="inline-flex items-center justify-center gap-2 bg-white/10 border border-white/10 text-white font-semibold px-7 py-3 rounded-xl text-sm hover:bg-white/20 transition-colors">
                <Icon name="building-2" size={15} />
                Register Your NGO
                </Link>
            </div>
            </div>
        </div>
        </div>
    </section>

    <Footer />
    </div>
);
}