/**
 * Locomotive Scroll Starter - Main JavaScript
 *
 * This file initializes Locomotive Scroll and demonstrates:
 * - Basic smooth scrolling
 * - Scroll event handling
 * - Call events
 * - Progress tracking
 * - Programmatic scrolling
 */

import LocomotiveScroll from 'https://cdn.skypack.dev/locomotive-scroll@4';
import { gsap } from 'https://cdn.skypack.dev/gsap@3';
import { ScrollTrigger } from 'https://cdn.skypack.dev/gsap@3/ScrollTrigger.js';
import { ScrollToPlugin } from 'https://cdn.skypack.dev/gsap@3/ScrollToPlugin.js';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Initialize Locomotive Scroll
const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  lerp: 0.1,          // Smoothness (0-1, lower = smoother)
  multiplier: 1,      // Speed multiplier
  class: 'is-inview', // Class added to visible elements
  repeat: true,       // Repeat in-view detection
  offset: ['10%', 0], // Global offset [bottom, top]
  getSpeed: true,     // Track scroll speed
  getDirection: true, // Track scroll direction

  // Tablet settings
  tablet: {
    smooth: true,
    breakpoint: 1024
  },

  // Smartphone settings
  smartphone: {
    smooth: true,
    breakpoint: 768
  }
});

// Update on window resize
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    scroll.update();
  }, 250);
});

// Sync Locomotive Scroll with ScrollTrigger
scroll.on('scroll', ScrollTrigger.update);

ScrollTrigger.scrollerProxy('[data-scroll-container]', {
  scrollTop(value) {
    return arguments.length
      ? scroll.scrollTo(value, 0, 0)
      : scroll.scroll.instance.scroll.y;
  },
  getBoundingClientRect() {
    return {
      top: 0,
      left: 0,
      width: window.innerWidth,
      height: window.innerHeight
    };
  },
  // Locomotive Scroll handles things completely differently on
  // different browsers - so we need to check
  pinType: document.querySelector('[data-scroll-container]').style.transform
    ? 'transform'
    : 'fixed'
});

// Update ScrollTrigger when Locomotive Scroll updates
ScrollTrigger.addEventListener('refresh', () => scroll.update());

// Initialize ScrollTrigger
ScrollTrigger.refresh();

// Scroll event - Fires on every scroll update
scroll.on('scroll', (args) => {
  // Current scroll position
  const scrollY = args.scroll.y;

  // Scroll speed and direction
  const speed = args.speed;
  const direction = args.direction; // 'up', 'down', 'left', 'right'

  // Log scroll info (remove in production)
  // console.log('Scroll Y:', scrollY, 'Speed:', speed, 'Direction:', direction);

  // Track specific element progress
  if (args.currentElements['hero-title']) {
    const progress = args.currentElements['hero-title'].progress;
    // Use progress (0 to 1) for custom animations
    // console.log('Hero title progress:', progress);
  }

  // Track special card
  if (args.currentElements['special-card']) {
    const el = args.currentElements['special-card'];
    // console.log('Special card in view:', el.inView);
  }
});

// Call event - Fires when elements with data-scroll-call enter/exit viewport
scroll.on('call', (func, way, obj) => {
  console.log(`Call event: ${func} - ${way}`);

  // Handle specific callbacks
  if (func === 'fadeIn') {
    if (way === 'enter') {
      console.log('Element entered viewport:', obj.el);
      obj.el.style.opacity = '1';
    } else if (way === 'exit') {
      console.log('Element exited viewport:', obj.el);
    }
  }
});

// Smooth scroll to section on nav click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');

    if (target === '#hero') {
      scroll.scrollTo('top');
    } else {
      scroll.scrollTo(target, {
        offset: -80,      // Offset for fixed nav
        duration: 1000,   // Duration in ms
        easing: [0.25, 0.0, 0.35, 1.0] // Cubic bezier
      });
    }
  });
});

// Hero Section Animations
gsap.from('.hero h1', {
  opacity: 0,
  y: 50,
  duration: 1.5,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.hero',
    scroller: '[data-scroll-container]',
    start: 'top bottom+=100',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.hero p', {
  opacity: 0,
  y: 30,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.hero',
    scroller: '[data-scroll-container]',
    start: 'top bottom+=50',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.cta-button', {
  opacity: 0,
  scale: 0.8,
  duration: 0.8,
  ease: 'back.out(1.7)',
  scrollTrigger: {
    trigger: '.hero',
    scroller: '[data-scroll-container]',
    start: 'top bottom+=0',
    toggleActions: 'play none none reverse'
  }
});

