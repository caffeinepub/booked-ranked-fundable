# Booked Ranked Fundable

## Current State
The Admin Panel allows creating/deleting tenants and managing client data. Twilio credentials are entered once in Settings > Integrations and apply globally. There is no per-client phone number assignment, provisioning UI, or number status tracking.

## Requested Changes (Diff)

### Add
- Per-client phone number management section in Admin Panel tenant cards/detail view
- Phone number assignment UI with three provisioning types: New Local Number, Ported Number, Call Forwarding
- Number status badge per tenant: Active, Pending, Not Assigned
- Area code input for provisioning a new local number
- Porting form: enter existing number to initiate port request
- Call forwarding form: enter their real number, get a forwarding Twilio number
- Provisioned number displayed prominently on each tenant card in Admin Dashboard
- Number management panel accessible from tenant detail/edit view
- Mock provisioning flow with realistic status transitions (Requesting → Pending → Active)

### Modify
- Tenant data model to include: assignedPhoneNumber, phoneNumberType, phoneNumberStatus, areaCode, portingNumber
- Admin tenant cards to show phone number status badge and assigned number
- Admin Dashboard tenant list to surface phone number info per client

### Remove
- Nothing removed

## Implementation Plan
1. Extend tenant type/interface to include phone number fields
2. Add PhoneNumberManager component for the provisioning UI (type selector, forms per type, status display)
3. Integrate PhoneNumberManager into the Admin tenant detail/edit panel
4. Update tenant cards in Admin Dashboard to show assigned number and status badge
5. Mock provisioning logic with status transitions to simulate real Twilio flow
6. Ensure the assigned number is referenced in the Review Requests and Chat Widget pages as the sending number for that client
