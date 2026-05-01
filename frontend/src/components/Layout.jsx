import Navbar from './Navbar';

export default function Layout({ children, className = '' }) {
  return (
    <div className="min-h-screen w-full bg-white">
      <Navbar />
      <main className={`w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-8 ${className}`}>
        {children}
      </main>
    </div>
  );
}