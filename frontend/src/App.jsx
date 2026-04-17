import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Book from './pages/Book';
import Auth from './pages/Auth';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleAuthSuccess = (token) => {
    if (token) localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  // If not authenticated, force them to the Auth page
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Routes>
          <Route path="/auth" element={<Auth onAuthSuccess={handleAuthSuccess} />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </div>
    );
  }

  // If authenticated, render the full app
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation onLogout={handleLogout} />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/book" element={<Book />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="bg-forest-700 text-white py-8 mt-16 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="container-narrow text-center">
          <p className="font-serif text-xl tracking-wider text-white mb-2">Teguaዥ</p>
          <p className="text-sm text-earth-100/70">&copy; {new Date().getFullYear()} Teguaዥ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
