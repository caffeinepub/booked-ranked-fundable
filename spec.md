# Booked Ranked Fundable

## Current State
- React + TypeScript + Tailwind frontend with pages: Dashboard, Leads, Reviews, Audit, Fundability, Reports, Settings, HomePage, LoginPage
- AppLayout with fixed left sidebar (slate-900), no mobile collapse
- LoginPage has role selector (Agency Admin / Business Owner) — no credentials, no password
- AppContext manages login state with role and tenantId
- No admin dashboard or admin-specific pages
- AuditPage shows static demo data with a "Run New Audit" button that only shows a toast
- Backend Motoko canister exists with tenant, lead, review, audit, fundability CRUD

## Requested Changes (Diff)

### Add
- Admin login credentials: username `Admin333`, email `daree1933@gmail.com`, password `Admin333` (simple client-side check)
- Master Admin Dashboard page at `/admin` — accessible only to admin role
  - Overview stats: total tenants, total leads, total reviews across all tenants
  - Tenant management table: list all tenants with create/delete actions
  - Score override panel: select tenant, override audit score and fundability score with input + save
- Mobile-responsive sidebar: on screens < md, sidebar is hidden by default, toggled via hamburger button in header; slides in as overlay drawer
- Audit page enhancement: "Run Live Audit" flow with step-by-step simulated audit sections (GMB check, citations check, website health check, social media check, Google ranking check) — each step animates through "Checking..." then shows a score result with a progress bar; final consolidated score shown at end
- Admin nav item "Admin Panel" linking to `/admin` — visible only when isAdmin

### Modify
- LoginPage: replace role picker UI with a real credential form (Username, Email, Password fields). Admin333 / daree1933@gmail.com / Admin333 logs in as agency admin. Any other valid-looking email with any password logs in as business owner (select tenant). Show validation errors for empty fields.
- AppContext: add `isAdmin` based on credentials match, persist login state in sessionStorage so refresh doesn't log out
- AppLayout: add hamburger toggle button in header for mobile; sidebar becomes a Sheet/overlay drawer on mobile (use Sheet from shadcn or a simple fixed overlay)
- App.tsx: add `/admin` route protected and admin-only

### Remove
- Nothing removed

## Implementation Plan
1. Update LoginPage with credential form — admin check against Admin333/daree1933@gmail.com/Admin333
2. Update AppContext to persist login in sessionStorage and support adminLogin flag
3. Create AdminPage.tsx with master dashboard: tenant stats, create/delete tenant, score override
4. Update AppLayout for mobile-responsive collapsible sidebar (Sheet overlay on mobile, hamburger in header)
5. Update AuditPage with live audit simulation: step-by-step animated audit runner with per-category scores
6. Update App.tsx to add /admin route with admin-only guard
7. Update navigation in AppLayout to show Admin Panel link for admins
