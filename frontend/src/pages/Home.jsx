import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Icon from '../components/Icon';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

/* ─── data ──────────────────────────────────────────────── */
const CAUSES = [
{ label: 'Education',   icon: 'book-open',   color: '#2563eb' },
{ label: 'Healthcare',  icon: 'heart-pulse',  color: '#dc2626' },
{ label: 'Environment', icon: 'leaf',         color: '#16a34a' },
{ label: 'Women',       icon: 'users',        color: '#9333ea' },
{ label: 'Hunger',      icon: 'utensils',     color: '#ea580c' },
{ label: 'Animals',     icon: 'paw-print',    color: '#ca8a04' },
];

const TICKER = [
'Pratham Education', 'CRY India', 'Goonj', 'Smile Foundation',
'HelpAge India', 'Teach For India', 'Give India', 'Akshaya Patra',
'Magic Bus', 'Nanhi Kali', 'iPartner India', 'PETA India',
];

const STEPS = [
{ n: '01', title: 'Discover',  body: 'Browse 51+ manually verified NGOs by cause, location, or active campaign.' },
{ n: '02', title: 'Choose',    body: 'Select a specific campaign or give directly — see impact before you donate.' },
{ n: '03', title: 'Donate',    body: '100% reaches the NGO. Receipt in your inbox the moment you give.' },
];

