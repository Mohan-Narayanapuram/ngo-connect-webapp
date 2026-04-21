import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import DonatePage from './pages/DonatePage';
import Login from './pages/Login';
import NgoList from './pages/NgoList';
import NgoProfile from './pages/NgoProfile';
import Register from './pages/Register';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<NgoList />} />
        <Route path="/ngo/:id"   element={<NgoProfile />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/register"  element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/donate"    element={<DonatePage />} />
      </Routes>
    </BrowserRouter>
  );
}