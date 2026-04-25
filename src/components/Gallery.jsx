import React from 'react';
import { motion } from 'framer-motion';
import { Download, Trash2, Camera } from 'lucide-react';
import './Gallery.css';

const Gallery = ({ photos = [], onDelete }) => {
  const downloadPhoto = (url, id) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `dinafy-gallery-${id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="gallery" className="gallery-section section-padding">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Your Gallery</h2>
          <p className="section-subtitle">A collection of your most aesthetic moments.</p>
        </div>

        {photos.length === 0 ? (
          <div className="empty-gallery glass p-12 text-center rounded-3xl" style={{ border: '2px dashed rgba(255,128,171,0.3)' }}>
            <Camera size={48} className="mx-auto text-pink-200 mb-4 animate-pulse" />
            <p className="text-light">Your gallery is empty. Start your first session!</p>
          </div>
        ) : (
          <div className="gallery-grid">
            {photos.map((photo) => (
              <motion.div 
                key={photo.id}
                className="gallery-item glass"
                whileHover={{ y: -8 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="gallery-img-wrapper">
                  <img src={photo.url} alt="Booth Capture" />
                  <div className="gallery-overlay">
                    <div className="flex gap-3">
                      <button className="gallery-btn" onClick={() => downloadPhoto(photo.url, photo.id)} title="Download">
                        <Download size={20} />
                      </button>
                      <button className="gallery-btn delete" onClick={() => onDelete(photo.id)} title="Delete">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="gallery-info">
                  <span className="gallery-date">{photo.timestamp}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;