/* ─── tiny hooks ─────────────────────────────────────────── */
function useInView(threshold = 0.15) {
const ref = useRef(null);
const [seen, setSeen] = useState(false);
useEffect(() => {
    const io = new IntersectionObserver(
    ([e]) => { if (e.isIntersecting) setSeen(true); },
    { threshold }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
}, []);
return [ref, seen];
}

function Counter({ to, prefix = '', suffix = '', run, duration = 1600 }) {
const [v, setV] = useState(0);
useEffect(() => {
    if (!run) return;
    let t0 = null;
    const tick = ts => {
    if (!t0) t0 = ts;
    const p = Math.min((ts - t0) / duration, 1);
    setV(Math.floor((1 - Math.pow(1 - p, 4)) * to));
    if (p < 1) requestAnimationFrame(tick);
    else setV(to);
    };
    requestAnimationFrame(tick);
}, [run, to, duration]);
return <>{prefix}{run ? v : 0}{suffix}</>;
}

/* ═══════════════════════════════════════════════════════════
COMPONENT
═══════════════════════════════════════════════════════════ */
export default function Home() {
const { user } = useAuth();
const [heroRef,  heroSeen]  = useInView(0.05);
const [statsRef, statsSeen] = useInView(0.3);
const [stepsRef, stepsSeen] = useInView(0.1);

return (
    <div className="min-h-screen w-full bg-white overflow-x-hidden">
    <Navbar />

    {/* ═══ HERO ═══════════════════════════════════════════ */}
    <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: 'calc(100vh - 64px)' }}
    >
        {/* bg gradient */}
        <div className="absolute inset-0" style={{
        background: 'radial-gradient(ellipse 140% 100% at 50% -20%, #f0fdf4 0%, #fafaf9 55%, #fff 100%)',
        }} />

        {/* ultra-light grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)',
        backgroundSize: '72px 72px',
        opacity: 0.25,
        }} />

        {/* accent circle */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.18) 0%, transparent 70%)' }} />

        <div
        className="relative w-full max-w-5xl mx-auto px-6 lg:px-8 flex flex-col justify-center"
        style={{ minHeight: 'calc(100vh - 64px)', paddingTop: '5rem', paddingBottom: '6rem' }}
        >
        <div className="max-w-3xl">

            {/* eyebrow */}
            <div className={`flex items-center gap-3 mb-8 transition-all duration-700 ${heroSeen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-gray-500">
                India's Trusted NGO Platform
            </span>
            </div>

            {/* headline */}
            <h1
            className={`font-black text-gray-950 leading-[0.96] tracking-tight mb-8 transition-all duration-700 delay-100 ${heroSeen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
            style={{ fontSize: 'clamp(2.8rem, 8.5vw, 6.5rem)' }}
            >
            <span className="block">Change starts</span>
            <span className="block">with one</span>
            <span className="block text-green-600">
                donation.
                <span className="inline-block w-3 h-3 bg-green-500 rounded-full ml-3 mb-2 align-middle" />
            </span>
            </h1>

            {/* subtext */}
            <p className={`text-lg text-gray-500 leading-relaxed max-w-xl mb-10 font-normal transition-all duration-700 delay-200 ${heroSeen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            Discover verified non-profits across India and give directly —
            no middlemen, no mystery. Every rupee tracked.
            </p>

            {/* CTAs */}
            <div className={`flex flex-wrap gap-4 items-center mb-10 transition-all duration-700 delay-300 ${heroSeen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <Link
                to="/discover"
                className="relative group inline-flex items-center gap-2.5 bg-gray-950 text-white font-bold text-sm px-8 py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-gray-900/30 active:scale-95"
            >
                <span className="absolute inset-0 bg-green-600 scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300" />
                <span className="relative flex items-center gap-2.5">
                <Icon name="compass" size={16} />
                Explore NGOs
                <Icon name="arrow-right" size={14} />
                </span>
            </Link>

            {!user && (
                <Link
                to="/register"
                className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-900 transition-colors"
                >
                Create account
                <Icon name="move-right" size={15} />
                </Link>
            )}
            </div>

            {/* ── FIX 2: Trust badges — always 3-col single row ── */}
            <div className={`grid grid-cols-3 gap-x-4 transition-all duration-700 delay-500 ${heroSeen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            {[
                { icon: 'shield-check', text: '51+ Verified' },
                { icon: 'lock',         text: 'Secure Pay'   },
                { icon: 'receipt',      text: 'Receipts'     },
            ].map((b, i) => (
                <span key={i} className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-400 whitespace-nowrap">
                <Icon name={b.icon} size={12} className="text-green-500 flex-shrink-0" />
                {b.text}
                </span>
            ))}
            </div>

        </div>
        </div>

        {/* ── FIX 1: Scroll hint — properly centered ── */}
        <div className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-1.5 animate-bounce opacity-40">
        <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">Scroll</span>
        <Icon name="chevron-down" size={14} className="text-gray-400" />
        </div>
    </section>

    {/* ═══ TICKER ══════════════════════════════════════════ */}
    <div className="w-full border-y border-gray-100 bg-gray-950 py-3.5 overflow-hidden">
        <div className="flex w-max" style={{ animation: 'ticker 28s linear infinite' }}>
        {[...TICKER, ...TICKER].map((name, i) => (
            <span key={i} className="inline-flex items-center gap-3 px-7 text-[11px] font-semibold text-gray-400 uppercase tracking-widest whitespace-nowrap">
            <span className="w-1 h-1 rounded-full bg-green-500 flex-shrink-0" />
            {name}
            </span>
        ))}
        </div>
    </div>

    {/* ═══ STATS ═══════════════════════════════════════════ */}
    <section ref={statsRef} className="w-full bg-white">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8 py-20">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-300 mb-10">Impact in numbers</p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0 lg:divide-x divide-gray-100">
            {[
            { to: 51,  prefix: '',  suffix: '+',  label: 'Verified NGOs'    },
            { to: 12,  prefix: '₹', suffix: 'L+', label: 'Donations Raised' },
            { to: 16,  prefix: '',  suffix: '',   label: 'Causes Supported' },
            { to: 100, prefix: '',  suffix: '%',  label: 'Goes to NGOs'     },
            ].map((s, i) => (
            <div key={i} className="lg:px-10 first:pl-0 last:pr-0">
                <p className="text-5xl lg:text-6xl font-black text-gray-950 leading-none tabular-nums mb-2">
                <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} run={statsSeen} duration={1400 + i * 100} />
                </p>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{s.label}</p>
            </div>
            ))}
        </div>
        </div>
    </section>

    {/* ═══ CAUSES ══════════════════════════════════════════ */}
    <section className="w-full py-24 border-t border-gray-100">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex items-start justify-between mb-14">
            <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-3">Browse causes</p>
            <h2 className="text-4xl font-black text-gray-950 leading-none">
                Find what<br />moves you.
            </h2>
            </div>
            <Link
            to="/discover"
            className="hidden sm:flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-900 border border-gray-200 hover:border-gray-900 px-5 py-2.5 rounded-xl transition-all mt-2"
            >
            All NGOs <Icon name="arrow-right" size={12} />
            </Link>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {CAUSES.map((c, i) => (
            // ── FIX 3: cause filter redirect — ?cause= already correct ✅
            <Link
                key={i}
                to={`/discover?cause=${c.label}`}
                className="group relative flex flex-col items-center gap-3.5 py-8 px-3 rounded-2xl border border-gray-100 bg-white overflow-hidden transition-all duration-300 hover:border-transparent hover:shadow-xl hover:-translate-y-1"
            >
                <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{ background: `${c.color}0d` }}
                />
                <div
                className="relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                style={{ background: `${c.color}15`, color: c.color }}
                >
                <Icon name={c.icon} size={24} />
                </div>
                <span className="relative z-10 text-xs font-black text-gray-700 group-hover:text-gray-950 transition-colors">
                {c.label}
                </span>
            </Link>
            ))}
        </div>
        </div>
    </section>

    {/* ═══ STORY SECTION ═══════════════════════════════════ */}
    <section className="w-full py-24 border-t border-gray-100 bg-[#fafaf9]">
        <div className="w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 mb-4">Why it matters</p>
            <h2 className="text-4xl font-black text-gray-950 leading-tight mb-6">
                Every rupee has<br />a name on it.
            </h2>
            <p className="text-base text-gray-500 leading-relaxed mb-6">
                In India, billions in charitable intent go unrealised every year — not because people don't care, but because the path to giving is broken.
            </p>
            <p className="text-base text-gray-500 leading-relaxed mb-8">
                NGO Connect removes every obstacle between a donor and their cause. No redirects, no opacity, no doubt. Just direct, traceable giving.
            </p>
            <Link
                to="/discover"
                className="inline-flex items-center gap-2 text-sm font-bold text-green-700 hover:text-green-800 transition-colors group"
            >
                Start donating today
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                <Icon name="arrow-right" size={14} />
                </span>
            </Link>
            </div>

            <div className="space-y-1">
            {[
                { icon: 'check-circle', title: 'Manual verification', desc: 'Every NGO is reviewed before listing — no unverified organizations.' },
                { icon: 'trending-up',  title: 'Live progress',       desc: 'Campaign fundraising progress updates in real time as donations come in.' },
                { icon: 'receipt',      title: 'Instant receipts',    desc: 'Your donation receipt is emailed the moment your transaction completes.' },
                { icon: 'eye',          title: 'Full transparency',   desc: 'See exactly where your money goes — down to the campaign level.' },
            ].map((f, i) => (
                <div
                key={i}
                className="group flex items-start gap-5 p-5 rounded-2xl hover:bg-white hover:shadow-sm transition-all duration-200 cursor-default"
                >
                <div className="w-9 h-9 bg-green-50 group-hover:bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                    <Icon name={f.icon} size={16} className="text-green-600" />
                </div>
                <div>
                    <p className="text-sm font-black text-gray-900 mb-0.5">{f.title}</p>
                    <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
                </div>
                </div>
            ))}
            </div>
        </div>
        </div>
    </section>

    {/* ═══ HOW IT WORKS ════════════════════════════════════ */}
    <section ref={stepsRef} className="w-full py-28 bg-gray-950 overflow-hidden relative">
        <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[30vw] font-black leading-none text-white/[0.02] select-none pointer-events-none hidden lg:block">
        3
        </div>

        <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="mb-16">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-4">Process</p>
            <h2 className="text-4xl font-black text-white leading-none">How it works.</h2>
        </div>

        <div className="space-y-0">
            {STEPS.map((s, i) => (
            <div
                key={i}
                className={`group flex items-start gap-10 py-10 border-t border-white/5 last:border-b hover:bg-white/[0.025] px-5 -mx-5 transition-all duration-200 cursor-default ${stepsSeen ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}
                style={{ transitionDelay: `${i * 120}ms`, transitionProperty: 'opacity, transform' }}
            >
                <span className="text-6xl font-black tabular-nums leading-none text-white/10 group-hover:text-white/20 transition-colors w-20 text-right flex-shrink-0 mt-1">
                {s.n}
                </span>
                <div className="flex-1">
                <h3 className="text-xl font-black text-white mb-2">{s.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed max-w-lg">{s.body}</p>
                </div>
                <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all">
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
                    <Icon name="arrow-right" size={14} className="text-green-400" />
                </div>
                </div>
            </div>
            ))}
        </div>

        <div className="mt-12">
            <Link
            to="/discover"
            className="inline-flex items-center gap-2.5 bg-green-600 text-white font-bold text-sm px-8 py-3.5 rounded-2xl hover:bg-green-500 active:scale-95 transition-all"
            >
            <Icon name="compass" size={15} />
            Try it now
            </Link>
        </div>
        </div>
    </section>

    {/* ═══ CTA ══════════════════════════════════════════════ */}
    <section
        className="w-full relative overflow-hidden"
        style={{
        background: 'linear-gradient(135deg, #052e16 0%, #14532d 50%, #166534 100%)',
        paddingTop: '7rem',
        paddingBottom: '7rem',
        }}
    >
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '200px',
        }} />
        <div
        className="absolute -top-48 -right-48 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative w-full max-w-5xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-12">
            <div className="max-w-2xl">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-400 mb-5">Ready?</p>
            <h2
                className="font-black text-white leading-[0.95] tracking-tight"
                style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}
            >
                Make your<br />
                <span className="text-green-400">giving</span><br />
                count.
            </h2>
            </div>

            <div className="flex flex-col gap-4 max-w-xs">
            <p className="text-sm text-green-200/70 leading-relaxed">
                Join thousands of donors across India. Zero platform fees. Every rupee verified.
            </p>
            <Link
                to="/discover"
                className="group inline-flex items-center justify-center gap-2.5 bg-white text-gray-950 font-black text-sm px-8 py-4 rounded-2xl hover:bg-green-50 active:scale-95 transition-all shadow-2xl shadow-black/40"
            >
                <Icon name="compass" size={16} />
                Explore NGOs
                <span className="group-hover:translate-x-1 transition-transform inline-block">
                <Icon name="arrow-right" size={14} />
                </span>
            </Link>
            {!user && (
                <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 border border-white/15 text-white/80 font-semibold text-sm px-7 py-3.5 rounded-2xl hover:bg-white/10 transition-colors"
                >
                <Icon name="user-plus" size={15} />
                Create Free Account
                </Link>
            )}
            <p className="text-[10px] text-green-500/60 flex items-center gap-1.5 mt-1">
                <Icon name="shield-check" size={10} />
                Secure · Transparent · Zero fees
            </p>
            </div>
        </div>
        </div>
    </section>

    <style>{`
        @keyframes ticker {
        from { transform: translateX(0);    }
        to   { transform: translateX(-50%); }
        }
    `}</style>

    <Footer />
    </div>
);
}