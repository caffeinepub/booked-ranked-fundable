# Booked Ranked Fundable — Homepage Overhaul

## Current State
Homepage has a basic nav bar (logo + 2 buttons), hero section, free audit CTA bar, three feature cards, pricing section, and footer. No dropdown navigation, no blockchain/ICP section, no differentiation/why-us content.

## Requested Changes (Diff)

### Add
- **Full sticky top navigation bar** with logo, dropdown menus (Solutions, Platform, Why Us, Pricing), and CTA buttons (Free Audit, Sign In). Mobile hamburger menu with slide-out drawer.
- **"The Only Platform" section** — headline about being the only company in the world combining Booked + Ranked + Fundable in one system. Stats bar (businesses served, avg revenue increase, etc.).
- **"Built on Blockchain" section** — explains ICP (Internet Computer Protocol), what tamper-resistant certified-data means, why it's unpassable vs traditional cloud (AWS, GCP), trust and security angle.
- **"Why We're Different" section** — side-by-side comparison (BRF vs competitors), 3-4 key differentiators with icons, the "easiest choice" angle.
- **"How It Works" section** — simple 3-step flow (Audit → Activate → Grow) to make onboarding feel effortless.
- **Social proof / trust bar** — logos or stat callouts to build credibility.
- Anchor links in nav so dropdown items scroll to sections.
- Dedicated `/why-us` route rendering the full Why Us / Blockchain / Differentiators content as a standalone page option.

### Modify
- Nav bar: replace minimal header with full dropdown navigation.
- Hero section: tighten copy, add trust signals under CTA buttons.
- Features section: keep but visually elevate with better layout.
- Footer: add navigation links matching the new nav structure.

### Remove
- Nothing removed — all existing sections retained and enhanced.

## Implementation Plan
1. Rewrite `HomePage.tsx` with: sticky dropdown nav, new hero, trust bar, three-pillars section, "Only Platform" section, Blockchain section, Why Different section, How It Works, Pricing, enhanced footer.
2. Add `WhyUsPage.tsx` as a standalone page for `/why-us` (reuses the blockchain + differentiators sections).
3. Register `/why-us` route in `App.tsx`.
4. Nav dropdown links to anchor sections on homepage OR navigates to `/why-us`.
