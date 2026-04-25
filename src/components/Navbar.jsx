import React, { useState, useEffect } from 'react';
import { Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = ({ onHome, onStart, isBoothOpen }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled || isBoothOpen ? 'scrolled glass' : ''}`}>
      <div className="container navbar-container">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="navbar-logo"
          onClick={onHome}
          style={{ cursor: 'pointer' }}
        >
          <div className="logo-icon">
            <Camera size={22} />
          </div>
          <span className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>DinafyBooth</span>
        </motion.div>

        {!isBoothOpen && (
          <div className="navbar-links">
            <a href="#home" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#gallery" className="nav-link">Gallery</a>
            <a href="#about" className="nav-link">About</a>
          </div>
        )}

        <motion.button 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="btn-primary"
          onClick={isBoothOpen ? onHome : onStart}
        >
          {isBoothOpen ? 'Back to Home' : 'Start Photo'}
        </motion.button>
      </div>
    </nav>
  );
};

export default Navbar;
