# Shruti Silk Stories — DRIFT

A responsive luxury silk-saree storefront prototype rebuilt around the reference video’s editorial flow.

## Reference-matched page flow

1. Burgundy-and-gold opening animation.
2. Timed, cross-fading full-screen hero carousel.
3. Six Moods image gallery.
4. Woven to Be Remembered horizontal signature gallery.
5. New Arrivals and Best Sellers product rails.
6. Dark Bridal Collection feature with a horizontal product rail and wave edges.
7. Trend of the Day and Seasonal Special product rows.
8. Interactive product-detail showcase with thumbnails, colour choices, sizes, quantity, wishlist, and add-to-bag.
9. Edits for Every Occasion.
10. Worth Your Attention editorial cards.
11. Courtyard Air, Wedding Circle, and Temple Steps campaign switcher.
12. Latest Trends editorial carousel and footer.

## Interactions

- Hero autoplay, manual arrows and slide indicators.
- Horizontal scrolling rails and signature gallery controls.
- Product cards, quick product detail, and saved wishlist state.
- Search by product name, craft, colour, and description.
- Shopping bag drawer, quantity-aware subtotal, item removal, and local browser persistence.
- Product colour and size selection.
- Story and latest-trend switchers.
- Responsive mobile navigation and reduced-motion support.

## Run locally

Requires Python 3. Run from this directory:

```bash
python server.py
```

Then visit http://localhost:8080.

## Scope

This is a front-end prototype. Cart and wishlist data are stored locally in the browser. Checkout is a demonstration only; there is no production backend, inventory service, order processing, or payment gateway connected.
