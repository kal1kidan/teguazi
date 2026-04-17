import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Menu, X } from 'lucide-react';

export default function Navigation({ onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-earth-100 shadow-sm transition-all duration-300">
      <div className="container-narrow flex justify-between items-center py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 text-forest-600 hover:text-forest-700 transition transform hover:scale-105 duration-300">
          <Compass className="h-8 w-8 text-gold-500" />
          <span className="font-serif font-bold text-2xl tracking-tight text-forest-700">Teguaዥ</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-earth-900 font-medium">
          <li><Link to="/" className="hover:text-forest-500 transition-colors duration-200">Home</Link></li>
          <li><Link to="/explore" className="hover:text-forest-500 transition-colors duration-200">Explore</Link></li>
          <li><Link to="/book" className="hover:text-forest-500 transition-colors duration-200">Book</Link></li>
          <li>
             <button 
               onClick={onLogout}
               className="text-terra-500 hover:bg-terra-400 hover:text-white px-4 py-2 rounded-md font-medium transition-all duration-300"
             >
               Logout
             </button>
          </li>
        </ul>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden p-2 text-earth-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-earth-100 animate-in slide-in-from-top duration-300">
          <ul className="flex flex-col p-4 space-y-4 text-earth-900 font-medium">
            <li>
              <Link to="/" onClick={() => setIsOpen(false)} className="block py-2 hover:text-forest-500">Home</Link>
            </li>
            <li>
              <Link to="/explore" onClick={() => setIsOpen(false)} className="block py-2 hover:text-forest-500">Explore</Link>
            </li>
            <li>
              <Link to="/book" onClick={() => setIsOpen(false)} className="block py-2 hover:text-forest-500">Book</Link>
            </li>
            <li className="pt-4 border-t border-earth-100">
              <button 
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="w-full text-left py-2 text-terra-500 font-bold"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
