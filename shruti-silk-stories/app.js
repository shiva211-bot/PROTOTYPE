/* DRIFT — editorial storefront interactions */
'use strict';

const products = [
  {id:'drift-01',name:'Leela Courtyard Silk',craft:'Kanchipuram temple zari',price:24500,old:29800,image:'assets/hd_mood_teal.jpg',badge:'SIGNATURE',colour:'Peacock teal',description:'A luminous Kanchipuram weave with a temple-inspired zari border, woven slowly and made to be kept.'},
  {id:'drift-02',name:'Saanjh Banarasi',craft:'Varanasi kadwa weave',price:32000,old:38500,image:'assets/hd_mood_mustard.jpg',badge:'BESTSELLER',colour:'Sunlit gold',description:'A rich Banarasi silk with intricate floral kadwa work and a soft, burnished gold finish.'},
  {id:'drift-03',name:'Tara Peacock Paithani',craft:'Yeola tapestry silk',price:36500,old:42000,image:'assets/hd_mood_pink.jpg',badge:'NEW',colour:'Rani pink',description:'A celebratory Paithani with a tapestry-like pallu, peacock motifs, and a saturated rani-pink body.'},
  {id:'drift-04',name:'Amara Emerald Kanjivaram',craft:'Double-warp pure silk',price:42900,old:48000,image:'assets/hd_mood_emerald.jpg',badge:'FAVOURITE',colour:'Emerald',description:'Deep emerald silk paired with a warm zari border and motifs inspired by South Indian temple carvings.'},
  {id:'drift-05',name:'Prem Geet Festive Silk',craft:'Hand-finished zardozi',price:48000,old:55000,image:'assets/hd_mood_wine.jpg',badge:'LIMITED',colour:'Imperial wine',description:'An evening-ready heirloom with a rich wine palette and ornate hand-finished details.'},
  {id:'drift-06',name:'Ivory Organza Bloom',craft:'Hand-painted organza',price:16400,old:20500,image:'assets/hd_ivory_organza.jpg',badge:'NEW DROP',colour:'Warm ivory',description:'Airy organza silk with hand-painted florals, a delicate zari border, and a matching blouse.'},
  {id:'drift-07',name:'Ruhani Temple Silk',craft:'Heritage korvai border',price:21200,old:26000,image:'assets/hd_bridal_1.jpg',badge:'BRIDAL',colour:'Vermilion',description:'A ceremonial silk with a rich vermilion tone and a beautifully detailed temple border.'},
  {id:'drift-08',name:'Rose Net Embroidered',craft:'Fine organza embroidery',price:18900,old:22900,image:'assets/hd_rose_organza.jpg',badge:'NEW',colour:'Blush rose',description:'A soft rose drape with delicate embroidered details, designed for celebrations after dark.'}
];
const productById = id => products.find(p => p.id === id) || products[0];
const money = amount => new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(amount);
const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
const safeLoad = (key, fallback) => { try { const v=JSON.parse(localStorage.getItem(key)); return v ?? fallback; } catch { return fallback; } };
let cart = safeLoad('drift_cart_v2', []);
let wishlist = safeLoad('drift_wishlist_v2', []);
let activeProduct = 'drift-06';
let quantity = 1;
let toastTimer;
let heroIndex = 0;
let heroTimer = null;
let storyIndex = 0;
let latestIndex = 0;

