# Booked Ranked Fundable — v4: Chat Widget, Voice Agent, Review Requests

## Current State
- Multi-tenant SaaS platform with Dashboard, Leads, Reviews, SEO Audit, Fundability, Reports, Settings, Admin Panel, and Free Audit pages
- Single Motoko canister stores leads, reviews, audit/fundability scores, free audit leads
- AppContext manages tenant switching, admin roles, score overrides
- AppLayout has sidebar nav with groups: Overview, Growth Engines, Insights, Account
- No chat widget, voice agent, or review request automation features exist

## Requested Changes (Diff)

### Add
1. **Chat Widget page** (`/chat-widget`) — per-tenant, protected route
   - AI-generated widget config based on business niche (auto-fills greeting, FAQ topics, personality)
   - Widget config form: business niche, greeting message, FAQ items (add/remove), lead capture fields toggle, appointment booking toggle
   - Live widget preview panel showing floating chat bubble
   - Unique embed code generation (`<script>` tag with tenant ID) — copy to clipboard
   - Widget activation toggle (active/inactive)

2. **Voice Agent page** (`/voice-agent`) — per-tenant, protected route
   - Configure: greeting script, business hours, services offered, call routing (forward number, voicemail, AI-handles)
   - Agency-level API credential fields in Admin Settings: Twilio Account SID, Auth Token, Twilio Phone Number, Vapi.ai API Key
   - Per-tenant voice agent status (configured / not configured)
   - "Sync to Vapi" button that shows syncing state
   - Display phone number assigned to this business

3. **Review Requests page** (`/review-requests`) — per-tenant, protected route
   - Send review request: enter customer name, phone, email, service completed, review platform (Google/Yelp/Facebook)
   - Review request list showing status: Sent, Awaiting Response, Happy (review link sent), Unhappy (in recovery), Reviewed, Max Attempts Reached
   - Self-correcting flow UI: when customer marks unhappy → private feedback form path, staff alert badge in sidebar, recovery message config
   - Recovery message template editor ("We want to make this right...")
   - Follow-up cadence settings: interval (default 2 days), max attempts (default 5)
   - SMS + Email channel toggles (requires agency Twilio credentials)

4. **Backend data models** for:
   - ChatWidgetConfig: tenantId, niche, greeting, faqs, leadCaptureEnabled, bookingEnabled, isActive, embedToken
   - VoiceAgentConfig: tenantId, greetingScript, businessHours, services, callRouting, twilioNumber, vapiAgentId, isConfigured
   - ReviewRequest: id, tenantId, customerName, customerPhone, customerEmail, serviceCompleted, platform, status, sentAt, lastFollowUpAt, attempts, feedback
   - AgencySettings: twilioAccountSid, twilioAuthToken, twilioPhone, vapiApiKey (admin only)

5. **Sidebar nav additions**: Chat Widget (under Growth Engines), Voice Agent (under Growth Engines), Review Requests (under Growth Engines)

6. **Admin Settings section** for agency API credentials (Twilio + Vapi)

### Modify
- `AppLayout.tsx`: Add Chat Widget, Voice Agent, Review Requests to NAV_GROUPS under GROWTH ENGINES
- `App.tsx`: Add routes for `/chat-widget`, `/voice-agent`, `/review-requests`
- `SettingsPage.tsx`: Add "Integrations" tab with Twilio + Vapi credential fields (admin-only)
- `AppContext.tsx`: Add agencySettings state, chatWidgetConfigs, voiceAgentConfigs, reviewRequests state
- PAGE_TITLES map: add new routes

### Remove
- Nothing removed

## Implementation Plan
1. Update backend Motoko to add ChatWidgetConfig, VoiceAgentConfig, ReviewRequest, AgencySettings types and CRUD methods
2. Create `ChatWidgetPage.tsx` with niche-based AI config generator, form, preview, embed code
3. Create `VoiceAgentPage.tsx` with config form, Twilio/Vapi credential display, sync UI
4. Create `ReviewRequestsPage.tsx` with send form, request list, self-correcting flow UI, cadence settings
5. Update `AppLayout.tsx` navigation groups
6. Update `App.tsx` routes
7. Update `SettingsPage.tsx` with Integrations tab
8. Update `AppContext.tsx` with new state
