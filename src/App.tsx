import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Collections } from './components/Collections';
import { MaterialLibrary } from './components/MaterialLibrary';
import { Transformation } from './components/Transformation';
import { FeaturedGarments } from './components/FeaturedGarments';
import { Sustainability } from './components/Sustainability';
import { Journal } from './components/Journal';
import { Footer } from './components/Footer';
import { SurveyModal } from './components/SurveyModal';
import { LoginModal } from './components/LoginModal';
import { AccountPage } from './pages/AccountPage';
import { AdminDashboard } from './pages/AdminDashboard';

function HomePage() {
  const [surveyOpen, setSurveyOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <main className="bg-stone-900 min-h-screen">
      <Navbar onLoginOpen={() => setLoginOpen(true)} />
      <Hero />
      <About />
      <Collections />
      <MaterialLibrary />
      <Transformation />
      <FeaturedGarments />
      <Sustainability />
      <Journal />
      <Footer />

      {/* Floating survey button */}
      <button
        onClick={() => setSurveyOpen(true)}
        className="fixed bottom-6 right-6 z-[150] flex items-center gap-3 bg-stone-800 hover:bg-stone-700 border border-stone-700 text-cream-100 pl-5 pr-4 py-3.5 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
        aria-label="Open style questionnaire"
      >
        <span className="text-xs tracking-widest uppercase font-medium font-sans whitespace-nowrap">
          Style Quiz
        </span>
        <span className="w-6 h-6 rounded-full bg-brick-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 6h8M6 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      <SurveyModal open={surveyOpen} onClose={() => setSurveyOpen(false)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </main>
  );
}

function ProtectedAccount() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  return <AccountPage />;
}

function ProtectedAdmin() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  if (user.role !== 'admin') return <Navigate to="/account" replace />;
  return <AdminDashboard />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/account" element={<ProtectedAccount />} />
      <Route path="/admin" element={<ProtectedAdmin />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
