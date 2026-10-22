# Threads & Co. — Store Prototype

A responsive clothing-store frontend prototype built with HTML, CSS, Vite, Locomotive Scroll, and GSAP.

## Requirements

- Node.js 18 or newer
- npm

## Run locally

Run these commands from this directory (cloth-store-prototype):

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To verify a production bundle:

```bash
npm run build
npm run preview
```

## Included interactions

- Responsive navigation menu for smaller screens
- Smooth in-page navigation and scroll-triggered entrance animations
- Reduced-motion support for visitors who request less animation
- Collection links that filter the featured-product preview
- Product quick-view dialogs with descriptions and sample prices
- Client-side newsletter form validation and status feedback

## Prototype limitations

This is a frontend demonstration, not a production commerce system.

- Newsletter submissions are not sent to a service and email addresses are not stored.
- Product prices and descriptions are sample content.
- Quick view does not provide cart, checkout, stock, payment, or account functionality.
- Product photography is loaded from external Unsplash URLs and therefore requires network access.
- Locomotive Scroll's stylesheet is loaded from jsDelivr; the app's JavaScript dependencies are installed through npm.

Before production use, connect the newsletter form to a consent-aware mailing-list provider, replace sample product data with a trusted data source, implement server-side validation and commerce flows, and review privacy, accessibility, performance, and security requirements.

## Project files

- index.html — semantic page structure and product dialog
- style.css — layout, responsive styling, and interaction states
- main.js — scrolling, animation, collection filtering, quick view, and form feedback
- package.json — Vite scripts and runtime dependencies

## Motion and accessibility

The interface includes a skip link, keyboard focus styles, labels for the email input, accessible dialog semantics, an Escape-key close action, and a prefers-reduced-motion check. Continue testing with keyboard-only navigation and screen readers before treating this prototype as production-ready.
