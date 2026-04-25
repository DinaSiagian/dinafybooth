import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import './Hero.css';

const Hero = ({ onStart }) => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-blobs">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <div className="container hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="hero-badge">
            <Sparkles size={16} />
            <span>New: 12 Aesthetic Filters Available</span>
          </div>

          <h1 className="hero-title">
            Capture Your <br />
            <span className="text-accent">Aesthetic Moment</span>
          </h1>

          <p className="hero-subtitle">
            Create beautiful photobooth memories instantly with our <br />
            soft-toned filters and cute aesthetic frames.
          </p>

          <div className="hero-actions">
            <button 
              className="btn-primary" 
              style={{ padding: '16px 48px', fontSize: '1.1rem' }}
              onClick={onStart}
            >
              Start Now
            </button>
          </div>
        </motion.div>

        <motion.div
          className="hero-mockup animate-float"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="mockup-frame">
            <div className="mockup-screen">
              <div className="mockup-overlay">
                <span>✨ Preview Mode ✨</span>
              </div>
            </div>
            <div className="mockup-decor">
              <div className="sticker sticker-1">🌸</div>
              <div className="sticker sticker-2">🎀</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
