import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

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

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/"         element={<Home />} />
          <Route path="/discover" element={<NgoList />} />
          <Route path="/ngo/:id"  element={<NgoProfile />} />
          <Route path="/login"    element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/faq"      element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms"   element={<TermsOfService />} />
          <Route path="/cookies" element={<CookiePolicy />} />
          <Route path="/register-ngo" element={<UnderConstruction />} />

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
      </BrowserRouter>
    </AuthProvider>
  );
}