function toast(message) {
  const el = $('#toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-visible'), 2600);
}
function persist() {
  try {
    localStorage.setItem('drift_cart_v2', JSON.stringify(cart));
    localStorage.setItem('drift_wishlist_v2', JSON.stringify(wishlist));
  } catch { /* Storefront remains usable if browser storage is disabled. */ }
}
function renderProductCard(product, compact=false) {
  if (compact) return `<article class="mini-product"><img src="${product.image}" alt="${product.name}" loading="lazy"><div><p class="product-kicker">${product.badge}</p><h3 class="product-name">${product.name}</h3><p class="product-craft">${product.craft}</p><strong class="product-price">${money(product.price)}</strong><br><button class="mini-add" data-add="${product.id}" aria-label="Add ${product.name} to bag">+</button></div></article>`;
  const saved = wishlist.includes(product.id);
  return `<article class="product-card"><div class="product-image" data-view="${product.id}" role="button" tabindex="0" aria-label="View ${product.name}"><img src="${product.image}" alt="${product.name}" loading="lazy"><span class="product-badge ${product.badge==='BESTSELLER'?'gold':''}">${product.badge}</span><button class="heart-button ${saved?'is-saved':''}" data-wish="${product.id}" aria-label="${saved?'Remove from':'Add to'} wishlist" aria-pressed="${saved}">${saved?'♥':'♡'}</button></div><div class="product-copy"><p class="product-kicker">${product.craft}</p><h3 class="product-name">${product.name}</h3><p class="product-craft">${product.colour}</p><div class="product-price-row"><strong class="product-price">${money(product.price)}</strong><del class="product-old-price">${money(product.old)}</del></div><div class="product-card-bottom"><button class="product-add" data-add="${product.id}">Add to bag +</button><button class="product-view" data-view="${product.id}" aria-label="View ${product.name}">↗</button></div></div></article>`;
}
function renderProducts() {
  const fill = (id, ids, compact=false) => {
    const target = document.getElementById(id);
    if (target) target.innerHTML = ids.map(key => renderProductCard(productById(key), compact)).join('');
  };
  fill('new-arrivals-rail',['drift-07','drift-03','drift-06','drift-01','drift-04','drift-08']);
  fill('best-sellers-rail',['drift-01','drift-02','drift-04','drift-05','drift-07','drift-03']);
  fill('bridal-products',['drift-07','drift-05','drift-03','drift-04','drift-08'],false);
  fill('trend-rail',['drift-04','drift-02','drift-03','drift-08'],true);
  fill('seasonal-rail',['drift-07','drift-01','drift-05','drift-04'],true);
  updateWishlistUI();
}
function updateWishlistUI() {
  $('#wishlist-count').textContent = wishlist.length;
  $$('[data-wish]').forEach(btn => {
    const saved = wishlist.includes(btn.dataset.wish);
    btn.classList.toggle('is-saved', saved);
    btn.setAttribute('aria-pressed', String(saved));
    btn.innerHTML = saved ? '♥' : '♡';
    btn.setAttribute('aria-label', (saved ? 'Remove from' : 'Add to') + ' wishlist');
  });
}
function toggleWishlist(id) {
  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    toast('Removed from your wishlist.');
  } else {
    wishlist.push(id);
    toast('Saved to your wishlist.');
  }
  persist();
  updateWishlistUI();
}
function addToCart(id, qty=1) {
  const found = cart.find(item => item.id === id);
  if (found) found.qty += qty;
  else cart.push({id,qty});
  persist();
  renderCart();
  toast(productById(id).name + ' added to your bag.');
}
function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  persist();
  renderCart();
}
function renderCart() {
  const count = cart.reduce((sum,item) => sum + item.qty, 0);
  $('#cart-count').textContent = count;
  $('#drawer-cart-count').textContent = '(' + count + ')';
  const items = $('#drawer-items');
  if (!cart.length) items.innerHTML = '<div class="drawer-empty">Your bag is waiting for a story.</div>';
  else items.innerHTML = cart.map(item => {
    const p = productById(item.id);
    return `<article class="drawer-item"><img src="${p.image}" alt=""><div><h3>${p.name}</h3><p>Qty: ${item.qty}</p><strong>${money(p.price*item.qty)}</strong></div><button data-remove="${p.id}" aria-label="Remove ${p.name}">Remove</button></article>`;
  }).join('');
  const total = cart.reduce((sum,item) => sum + productById(item.id).price*item.qty, 0);
  $('#cart-subtotal').textContent = money(total);
}
function openCart() {
  $('#cart-drawer').classList.add('is-open');
  $('#cart-drawer').setAttribute('aria-hidden','false');
  $('#drawer-backdrop').classList.add('is-open');
  document.body.classList.add('locked');
}
function closeCart() {
  $('#cart-drawer').classList.remove('is-open');
  $('#cart-drawer').setAttribute('aria-hidden','true');
  $('#drawer-backdrop').classList.remove('is-open');
  document.body.classList.remove('locked');
}
function showProduct(id) {
  const p = productById(id);
  activeProduct = p.id;
  $('#detail-name').textContent = p.name;
  $('#detail-price').innerHTML = money(p.price) + ' <del>' + money(p.old) + '</del>';
  $('#detail-description').textContent = p.description;
  $('#detail-main-image').src = p.image;
  $('#detail-main-image').alt = p.name;
  $$('.detail-thumb').forEach((btn,i) => btn.classList.toggle('is-active', i===0));
  const firstThumb = $('.detail-thumb');
  if (firstThumb) firstThumb.dataset.image = p.image;
  if (firstThumb) firstThumb.querySelector('img').src = p.image;
  $('#selected-colour-name').textContent = p.colour;
  quantity = 1;
  $('#quantity-value').textContent = quantity;
  document.querySelector('#product-detail').scrollIntoView({behavior:'smooth',block:'start'});
}
function changeHero(next) {
  const slides = $$('.hero-slide');
  if (!slides.length) return;
  heroIndex = (next + slides.length) % slides.length;
  slides.forEach((slide,i) => slide.classList.toggle('is-active',i===heroIndex));
  $$('.hero-dot').forEach((dot,i) => dot.classList.toggle('is-active',i===heroIndex));
}
function startHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(() => changeHero(heroIndex+1), 5200);
}
function openSearch() {
  $('#search-panel').classList.add('is-open');
  $('#search-panel').setAttribute('aria-hidden','false');
  setTimeout(() => $('#search-input').focus(), 150);
}
function closeSearch() {
  $('#search-panel').classList.remove('is-open');
  $('#search-panel').setAttribute('aria-hidden','true');
}
function searchProducts(query) {
  const target = $('#search-results');
  const q = query.trim().toLowerCase();
  if (!q) { target.innerHTML = '<p class="search-hint">Try a colour, craft, collection, or occasion.</p>'; return; }
  const matches = products.filter(p => [p.name,p.craft,p.colour,p.badge,p.description].join(' ').toLowerCase().includes(q));
  target.innerHTML = matches.length ? matches.map(p => `<button class="search-result" data-view="${p.id}"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>${p.craft} · ${money(p.price)}</small></span></button>`).join('') : '<p class="search-hint">No exact match. Try “silk”, “bridal”, “rose”, or “Banarasi”.</p>';
}
const stories = [
  {title:'Courtyard<br>Air',description:'A softer kind of statement. Sunlit silks, garden greens, and the quiet joy of dressing up.',image:'assets/hd_trends_models.jpg',count:'01',product:'drift-01'},
  {title:'Wedding<br>Circle',description:'For the people who make the celebration. Rich colour, shared rituals, and heirlooms in the making.',image:'assets/hd_bridal_feature.jpg',count:'02',product:'drift-07'},
  {title:'Temple<br>Steps',description:'Sacred geometry, temple borders, and the enduring poetry of South Indian silk.',image:'assets/hd_mood_orange.jpg',count:'03',product:'drift-04'}
];
function changeStory(index) {
  storyIndex = (index + stories.length) % stories.length;
  const story = stories[storyIndex];
  $('#story-title').innerHTML = story.title;
  $('#story-description').textContent = story.description;
  $('#story-main-image').style.opacity = '0.25';
  setTimeout(() => { $('#story-main-image').src = story.image; $('#story-main-image').style.opacity = '1'; }, 120);
  $('#story-main-image').alt = story.title.replace('<br>',' ') + ' campaign';
  $('#story-count').textContent = story.count;
  $('#story-progress').style.width = ((storyIndex+1)/stories.length*100)+'%';
  $$('.story-tab').forEach((tab,i) => tab.classList.toggle('is-active',i===storyIndex));
}
const latestSlides = [
  {image:'assets/hd_trends_models.jpg',caption:'The new range'},
  {image:'assets/hd_mood_pink.jpg',caption:'Colour, in full bloom'},
  {image:'assets/hd_bridal_feature.jpg',caption:'Made for the moment'}
];
function changeLatest(index) {
  latestIndex = (index + latestSlides.length) % latestSlides.length;
  const slide = latestSlides[latestIndex];
  $('#latest-image').style.opacity = '.25';
  setTimeout(() => { $('#latest-image').src = slide.image; $('#latest-image').style.opacity = '1'; }, 120);
  $('#latest-caption').textContent = slide.caption;
  $('#latest-index').textContent = String(latestIndex+1).padStart(2,'0')+' — 03';
  $('.latest-image-caption span:last-child').textContent = String(latestIndex+1).padStart(2,'0')+' / 03';
}
function initSpotlightRails() {
  $$('.spotlight-rail').forEach(rail => {
    const cards = Array.from(rail.children);
    if (!cards.length) return;
    let activeIndex = rail.classList.contains('spotlight-moods') ? Math.min(2, cards.length - 1) : Math.min(1, cards.length - 1);
    let timer;
    let isVisible = false;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const activate = (index, scroll = true) => {
      activeIndex = (index + cards.length) % cards.length;
      cards.forEach((card, i) => {
        const active = i === activeIndex;
        card.classList.toggle('is-spotlight', active);
        card.setAttribute('aria-current', active ? 'true' : 'false');
      });
      // Keep spotlight motion inside the horizontal rail; never auto-scroll the page.
    };
    const start = () => {
      clearInterval(timer);
      if (!isVisible || reducedMotion || cards.length < 2 || rail.matches(':hover') || rail.contains(document.activeElement)) return;
      timer = setInterval(() => activate(activeIndex + 1), 3200);
    };
    activate(activeIndex, false);
    rail.addEventListener('click', event => {
      const card = event.target.closest('.mood-card, .product-card');
      if (!card || !rail.contains(card)) return;
      if (card.matches('a.mood-card')) event.preventDefault();
      activate(cards.indexOf(card));
      start();
    });
    rail.addEventListener('keydown', event => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      const card = event.target.closest('.mood-card, .product-card');
      if (!card) return;
      event.preventDefault();
      activate(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      cards[activeIndex].focus({preventScroll:true});
      start();
    });
    rail.addEventListener('mouseenter', () => clearInterval(timer));
    rail.addEventListener('mouseleave', start);
    rail.addEventListener('focusin', () => clearInterval(timer));
    rail.addEventListener('focusout', event => { if (!rail.contains(event.relatedTarget)) start(); });
    const visibilityObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else clearInterval(timer);
      });
    }, { threshold: [0, 0.25] });
    visibilityObserver.observe(rail);

  });
}

