# Booked Ranked Fundable

## Current State
Single generic login page handling admin and client logins together. No demo login path exists. AppContext supports login(role, tenantId, adminUser) with agency/client roles.

## Requested Changes (Diff)

### Add
- Three distinct login path cards: Admin, Client (paying), Demo
- Demo intake form: first name, business name, niche, city
- Demo session state: isDemoMode, demoBusinessName, demoOwnerName, demoNiche, demoCity
- loginDemo() function in AppContext
- Demo Mode sticky banner throughout app with Book a Demo CTA
- White-label header/sidebar shows demo business name when in demo mode
- AI greeting panel on Dashboard with personalized daily briefing
- Niche-specific demo data per selected niche
- /demo-login route

### Modify
- LoginPage.tsx: three cards layout (Admin | Client | Demo)
- AppContext.tsx: add demo mode fields and loginDemo()
- AppLayout.tsx: demo banner + dynamic business name in header
- DashboardPage.tsx: AI greeting panel

### Remove
- Tenant dropdown inside login form

## Implementation Plan
1. Update AppContext with demo mode state and loginDemo()
2. Rewrite LoginPage as three-card layout
3. Create DemoLoginPage with intake form
4. Add /demo-login route in App.tsx
5. Update AppLayout with demo banner and dynamic branding
6. Update DashboardPage with AI greeting panel
7. Add niche demo data sets to demoData.ts
