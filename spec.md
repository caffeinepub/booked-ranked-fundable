# Booked Ranked Fundable — White-Label Hub

## Current State

The platform (Version 28) has:
- Three login paths: Super Admin (`/admin`), Client (`/dashboard`), Demo (`/demo-login`)
- Agency onboarding wizard (7-step) at `/onboarding` for agency-role users
- Step 2 of the AgencyOnboardingWizard already collects agency name, logo, tagline, and a color — but this data is ephemeral (wizard-only, not persisted in a dedicated hub)
- No dedicated White-Label Hub page exists
- Admin sidebar has: Admin Panel (`/admin`) and Agent Services (`/admin-agents`)
- Protected routes include all dashboard features; admin-only routes: `/admin` and `/admin-agents`
- AppContext tracks `currentUser`, `isLoggedIn`, `isAdminUser`, tenants, notifications, and onboarding state

## Requested Changes (Diff)

### Add
- New page: `WhiteLabelHubPage.tsx` at route `/white-label-hub` (admin-only protected route)
- 5 tabs inside the hub:
  1. **Brand Settings** — agency name, logo upload (image file), primary + secondary brand colors (color pickers), tagline, hero headline, custom domain field
  2. **Onboarding Link** — branded welcome screen customization (headline, welcome message, agency logo preview), shareable link generator with copy-to-clipboard, QR code display, link stats (simulated clicks/signups)
  3. **Client Portal Preview** — live simulation of what an agency client sees: branded login page mockup, branded dashboard header, branded onboarding wizard welcome screen — all updating in real-time from Brand Settings
  4. **Domain & Access** — custom domain instructions, subdomain config, SSL status indicator, white-label email sender name/address
  5. **Client Branding Controls** — per-client overrides: custom greeting text, help text override, CTA label customization, hide/show specific nav items
- Navigation: add "White-Label Hub" as a top-level item in the admin sidebar (appears only for admin/agency users)
- App.tsx: register `/white-label-hub` as an admin-only protected route
- AppContext: add `whiteLabelSettings` state (agencyName, logoUrl, primaryColor, secondaryColor, tagline, heroHeadline, customDomain, welcomeHeadline, welcomeMessage, emailSenderName, emailSenderAddress) with get/set

### Modify
- `App.tsx` — add `/white-label-hub` route pointing to `WhiteLabelHubPage`
- `AppLayout.tsx` or wherever admin sidebar nav items are defined — add White-Label Hub nav link for admin users
- `AppContext.tsx` — add `whiteLabelSettings` state and setter

### Remove
- Nothing removed

## Implementation Plan

1. Update `AppContext.tsx` to add `whiteLabelSettings` state with defaults
2. Create `WhiteLabelHubPage.tsx` with 5-tab layout matching the existing premium dark/purple aesthetic
3. Tab 1 (Brand Settings): form fields for all brand config, logo upload (FileReader base64 preview), two color pickers, save to context
4. Tab 2 (Onboarding Link): welcome screen customizer, shareable URL display with copy button, simulated QR code block, link stats cards
5. Tab 3 (Client Portal Preview): live preview panel that reads from context whiteLabelSettings and renders branded mockups of the login page header, dashboard top bar, and onboarding wizard welcome — updates as user edits Brand Settings
6. Tab 4 (Domain & Access): custom domain input, subdomain display, SSL badge, email sender fields
7. Tab 5 (Client Branding Controls): table of clients with per-row greeting text override, help text, CTA label, nav visibility toggles
8. Register route in `App.tsx` as admin-only
9. Add nav link in sidebar (admin-only visibility)
