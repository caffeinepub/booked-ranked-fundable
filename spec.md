# Booked Ranked Fundable

## Current State
The `/demo` page has a ChatWidgetDemo component with a basic 3-step qualification flow: initial response → ask name → ask phone → captured. It collects only name and phone. There is no niche-specific branching, no address or email collection, no appointment scheduling, and no simulated business owner notification panel.

## Requested Changes (Diff)

### Add
- Full niche-specific qualifying question sequences for all 6 niches (Plumbing, HVAC, Restoration, Carpet Cleaning, Roofing, Med Spa)
- Each niche flow covers: problem description → niche-specific follow-ups (2-3 questions) → contact capture (name, address, phone, email) → appointment scheduling (day + time preference) → confirmation message
- After lead captured: show a simulated Business Owner Notification panel on the right side of the demo (same screen, not a separate page) with two sections:
  1. Mock SMS notification — styled as a phone text message bubble, showing the lead summary (name, phone, service type, address, appointment time)
  2. Mock email notification — styled as an email client card showing To/Subject/Body with the same lead details
- Both notifications animate in (slide up / fade) after the chat confirmation message is sent
- The panel should make it clear these go to the BUSINESS OWNER watching the demo
- Label the panel: "What the Business Owner Receives Instantly"

### Modify
- Replace the existing `QualificationStep` type and `sendMessage` state machine with a richer multi-step flow engine
- `leadCapture` state expands to store: name, phone, email, address, serviceType, appointmentDay, appointmentTime
- The right-panel "Lead Captured" section is replaced by the new notification panel once lead is complete
- All niches should have a confirmation message: "Thank you [name]! We have all your information and will be contacting you immediately. Our team will reach out to confirm your [day] appointment."

### Remove
- The old minimal 3-step flow (initial → asked_name → asked_phone → captured)
- The simple green "Lead Captured" card (replaced by the notification panel)

## Implementation Plan
1. Define a `QualifyFlow` type that is an ordered array of step objects: `{ key: string, botMessage: string, inputHint: string, storeAs: keyof LeadData | null, options?: string[] }`
2. Build niche flow arrays for all 6 niches — each with 2-3 niche-specific questions, then name → address → phone → email → appointment day → appointment time
3. Rewrite `sendMessage` to walk through the current niche's flow array using a step index ref
4. After the last step, fire the confirmation message and set `leadCaptured = true`
5. When `leadCaptured` is true, animate in the Business Owner Notification panel in the right column
6. SMS panel: phone mockup showing a text thread with lead summary
7. Email panel: email card mockup with To/From/Subject/Body
8. Both panels should look like real device/app UI (dark phone for SMS, white email card for email)
