import React from 'react';
import { Globe, Share2, Mail, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-content">
          <div className="footer-info">
            <span className="logo" style={{ fontSize: '1.8rem' }}>DinafyBooth</span>
            <p>Capturing your best moments in the softest light.</p>
          </div>
          
          <div className="footer-social">
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><Share2 size={20} /></a>
            <a href="#" className="social-icon"><Mail size={20} /></a>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>Made with <Heart size={14} className="text-pink-500 fill-pink-500 inline" /> by Dina</p>
          <p className="copyright">&copy; 2026 DinafyBooth. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
