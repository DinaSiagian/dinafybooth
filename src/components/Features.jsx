import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Palette, Download, Heart } from 'lucide-react';
import './Features.css';

const features = [
  {
    icon: <Zap size={32} />,
    title: 'Instant Capture',
    description: 'Snap your perfect moment in high quality with zero delay.'
  },
  {
    icon: <Palette size={32} />,
    title: 'Aesthetic Filters',
    description: 'Curated filters designed to give you that dreamy pastel look.'
  },
  {
    icon: <Download size={32} />,
    title: 'Download & Share',
    description: 'Get your photos instantly saved to your device in one click.'
  },
  {
    icon: <Heart size={32} />,
    title: 'Cute Frames',
    description: 'Choose from a variety of cute borders and polaroid styles.'
  }
];

const Features = () => {
  return (
    <section id="features" className="section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Everything You Need</h2>
          <p className="section-subtitle">Make your memories look professional and cute with our premium features.</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card glass"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(255, 128, 171, 0.15)' }}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