function initWovenRing() {
  const rail = $('#woven-rail');
  if (!rail) return;
  const cards = Array.from(rail.querySelectorAll('.woven-card'));
  if (cards.length < 2) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let visible = false, paused = false, phase = 0, frame = 0, last = 0;
  const layout = () => {
    const width = rail.clientWidth;
    const cardWidth = cards[0].getBoundingClientRect().width;
    const spread = Math.min(cardWidth + 18, Math.max(110, width / (cards.length * 1.04)));
    cards.forEach((card, i) => {
      let slot = ((i / cards.length + phase + .5) % 1 + 1) % 1 - .5;
      const x = slot * spread * cards.length;
      const edge = Math.min(1, Math.abs(slot) * 2);
      const scale = .72 + edge * .28;
      const lean = -slot * 54;
      const depth = -Math.abs(slot) * 150;
      card.style.zIndex = String(100 - Math.round(Math.abs(slot) * 100));
      card.style.opacity = String(1 - Math.max(0, edge - .82) * 1.8);
      card.style.transform = `translate(-50%, -50%) translate3d(${x}px, 0, ${depth}px) rotateY(${lean}deg) scale(${scale})`;
      card.classList.toggle('is-ring-front', Math.abs(slot) < .18);
      card.setAttribute('aria-current', Math.abs(slot) < .18 ? 'true' : 'false');
    });
  };
  const tick = now => {
    frame = 0;
    if (visible && !paused && !reducedMotion) {
      if (last) phase = (phase + (now - last) * .000012) % 1;
      layout();
      last = now;
      frame = requestAnimationFrame(tick);
    } else last = 0;
  };
  const resume = () => { paused = false; if (visible && !reducedMotion && !frame) frame = requestAnimationFrame(tick); };
  const stop = () => { paused = true; if (frame) cancelAnimationFrame(frame); frame = 0; last = 0; };
  cards.forEach(card => {
    card.addEventListener('pointerenter', stop);
    card.addEventListener('pointerleave', () => {
      if (!rail.querySelector('.woven-card:hover') && !rail.contains(document.activeElement)) resume();
    });
  });
  rail.addEventListener('focusin', stop);
  rail.addEventListener('focusout', event => { if (!rail.contains(event.relatedTarget) && !rail.querySelector('.woven-card:hover')) resume(); });
  rail.addEventListener('click', event => {
    const card = event.target.closest('.woven-card');
    if (!card) return;
    const index = cards.indexOf(card);
    if (index >= 0) phase = (phase + 1 - index / cards.length + 1) % 1;
    layout();
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries.some(entry => entry.isIntersecting);
    if (visible) resume(); else stop();
  }, {threshold: 0});
  observer.observe(rail);
  window.addEventListener('resize', layout, {passive:true});
  layout();
}