// Scroll indicator pulse animation
gsap.to('.hero-bg', {
  opacity: 0.05,
  duration: 2,
  repeat: -1,
  yoyo: true,
  ease: 'sine.inOut'
});

// Collections Section - Horizontal Scroll
gsap.utils.toArray('.collection-panel').forEach((panel, index) => {
  gsap.from(panel, {
    opacity: 0,
    x: index % 2 === 0 ? -100 : 100,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: panel,
      scroller: '[data-scroll-container]',
      start: 'top center+=100',
      toggleActions: 'play none none reverse'
    }
  });
});

// Featured Products Section - Staggered fade-in
gsap.from('.featured-card', {
  opacity: 0,
  y: 50,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.15,
  scrollTrigger: {
    trigger: '.featured-section',
    scroller: '[data-scroll-container]',
    start: 'top bottom-=100',
    toggleActions: 'play none none reverse'
  }
});

// Product Reveal Section - Sketch to Product Transformation
gsap.from('.reveal-sketch', {
  opacity: 0,
  x: -100,
  duration: 1.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.reveal-section',
    scroller: '[data-scroll-container]',
    start: 'top center',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.reveal-product', {
  opacity: 0,
  x: 100,
  duration: 1.2,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.reveal-section',
    scroller: '[data-scroll-container]',
    start: 'top center+=200',
    toggleActions: 'play none none reverse'
  }
});

// Brand Story Section - Text fade-in
gsap.from('.story-content p', {
  opacity: 0,
  y: 40,
  duration: 0.8,
  ease: 'power2.out',
  stagger: 0.2,
  scrollTrigger: {
    trigger: '.story-section',
    scroller: '[data-scroll-container]',
    start: 'top bottom-=100',
    toggleActions: 'play none none reverse'
  }
});

// Newsletter Section - Form animations
gsap.from('.newsletter-content p', {
  opacity: 0,
  y: 30,
  duration: 0.8,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.newsletter-section',
    scroller: '[data-scroll-container]',
    start: 'top bottom-=100',
    toggleActions: 'play none none reverse'
  }
});

gsap.from('.newsletter-form', {
  opacity: 0,
  y: 50,
  duration: 1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.newsletter-section',
    scroller: '[data-scroll-container]',
    start: 'top bottom-=50',
    toggleActions: 'play none none reverse'
  }
});

// Progress Bar (if needed in future)
/*
const progressBar = document.createElement('div');
progressBar.style.position = 'fixed';
progressBar.style.top = 0;
progressBar.style.left = 0;
progressBar.style.height = '4px';
progressBar.style.background = 'linear-gradient(90deg, #1a1a1a, #333)';
progressBar.style.width = '0%';
progressBar.style.zIndex = 1001;
document.body.appendChild(progressBar);

scroll.on('scroll', (args) => {
  const progress = args.scroll.y / (args.limit.y - args.window.height) * 100;
  progressBar.style.width = progress + '%';
});
*/

// Active Navigation Tracking
function updateActiveNav() {
  const sections = document.querySelectorAll('[data-scroll-section]');
  const navLinks = document.querySelectorAll('.nav-links a');

  let currentSection = '';

  sections.forEach(section => {
    const sectionTop = scroll.scroll.instance.scroll.y;
    const sectionOffsetTop = section.offsetTop - 100; // Account for nav height
    const sectionOffsetBottom = sectionOffsetTop + section.offsetHeight;

    if (
      sectionTop >= sectionOffsetTop &&
      sectionTop < sectionOffsetBottom
    ) {
      const id = section.getAttribute('id');
      currentSection = id ? `#${id}` : '';
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === currentSection) {
      link.classList.add('active');
    }
  });
}

scroll.on('scroll', updateActiveNav);

// Initial call to set active nav on load
updateActiveNav();

// Log initialization
console.log('Locomotive Scroll initialized');
console.log('Scroll instance:', scroll);

// Export for debugging
window.locomotiveScroll = scroll;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;