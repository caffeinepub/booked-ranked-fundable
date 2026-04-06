# Booked Ranked Fundable — Agent Services Phase 4

## Current State

- Agent Services layer is live on both admin (`/admin-agents`) and client (`/agent-services`) sides
- `agentData.ts` contains all models: AgentProduct, AgentSubscription, AgentTask, AgentDeliverable, AgentServiceRequest, AgentPerformanceSnapshot
- AppContext manages agent state: activateAgent, deactivateAgent, pauseAgent, resumeAgent, submitAgentRequest, updateAgentTaskStatus, setAgentPriceOverride, addAgentSubscriptionNote
- `activateAgent(tenantId, productId, withOversight?)` exists but Human Oversight add-on from active agent cards only shows a toast pointing to "account manager" — not wired
- Bundle logic exists as a product card but no guard against double-subscription (e.g., buying SEO + Ads separately when bundle is available)
- Performance snapshots exist in DEMO_AGENT_PERFORMANCE but the dashboard is static month-by-month cards with no trend visualization or historical comparison
- AiBusinessManagerPanel has no agent-aware recommendations — it only references SEO/fundability/reviews generically
- No `addOversight` function exists in AppContext

## Requested Changes (Diff)

### Add
- `addOversight(subscriptionId)` function in AppContext that sets `hasOversight: true` on the subscription, creates a high-priority task in the fulfillment queue (type: "review"), and fires a notification
- Human Oversight add button on active agent cards that calls `addOversight` directly — no toast redirect
- Bundle savings callout: when user has SEO Agent AND Ads Agent active separately, show a persistent upgrade nudge to the bundle with visible savings amount
- Bundle activation guard: when activating the bundle, auto-cancel any individual SEO or Ads subscriptions to prevent double-billing
- Agent-aware AI Business Manager responses — when the client has active agent subscriptions, surface recommendations specifically tied to those agents (e.g., "Your SEO Agent found 3 GBP improvements ready for review")
- Performance trend visualization: month-over-month sparkline/trend indicator on each metric card (up/down arrows with delta vs previous month)
- "Next Best Action" panel on Performance tab driven by active agents and latest performance data
- Admin performance dashboard: per-agent MRR contribution and subscription count on the Overview tab

### Modify
- `activateAgent` in AppContext: when productId is a bundle (`agent-bundle`), auto-cancel any active `agent-seo` or `agent-ads` subscriptions
- AgentServicesPage Active Agents tab: Human Oversight "Add" button calls `addOversight` and shows success toast (not info toast)
- AgentServicesPage Performance tab: add trend arrows and delta vs previous month on metric cards
- AiBusinessManagerPanel CLIENT_RESPONSES: inject agent-specific recommendations based on `agentSubscriptions` state
- AdminAgentServicesPage Overview tab: pull live MRR from active subscriptions using actual pricing overrides

### Remove
- Toast redirect to "contact account manager" for Human Oversight — replaced with direct wiring

## Implementation Plan

1. **AppContext**: Add `addOversight(subscriptionId)` function — sets hasOversight, creates high-priority oversight task, fires notification. Update `activateAgent` to auto-cancel conflicting individual subs when bundle activated.
2. **agentData.ts**: Export a helper to generate the oversight task object for a given subscription.
3. **AgentServicesPage**: Wire "Add" button on oversight upsell panel to call `addOversight`. Add bundle upgrade nudge when both SEO + Ads active individually. Enhance Performance tab with trend arrows comparing latest vs previous month snapshot.
4. **AiBusinessManagerPanel**: Add agent-aware response set — when client has active subscriptions, inject 2-3 recommendations referencing specific active agents and their current work/deliverables.
5. **AdminAgentServicesPage Overview**: Replace hardcoded MRR with computed value from actual subscriptions × pricing overrides.
