import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Photobooth from './components/Photobooth';
import Features from './components/Features';
import Gallery from './components/Gallery';
import Footer from './components/Footer';
import './App.css';

const STORAGE_KEY = 'dinafybooth_gallery_v2';
const STORAGE_LIMIT = 20;

function App() {
  const [isBoothOpen, setIsBoothOpen] = useState(false);
  const [savedPhotos, setSavedPhotos] = useState([]);

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setSavedPhotos(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse gallery from localStorage", err);
      }
    }
  }, []);

  const savePhoto = (dataUrl) => {
    const newPhoto = {
      id: Date.now(),
      url: dataUrl,
      timestamp: new Date().toLocaleString()
    };
    
    setSavedPhotos(prev => {
      const updated = [newPhoto, ...prev].slice(0, STORAGE_LIMIT);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const deletePhoto = (id) => {
    setSavedPhotos(prev => {
      const updated = prev.filter(p => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="app-wrapper">
      <Navbar onHome={() => setIsBoothOpen(false)} onStart={() => setIsBoothOpen(true)} isBoothOpen={isBoothOpen} />

      <main>
        <AnimatePresence mode="wait">
          {!isBoothOpen ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Hero onStart={() => setIsBoothOpen(true)} />
              <Features />
              <Gallery photos={savedPhotos} onDelete={deletePhoto} />
            </motion.div>
          ) : (
            <motion.div
              key="booth"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
            >
              <Photobooth onBack={() => setIsBoothOpen(false)} onSave={savePhoto} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {!isBoothOpen && <Footer />}
    </div>
  );
}

export default App;

