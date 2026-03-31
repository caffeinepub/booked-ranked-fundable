# Booked Ranked Fundable — Version 8 Marketing Copy Upgrades

## Current State
Homepage (HomePage.tsx) and niche pages (NichePage.tsx via nicheData.ts) are live with hero sections, three engines, how it works, trust/ICP section, pricing, and FAQs. The TrustInfrastructureSection.tsx is a compact 3-card grid. No "imagine" future-pacing copy exists. No standalone bold differentiator section exists. No oversized 97% stat callout exists.

## Requested Changes (Diff)

### Add
1. **ImagineSection component** — Full-width standalone section, dark background, each "Imagine..." line on its own row with animated reveal. Ends with bold payoff line: "That's not a vision. That's what Booked, Ranked & Fundable turns on for your business." Place between the hero and the free audit bar on the homepage.
2. **NoOneElseSection component** — Dedicated "No One Else Does This" section with bold headline, 3-4 supporting bullets about being the only all-in-one platform (bookings + rankings + fundability) built on ICP. Place on homepage after the Three Engines section. Also include on every niche page between ThreeEnginesSection and AuditFormSection.
3. **StatCallout component** — Large pull quote: "97% of businesses never build the credit profile needed to access growth capital." Big purple number, contrasting highlight, supporting copy. Place on homepage above the pricing section. Also on niche pages above PricingSection.
4. **Niche-specific "Imagine" opener** — Each niche in nicheData.ts gets an `imagineLines` array (3-4 niche-specific imagine lines). NichePage renders these in the ImagineSection component after the hero.

### Modify
- **TrustInfrastructureSection** — Rename section heading to "Built on Next-Generation Infrastructure" and add bolder, more confident copy about ICP being the most advanced blockchain infrastructure. Keep 3 cards but punch up the language with approved bold claims (tamper-resistant, next-generation, certified data integrity).
- **HomePage hero badge** — Change from "One Growth System" to something that sets up the "only platform" positioning.
- **HomePage comparison section** — Add a row for "Platform technology" showing generic cloud vs ICP/next-gen infrastructure.

### Remove
Nothing removed.

## Implementation Plan
1. Create `src/frontend/src/components/marketing/ImagineSection.tsx` — animated full-width imagine lines component
2. Create `src/frontend/src/components/marketing/NoOneElseSection.tsx` — bold differentiator section
3. Create `src/frontend/src/components/marketing/StatCallout.tsx` — 97% pull quote component
4. Update `src/frontend/src/data/nicheData.ts` — add `imagineLines` array to each niche
5. Update `src/frontend/src/components/marketing/TrustInfrastructureSection.tsx` — stronger ICP copy
6. Update `src/frontend/src/pages/HomePage.tsx` — insert ImagineSection, NoOneElseSection, StatCallout in correct positions
7. Update `src/frontend/src/pages/NichePage.tsx` — insert ImagineSection (niche-specific lines), NoOneElseSection, StatCallout