function init() {
  renderProducts();
  initWovenRing();
  initSpotlightRails();
  renderCart();
  changeHero(0);
  startHeroTimer();

  $('#hero').addEventListener('mouseenter', () => clearInterval(heroTimer));
  $('#hero').addEventListener('mouseleave', startHeroTimer);
  $('#hero').addEventListener('focusin', () => clearInterval(heroTimer));
  $('#hero').addEventListener('focusout', startHeroTimer);
  $$('.hero-dot').forEach((dot,i) => dot.addEventListener('click', () => { changeHero(i); startHeroTimer(); }));
  $('.hero-prev').addEventListener('click', () => { changeHero(heroIndex-1); startHeroTimer(); });
  $('.hero-next').addEventListener('click', () => { changeHero(heroIndex+1); startHeroTimer(); });

  document.addEventListener('click', event => {
    const add = event.target.closest('[data-add]');
    const wish = event.target.closest('[data-wish]');
    const view = event.target.closest('[data-view]');
    const remove = event.target.closest('[data-remove]');
    const railButton = event.target.closest('[data-rail]');
    const productButton = event.target.closest('[data-product]');
    if (add) { event.preventDefault(); event.stopPropagation(); addToCart(add.dataset.add); }
    else if (wish) { event.preventDefault(); event.stopPropagation(); toggleWishlist(wish.dataset.wish); }
    else if (view) { event.preventDefault(); showProduct(view.dataset.view); }
    else if (remove) removeFromCart(remove.dataset.remove);
    else if (productButton) showProduct(productButton.dataset.product);
    else if (railButton) {
      const rail = document.getElementById(railButton.dataset.rail);
      if (rail) rail.scrollBy({left:Number(railButton.dataset.dir)*Math.min(480,rail.clientWidth*.8),behavior:'smooth'});
    }
  });
  document.addEventListener('keydown', event => {
    const view = event.target.closest && event.target.closest('[data-view][role="button"]');
    if (view && (event.key==='Enter'||event.key===' ')) { event.preventDefault(); showProduct(view.dataset.view); }
    if (event.key==='Escape') { closeCart(); closeSearch(); $('#main-nav').classList.remove('is-open'); }
  });

  $('#cart-open').addEventListener('click', openCart);
  $('#cart-close').addEventListener('click', closeCart);
  $('#drawer-backdrop').addEventListener('click', closeCart);
  $('#checkout-button').addEventListener('click', () => toast(cart.length ? 'Checkout is a demo — no payment was taken.' : 'Your bag is empty.'));
  $('#search-open').addEventListener('click', openSearch);
  $('#search-close').addEventListener('click', closeSearch);
  $('#search-input').addEventListener('input', event => searchProducts(event.target.value));
  $('#wishlist-open').addEventListener('click', () => {
    if (!wishlist.length) { toast('Your wishlist is empty. Save a piece you love.'); return; }
    openSearch();
    $('#search-input').value = '';
    $('#search-results').innerHTML = wishlist.map(id => productById(id)).map(p => `<button class="search-result" data-view="${p.id}"><img src="${p.image}" alt=""><span><strong>${p.name}</strong><small>Saved to your wishlist · ${money(p.price)}</small></span></button>`).join('');
    $('#search-panel').querySelector('.eyebrow').textContent = 'YOUR SAVED PIECES';
    $('#search-panel').querySelector('h2').textContent = 'Your wishlist';
  });

  $('#menu-toggle').addEventListener('click', () => $('#main-nav').classList.toggle('is-open'));
  $$('.main-nav a').forEach(link => link.addEventListener('click', () => $('#main-nav').classList.remove('is-open')));
  $$('.size-options button').forEach(btn => btn.addEventListener('click', () => {
    $$('.size-options button').forEach(item => item.classList.remove('selected'));
    btn.classList.add('selected');
  }));
  $$('.colour-swatch').forEach(btn => btn.addEventListener('click', () => {
    $$('.colour-swatch').forEach(item => item.classList.remove('selected'));
    btn.classList.add('selected');
    $('#selected-colour-name').textContent = btn.dataset.colour;
    $('#detail-main-image').style.opacity = '.25';
    setTimeout(() => { $('#detail-main-image').src = btn.dataset.image; $('#detail-main-image').style.opacity = '1'; }, 120);
    $$('.detail-thumb').forEach(item => item.classList.remove('is-active'));
  }));
  $$('.detail-thumb').forEach(btn => btn.addEventListener('click', () => {
    $$('.detail-thumb').forEach(item => item.classList.remove('is-active'));
    btn.classList.add('is-active');
    $('#detail-main-image').src = btn.dataset.image;
  }));
  $('#detail-next').addEventListener('click', () => {
    const thumbs = $$('.detail-thumb');
    const current = Math.max(0,thumbs.findIndex(btn => btn.classList.contains('is-active')));
    thumbs[(current+1)%thumbs.length].click();
  });
  $('#quantity-minus').addEventListener('click', () => { quantity=Math.max(1,quantity-1); $('#quantity-value').textContent=quantity; });
  $('#quantity-plus').addEventListener('click', () => { quantity=Math.min(10,quantity+1); $('#quantity-value').textContent=quantity; });
  $('#detail-add').addEventListener('click', () => addToCart(activeProduct,quantity));
  $('#detail-wishlist').addEventListener('click', () => toggleWishlist(activeProduct));
  $('#size-guide').addEventListener('click', () => toast('Size guide: S 34 · M 36 · L 38 · XL 40 · 2XL 42 (demo sizing).'));
  $$('.story-tab').forEach(tab => tab.addEventListener('click', () => changeStory(Number(tab.dataset.story))));
  $$('.story-thumb').forEach(btn => btn.addEventListener('click', () => {
    $$('.story-thumb').forEach(item => item.classList.remove('is-active'));
    btn.classList.add('is-active');
    $('#story-main-image').src = btn.dataset.image;
  }));
  $('#story-shop').addEventListener('click', () => showProduct(stories[storyIndex].product));
  $('#latest-prev').addEventListener('click', () => changeLatest(latestIndex-1));
  $('#latest-next').addEventListener('click', () => changeLatest(latestIndex+1));

  const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); } });
  }, {threshold:.08}) : null;
  $$('.section-heading,.mood-card,.woven-card,.product-card,.bridal-feature,.detail-gallery,.detail-copy,.occasion-card,.attention-card,.stories-title,.story-gallery,.latest-intro,.latest-feature,.latest-links').forEach(el => {
    el.classList.add('reveal');
    if (revealObserver) revealObserver.observe(el); else el.classList.add('is-visible');
  });
  const header = $('#site-header');
  window.addEventListener('scroll', () => header.classList.toggle('scrolled',window.scrollY>20), {passive:true});
  changeStory(0);
  changeLatest(0);
  searchProducts('');
}
document.addEventListener('DOMContentLoaded', init);
