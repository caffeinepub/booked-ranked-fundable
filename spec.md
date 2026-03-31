# Booked Ranked Fundable

## Current State
The app has a full marketing site with homepage, niche pages, pricing, free audit, and a protected app with dashboard, leads, reviews, audit, fundability, voice agent, chat widget, analytics, and settings. There is no `/demo` page. The PublicNav has Home, Industries, Pricing, Free Audit, Login, and Get Free Audit CTA.

## Requested Changes (Diff)

### Add
- `/demo` public page with three tabbed demos:
  1. **Voice Agent Demo** — phone UI mockup with 3 scenario buttons (New Customer Inquiry, After-Hours Emergency, Pricing Question). Each plays a scripted conversation that appears line by line with typing delays, simulating a live AI call transcript. At the end a mock lead card animates in showing the captured lead.
  2. **Chat Widget Demo** — interactive floating chat bubble with a niche selector (Plumbing, HVAC, Restoration, Carpet Cleaning, Roofing, Med Spa). Visitor types real messages; widget responds with niche-aware keyword-branching answers. After lead capture (name + phone), a "Lead Captured" notification appears.
  3. **Fundability Snapshot Demo** — 4-field form (Business Name, Years in Business, Monthly Revenue, Business Type). Clicking "Run Fundability Snapshot" triggers an animated 3-second calculation, then reveals a score (20-75 based on inputs), four colored pillar scores, a gap analysis, and a Book a Strategy Call CTA.
- Add "Live Demo" link to PublicNav desktop and mobile menus
- Add CTA to the demo page from homepage hero area (optional, frontend agent decides placement)

### Modify
- `PublicNav.tsx` — add `/demo` link in desktop nav and mobile menu
- `App.tsx` — add demoRoute for `/demo`

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/src/pages/DemoPage.tsx` with three tabs: Voice Agent, Chat Widget, Fundability
2. Build VoiceAgentDemo sub-component with phone UI, scenario selector, scripted transcript playback with typing delays, and animated lead card reveal
3. Build ChatWidgetDemo sub-component with niche selector, keyword-branching chat responses, and lead capture flow with notification
4. Build FundabilityDemo sub-component with input form, animated scoring reveal, pillar scores, gap analysis
5. Update `App.tsx` to add demoRoute
6. Update `PublicNav.tsx` to add Demo link in desktop and mobile nav
