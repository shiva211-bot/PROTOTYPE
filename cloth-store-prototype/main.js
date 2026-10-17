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
  // A short editorial entrance: label, wordmark, supporting copy, then the CTA.
  const heroIntro = gsap.timeline({ delay: 0.08, defaults: { ease: 'power3.out' } });
  heroIntro
    .from('.hero .eyebrow', { opacity: 0, y: 12, duration: 0.45 })
    .from('.hero h1', { opacity: 0, y: 34, duration: 0.8 }, '-=0.12')
    .from('.hero-content > p:not(.eyebrow)', { opacity: 0, y: 18, duration: 0.55 }, '-=0.28')
    .from('.hero .cta-button', { opacity: 0, y: 12, duration: 0.45 }, '-=0.18');

  // Stagger the collection content rather than the card shell so hover transforms remain independent.
  gsap.utils.toArray('.collection-panel .panel-content').forEach((content, index) => {
    gsap.from(content, {
      opacity: 0,
      y: 22,
      duration: 0.55,
      delay: index * 0.045,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: content.closest('.collection-panel'),
        start: 'top 88%',
        once: true,
        scroller: scrollContainer
      }
    });
  });

  // Reveal product photography with a restrained scale/fade; keep the cards themselves stable.
  gsap.from('.featured-card .product-image', {
    opacity: 0,
    scale: 1.035,
    duration: 0.7,
    stagger: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.featured-section',
      start: 'top 82%',
      once: true,
      scroller: scrollContainer
    }
  });

  gsap.from('.reveal-sketch', {
    opacity: 0,
    x: -24,
    duration: 0.7,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.reveal-section',
      start: 'top 78%',
      once: true,
      scroller: scrollContainer
    }
  });
  gsap.from('.reveal-product', {
    opacity: 0,
    x: 24,
    duration: 0.7,
    delay: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.reveal-section',
      start: 'top 78%',
      once: true,
      scroller: scrollContainer
    }
  });

  gsap.from('.story-content p', {
    opacity: 0,
    y: 18,
    duration: 0.55,
    stagger: 0.12,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.story-section',
      start: 'top 82%',
      once: true,
      scroller: scrollContainer
    }
  });

  // Ambient movement is deliberately subtle and runs only when motion is permitted.
  gsap.to('.hero-bg', {
    scale: 1.04,
    opacity: 0.22,
    duration: 4,
    repeat: -1,
    yoyo: true,
    ease: 'sine.inOut'
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

let filterSequence = 0;
let filterTween;

function applyCollectionFilter(category, label = '') {
  const shouldShow = card => category === 'all' || card.dataset.category === category;
  const leaving = productCards.filter(card => !card.hidden && !shouldShow(card));
  const entering = productCards.filter(card => card.hidden && shouldShow(card));
  const sequence = ++filterSequence;

  if (filterTween) filterTween.kill();
  if (reducedMotion || (leaving.length === 0 && entering.length === 0)) {
    productCards.forEach(card => { card.hidden = !shouldShow(card); });
  } else {
    const revealMatches = () => {
      if (sequence !== filterSequence) return;
      productCards.forEach(card => { card.hidden = !shouldShow(card); });
      if (entering.length) {
        gsap.fromTo(entering,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.32, stagger: 0.045, ease: 'power2.out', clearProps: 'transform' }
        );
      }
    };

    if (leaving.length) {
      filterTween = gsap.to(leaving, {
        opacity: 0,
        y: 10,
        duration: 0.16,
        stagger: 0.025,
        ease: 'power1.in',
        onComplete: revealMatches
      });
    } else {
      revealMatches();
    }
  }

  if (featuredHeading) {
    featuredHeading.textContent = category === 'all'
      ? originalFeaturedHeading
      : `Featured Pieces — ${label}`;
  }
}

document.querySelectorAll('.collection-link').forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    applyCollectionFilter(link.dataset.collection, link.dataset.label);
    scrollToTarget(document.querySelector('#featured'));
  });
});

document.querySelector('.show-all-products')?.addEventListener('click', event => {
  event.preventDefault();
  applyCollectionFilter('all');
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

let lastModalTrigger = null;

function closeModal() {
  if (!modal || modal.hidden || modal.dataset.closing === 'true') return;
  modal.dataset.closing = 'true';

  const finishClose = () => {
    modal.hidden = true;
    delete modal.dataset.closing;
    document.body.classList.remove('modal-open');
    lastModalTrigger?.focus();
    lastModalTrigger = null;
  };

  if (reducedMotion) {
    finishClose();
    return;
  }

  const dialog = modal.querySelector('.modal-dialog');
  const backdrop = modal.querySelector('.modal-backdrop');
  gsap.to(dialog, { opacity: 0, y: 10, scale: 0.99, duration: 0.16, ease: 'power1.in' });
  gsap.to(backdrop, { opacity: 0, duration: 0.16, ease: 'power1.in', onComplete: finishClose });
}

document.querySelectorAll('.quick-view').forEach(button => {
  button.addEventListener('click', () => {
    const product = productDetails[Number(button.dataset.productIndex)];
    if (!product || !modal) return;
    lastModalTrigger = button;
    delete modal.dataset.closing;
    modalTitle.textContent = product.title;
    modalDescription.textContent = product.description;
    modalPrice.textContent = product.price;
    modalImage.className = `modal-product-image ${product.image}`;
    modal.hidden = false;
    document.body.classList.add('modal-open');

    const dialog = modal.querySelector('.modal-dialog');
    const backdrop = modal.querySelector('.modal-backdrop');
    if (reducedMotion) {
      gsap.set([dialog, backdrop], { clearProps: 'opacity,transform' });
    } else {
      gsap.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power1.out' });
      gsap.fromTo(dialog,
        { opacity: 0, y: 16, scale: 0.985 },
        { opacity: 1, y: 0, scale: 1, duration: 0.28, ease: 'power2.out', clearProps: 'transform' }
      );
    }
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
