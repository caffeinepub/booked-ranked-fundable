# Booked Ranked Fundable — Version 6

## Current State
Multi-tenant SaaS platform with Dashboard, Leads/CRM, Reviews, SEO Audit, Fundability, Reports, Settings, Admin Panel, Chat Widget, Voice Agent, Review Requests, Free Audit, Why Us, and Homepage pages. Settings page has Twilio and Vapi.ai agency credential fields. No analytics page, no notification center, no integrations hub beyond Twilio/Vapi.

## Requested Changes (Diff)

### Add
- **Settings — Integrations Hub** (expand existing SettingsPage.tsx):
  - Organized sections: Stripe, Twilio, Vapi.ai, Email (SMTP/SendGrid), Google APIs (Places, Maps), SERP API, OpenAI/AI Provider
  - Admin view: all sections visible; Client view: only Google Business URL, review platform preferences, notification email/phone
  - Each credential field has a "Test Connection" button that shows a status badge (Connected / Not Configured / Failed)
  - All fields stored in component state with save functionality
- **Live Analytics Page** (`/analytics`):
  - Website uptime status (green/red badge, simulated ping with realistic data)
  - SSL certificate status card
  - Performance score from last audit with trend
  - Traffic overview chart (simulated weekly sessions, page views, bounce rate)
  - Lead source breakdown chart (Organic, Referral, Direct, Free Audit)
  - Audit score history chart (last 6 weeks of scores)
  - Top pages table (simulated)
  - Tracking script embed snippet panel ("Install this on your site to get live data")
- **Notification Center**:
  - Bell icon in the AppLayout header with unread badge count
  - Dropdown panel showing recent notifications (new lead, audit score drop, review request sent/responded, uptime alert)
  - Mark as read / clear all functionality
  - Notifications stored in React state (simulated with realistic demo entries)
- **Contextual illustrations/images**:
  - Dashboard page: visual icons/illustrations for SEO, Reputation, Fundability metric cards
  - Empty states for Leads, Reviews pages when no data
  - Analytics page hero graphic

### Modify
- **AppLayout/navigation**: Add `/analytics` route to sidebar navigation (bar chart icon)
- **App.tsx**: Add analytics route
- **DashboardPage.tsx**: Enhance metric cards with icon illustrations and make the overall dashboard richer with quick stat cards for leads, reviews, audit score
- **SettingsPage.tsx**: Replace current simple settings with full Integrations Hub with tabbed sections

### Remove
- Nothing removed

## Implementation Plan
1. Expand SettingsPage with tabbed Integrations Hub (Stripe, Twilio, Vapi, Email, Google, SERP, OpenAI) — admin vs client role-gated views
2. Create AnalyticsPage with uptime/SSL cards, traffic chart, lead source chart, audit score trend chart, tracking script panel
3. Add NotificationCenter component to AppLayout header (bell icon, dropdown panel, badge count)
4. Enhance DashboardPage with richer stat cards and visual improvements
5. Wire analytics route in App.tsx and sidebar
6. Add contextual SVG illustrations to key pages
