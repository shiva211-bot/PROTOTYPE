// DRIFT: DRAPED IN STORIES - Interactive Engine (Ultra-HD Assets)

const sareesDatabase = [
  {
    id: "drift-01",
    name: "Kalyani Temple Silk",
    collection: "Leela Courtyard Silk",
    craft: "Pure Kanchipuram Korvai",
    price: 24500,
    originalPrice: 29800,
    mood: "ROYAL MAJESTY",
    image: "assets/hd_mood_teal.jpg",
    fabric: "Pure Mulberry Silk & 24K Zari",
    color: "Peacock Teal & Temple Gold",
    description: "Centuries-old korvai interlocking border with intricate temple gopuram motifs, woven on heavy wooden pit looms."
  },
  {
    id: "drift-02",
    name: "Saanjh Maroon Banarasi",
    collection: "Saanjh Mukhia Banarasi",
    craft: "Varanasi Master Kadwa Weave",
    price: 32000,
    originalPrice: 38500,
    mood: "BANARASI DELIGHT",
    image: "assets/hd_mood_mustard.jpg",
    fabric: "Pure Katan Silk",
    color: "Sunlit Haldi & Maroon",
    description: "Extravagant kadwa floral jaal where each petal is individually hand-etched without floating wefts on the reverse."
  },
  {
    id: "drift-03",
    name: "Tara Peacock Paithani",
    collection: "Tara Peacock Paithani",
    craft: "Yeola Tapestry Silk",
    price: 36500,
    originalPrice: 42000,
    mood: "FESTIVE RADIANCE",
    image: "assets/hd_mood_pink.jpg",
    fabric: "Heavy Mulberry Silk",
    color: "Rani Magenta & Muga Gold",
    description: "Featuring the famed Asawali and peacock-in-bangle gold pallu rendered in kaleidoscopic natural botanical dyes."
  },
  {
    id: "drift-04",
    name: "Amara Emerald Kanjivaram",
    collection: "Amara Emerald Kanjivaram",
    craft: "Double Warp Heavy Zari",
    price: 42900,
    originalPrice: 48000,
    mood: "MIDNIGHT CHARM",
    image: "assets/hd_mood_emerald.jpg",
    fabric: "Certified Pure Silk",
    color: "Midnight Emerald & Rust",
    description: "Deep emerald silk contrasted with rich rust red zari borders, carrying sacred elephant and peacock motifs."
  },
  {
    id: "drift-05",
    name: "Prem Geet Festive Silk",
    collection: "Prem Festive Silk",
    craft: "Hand-Embroidered Zardozi",
    price: 48000,
    originalPrice: 55000,
    mood: "INTERPRETIVE WEAVE",
    image: "assets/hd_mood_wine.jpg",
    fabric: "Silk Velvet & Organza",
    color: "Imperial Wine",
    description: "Dabka, Nakshi, and pearl zardozi hand embroidery adorning royal velvet borders for ceremonial bridal evenings."
  },
  {
    id: "drift-06",
    name: "Ivory Organza Bloom Saree",
    collection: "Autumn â€” Winter 2026",
    craft: "Watercolour Hand-Painted Organza",
    price: 16400,
    originalPrice: 20500,
    mood: "SERENE EDIT",
    image: "assets/hd_ivory_organza.jpg",
    fabric: "Pure Sheer Organza Silk",
    color: "Warm Ivory Gold",
    description: "Airy translucent pure organza silk with hand-painted water-color peonies, scalloped zari borders, and matching raw silk blouse."
  }
];

// App State
let cart = JSON.parse(localStorage.getItem('drift_cart') || '[]');
let wishlist = JSON.parse(localStorage.getItem('drift_wishlist') || '[]');
let discountPercent = 0;
let carouselCurrentIndex = 0;
let audioContext = null;
let isAudioPlaying = false;

document.addEventListener('DOMContentLoaded', () => {
  initScrollytelling();
  init3DCarousel();
  initOrganzaSection();
  initSearch();
  initAutoScroll();
  updateCartBadge();
  updateWishlistBadge();
});

