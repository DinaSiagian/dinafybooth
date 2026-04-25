import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Download, RotateCcw, Heart, Sparkles, Layout, Palette, Loader2, AlertCircle, Star, Smile, Flower2, Cloud, Moon, Cat, Ghost, Sticker, Accessibility } from 'lucide-react';
import './Photobooth.css';

const stickerPacks = [
  { id: 'none', name: 'None', items: [] },
  {
    id: 'hearts', name: 'Hearts', items: [
      { type: 'icon', icon: 'heart', x: 5, y: 5, size: 40, color: '#ff4081', rotate: -15 },
      { type: 'icon', icon: 'heart', x: 85, y: 15, size: 30, color: '#ff80ab', rotate: 10 },
      { type: 'icon', icon: 'heart', x: 15, y: 85, size: 35, color: '#f06292', rotate: 5 },
      { type: 'icon', icon: 'heart', x: 75, y: 80, size: 45, color: '#ff4081', rotate: -20 },
    ]
  },
  {
    id: 'stars', name: 'Sparkles', items: [
      { type: 'icon', icon: 'sparkle', x: 10, y: 10, size: 35, color: '#ffd700', rotate: 0 },
      { type: 'icon', icon: 'star', x: 80, y: 5, size: 40, color: '#ffeb3b', rotate: 15 },
      { type: 'icon', icon: 'sparkle', x: 5, y: 80, size: 30, color: '#fff176', rotate: -10 },
      { type: 'icon', icon: 'star', x: 90, y: 90, size: 35, color: '#ffd700', rotate: 20 },
    ]
  },
  {
    id: 'cute', name: 'Kitty', items: [
      { type: 'icon', icon: 'cat', x: 5, y: 5, size: 45, color: '#000', rotate: -10 },
      { type: 'emoji', emoji: '🎀', x: 85, y: 10, size: 40, rotate: 15 },
      { type: 'emoji', emoji: '🐾', x: 10, y: 85, size: 35, rotate: 0 },
      { type: 'icon', icon: 'smile', x: 80, y: 80, size: 40, color: '#ffb74d', rotate: 10 },
    ]
  },
  {
    id: 'aesthetic', name: 'Soft', items: [
      { type: 'icon', icon: 'flower', x: 8, y: 8, size: 40, color: '#81c784', rotate: 0 },
      { type: 'emoji', emoji: '🦋', x: 88, y: 12, size: 35, rotate: 15 },
      { type: 'icon', icon: 'cloud', x: 12, y: 82, size: 45, color: '#90caf9', rotate: -5 },
      { type: 'emoji', emoji: '🌈', x: 82, y: 88, size: 40, rotate: 5 },
    ]
  },
  {
    id: 'vintage', name: 'Retro', items: [
      { type: 'emoji', emoji: '🍒', x: 10, y: 10, size: 40, rotate: -15 },
      { type: 'icon', icon: 'moon', x: 85, y: 15, size: 35, color: '#fdd835', rotate: 10 },
      { type: 'emoji', emoji: '💿', x: 15, y: 85, size: 40, rotate: 0 },
      { type: 'emoji', emoji: '🍓', x: 80, y: 80, size: 38, rotate: 20 },
    ]
  },
];

const filters = [
  { name: 'Original', class: 'filter-none' },
  { name: 'Soft Pink', class: 'filter-pink' },
  { name: 'Vintage Warm', class: 'filter-vintage' },
  { name: 'Cool Tone', class: 'filter-cool' },
  { name: 'B & W', class: 'filter-bw' },
  { name: 'Sepia', class: 'filter-sepia' },
  { name: 'Bright Boost', class: 'filter-bright' },
  { name: 'Contrast', class: 'filter-contrast' },
  { name: 'Soft Glow', class: 'filter-glow' },
  { name: 'Dreamy Blur', class: 'filter-blur' },
  { name: 'Pastel Fade', class: 'filter-pastel' },
  { name: 'Golden Hour', class: 'filter-golden' },
  { name: 'Envy', class: 'filter-envy' },
  { name: 'Zinc', class: 'filter-zinc' },
  { name: 'Lomo Quad', class: 'filter-lomo' },
];

const layouts = [
  { name: '1 (L)', id: 'grid-1', count: 1, ratio: '16/9' },
  { name: '2 (L)', id: 'grid-2', count: 2, ratio: '16/9' },
  { name: '3 (L)', id: 'grid-3', count: 3, ratio: '16/9' },
  { name: '4 (L)', id: 'grid-4', count: 4, ratio: '16/9' },
  { name: '6 (L)', id: 'grid-6', count: 6, ratio: '16/9' },
  { name: '1 (P)', id: 'vgrid-1', count: 1, ratio: '9/16' },
  { name: '2 (P)', id: 'vgrid-2', count: 2, ratio: '9/16' },
  { name: '3 (P)', id: 'vgrid-3', count: 3, ratio: '9/16' },
  { name: '4 (P)', id: 'vgrid-4', count: 4, ratio: '9/16' },
  { name: '6 (P)', id: 'vgrid-6', count: 6, ratio: '9/16' },
];

const themes = [
  { name: 'Cream White', id: 'white', type: 'light', color: '#FFFFFF' },
  { name: 'Soft Pink', id: 'pink', type: 'light', color: '#FFF0F3' },
  { name: 'Lavender', id: 'lavender', type: 'light', color: '#F3E5F5' },
  { name: 'Peach', id: 'peach', type: 'light', color: '#FFF3E0' },
  { name: 'Baby Blue', id: 'blue', type: 'light', color: '#E1F5FE' },
  { name: 'Mint Green', id: 'green', type: 'light', color: '#E8F5E9' },
  { name: 'Midnight', id: 'dark-purple', type: 'dark', color: '#2D1B36' },
  { name: 'Soft Black', id: 'dark-black', type: 'dark', color: '#1A1A1D' },
  { name: 'Deep Maroon', id: 'dark-maroon', type: 'dark', color: '#4A0E0E' },
  { name: 'Chocolate', id: 'dark-brown', type: 'dark', color: '#3E2723' },
  { name: 'Forest', id: 'dark-green', type: 'dark', color: '#1B2E1D' },
  { name: 'Charcoal', id: 'dark-grey', type: 'dark', color: '#263238' },
  { name: 'Navy', id: 'dark-blue', type: 'dark', color: '#1A237E' },
];

