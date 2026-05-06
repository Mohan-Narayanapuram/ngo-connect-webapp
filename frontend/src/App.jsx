import { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import LoggedOut from './pages/LoggedOut';

import About from './pages/About';
import Contact from './pages/Contact';
import Dashboard from './pages/Dashboard';
import DonatePage from './pages/DonatePage';
import FAQ from './pages/FAQ';
import Home from './pages/Home';
import CookiePolicy from './pages/LegalCookies';
import PrivacyPolicy from './pages/LegalPrivacy';
import TermsOfService from './pages/LegalTerms';
import Login from './pages/Login';
import NgoList from './pages/NgoList';
import NgoProfile from './pages/NgoProfile';
import NotFound from './pages/NotFound';
import Register from './pages/Register';
import UnderConstruction from './pages/UnderConstruction';

// Wraps all routes with a fade-in on every navigation
function AnimatedRoutes() {
  const location = useLocation();
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    ref.current.style.opacity = '0';
    ref.current.style.transform = 'translateY(6px)';
    const raf = requestAnimationFrame(() => {
      if (!ref.current) return;
      ref.current.style.transition = 'opacity 220ms ease, transform 220ms ease';
      ref.current.style.opacity = '1';
      ref.current.style.transform = 'translateY(0)';
    });
    return () => cancelAnimationFrame(raf);
  }, [location.pathname]);

  return (
    <div ref={ref}>
      <Routes location={location}>
        {/* Public */}
        <Route path="/"         element={<Home />} />
        <Route path="/discover" element={<NgoList />} />
        <Route path="/ngo/:id"  element={<NgoProfile />} />
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about"    element={<About />} />
        <Route path="/contact"  element={<Contact />} />
        <Route path="/faq"      element={<FAQ />} />
        <Route path="/privacy"  element={<PrivacyPolicy />} />
        <Route path="/terms"    element={<TermsOfService />} />
        <Route path="/cookies"  element={<CookiePolicy />} />
        <Route path="/register-ngo" element={<UnderConstruction />} />
        <Route path="/logged-out" element={<LoggedOut />} />

        {/* Protected */}
        <Route path="/donate/:ngoId" element={
          <ProtectedRoute><DonatePage /></ProtectedRoute>
        } />
        <Route path="/donate/:ngoId/:campaignId" element={
          <ProtectedRoute><DonatePage /></ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <AnimatedRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}