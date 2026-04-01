# Booked Ranked Fundable — Campaigns Module (Phase 2 & 3)

## Current State
- App has Admin, Client, and Demo login paths
- AdminPage has tenant management, score overrides, module access control
- AppContext manages tenants, socialMediaEnabled, and demo mode
- No Campaigns page or route exists yet
- AppLayout sidebar has no Campaigns link

## Requested Changes (Diff)

### Add
- `CampaignsPage.tsx` — full campaigns module with two tabs: Admin Prospect Outreach (Phase 2) and Client Niche Campaigns (Phase 3)
- Admin Prospect Outreach tab:
  - Prospect list manager: manual add form (business name, owner name, email, phone, niche, city) + CSV upload with column mapping preview
  - Unified prospect list with filters by niche and campaign stage
  - Two prebuilt outreach sequences: Plumbing (5 emails + 1 SMS) and Med Spa (5 emails + 1 SMS) — fully written copy with personalization tokens
  - Sequence step viewer: preview every step, edit copy, set delays
  - Sender identity config: default agency email, per-campaign sender name/reply-to override
  - Per-prospect tracking: opened, clicked, replied, current sequence step
  - Convert to Client button on each prospect record
  - Performance metrics: sent, opens, clicks, replies, conversions
- Client Niche Campaigns tab:
  - Auto-matched campaign packs (Plumbing: 3 campaigns, Med Spa: 3 campaigns)
  - Plumbing pack: Missed Call Rescue, Estimate Recovery, Completed Job Review + Referral
  - Med Spa pack: Consultation Booking Nurture, No-Show Recovery, Post-Visit Rebook + Membership Upsell
  - Pre-activated by default, with toggle on/off per campaign
  - Admin toggle override visible in AdminPage
  - Campaign dashboard: contacts in sequence, current step, metrics (opens, clicks, bookings, conversions)
  - Journey viewer: card-based step sequence with delays and exit rules
- `/campaigns` route in App.tsx (protected, accessible to both admin and client)
- Campaigns link in AppLayout sidebar
- `campaignToggles` state in AppContext (per-tenant, per-campaign enabled/disabled)
- Campaign data: sequences, steps, copy all stored as frontend data constants

### Modify
- `AppContext.tsx` — add `campaignToggles` state and `setCampaignToggle` function
- `App.tsx` — add `/campaigns` route
- `AppLayout.tsx` — add Campaigns to sidebar nav
- `AdminPage.tsx` — add per-tenant campaign toggle controls in Module Access Control table

### Remove
- Nothing removed

## Implementation Plan
1. Add campaign data constants (sequences, steps, full copy) in `src/frontend/src/data/campaignData.ts`
2. Add `campaignToggles` to AppContext
3. Create `CampaignsPage.tsx` with two-tab layout (Admin Outreach / Client Campaigns), full prospect list manager, sequence viewers, and client campaign dashboards
4. Wire up route in App.tsx and sidebar link in AppLayout.tsx
5. Add campaign toggles to AdminPage Module Access Control
