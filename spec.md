# Booked Ranked Fundable — Agent Services Layer

## Current State

The app is a fully built multi-tenant SaaS platform (Version 24) with:
- React + TypeScript + Tailwind frontend, Motoko ICP backend
- AppContext managing auth, tenants, notifications, campaigns, onboarding state
- AppLayout with sidebar navigation (NAV_GROUPS), admin panel at /admin
- Pages: Dashboard, Leads, Reviews, Audit, Fundability, Reports, Analytics, Settings, Admin, ChatWidget, VoiceAgent, ReviewRequests, Listings, SocialMedia, Campaigns
- Demo mode, three login paths, white-label agency support
- demoData.ts has TENANTS, LEADS, REVIEWS, AUDIT_SCORES, FUNDABILITY_SCORES

## Requested Changes (Diff)

### Add
- `src/frontend/src/data/agentData.ts` — all agent data models: agent products, subscriptions, tasks, deliverables, service requests, performance snapshots
- `src/frontend/src/pages/AgentServicesPage.tsx` — client-facing "My Agents" page with tabs: Store, Active, Requests, Deliverables, Performance
- `src/frontend/src/pages/AdminAgentServicesPage.tsx` — admin-facing Agent Services page with tabs: Overview, Catalog, Subscriptions, Fulfillment Queue, Deliverables, Performance, Settings
- AppContext extensions: agentSubscriptions state, agentRequests state, agentTasks state, helpers
- Route `/agent-services` in App.tsx (protected, all authenticated users)
- Route `/admin-agents` in App.tsx (protected, admin only)
- Nav group entry "Agent Services" in AppLayout for non-admin users
- Admin nav entry "Agent Services" in AppLayout for admin users

### Modify
- `AppContext.tsx` — add agent-related state: agentSubscriptions (per tenant), agentRequests, agentTasks, agentPricing overrides, helpers to activate/deactivate/request
- `AppLayout.tsx` — add "Agent Services" to client nav group; add "Agent Services" to admin nav section
- `App.tsx` — add two new routes

### Remove
- Nothing removed

## Implementation Plan

1. Create `agentData.ts` with:
   - AGENT_PRODUCTS (5 products: SEO&GEO, Paid Ads, Website, Bundle, Human Oversight)
   - AGENT_FEATURES per product
   - DEMO_AGENT_SUBSCRIPTIONS per tenant
   - DEMO_AGENT_TASKS (fulfillment queue items)
   - DEMO_AGENT_DELIVERABLES per tenant
   - DEMO_AGENT_REQUESTS (service requests from clients)
   - DEMO_AGENT_PERFORMANCE snapshots
   - TypeScript interfaces for all entities

2. Extend AppContext with:
   - agentSubscriptions: Record<tenantId, AgentSubscription[]>
   - agentRequests: AgentServiceRequest[]
   - agentTasks: AgentTask[]
   - agentPricingOverrides: Record<productId, number>
   - activateAgent(tenantId, productId) / deactivateAgent(tenantId, subscriptionId)
   - submitAgentRequest(req) / updateTaskStatus(taskId, status)
   - setAgentPriceOverride(productId, price)

3. Build AdminAgentServicesPage with tabs:
   - Overview: stats cards (MRR, active subs, pending tasks), subscriptions by type chart, upsell table
   - Catalog: editable product cards, price editor, feature lists, enable/disable toggles
   - Client Subscriptions: table of all clients + their active agents, add/remove/pause controls
   - Fulfillment Queue: filterable task list with status, assignee, due date, notes
   - Deliverables: per-client deliverable history with monthly breakdown
   - Performance: per-client impact metrics, SEO scores, lead changes
   - Settings: pricing editor, visibility rules, niche enablement, human oversight config

4. Build AgentServicesPage (client) with tabs:
   - Store: premium agent cards showing price, features, active state, activate/request buttons
   - Active Agents: subscribed services with current work, next deliverables, recent completions
   - Request Queue: form to submit requests routing to admin fulfillment queue
   - Deliverables: completed work history
   - Performance Snapshot: client-friendly metrics and next best actions

5. Wire routing and navigation in App.tsx and AppLayout.tsx