// HERO SCROLLYTELLING ENGINE
function initScrollytelling() {
  const container = document.getElementById('hero-scrolly-container');
  if (!container) return;

  const scene1 = document.getElementById('scrolly-scene-1');
  const scene2 = document.getElementById('scrolly-scene-2');
  const scene3 = document.getElementById('scrolly-scene-3');
  const bgShowroom = document.getElementById('scrolly-bg-showroom');
  const bgBride = document.getElementById('scrolly-bg-bride');
  const dots = document.querySelectorAll('.scrolly-dot');

  function handleScroll() {
    const rect = container.getBoundingClientRect();
    const totalHeight = container.offsetHeight - window.innerHeight;
    const progress = Math.max(0, Math.min(1, -rect.top / totalHeight));

    // Update dots
    dots.forEach((dot, idx) => {
      let active = false;
      if (idx === 0 && progress < 0.35) active = true;
      if (idx === 1 && progress >= 0.35 && progress < 0.70) active = true;
      if (idx === 2 && progress >= 0.70) active = true;
      dot.classList.toggle('bg-[#d4af37]', active);
      dot.classList.toggle('w-8', active);
      dot.classList.toggle('bg-white/40', !active);
      dot.classList.toggle('w-2.5', !active);
    });

    if (progress < 0.35) {
      // SCENE 1: More Than a Saree
      scene1.style.opacity = '1';
      scene1.style.transform = 'translateY(0) scale(1)';
      scene1.style.pointerEvents = 'auto';

      scene2.style.opacity = '0';
      scene2.style.transform = 'translateY(20px) scale(0.96)';
      scene2.style.pointerEvents = 'none';

      scene3.style.opacity = '0';
      scene3.style.transform = 'translateY(20px) scale(0.96)';
      scene3.style.pointerEvents = 'none';

      bgShowroom.style.opacity = '1';
      bgShowroom.style.transform = 'scale(1)';
      bgBride.style.opacity = '0';

    } else if (progress >= 0.35 && progress < 0.70) {
      // SCENE 2: Six weavers, one thread
      scene1.style.opacity = '0';
      scene1.style.transform = 'translateY(-20px) scale(0.96)';
      scene1.style.pointerEvents = 'none';

      scene2.style.opacity = '1';
      scene2.style.transform = 'translateY(0) scale(1)';
      scene2.style.pointerEvents = 'auto';

      scene3.style.opacity = '0';
      scene3.style.transform = 'translateY(20px) scale(0.96)';
      scene3.style.pointerEvents = 'none';

      bgShowroom.style.opacity = '1';
      bgShowroom.style.transform = 'scale(1.1)';
      bgBride.style.opacity = '0';

    } else {
      // SCENE 3: Zari catches the light (Seated Bride)
      scene1.style.opacity = '0';
      scene1.style.transform = 'translateY(-20px) scale(0.96)';
      scene1.style.pointerEvents = 'none';

      scene2.style.opacity = '0';
      scene2.style.transform = 'translateY(-20px) scale(0.96)';
      scene2.style.pointerEvents = 'none';

      scene3.style.opacity = '1';
      scene3.style.transform = 'translateY(0) scale(1)';
      scene3.style.pointerEvents = 'auto';

      bgShowroom.style.opacity = '0';
      bgBride.style.opacity = '1';
      bgBride.style.transform = 'scale(1.02)';
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  window.jumpToScene = function(sceneIndex) {
    const totalHeight = container.offsetHeight - window.innerHeight;
    const targetY = container.offsetTop + (sceneIndex * (totalHeight / 2.5));
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };
}

// 3D Curved Cylindrical Carousel Logic
function init3DCarousel() {
  const container = document.getElementById('carousel-3d-track');
  if (!container) return;
  
  const cards = container.querySelectorAll('.carousel-3d-card');
  const total = cards.length;
  const radius = window.innerWidth < 768 ? 260 : 420;
  
  function updateCarousel() {
    cards.forEach((card, index) => {
      let offset = index - carouselCurrentIndex;
      while (offset > total / 2) offset -= total;
      while (offset < -total / 2) offset += total;
      
      const angle = offset * (360 / total) * 0.55;
      const angleRad = (angle * Math.PI) / 180;
      const x = Math.sin(angleRad) * radius;
      const z = Math.cos(angleRad) * radius - radius;
      
      const isCenter = Math.abs(offset) < 0.3;
      card.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg) scale(${isCenter ? 1.05 : 0.88})`;
      card.style.opacity = Math.abs(offset) > 2.2 ? '0' : (isCenter ? '1' : '0.72');
      card.style.zIndex = Math.round(100 - Math.abs(offset) * 10);
      card.classList.toggle('ring-2', isCenter);
      card.classList.toggle('ring-[#d4af37]', isCenter);
    });

    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('bg-[#d4af37]', idx === carouselCurrentIndex);
      dot.classList.toggle('w-8', idx === carouselCurrentIndex);
      dot.classList.toggle('bg-gray-300', idx !== carouselCurrentIndex);
      dot.classList.toggle('w-2.5', idx !== carouselCurrentIndex);
    });
  }

  window.rotateCarousel = function(direction) {
    carouselCurrentIndex = (carouselCurrentIndex + direction + total) % total;
    updateCarousel();
  };

  window.setCarouselIndex = function(idx) {
    carouselCurrentIndex = idx;
    updateCarousel();
  };

  let startX = 0;
  let isDragging = false;
  container.addEventListener('mousedown', (e) => {
    startX = e.clientX;
    isDragging = true;
  });
  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    isDragging = false;
    const diff = e.clientX - startX;
    if (diff > 40) rotateCarousel(-1);
    else if (diff < -40) rotateCarousel(1);
  });
  
  container.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });
  container.addEventListener('touchend', (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > 40) rotateCarousel(-1);
    else if (diff < -40) rotateCarousel(1);
  }, { passive: true });

  updateCarousel();
}

// Organza Interactive Section (Ultra HD Models)
function initOrganzaSection() {
  const swatches = document.querySelectorAll('.organza-color-btn');
  const modelImg = document.getElementById('organza-model-view');
  const colorName = document.getElementById('organza-selected-color');

  const colorData = {
    'rose': {
      name: 'Blush Rose Quartz',
      src: 'assets/hd_rose_organza.jpg'
    },
    'ivory': {
      name: 'Warm Ivory Gold',
      src: 'assets/hd_ivory_organza.jpg'
    },
    'wine': {
      name: 'Royal Heritage Wine',
      src: 'assets/hd_mood_wine.jpg'
    }
  };

  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('ring-4', 'ring-[#d4af37]', 'scale-110'));
      swatch.classList.add('ring-4', 'ring-[#d4af37]', 'scale-110');

      const c = swatch.dataset.color;
      if (colorData[c] && modelImg) {
        modelImg.style.opacity = '0.3';
        setTimeout(() => {
          modelImg.src = colorData[c].src;
          modelImg.style.opacity = '1';
          if (colorName) colorName.textContent = colorData[c].name;
        }, 150);
      }
    });
  });

  const sizeBtns = document.querySelectorAll('.size-btn-pill');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => {
        b.classList.remove('bg-[#671223]', 'text-white', 'border-[#671223]');
        b.classList.add('bg-white', 'text-gray-700', 'border-gray-200');
      });
      btn.classList.add('bg-[#671223]', 'text-white', 'border-[#671223]');
      btn.classList.remove('bg-white', 'text-gray-700', 'border-gray-200');
    });
  });
}

// Automatic horizontal scrolling for sections that should move automatically but pause on hover
function initAutoScroll() {
  const tracks = document.querySelectorAll('.horizontal-track');
  tracks.forEach(track => {
    let speed = 1.2; // pixels per interval
    let intervalId = null;
    const startScrolling = () => {
      if (intervalId) return;
      intervalId = setInterval(() => {
        // If we've reached the end, reset to start for a continuous loop
        if (track.scrollLeft + track.clientWidth >= track.scrollWidth) {
          track.scrollLeft = 0;
        } else {
          track.scrollLeft += speed;
        }
      }, 30);
    };
    const stopScrolling = () => {
      if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
      }
    };
    // Start scrolling automatically
    startScrolling();
    // Pause on mouse hover / touch
    track.addEventListener('mouseenter', stopScrolling);
    track.addEventListener('mouseleave', startScrolling);
    track.addEventListener('touchstart', stopScrolling);
    track.addEventListener('touchend', startScrolling);
  });
}
// Toast System
function showToast(title, message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'flex items-center gap-3 bg-[#4d0b17] text-white px-5 py-3.5 rounded-xl shadow-2xl border border-[#d4af37]/40 transform translate-y-4 opacity-0 transition-all duration-300 pointer-events-auto';
  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] shrink-0 font-bold">âœ“</div>
    <div>
      <h4 class="text-xs font-semibold uppercase tracking-wider text-[#d4af37]">${title}</h4>
      <p class="text-xs text-gray-200">${message}</p>
    </div>
  `;
  container.appendChild(toast);
  requestAnimationFrame(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  });
  setTimeout(() => {
    toast.classList.add('translate-y-4', 'opacity-0');
    setTimeout(() => toast.remove(), 400);
  }, 3200);
}

// Cart Drawer
function toggleCart(forceOpen = null) {
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');
  const isOpen = !drawer.classList.contains('translate-x-full');
  const shouldOpen = forceOpen !== null ? forceOpen : !isOpen;

  if (shouldOpen) {
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('opacity-0', 'pointer-events-none');
    renderCart();
  } else {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('opacity-0', 'pointer-events-none');
  }
}

function addToCart(sareeId, options = {}) {
  const saree = sareesDatabase.find(s => s.id === sareeId) || sareesDatabase[0];
  const itemColor = options.color || saree.color;
  const existing = cart.find(item => item.id === saree.id && item.color === itemColor);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: saree.id,
      name: saree.name,
      price: saree.price,
      image: saree.image,
      color: itemColor,
      size: options.size || 'Unstitched Blouse Piece Included',
      quantity: 1
    });
  }

  localStorage.setItem('drift_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast('Added to Sacred Bag', `${saree.name} has been added.`);
  toggleCart(true);
}

function updateCartQuantity(index, delta) {
  if (!cart[index]) return;
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('drift_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function renderCart() {
  const container = document.getElementById('cart-items-list');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountEl = document.getElementById('cart-discount');
  const totalEl = document.getElementById('cart-total');
  const emptyState = document.getElementById('cart-empty');
  const footerEl = document.getElementById('cart-footer');

  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    if (footerEl) footerEl.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  if (footerEl) footerEl.classList.remove('hidden');

  let subtotal = 0;
  container.innerHTML = cart.map((item, idx) => {
    const itemTotal = item.price * item.quantity;
    subtotal += itemTotal;
    return `
      <div class="flex items-center gap-4 py-4 border-b border-gray-100">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-20 object-cover rounded-lg shadow-sm border border-[#d4af37]/30" />
        <div class="flex-1">
          <h4 class="font-serif-luxury font-semibold text-sm text-[#4d0b17]">${item.name}</h4>
          <p class="text-xs text-gray-500 mt-0.5">${item.color} Â· ${item.size}</p>
          <div class="flex items-center justify-between mt-2">
            <div class="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
              <button onclick="updateCartQuantity(${idx}, -1)" class="px-2 py-0.5 text-gray-600 hover:bg-gray-200 text-xs font-bold">-</button>
              <span class="px-2 text-xs font-semibold text-gray-800">${item.quantity}</span>
              <button onclick="updateCartQuantity(${idx}, 1)" class="px-2 py-0.5 text-gray-600 hover:bg-gray-200 text-xs font-bold">+</button>
            </div>
            <span class="font-semibold text-sm text-[#671223]">â‚¹${itemTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  if (subtotalEl) subtotalEl.textContent = `â‚¹${subtotal.toLocaleString('en-IN')}`;
  if (discountEl) discountEl.textContent = discountPercent > 0 ? `- â‚¹${discountAmount.toLocaleString('en-IN')} (${discountPercent}%)` : 'â‚¹0';
  if (totalEl) totalEl.textContent = `â‚¹${finalTotal.toLocaleString('en-IN')}`;

  const shippingThreshold = 25000;
  const progressPercent = Math.min(100, Math.round((subtotal / shippingThreshold) * 100));
  const shippingBar = document.getElementById('shipping-bar');
  const shippingText = document.getElementById('shipping-text');
  if (shippingBar) shippingBar.style.width = `${progressPercent}%`;
  if (shippingText) {
    if (progressPercent >= 100) {
      shippingText.innerHTML = '<span class="text-emerald-700 font-semibold">ðŸŽ‰ Compliments of DRIFT: Free Express Air Delivery Unlocked!</span>';
    } else {
      const remaining = shippingThreshold - subtotal;
      shippingText.innerHTML = `Add <strong>â‚¹${remaining.toLocaleString('en-IN')}</strong> more for Free Insured Express Delivery.`;
    }
  }
}

function updateCartBadge() {
  const badges = document.querySelectorAll('.cart-count-badge');
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  badges.forEach(b => {
    b.textContent = totalCount;
    b.classList.toggle('hidden', totalCount === 0);
  });
}

function applyCoupon() {
  const input = document.getElementById('coupon-input');
  const code = (input.value || '').trim().toUpperCase();
  if (code === 'UTSAV20' || code === 'DRIFT20') {
    discountPercent = 20;
    showToast('Promo Code Applied!', 'Flat 20% festival discount applied.');
    renderCart();
  } else {
    showToast('Invalid Code', 'Try using code UTSAV20.');
  }
}

// Wishlist
function toggleWishlist(sareeId) {
  const idx = wishlist.indexOf(sareeId);
  if (idx > -1) {
    wishlist.splice(idx, 1);
    showToast('Wishlist', 'Item removed from saved list.');
  } else {
    wishlist.push(sareeId);
    showToast('Saved to Wishlist', 'Item saved to your heirlooms.');
  }
  localStorage.setItem('drift_wishlist', JSON.stringify(wishlist));
  updateWishlistBadge();
}

function updateWishlistBadge() {
  const badges = document.querySelectorAll('.wishlist-count-badge');
  badges.forEach(b => {
    b.textContent = wishlist.length;
    b.classList.toggle('hidden', wishlist.length === 0);
  });
}

// Quick View Modal
function openQuickView(sareeId) {
  const saree = sareesDatabase.find(s => s.id === sareeId) || sareesDatabase[0];
  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      <div class="relative overflow-hidden rounded-2xl bg-[#f4efe6] border border-[#d4af37]/30 group">
        <img src="${saree.image}" alt="${saree.name}" class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105" />
        <span class="absolute top-4 left-4 bg-[#671223] text-[#d4af37] text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">${saree.mood}</span>
      </div>
      <div>
        <div class="text-xs uppercase tracking-widest text-[#a87e14] font-semibold">${saree.craft}</div>
        <h3 class="font-serif-luxury text-2xl md:text-3xl font-bold text-[#4d0b17] mt-1">${saree.name}</h3>
        <p class="text-xs text-gray-500 mt-1">100% Certified Pure Silk Â· Handloom Verified</p>
        
        <div class="flex items-baseline gap-3 mt-4">
          <span class="text-2xl font-bold text-[#671223]">â‚¹${saree.price.toLocaleString('en-IN')}</span>
          <span class="text-sm text-gray-400 line-through">â‚¹${saree.originalPrice.toLocaleString('en-IN')}</span>
          <span class="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">Save â‚¹${(saree.originalPrice - saree.price).toLocaleString('en-IN')}</span>
        </div>

        <p class="text-xs text-gray-600 mt-4 leading-relaxed">${saree.description}</p>

        <div class="mt-6 pt-6 border-t border-gray-100 flex items-center gap-4">
          <button onclick="addToCart('${saree.id}'); closeQuickView();" class="flex-1 bg-[#671223] hover:bg-[#4d0b17] text-white py-3.5 px-6 rounded-full font-semibold text-xs tracking-wider uppercase transition shadow-lg flex items-center justify-center gap-2">
            Add to Bag Â· â‚¹${saree.price.toLocaleString('en-IN')}
          </button>
          <button onclick="toggleWishlist('${saree.id}')" class="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:text-red-500 hover:border-red-200 transition">
            â™¥
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  setTimeout(() => modal.classList.remove('opacity-0'), 10);
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (!modal) return;
  modal.classList.add('opacity-0');
  setTimeout(() => modal.classList.add('hidden'), 300);
}

// Search
function initSearch() {
  const input = document.getElementById('search-input');
  const resultsContainer = document.getElementById('search-results');
  if (!input || !resultsContainer) return;

  input.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase().trim();
    if (!query) {
      resultsContainer.innerHTML = '<p class="text-xs text-gray-400 text-center py-6">Type to search sarees, fabrics, or moods...</p>';
      return;
    }

    const matches = sareesDatabase.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.craft.toLowerCase().includes(query) ||
      s.mood.toLowerCase().includes(query) ||
      s.color.toLowerCase().includes(query)
    );

    if (matches.length === 0) {
      resultsContainer.innerHTML = `<p class="text-xs text-gray-500 text-center py-6">No matches for "${query}". Try "Kanjivaram" or "Organza".</p>`;
      return;
    }

    resultsContainer.innerHTML = matches.map(s => `
      <div onclick="openQuickView('${s.id}'); toggleSearch(false);" class="flex items-center gap-4 p-3 hover:bg-[#f4efe6] rounded-xl cursor-pointer transition">
        <img src="${s.image}" class="w-12 h-14 object-cover rounded-lg border border-[#d4af37]/30" />
        <div class="flex-1">
          <h4 class="font-serif-luxury font-semibold text-xs text-[#4d0b17]">${s.name}</h4>
          <span class="text-[11px] text-gray-500">${s.craft}</span>
        </div>
        <span class="text-xs font-semibold text-[#671223]">â‚¹${s.price.toLocaleString('en-IN')}</span>
      </div>
    `).join('');
  });
}

function toggleSearch(open = null) {
  const modal = document.getElementById('search-modal');
  if (!modal) return;
  const isHidden = modal.classList.contains('hidden');
  const shouldOpen = open !== null ? open : isHidden;

  if (shouldOpen) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0');
      document.getElementById('search-input')?.focus();
    }, 10);
  } else {
    modal.classList.add('opacity-0');
    setTimeout(() => modal.classList.add('hidden'), 250);
  }
}

// Ambient Tanpura Sound
function toggleAmbientSound() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!audioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioCtx();
  }

  if (isAudioPlaying) {
    if (audioContext.state === 'running') audioContext.suspend();
    isAudioPlaying = false;
    if (btn) btn.classList.remove('bg-[#d4af37]', 'text-[#4d0b17]');
    showToast('Sound Muted', 'Atmosphere paused.');
  } else {
    if (audioContext.state === 'suspended') {
      audioContext.resume();
    } else {
      const master = audioContext.createGain();
      master.gain.setValueAtTime(0.04, audioContext.currentTime);
      master.connect(audioContext.destination);

      [138.59, 207.65, 277.18, 554.37].forEach((f, i) => {
        const osc = audioContext.createOscillator();
        const g = audioContext.createGain();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, audioContext.currentTime);
        osc.connect(g);
        g.connect(master);
        osc.start();
      });
    }
    isAudioPlaying = true;
    if (btn) btn.classList.add('bg-[#d4af37]', 'text-[#4d0b17]');
    showToast('Atmosphere Active', 'Playing sitar and tanpura harmonics.');
  }
}

// Checkout simulation
function openCheckout() {
  toggleCart(false);
  const m = document.getElementById('checkout-modal');
  if (m) {
    m.classList.remove('hidden');
    setTimeout(() => m.classList.remove('opacity-0'), 10);
  }
}

function closeCheckout() {
  const m = document.getElementById('checkout-modal');
  if (m) {
    m.classList.add('opacity-0');
    setTimeout(() => m.classList.add('hidden'), 250);
  }
}

function completeOrder() {
  cart = [];
  localStorage.setItem('drift_cart', JSON.stringify(cart));
  updateCartBadge();
  closeCheckout();
  showToast('Order Confirmed!', 'Your heirloom saree is packed in our signature DRIFT fragrance box.');
}
