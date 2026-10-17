import LocomotiveScroll from 'locomotive-scroll';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const scrollContainer = document.querySelector('[data-scroll-container]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let scroll;
let resizeTimer;

if (scrollContainer) {
  scroll = new LocomotiveScroll({
    el: scrollContainer,
    smooth: !reducedMotion && window.innerWidth > 768,
    lerp: 0.1,
    multiplier: 1,
    class: 'is-inview',
    repeat: false,
    getSpeed: true,
    getDirection: true,
    tablet: { smooth: !reducedMotion, breakpoint: 1024 },
    smartphone: { smooth: false, breakpoint: 768 }
  });

  scroll.on('scroll', ScrollTrigger.update);

  ScrollTrigger.scrollerProxy(scrollContainer, {
    scrollTop(value) {
      if (arguments.length) {
        scroll.scrollTo(value, { duration: 0, disableLerp: true });
        return value;
      }
      return scroll.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight
      };
    },
    pinType: scrollContainer.style.transform ? 'transform' : 'fixed'
  });

  ScrollTrigger.addEventListener('refresh', () => scroll.update());
}

function refreshScroll() {
  if (scroll) scroll.update();
  ScrollTrigger.refresh();
}

window.addEventListener('resize', () => {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(refreshScroll, 200);
});

if (!reducedMotion) {
  gsap.from('.hero h1', {
    opacity: 0, y: 40, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: '.hero', start: 'top 80%', scroller: scrollContainer }
  });
  gsap.from('.hero p, .hero .cta-button', {
    opacity: 0, y: 24, duration: 0.8, stagger: 0.12, ease: 'power2.out',
    scrollTrigger: { trigger: '.hero', start: 'top 80%', scroller: scrollContainer }
  });
  gsap.utils.toArray('.collection-panel').forEach((panel, index) => {
    gsap.from(panel, {
      opacity: 0, y: 28, duration: 0.6, delay: index * 0.05,
      scrollTrigger: { trigger: panel, start: 'top 90%', scroller: scrollContainer }
    });
  });
  gsap.from('.featured-card', {
    opacity: 0, y: 24, duration: 0.6, stagger: 0.1,
    scrollTrigger: { trigger: '.featured-section', start: 'top 80%', scroller: scrollContainer }
  });
  gsap.from('.story-content p', {
    opacity: 0, y: 20, duration: 0.6, stagger: 0.12,
    scrollTrigger: { trigger: '.story-section', start: 'top 80%', scroller: scrollContainer }
  });
  gsap.to('.hero-bg', {
    opacity: 0.2, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut'
  });
}

function scrollToTarget(target) {
  if (!target) return;
  if (scroll) {
    scroll.scrollTo(target, { offset: -80, duration: reducedMotion ? 0 : 700 });
  } else {
    target.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }
}

document.querySelectorAll('.nav-links a[href^="#"], .logo[href^="#"], .cta-button[href^="#"], .footer-links a[href^="#"]').forEach(link => {
  link.addEventListener('click', event => {
    const id = link.getAttribute('href');
    if (!id || id === '#') return;
    const target = id === '#hero' ? document.querySelector('#hero') : document.querySelector(id);
    if (!target) return;
    event.preventDefault();
    scrollToTarget(target);
    document.querySelector('.nav-links')?.classList.remove('is-open');
    document.querySelector('.menu-toggle')?.setAttribute('aria-expanded', 'false');
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});

const productCards = [...document.querySelectorAll('.featured-card')];
const featuredHeading = document.querySelector('#featured h2');
const originalFeaturedHeading = featuredHeading?.textContent ?? 'Featured Pieces';

document.querySelectorAll('.collection-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const category = link.dataset.collection;
    productCards.forEach(card => {
      card.hidden = category !== 'all' && card.dataset.category !== category;
    });
    if (featuredHeading) {
      featuredHeading.textContent = category === 'all'
        ? originalFeaturedHeading
        : `Featured Pieces — ${link.dataset.label}`;
    }
    scrollToTarget(document.querySelector('#featured'));
  });
});

document.querySelector('.show-all-products')?.addEventListener('click', event => {
  event.preventDefault();
  productCards.forEach(card => { card.hidden = false; });
  if (featuredHeading) featuredHeading.textContent = originalFeaturedHeading;
  scrollToTarget(document.querySelector('#featured'));
});

const modal = document.querySelector('#product-modal');
const modalTitle = document.querySelector('#modal-product-title');
const modalDescription = document.querySelector('#modal-product-description');
const modalPrice = document.querySelector('#modal-product-price');
const modalImage = document.querySelector('#modal-product-image');
const productDetails = [
  { title: 'Silk Blouse', price: '$128.00', description: 'A refined silk blouse designed for versatile everyday styling.', image: 'product-1' },
  { title: 'Linen Trousers', price: '$98.00', description: 'Lightweight linen trousers with a relaxed, warm-weather fit.', image: 'product-2' },
  { title: 'Cashmere Sweater', price: '$185.00', description: 'A soft knit layer with a timeless silhouette.', image: 'product-3' },
  { title: 'Leather Jacket', price: '$298.00', description: 'A classic outerwear layer with a clean, structured finish.', image: 'product-4' }
];

function closeModal() {
  if (!modal) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.quick-view').forEach(button => {
  button.addEventListener('click', () => {
    const product = productDetails[Number(button.dataset.productIndex)];
    if (!product || !modal) return;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    modalImage.className = `modal-product-image ${product.image}`;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    modal.querySelector('.modal-close')?.focus();
  });
});

modal?.querySelectorAll('[data-close-modal]').forEach(element => {
  element.addEventListener('click', closeModal);
});
modal?.querySelector('.modal-close')?.addEventListener('click', closeModal);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

const newsletterForm = document.querySelector('.newsletter-form');
const newsletterStatus = document.querySelector('#newsletter-status');
newsletterForm?.addEventListener('submit', event => {
  event.preventDefault();
  if (!newsletterForm.reportValidity() || !newsletterStatus) return;
  newsletterStatus.textContent = 'Thanks! This prototype does not send or store email addresses yet.';
  newsletterStatus.setAttribute('role', 'status');
  newsletterForm.reset();
});

if (scroll) {
  ScrollTrigger.refresh();
  window.addEventListener('load', refreshScroll, { once: true });
  window.addEventListener('beforeunload', () => scroll.destroy(), { once: true });
}

window.locomotiveScroll = scroll;
window.gsap = gsap;
window.ScrollTrigger = ScrollTrigger;