const aestheticStickerPacks = [
  { id: 'none', name: 'None', items: [], bg: 'transparent', cssClass: '' },
  { 
    id: 'scrapbook',
    name: 'Scrapbook Vintage',
    bg: '#fdf6e3',
    cssClass: 'theme-scrapbook',
    items: [
      { type: 'emoji', emoji: '📜', x: 10, y: 10, size: 60, rotate: -15 },
      { type: 'emoji', emoji: '🏷️', x: 90, y: 12, size: 45, rotate: 10 },
      { type: 'emoji', emoji: '💌', x: 88, y: 88, size: 50, rotate: 5 },
      { type: 'emoji', emoji: '🎻', x: 12, y: 92, size: 40, rotate: -10 },
      { type: 'emoji', emoji: '🥨', x: 5, y: 50, size: 35, rotate: 20 },
      { type: 'emoji', emoji: '🎨', x: 95, y: 50, size: 40, rotate: -5 },
      { type: 'emoji', emoji: '🧵', x: 50, y: 5, size: 30 },
      { type: 'emoji', emoji: '🖋️', x: 50, y: 95, size: 35 },
      { type: 'bubble', x: 15, y: 15, w: 50, h: 50 },
      { type: 'bubble', x: 85, y: 85, w: 60, h: 60 },
      { type: 'sparkle', x: 20, y: 80, emoji: '✨' },
      { type: 'sparkle', x: 80, y: 20, emoji: '✨' },
    ]
  },
  { 
    id: 'gingham',
    name: 'Gingham Garden',
    bg: '#ffffff',
    cssClass: 'theme-gingham',
    items: [
      { type: 'emoji', emoji: '🎀', x: 15, y: 8, size: 50, rotate: -10 },
      { type: 'emoji', emoji: '🎀', x: 85, y: 92, size: 50, rotate: 10 },
      { type: 'emoji', emoji: '🍀', x: 5, y: 10, size: 45, rotate: -15 },
      { type: 'emoji', emoji: '🍀', x: 95, y: 85, size: 45, rotate: 15 },
      { type: 'emoji', emoji: '🌸', x: 92, y: 12, size: 35, rotate: 15 },
      { type: 'emoji', emoji: '🍒', x: 12, y: 92, size: 30, rotate: -10 },
      { type: 'emoji', emoji: '🌷', x: 50, y: 95, size: 35 },
      { type: 'emoji', emoji: '🦋', x: 85, y: 25, size: 30, rotate: 20 },
      { type: 'bubble', x: 15, y: 30, w: 60, h: 60 },
      { type: 'bubble', x: 85, y: 70, w: 80, h: 80 },
      { type: 'sparkle', x: 50, y: 10, emoji: '✨' },
    ]
  },
  { 
    id: 'bubble-dream',
    name: 'Bubble Dream',
    bg: '#e1f5fe',
    cssClass: 'theme-bubble',
    items: [
      { type: 'bubble', x: 10, y: 10, w: 120, h: 120 },
      { type: 'bubble', x: 90, y: 15, w: 100, h: 100 },
      { type: 'bubble', x: 15, y: 85, w: 140, h: 140 },
      { type: 'bubble', x: 85, y: 80, w: 110, h: 110 },
      { type: 'bubble', x: 5, y: 50, w: 80, h: 80 },
      { type: 'bubble', x: 95, y: 45, w: 70, h: 70 },
      { type: 'emoji', emoji: '🫧', x: 20, y: 20, size: 40 },
      { type: 'emoji', emoji: '🫧', x: 80, y: 80, size: 45 },
      { type: 'emoji', emoji: '☁️', x: 50, y: 5, size: 50 },
      { type: 'emoji', emoji: '✨', x: 50, y: 95, size: 30 },
      { type: 'sparkle', x: 15, y: 15, emoji: '✨' },
      { type: 'sparkle', x: 85, y: 85, emoji: '✨' },
    ]
  },
  { 
    id: 'vintage-letter',
    name: 'Vintage Letter',
    bg: '#e6d5b8',
    cssClass: 'theme-vintage-paper',
    items: [
      { type: 'emoji', emoji: '📜', x: 12, y: 12, size: 90, rotate: -5 },
      { type: 'emoji', emoji: '📜', x: 88, y: 88, size: 80, rotate: 10 },
      { type: 'emoji', emoji: '💌', x: 85, y: 15, size: 55, rotate: 15 },
      { type: 'emoji', emoji: '🕰️', x: 15, y: 85, size: 45 },
      { type: 'emoji', emoji: '🖋️', x: 50, y: 5, size: 40, rotate: 45 },
      { type: 'emoji', emoji: '🕯️', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '🗝️', x: 95, y: 50, size: 35 },
      { type: 'emoji', emoji: '📜', x: 50, y: 95, size: 40 },
      { type: 'bubble', x: 20, y: 20, w: 40, h: 40 },
      { type: 'sparkle', x: 80, y: 80, emoji: '✨' },
    ]
  },
  { 
    id: 'pink-ribbon',
    name: 'Pink Ribbon',
    bg: '#fff0f5',
    cssClass: 'theme-kawaii',
    items: [
      { type: 'emoji', emoji: '🎀', x: 15, y: 15, size: 70, rotate: -15 },
      { type: 'emoji', emoji: '🎀', x: 85, y: 85, size: 70, rotate: 15 },
      { type: 'emoji', emoji: '💖', x: 90, y: 15, size: 45, rotate: 10 },
      { type: 'emoji', emoji: '💖', x: 10, y: 85, size: 45 },
      { type: 'emoji', emoji: '🍬', x: 5, y: 45, size: 40, rotate: -10 },
      { type: 'emoji', emoji: '🍭', x: 95, y: 50, size: 40 },
      { type: 'emoji', emoji: '🎀', x: 50, y: 5, size: 50 },
      { type: 'bubble', x: 20, y: 80, w: 70, h: 70 },
      { type: 'bubble', x: 80, y: 20, w: 60, h: 60 },
      { type: 'sparkle', x: 50, y: 92, emoji: '✨' },
      { type: 'emoji', emoji: '🦢', x: 50, y: 15, size: 30 },
    ]
  },
  { 
    id: 'floral-bloom',
    name: 'Floral Garden',
    bg: '#fdfcf0',
    cssClass: 'theme-floral',
    items: [
      { type: 'emoji', emoji: '🌸', x: 10, y: 10, size: 60, rotate: -10 },
      { type: 'emoji', emoji: '🌼', x: 90, y: 90, size: 60, rotate: 10 },
      { type: 'emoji', emoji: '🌷', x: 85, y: 15, size: 50, rotate: 15 },
      { type: 'emoji', emoji: '🌻', x: 15, y: 85, size: 50 },
      { type: 'emoji', emoji: '🦋', x: 5, y: 50, size: 40, rotate: 20 },
      { type: 'emoji', emoji: '🌿', x: 95, y: 45, size: 40, rotate: -90 },
      { type: 'emoji', emoji: '🍃', x: 50, y: 5, size: 35 },
      { type: 'emoji', emoji: '🌹', x: 50, y: 95, size: 40 },
      { type: 'bubble', x: 15, y: 15, w: 50, h: 50 },
      { type: 'bubble', x: 85, y: 85, w: 50, h: 50 },
      { type: 'sparkle', x: 20, y: 80, emoji: '✨' },
    ]
  },
  { 
    id: 'minimal-line',
    name: 'Minimal Chic',
    bg: '#fafafa',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🤍', x: 15, y: 15, size: 40 },
      { type: 'emoji', emoji: '🤍', x: 85, y: 85, size: 40 },
      { type: 'emoji', emoji: '✨', x: 90, y: 10, size: 30 },
      { type: 'emoji', emoji: '✨', x: 10, y: 90, size: 30 },
      { type: 'emoji', emoji: '☁️', x: 50, y: 5, size: 45 },
      { type: 'emoji', emoji: '🐚', x: 5, y: 50, size: 35 },
      { type: 'emoji', emoji: '🦢', x: 95, y: 50, size: 40 },
      { type: 'emoji', emoji: '🕯️', x: 50, y: 95, size: 30 },
      { type: 'bubble', x: 15, y: 85, w: 60, h: 60 },
      { type: 'sparkle', x: 50, y: 15, emoji: '✨' },
    ]
  },
  { 
    id: 'abstract-pastel',
    name: 'Abstract Pastel',
    bg: '#f3e5f5',
    cssClass: 'theme-bubble',
    items: [
      { type: 'bubble', x: 15, y: 15, w: 120, h: 100 },
      { type: 'bubble', x: 85, y: 85, w: 100, h: 120 },
      { type: 'bubble', x: 10, y: 85, w: 70, h: 70 },
      { type: 'bubble', x: 90, y: 15, w: 80, h: 80 },
      { type: 'emoji', emoji: '🌈', x: 50, y: 5, size: 50 },
      { type: 'emoji', emoji: '🎨', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '✨', x: 95, y: 50, size: 35 },
      { type: 'emoji', emoji: '🌸', x: 50, y: 95, size: 40 },
      { type: 'sparkle', x: 20, y: 20, emoji: '✨' },
      { type: 'sparkle', x: 80, y: 80, emoji: '✨' },
    ]
  },
  { 
    id: 'washi-tape',
    name: 'Washi Collage',
    bg: '#f5f5f5',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🎀', x: 15, y: 10, size: 60, rotate: -10 },
      { type: 'emoji', emoji: '🎗️', x: 85, y: 12, size: 55, rotate: 15 },
      { type: 'emoji', emoji: '🧵', x: 10, y: 90, size: 45 },
      { type: 'emoji', emoji: '🪢', x: 90, y: 88, size: 50, rotate: 5 },
      { type: 'emoji', emoji: '📌', x: 12, y: 5, size: 30 },
      { type: 'emoji', emoji: '📌', x: 88, y: 10, size: 30 },
      { type: 'emoji', emoji: '🎀', x: 50, y: 95, size: 40 },
      { type: 'emoji', emoji: '🧸', x: 5, y: 50, size: 40 },
      { type: 'bubble', x: 15, y: 15, w: 40, h: 40 },
      { type: 'sparkle', x: 85, y: 85, emoji: '✨' },
    ]
  },
  { 
    id: 'paper-cut',
    name: 'Paper Cut Art',
    bg: '#fff9c4',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🍃', x: 12, y: 12, size: 60, rotate: -15 },
      { type: 'emoji', emoji: '🍂', x: 88, y: 88, size: 70, rotate: 10 },
      { type: 'emoji', emoji: '✂️', x: 50, y: 5, size: 45, rotate: 45 },
      { type: 'emoji', emoji: '🎨', x: 5, y: 45, size: 40 },
      { type: 'emoji', emoji: '🪁', x: 95, y: 50, size: 50 },
      { type: 'emoji', emoji: '🧩', x: 50, y: 95, size: 35 },
      { type: 'emoji', emoji: '🌸', x: 10, y: 90, size: 40 },
      { type: 'bubble', x: 15, y: 15, w: 60, h: 60 },
      { type: 'sparkle', x: 85, y: 15, emoji: '✨' },
    ]
  },
  { 
    id: 'polaroid-stack',
    name: 'Layer Stack',
    bg: '#e0e0e0',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🎞️', x: 15, y: 15, size: 100, rotate: -10 },
      { type: 'emoji', emoji: '📸', x: 85, y: 85, size: 60 },
      { type: 'emoji', emoji: '🎞️', x: 88, y: 12, size: 80, rotate: 15 },
      { type: 'emoji', emoji: '📷', x: 12, y: 88, size: 50 },
      { type: 'emoji', emoji: '📽️', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '✨', x: 50, y: 95, size: 35 },
      { type: 'bubble', x: 15, y: 15, w: 70, h: 70 },
      { type: 'bubble', x: 85, y: 85, w: 80, h: 80 },
    ]
  },
  { 
    id: 'doodle-sketch',
    name: 'Doodle Sketch',
    bg: '#ffffff',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '⭐', x: 12, y: 12, size: 50 },
      { type: 'emoji', emoji: '🌟', x: 88, y: 88, size: 45 },
      { type: 'emoji', emoji: '☁️', x: 85, y: 15, size: 55 },
      { type: 'emoji', emoji: '🌙', x: 15, y: 85, size: 50 },
      { type: 'emoji', emoji: '✨', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '🎨', x: 5, y: 50, size: 35 },
      { type: 'emoji', emoji: '✏️', x: 95, y: 50, size: 30 },
      { type: 'bubble', x: 15, y: 15, w: 40, h: 40 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
  { 
    id: 'cloud-dream',
    name: 'Cloud Dream',
    bg: '#e1f5fe',
    cssClass: 'theme-bubble',
    items: [
      { type: 'bubble', x: 15, y: 15, w: 180, h: 90 },
      { type: 'bubble', x: 85, y: 85, w: 160, h: 100 },
      { type: 'emoji', emoji: '☁️', x: 88, y: 12, size: 60 },
      { type: 'emoji', emoji: '☁️', x: 12, y: 88, size: 50 },
      { type: 'emoji', emoji: '✨', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '🌈', x: 5, y: 50, size: 45 },
      { type: 'bubble', x: 95, y: 50, w: 70, h: 70 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
  { 
    id: 'bubble-gloss',
    name: 'Glossy Bubbles',
    bg: '#e0f7fa',
    cssClass: 'theme-bubble',
    items: [
      { type: 'bubble', x: 15, y: 15, w: 100, h: 100 },
      { type: 'bubble', x: 85, y: 85, w: 120, h: 120 },
      { type: 'bubble', x: 10, y: 85, w: 80, h: 80 },
      { type: 'bubble', x: 90, y: 10, w: 90, h: 90 },
      { type: 'emoji', emoji: '🫧', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '✨', x: 5, y: 50, size: 30 },
      { type: 'emoji', emoji: '🫧', x: 95, y: 50, size: 35 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
  { 
    id: 'grid-chic',
    name: 'Grid Chic',
    bg: '#f5f5f5',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🏁', x: 15, y: 15, size: 60 },
      { type: 'emoji', emoji: '🏁', x: 85, y: 85, size: 50 },
      { type: 'emoji', emoji: '🎱', x: 90, y: 15, size: 45 },
      { type: 'emoji', emoji: '🛹', x: 10, y: 85, size: 40 },
      { type: 'emoji', emoji: '🕶️', x: 50, y: 5, size: 35 },
      { type: 'emoji', emoji: '🎧', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '🎮', x: 95, y: 50, size: 35 },
      { type: 'emoji', emoji: '✨', x: 50, y: 95, size: 30 },
      { type: 'bubble', x: 15, y: 15, w: 50, h: 50 },
    ]
  },
  { 
    id: 'retro-pop',
    name: 'Retro Pop',
    bg: '#ffccbc',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🌈', x: 15, y: 15, size: 60 },
      { type: 'bubble', x: 85, y: 85, w: 120, h: 120 },
      { type: 'emoji', emoji: '🍄', x: 88, y: 12, size: 50 },
      { type: 'emoji', emoji: '🍒', x: 12, y: 88, size: 45 },
      { type: 'emoji', emoji: '🍭', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '📻', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '🥤', x: 95, y: 50, size: 35 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
  { 
    id: 'fabric-textile',
    name: 'Fabric Style',
    bg: '#d7ccc8',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🧵', x: 12, y: 12, size: 50 },
      { type: 'emoji', emoji: '🧶', x: 88, y: 88, size: 55 },
      { type: 'emoji', emoji: '🪡', x: 85, y: 15, size: 45 },
      { type: 'emoji', emoji: '🧸', x: 15, y: 85, size: 50 },
      { type: 'emoji', emoji: '🎀', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '🩰', x: 5, y: 50, size: 45 },
      { type: 'emoji', emoji: '🧵', x: 95, y: 50, size: 40 },
      { type: 'emoji', emoji: '🧶', x: 50, y: 95, size: 45 },
      { type: 'bubble', x: 15, y: 15, w: 50, h: 50 },
    ]
  },
  { 
    id: 'sticker-collage',
    name: 'Sticker Bomb',
    bg: '#f8bbd0',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '⭐', x: 12, y: 12, size: 50 },
      { type: 'emoji', emoji: '🍓', x: 88, y: 12, size: 55 },
      { type: 'emoji', emoji: '🐱', x: 12, y: 88, size: 50 },
      { type: 'emoji', emoji: '💖', x: 88, y: 88, size: 60 },
      { type: 'emoji', emoji: '🌈', x: 50, y: 5, size: 45 },
      { type: 'emoji', emoji: '🦋', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '🌸', x: 95, y: 50, size: 40 },
      { type: 'bubble', x: 15, y: 15, w: 60, h: 60 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
  { 
    id: 'frame-border',
    name: 'Border Art',
    bg: '#ffffff',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '✨', x: 50, y: 5, size: 40 },
      { type: 'emoji', emoji: '✨', x: 50, y: 95, size: 40 },
      { type: 'emoji', emoji: '✨', x: 5, y: 50, size: 40 },
      { type: 'emoji', emoji: '✨', x: 95, y: 50, size: 40 },
      { type: 'emoji', emoji: '💎', x: 10, y: 10, size: 40 },
      { type: 'emoji', emoji: '💎', x: 90, y: 10, size: 40 },
      { type: 'emoji', emoji: '💎', x: 10, y: 90, size: 40 },
      { type: 'emoji', emoji: '💎', x: 90, y: 90, size: 40 },
      { type: 'sparkle', x: 15, y: 15, emoji: '✨' },
      { type: 'sparkle', x: 85, y: 85, emoji: '✨' },
    ]
  },
  { 
    id: 'elegant-minimal',
    name: 'Elegant Minimal',
    bg: '#fafafa',
    cssClass: 'theme-minimal',
    items: [
      { type: 'emoji', emoji: '🥂', x: 15, y: 15, size: 40 },
      { type: 'emoji', emoji: '💍', x: 85, y: 85, size: 45 },
      { type: 'emoji', emoji: '✨', x: 50, y: 5, size: 35 },
      { type: 'emoji', emoji: '🕯️', x: 5, y: 50, size: 30 },
      { type: 'emoji', emoji: '🦢', x: 95, y: 50, size: 35 },
      { type: 'bubble', x: 15, y: 85, w: 40, h: 40 },
      { type: 'sparkle', x: 50, y: 95, emoji: '✨' },
    ]
  },
];

const Photobooth = ({ onBack, onSave }) => {
  const [stream, setStream] = useState(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [countdown, setCountdown] = useState(null);
  const [selectedTimer, setSelectedTimer] = useState(3);
  const [activeFilter, setActiveFilter] = useState(filters[0]);
  const [activeLayout, setActiveLayout] = useState(layouts[0]);
  const [activeTheme, setActiveTheme] = useState(themes[0]);
  const [activeStickerPack, setActiveStickerPack] = useState(aestheticStickerPacks[0]);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [activeTab, setActiveTab] = useState('filters');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const getStickerIcon = (iconName, props) => {
    const icons = {
      heart: Heart,
      star: Star,
      sparkle: Sparkles,
      smile: Smile,
      flower: Flower2,
      cloud: Cloud,
      moon: Moon,
      cat: Cat
    };
    const IconComp = icons[iconName];
    return IconComp ? <IconComp {...props} /> : null;
  };

  // Auto-start camera on mount
  useEffect(() => {
    startCamera();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    setCameraLoading(true);
    setCameraError(null);
    const isPortrait = activeLayout.ratio.startsWith('9');
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: isPortrait ? { ideal: 720 } : { ideal: 1280 },
          height: isPortrait ? { ideal: 1280 } : { ideal: 720 },
          facingMode: "user"
        },
        audio: false
      });
      setStream(mediaStream);
      streamRef.current = mediaStream;
      setIsCameraActive(true);
      setCameraLoading(false);
    } catch (err) {
      console.error("Camera error: ", err);
      setCameraError("Camera access denied. Please allow camera permissions!");
      setCameraLoading(false);
    }
  };

  useEffect(() => {
    if (stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream, isCameraActive, capturedImages.length]);

  useEffect(() => {
    if (isCameraActive) startCamera();
  }, [activeLayout.ratio]);

  const [isAutoCapturing, setIsAutoCapturing] = useState(false);

  const capturePhoto = () => {
    if (capturedImages.length >= activeLayout.count) return;
    setIsAutoCapturing(true); // Start the sequence
    if (selectedTimer === 0) {
      executeCapture();
    } else {
      setCountdown(selectedTimer);
    }
  };

  const executeCapture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      const width = video.videoWidth || 1280;
      const height = video.videoHeight || 720;
      canvas.width = width;
      canvas.height = height;

      context.translate(width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, width, height);
      context.setTransform(1, 0, 0, 1, 0, 0);

      const dataUrl = canvas.toDataURL('image/png');

      setCapturedImages(prev => {
        const newImages = [...prev, dataUrl];
        if (newImages.length < activeLayout.count && isAutoCapturing) {
          setTimeout(() => {
            setCountdown(selectedTimer || 3);
          }, 1500);
        } else {
          setIsAutoCapturing(false);
          if (newImages.length === activeLayout.count && onSave) {
            setTimeout(async () => {
              const collageUrl = await downloadCollage('png', true);
              if (collageUrl) onSave(collageUrl);
            }, 800);
          }
        }
        return newImages;
      });

      setCountdown(null);
    }
  };

  useEffect(() => {
    if (countdown === null) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      executeCapture();
    }
  }, [countdown]);

  const downloadCollage = async (format = 'png', isAutoSave = false) => {
    if (capturedImages.length === 0) return null;

    const finalCanvas = document.createElement('canvas');
    const ctx = finalCanvas.getContext('2d');

    // Dynamic Ratio Calculation
    const [ratioW, ratioH] = activeLayout.ratio.split('/').map(Number);
    const baseSize = 1080;
    const width = ratioW > ratioH ? baseSize * (ratioW / ratioH) : baseSize;
    const height = ratioH > ratioW ? baseSize * (ratioH / ratioW) : baseSize;

    finalCanvas.width = width;
    finalCanvas.height = height;

    // Handle background (Solid or Gradient)
    const bgColor = activeTheme.color || '#FFFFFF';
    if (bgColor.startsWith('linear-gradient')) {
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      // Fallback for gradient themes
      gradient.addColorStop(0, '#1e1e2e');
      gradient.addColorStop(1, '#3d2b56');
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, width, height);

    const padding = 40;
    const gridGap = 20;
    const availableWidth = width - (padding * 2);
    const availableHeight = height - (padding * 2);

    let rows, cols;
    if (activeLayout.id.startsWith('vgrid')) {
      if (activeLayout.id === 'vgrid-6') { rows = 3; cols = 2; }
      else if (activeLayout.id === 'vgrid-1') { rows = 1; cols = 1; }
      else { rows = activeLayout.count; cols = 1; }
    } else {
      if (activeLayout.id === 'grid-6') { rows = 2; cols = 3; }
      else if (activeLayout.id === 'grid-1') { rows = 1; cols = 1; }
      else { rows = 1; cols = activeLayout.count; }
    }

    const itemWidth = (availableWidth - (cols - 1) * gridGap) / cols;
    const itemHeight = (availableHeight - (rows - 1) * gridGap) / rows;

    const loadImage = (src) => new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.src = src;
    });

    try {
      const loadedImages = await Promise.all(capturedImages.map(loadImage));

      loadedImages.forEach((img, i) => {
        const row = Math.floor(i / cols);
        const col = i % cols;
        const x = padding + col * (itemWidth + gridGap);
        const y = padding + row * (itemHeight + gridGap);

        ctx.save();

        // Filter Logic...
        if (activeFilter.class === 'filter-pink') ctx.filter = 'sepia(0.2) hue-rotate(320deg) saturate(1.5) brightness(1.1)';
        else if (activeFilter.class === 'filter-vintage') ctx.filter = 'sepia(0.6) contrast(1.1) brightness(0.95) saturate(0.85)';
        else if (activeFilter.class === 'filter-cool') ctx.filter = 'hue-rotate(180deg) saturate(0.9) brightness(1.1)';
        else if (activeFilter.class === 'filter-bw') ctx.filter = 'grayscale(100%)';
        else if (activeFilter.class === 'filter-sepia') ctx.filter = 'sepia(100%)';
        else if (activeFilter.class === 'filter-bright') ctx.filter = 'brightness(1.4)';
        else if (activeFilter.class === 'filter-contrast') ctx.filter = 'contrast(1.6)';
        else if (activeFilter.class === 'filter-glow') ctx.filter = 'brightness(1.2) saturate(1.3) blur(0.4px)';
        else if (activeFilter.class === 'filter-blur') ctx.filter = 'blur(3px)';
        else if (activeFilter.class === 'filter-pastel') ctx.filter = 'brightness(1.15) saturate(0.6) contrast(0.9)';
        else if (activeFilter.class === 'filter-golden') ctx.filter = 'sepia(0.4) saturate(1.6) brightness(1.1) hue-rotate(-15deg)';
        else if (activeFilter.class === 'filter-envy') ctx.filter = 'contrast(1.2) brightness(1.1) sepia(0.3) hue-rotate(80deg) saturate(1.4)';
        else if (activeFilter.class === 'filter-zinc') ctx.filter = 'grayscale(0.8) contrast(1.4) brightness(1.1) sepia(0.2) hue-rotate(-20deg)';
        else if (activeFilter.class === 'filter-lomo') ctx.filter = 'saturate(1.8) contrast(1.4) brightness(1.1) sepia(0.1) hue-rotate(-5deg)';

        const imgRatio = img.width / img.height;
        const slotRatio = itemWidth / itemHeight;

        let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
        if (imgRatio > slotRatio) {
          drawHeight = itemHeight;
          drawWidth = itemHeight * imgRatio;
          offsetX = (itemWidth - drawWidth) / 2;
        } else {
          drawWidth = itemWidth;
          drawHeight = itemWidth / imgRatio;
          offsetY = (itemHeight - drawHeight) / 2;
        }

        ctx.beginPath();
        ctx.rect(x, y, itemWidth, itemHeight);
        ctx.clip();
        ctx.drawImage(img, x + offsetX, y + offsetY, drawWidth, drawHeight);
        ctx.restore();
      });

      // Draw Stickers
      activeStickerPack.items.forEach(item => {
        ctx.save();
        const stickerX = (item.x / 100) * width;
        const stickerY = (item.y / 100) * height;
        const scaleFactor = (height > width ? height : width) / 1000;
        
        ctx.translate(stickerX, stickerY);
        ctx.rotate(((item.rotate || 0) * Math.PI) / 180);

        if (item.type === 'blob') {
          ctx.beginPath();
          ctx.arc(0, 0, (item.w / 2) * scaleFactor, 0, Math.PI * 2);
          ctx.fillStyle = item.color;
          ctx.globalAlpha = 0.4;
          ctx.fill();
        } else if (item.type === 'bubble') {
          ctx.beginPath();
          ctx.arc(0, 0, (item.w / 2) * scaleFactor, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(-item.w/4, -item.w/4, 0, 0, 0, item.w/2);
          gradient.addColorStop(0, 'rgba(255,255,255,0.8)');
          gradient.addColorStop(0.4, 'rgba(255,255,255,0.1)');
          gradient.addColorStop(1, 'rgba(255,255,255,0.5)');
          ctx.fillStyle = gradient;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 1;
          ctx.stroke();
        } else if (item.type === 'tape' || item.type === 'paper' || item.type === 'shape') {
          ctx.fillStyle = item.color;
          if (item.type === 'tape') ctx.globalAlpha = 0.5;
          const w = (item.w || 40) * scaleFactor;
          const h = (item.h || 40) * scaleFactor;
          ctx.fillRect(-w/2, -h/2, w, h);
        } else if (item.type === 'doodle' || item.type === 'emoji' || item.type === 'sparkle') {
          const fontSize = (item.size || 24) * scaleFactor;
          ctx.font = `${fontSize}px Arial`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = item.color || '#fff';
          
          let val = item.emoji;
          if (item.type === 'doodle') {
            const iconMap = { flower: '🌸', pencil: '✏️', mail: '✉️', heart: '❤️', star: '⭐', cloud: '☁️' };
            val = iconMap[item.icon] || '✨';
          }
          ctx.fillText(val, 0, 0);
        }
        
        ctx.restore();
      });

      // Draw branding logo at bottom (Consistent Dark Color)
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.font = "italic bold 32px 'Playfair Display', serif";
      ctx.textAlign = "center";
      ctx.fillText("DinafyBooth", width / 2, height - 40);

      const mimeType = format === 'jpg' ? 'image/jpeg' : 'image/png';
      const extension = format === 'jpg' ? 'jpg' : 'png';
      const dataUrl = finalCanvas.toDataURL(mimeType, format === 'jpg' ? 0.9 : 1.0);

      if (!isAutoSave) {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `dinafybooth-${Date.now()}.${extension}`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }

      return dataUrl;
    } catch (err) {
      console.error("Collage generation failed: ", err);
      return null;
    }
  };

  const resetBooth = () => {
    setCapturedImages([]);
    setIsAutoCapturing(false);
  };

  return (
    <section className="section-padding booth-view gradient-bg" style={{ minHeight: '100vh', paddingTop: '120px' }}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Aesthetic Photobooth</h2>
          <p className="section-subtitle">Capture your natural self with smooth aesthetic themes.</p>
        </div>

        <div className="booth-container">
          <div className="booth-main">
            <div 
              className={`camera-frame ${activeStickerPack.cssClass} ${activeTheme.type}`}
              style={{ background: activeStickerPack.bg !== 'transparent' ? activeStickerPack.bg : activeTheme.color }}
            >
              <div className="camera-viewport" style={{
                aspectRatio: activeLayout.ratio,
                height: activeLayout.ratio.startsWith('9') ? '650px' : 'auto',
                width: activeLayout.ratio.startsWith('9') ? '365px' : '100%',
                margin: '0 auto',
                display: 'block',
                position: 'relative'
              }}>
                <div className={`viewport-grid ${activeLayout.id}`}>
                  {Array.from({ length: activeLayout.count }).map((_, i) => (
                    <div key={i} className="grid-item">
                      {capturedImages[i] ? (
                        <img src={capturedImages[i]} className={`captured-preview ${activeFilter.class}`} alt="Captured" />
                      ) : (
                        i === capturedImages.length && isCameraActive ? (
                          <video ref={videoRef} autoPlay playsInline muted className={`video-preview ${activeFilter.class}`} />
                        ) : (
                          <div className="placeholder-slot">Slot {i + 1}</div>
                        )
                      )}
                    </div>
                  ))}
                </div>

                <AnimatePresence>
                  {countdown !== null && (
                    <motion.div
                      className="countdown-overlay"
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1.5, opacity: 1 }}
                      exit={{ scale: 2, opacity: 0 }}
                      key={countdown}
                    >
                      {countdown === 0 ? "✨" : countdown}
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isCameraActive && (
                  <div className="camera-placeholder glass flex items-center justify-center">
                    {cameraLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="loading-spinner" size={48} />
                        <p>Initializing Camera...</p>
                      </div>
                    ) : cameraError ? (
                      <div className="flex flex-col items-center gap-4 p-8 text-center">
                        <AlertCircle size={48} className="text-red-500" />
                        <p className="error-msg">{cameraError}</p>
                        <button className="btn-primary" onClick={startCamera}>Try Again</button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-6">
                        <Camera size={64} className="text-pink-200 animate-float" />
                        <button className="btn-primary" onClick={startCamera}>Start Camera</button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Sticker Overlay - Uses activeStickerPack */}
              <div className="sticker-overlay">
                {activeStickerPack.items.map((item, idx) => (
                  <div
                    key={idx}
                    className={`sticker-item ${item.className || ''}`}
                    data-type={item.type}
                    style={{
                      left: `${item.x}%`,
                      top: `${item.y}%`,
                      width: item.w ? `${item.w}px` : 'auto',
                      height: item.h ? `${item.h}px` : 'auto',
                      transform: `translate(-50%, -50%) rotate(${item.rotate || 0}deg)`,
                      backgroundColor: item.color,
                      fontSize: item.size ? `${item.size}px` : 'inherit',
                      color: item.color
                    }}
                  >
                    {item.type === 'doodle' && getStickerIcon(item.icon, { size: item.size, fill: item.color })}
                    {item.emoji}
                  </div>
                ))}
              </div>

              <div className="frame-decor">
                <div className="decor">✨</div>
                <div className="frame-logo">DinafyBooth</div>
                <div className="decor">💖</div>
              </div>
            </div>

            <div className="booth-controls glass p-8 flex flex-col items-center justify-center gap-6">
              <div className="timer-selector flex gap-3 glass p-2 rounded-full">
                {[0, 3, 5].map(t => (
                  <button
                    key={t}
                    className={`timer-btn ${selectedTimer === t ? 'active' : ''}`}
                    onClick={() => setSelectedTimer(t)}
                  >
                    {t === 0 ? 'Off' : `${t}s`}
                  </button>
                ))}
              </div>

              {capturedImages.length < activeLayout.count ? (
                <button
                  className={`btn-capture ${isAutoCapturing ? 'capturing' : ''}`}
                  disabled={!isCameraActive || countdown !== null || isAutoCapturing}
                  onClick={capturePhoto}
                >
                  <div className="capture-inner">
                    {isAutoCapturing && <div className="auto-count">{activeLayout.count - capturedImages.length}</div>}
                  </div>
                </button>
              ) : (
                <div className="flex gap-4">
                  <button className="btn-secondary" onClick={resetBooth} title="Retake Photos">
                    <RotateCcw size={20} />
                  </button>
                  <div className="flex gap-1 glass p-1 rounded-xl">
                    <button className="btn-primary flex items-center gap-2" onClick={() => downloadCollage('png')}>
                      <Download size={18} /> PNG
                    </button>
                    <button className="btn-primary flex items-center gap-2" onClick={() => downloadCollage('jpg')}>
                      JPG
                    </button>
                  </div>
                </div>
              )}

              <div style={{ width: '120px' }}></div>
            </div>
          </div>

          <div className="booth-sidebar glass-dark">
            <div className="sidebar-header-tabs">
              <button className={`side-tab ${activeTab === 'filters' ? 'active' : ''}`} onClick={() => setActiveTab('filters')}>
                <Sparkles size={18} /> Filters
              </button>
              <button className={`side-tab ${activeTab === 'themes' ? 'active' : ''}`} onClick={() => setActiveTab('themes')}>
                <Palette size={18} /> Theme
              </button>
              <button className={`side-tab ${activeTab === 'stickers' ? 'active' : ''}`} onClick={() => setActiveTab('stickers')}>
                <Sticker size={18} /> Sticker
              </button>
              <button className={`side-tab ${activeTab === 'layout' ? 'active' : ''}`} onClick={() => setActiveTab('layout')}>
                <Layout size={18} /> Grid
              </button>
            </div>

            <div className="sidebar-scrollable-content">
              {activeTab === 'filters' && (
                <div className="fade-in">
                  <div className="sidebar-title-group">
                    <Sparkles size={20} className="text-pink-400" />
                    <h4>Premium Filters</h4>
                  </div>
                  <div className="filter-aesthetic-grid">
                    {filters.map((f) => (
                      <motion.button
                        key={f.name}
                        whileHover={{ y: -4 }}
                        className={`filter-card ${activeFilter.name === f.name ? 'active' : ''}`}
                        onClick={() => setActiveFilter(f)}
                      >
                        <div className={`filter-preview-thumb ${f.class}`}>
                          <div className="filter-sample-bg"></div>
                        </div>
                        <span className="filter-name">{f.name}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'themes' && (
                <div className="fade-in">
                  <div className="sidebar-title-group">
                    <Palette size={20} className="text-purple-400" />
                    <h4>Background Colors</h4>
                  </div>
                  <div className="theme-aesthetic-grid">
                    {themes.map(t => (
                      <button
                        key={t.id}
                        className={`theme-card ${activeTheme.id === t.id ? 'active' : ''}`}
                        onClick={() => setActiveTheme(t)}
                      >
                        <div className="theme-swatch" style={{ background: t.color }}></div>
                        <span className="theme-name">{t.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'stickers' && (
                <div className="fade-in">
                  <div className="sidebar-title-group">
                    <Sticker size={20} className="text-yellow-500" />
                    <h4>Aesthetic Frames</h4>
                  </div>
                  <div className="theme-aesthetic-grid">
                    {aestheticStickerPacks.map(p => (
                      <button
                        key={p.id}
                        className={`theme-card ${activeStickerPack.id === p.id ? 'active' : ''}`}
                        onClick={() => setActiveStickerPack(p)}
                      >
                        <div className={`theme-preview-box ${p.cssClass}`} style={{ background: p.bg }}>
                          <div className="mini-sticker">{p.id === 'none' ? '🚫' : p.items[0]?.emoji}</div>
                        </div>
                        <span className="theme-name">{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'layout' && (
                <div className="fade-in">
                  <div className="sidebar-title-group">
                    <Layout size={20} className="text-blue-400" />
                    <h4>Choose Your Grid</h4>
                  </div>
                  <div className="layout-aesthetic-grid">
                    {layouts.map(l => (
                      <button
                        key={l.id}
                        className={`layout-card ${activeLayout.id === l.id ? 'active' : ''}`}
                        onClick={() => { setActiveLayout(l); setCapturedImages([]); }}
                      >
                        <div className={`layout-mini-preview ${l.id}`}></div>
                        <span className="layout-name">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      <style>{`
        .sidebar-header-tabs { display: flex; gap: 8px; margin-bottom: 24px; background: rgba(255,255,255,0.5); padding: 6px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.3); }
        .side-tab { flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; padding: 10px; border-radius: 100px; font-weight: 600; font-size: 0.85rem; color: var(--text-light); transition: all 0.3s ease; }
        .side-tab.active { background: white; color: var(--accent-pink); box-shadow: 0 4px 12px rgba(255, 128, 171, 0.2); }
        .sidebar-title-group { display: flex; align-items: center; gap: 10px; margin-bottom: 20px; }
        .sidebar-title-group h4 { font-size: 1rem; font-weight: 700; color: var(--text-main); }
        
        .filter-aesthetic-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
        .filter-card { background: white; border-radius: 16px; padding: 8px; border: 2px solid transparent; transition: all 0.3s ease; display: flex; flex-direction: column; align-items: center; gap: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.03); }
        .filter-card.active { border-color: var(--accent-pink); background: var(--soft-pink); transform: scale(1.05); }
        .filter-preview-thumb { width: 100%; aspect-ratio: 1; border-radius: 10px; overflow: hidden; background: #eee; }
        .filter-sample-bg { width: 100%; height: 100%; background: linear-gradient(45deg, #FFD1DC, #F3E5F5); }
        .filter-name { font-size: 0.7rem; font-weight: 600; color: var(--text-light); }
        .filter-card.active .filter-name { color: var(--accent-pink); }
        .active-dot { width: 6px; height: 6px; background: var(--accent-pink); border-radius: 50%; }

        .timer-btn { padding: 6px 16px; border-radius: 100px; font-size: 0.85rem; font-weight: 600; color: var(--text-light); transition: all 0.3s ease; }
        .timer-btn.active { background: var(--accent-pink); color: white; box-shadow: 0 4px 12px rgba(255, 128, 171, 0.3); }

        .theme-aesthetic-grid { display: grid; grid-template-columns: 1fr; gap: 10px; }
        .theme-card { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 16px; background: white; border: 2px solid transparent; transition: all 0.3s ease; }
        .theme-card.active { border-color: var(--accent-pink); background: var(--soft-pink); }
        .theme-swatch { width: 28px; height: 28px; border-radius: 8px; border: 1px solid rgba(0,0,0,0.05); }
        .theme-name { font-size: 0.85rem; font-weight: 500; }

        .layout-aesthetic-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
        .layout-card { background: white; border-radius: 20px; padding: 12px; border: 2px solid transparent; display: flex; flex-direction: column; align-items: center; gap: 8px; transition: all 0.3s ease; aspect-ratio: 1/1; justify-content: center; }
        .layout-card:hover { transform: translateY(-4px); box-shadow: 0 8px 20px rgba(0,0,0,0.05); }
        .layout-card.active { border-color: var(--accent-pink); background: var(--soft-pink); box-shadow: 0 0 15px rgba(255, 128, 171, 0.3); }
        .layout-mini-preview { width: 50px; height: 30px; border: 1px solid #ddd; border-radius: 4px; position: relative; background: #fdfdfd; transition: all 0.3s ease; }
        .layout-mini-preview::after { content: ''; position: absolute; background: #eee; border-radius: 1px; }
        
        /* Landscape Mini Previews */
        .grid-1::after { inset: 3px; }
        .grid-2::after { inset: 3px; width: 20px; box-shadow: 24px 0 0 #eee; }
        .grid-3::after { inset: 3px; width: 12px; box-shadow: 16px 0 0 #eee, 32px 0 0 #eee; }
        .grid-4::after { inset: 3px; width: 8px; box-shadow: 11px 0 0 #eee, 22px 0 0 #eee, 33px 0 0 #eee; }
        .grid-6::after { inset: 3px; width: 12px; height: 10px; box-shadow: 16px 0 0 #eee, 32px 0 0 #eee, 0 14px 0 #eee, 16px 14px 0 #eee, 32px 14px 0 #eee; }
        
        /* Vertical Mini Previews */
        .vgrid-1, .vgrid-2, .vgrid-3, .vgrid-4, .vgrid-6 { width: 28px; height: 50px; }
        .vgrid-1::after { inset: 3px; }
        .vgrid-2::after { inset: 3px; height: 20px; box-shadow: 0 24px 0 #eee; }
        .vgrid-3::after { inset: 3px; height: 12px; box-shadow: 0 16px 0 #eee, 0 32px 0 #eee; }
        .vgrid-4::after { inset: 3px; height: 8px; box-shadow: 0 11px 0 #eee, 0 22px 0 #eee, 0 33px 0 #eee; }
        .vgrid-6::after { inset: 3px; width: 10px; height: 12px; box-shadow: 14px 0 0 #eee, 0 16px 0 #eee, 14px 16px 0 #eee, 0 32px 0 #eee, 14px 32px 0 #eee; }

        .layout-name { font-size: 0.8rem; font-weight: 600; color: var(--text-light); }
      `}</style>
    </section>
  );
};

export default Photobooth;
