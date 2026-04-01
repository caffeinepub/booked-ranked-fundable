// Campaign data for Admin Prospect Outreach and Client Niche Campaign Packs

export type ChannelType = "email" | "sms" | "task" | "wait";

export interface CampaignStep {
  id: string;
  stepNumber: number;
  channel: ChannelType;
  delayLabel: string;
  delayHours: number;
  subject?: string;
  previewText?: string;
  body: string;
  ctaText?: string;
  isInternal?: boolean;
}

export interface OutreachSequence {
  id: string;
  name: string;
  niche: "Plumbing" | "Med Spa";
  objective: string;
  steps: CampaignStep[];
  performance: {
    enrolled: number;
    sent: number;
    openRate: number;
    clickRate: number;
    replies: number;
    conversions: number;
  };
}

export interface ClientCampaign {
  id: string;
  name: string;
  niche: "Plumbing" | "Med Spa";
  objective: string;
  trigger: string;
  triggerStage: string;
  steps: CampaignStep[];
  exitRules: string[];
  kpiTargets: { openRate: string; clickRate: string; conversionRate: string };
  mockMetrics: {
    contactsInSequence: number;
    openRate: number;
    conversionRate: number;
  };
}

export const ADMIN_OUTREACH_SEQUENCES: OutreachSequence[] = [
  {
    id: "plumbing-outreach",
    name: "Plumbing Outreach",
    niche: "Plumbing",
    objective: "Convert plumbing business owners into platform clients",
    performance: {
      enrolled: 24,
      sent: 89,
      openRate: 31,
      clickRate: 12,
      replies: 8,
      conversions: 3,
    },
    steps: [
      {
        id: "po-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Day 0",
        delayHours: 0,
        subject:
          "{{first_name}}, how many calls did {{business_name}} miss this week?",
        previewText: "Every missed call is a job someone else gets.",
        body: `Hi {{first_name}},\n\nQuick question — when a homeowner calls {{business_name}} and nobody picks up, where do they go next?\n\nThey call the next plumber on the list. And that plumber books the job.\n\nMost plumbing businesses lose 20–30% of their inbound calls every week. Missed calls from people who needed a plumber right now — people with a broken water heater at 7pm, a leak under the sink on a Saturday, a backed-up drain the night before a holiday.\n\nThose aren't just missed calls. They're missed revenue.\n\nWe built a platform specifically for plumbing businesses that handles inbound calls with an AI agent 24/7, automatically books appointments, captures every lead, and follows up until the job is booked — without you or your team having to do anything differently.\n\nIt also manages your Google reviews, tracks your SEO rankings, and builds the business profile you need to qualify for financing when you're ready to grow.\n\nOne platform. Everything you need to stop losing work.\n\n{{booking_link}}\n\nBest,\nThe Booked Ranked Fundable Team`,
        ctaText: "See how it works — get your free audit",
      },
      {
        id: "po-sms",
        stepNumber: 2,
        channel: "sms",
        delayLabel: "Day 1",
        delayHours: 24,
        body: "Hey {{first_name}} — sent you something about {{business_name}} — worth 30 seconds. Check your inbox.",
      },
      {
        id: "po-2",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 2",
        delayHours: 48,
        subject: "The plumbing companies winning on Google do this one thing",
        previewText: "It's not what most plumbers expect.",
        body: `{{first_name}},\n\nThere's a pattern among the plumbing businesses that dominate local search in most markets.\n\nThey have more reviews. More recent reviews. And they respond to every single one.\n\nGoogle's local ranking algorithm heavily weights review recency and response rate. A plumber with 47 reviews who responds consistently will outrank a plumber with 200 reviews who never responds — every time.\n\nThe problem is, asking for reviews feels awkward. Responding to every one takes time. And most plumbing business owners are too busy running jobs to manage their reputation actively.\n\nThat's exactly what our platform automates. Every completed job triggers a review request sequence. Every incoming review gets a drafted response you can approve in one click. Your reputation builds itself.\n\nThe plumbers using this see their Google ranking improve in 60–90 days. More calls. More booked jobs. Less chasing.\n\nWant to see how it works for {{business_name}}?\n\n{{booking_link}}`,
        ctaText: "Book a 15-minute demo",
      },
      {
        id: "po-3",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 4",
        delayHours: 96,
        subject: "What does it take to get a plumbing business fundable?",
        previewText:
          "Most plumbers are one job away from qualifying — but don't know it.",
        body: `{{first_name}},\n\nHere's something that surprises most plumbing business owners: the banks and lenders they need to grow their business aren't looking at how hard they work. They're looking at how their business is structured.\n\nBusiness credit score. Separate business banking. Legal entity setup. Online presence consistency. Revenue documentation.\n\nMost plumbers pass on 2 or 3 of those. But they fail on the others — not because their business isn't profitable, but because they've never been shown what a fundable business profile looks like.\n\nThe result: they can't get the equipment financing they need. They can't hire when they're overwhelmed. They can't buy out a competitor. They can't take the next step.\n\nOur platform includes a Fundability Builder that audits your business profile against the exact criteria lenders use, shows you exactly what's missing, and gives you a step-by-step roadmap to fix it.\n\nWe've seen plumbers go from a 38 fundability score to 79 in under 90 days — and use that to access $80K in unsecured business credit.\n\nWorth a conversation?\n\n{{booking_link}}`,
        ctaText: "Book a strategy call",
      },
      {
        id: "po-4",
        stepNumber: 5,
        channel: "email",
        delayLabel: "Day 7",
        delayHours: 168,
        subject: "{{first_name}}, your free growth audit is ready",
        previewText: "No charge. No sales call required. Just your results.",
        body: `{{first_name}},\n\nWe ran a quick audit on {{business_name}}'s online presence and there are a few things worth looking at.\n\nInstead of describing them in an email, I'd rather just show you — no charge, no sales pitch required.\n\nYou enter your website URL. We run the full audit: SEO score, Google review profile, website speed, citation consistency, fundability gap analysis. You get the results in about 60 seconds.\n\nIf you look at it and nothing interests you, no hard feelings. But most plumbing business owners are surprised by what they find — particularly on the fundability side.\n\nClaim your free audit here:\n{{booking_link}}\n\nTakes 60 seconds. No credit card.`,
        ctaText: "Claim your free growth audit",
      },
      {
        id: "po-5",
        stepNumber: 6,
        channel: "email",
        delayLabel: "Day 10",
        delayHours: 240,
        subject: "Last note from me, {{first_name}}",
        previewText: "No pressure. Just leaving the door open.",
        body: `{{first_name}},\n\nI've reached out a few times about {{business_name}} and I don't want to keep filling your inbox if the timing isn't right.\n\nSo this is my last note.\n\nIf you ever want to see what a fully automated front desk, reputation engine, and fundability roadmap looks like for a plumbing business — we're here.\n\nThe platform is built specifically for businesses like yours. And the free audit takes 60 seconds.\n\nIf the timing is ever right, here's where to start: {{booking_link}}\n\nWishing you a great season regardless.`,
        ctaText: "Start when you're ready",
      },
    ],
  },
  {
    id: "medspa-outreach",
    name: "Med Spa Outreach",
    niche: "Med Spa",
    objective: "Convert med spa and spa owners into platform clients",
    performance: {
      enrolled: 18,
      sent: 67,
      openRate: 34,
      clickRate: 14,
      replies: 6,
      conversions: 2,
    },
    steps: [
      {
        id: "ms-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Day 0",
        delayHours: 0,
        subject:
          "{{first_name}}, how many consultations did {{business_name}} lose last month?",
        previewText: "The number is probably higher than you think.",
        body: `Hi {{first_name}},\n\nMost med spas and aesthetic practices lose between $3,000 and $10,000 per month in missed consultations. Not from bad marketing — from the gap between someone showing interest and actually sitting in the chair.\n\nThey find you online. They fill out the form or send a DM. They don't hear back within the hour. They book somewhere else.\n\nOr they book the consultation and don't show up because nothing reinforced the decision between the time they said yes and the day of the appointment.\n\nThis isn't a sales problem. It's a follow-up automation problem.\n\nWe built a platform for aesthetic and wellness businesses that closes that gap automatically. AI-powered follow-up sequences that nurture new inquiries into booked consultations. No-show recovery campaigns. Post-visit rebooking automation. And a membership upsell engine that runs in the background without you managing it.\n\nEverything runs under your brand. Your clients never see the platform.\n\nWorth a look?\n\n{{booking_link}}`,
        ctaText: "See how it works",
      },
      {
        id: "ms-sms",
        stepNumber: 2,
        channel: "sms",
        delayLabel: "Day 1",
        delayHours: 24,
        body: "Hi {{first_name}} — sent you something about growing {{business_name}}. Quick read, promise.",
      },
      {
        id: "ms-2",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 2",
        delayHours: 48,
        subject:
          "The med spas growing fastest right now all have this in common",
        previewText:
          "It's not the services they offer or the prices they charge.",
        body: `{{first_name}},\n\nThe fastest-growing med spas in most markets aren't the ones with the best treatments or the lowest prices.\n\nThey're the ones that show up first when someone searches, have the most reviews, respond to those reviews publicly, and have a reputation that makes new clients feel safe before they ever walk in the door.\n\nIn the aesthetic industry, trust is the product. The treatment is almost secondary.\n\nThe practices that understand this invest in building their online reputation systematically — not posting on Instagram occasionally and hoping for the best, but running a structured, automated reputation engine that compounds over time.\n\nOur platform gives {{business_name}} that engine. Review automation, SEO monitoring, listing consistency, and an AI chat widget that captures leads from your website 24/7 — even when your front desk isn't available.\n\nI'd love to show you what it looks like for an aesthetic practice like yours.\n\n{{booking_link}}`,
        ctaText: "Book a 15-minute walkthrough",
      },
      {
        id: "ms-3",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 4",
        delayHours: 96,
        subject: "Could {{business_name}} qualify for growth capital?",
        previewText:
          "Most practices don't — but not for the reasons they think.",
        body: `{{first_name}},\n\nHere's something most aesthetic practice owners don't realize until they need it: qualifying for business financing has almost nothing to do with how profitable your practice is.\n\nIt has to do with how your business is structured. Business credit profile. Legal entity setup. Banking relationships. Online presence consistency. Revenue documentation patterns.\n\nMost med spas and wellness businesses score well on revenue but poorly on business structure — which means when they want to expand their space, add equipment, or hire another injector, the financing options available to them are limited and expensive.\n\nOur platform includes a Fundability Builder that audits your practice against the exact criteria lenders use. It shows you precisely what's holding your score down and gives you a clear roadmap to fix it — before you ever need the capital.\n\nWorth knowing where {{business_name}} stands?\n\n{{booking_link}}`,
        ctaText: "Book a strategy call",
      },
      {
        id: "ms-4",
        stepNumber: 5,
        channel: "email",
        delayLabel: "Day 7",
        delayHours: 168,
        subject: "Your free spa growth audit — no strings",
        previewText: "60 seconds. No credit card. Just your results.",
        body: `{{first_name}},\n\nSimple offer: enter {{business_name}}'s website URL and we'll run a full growth audit — SEO score, review profile health, website performance, citation consistency, and a fundability gap analysis.\n\nYou get the full results in about 60 seconds. No charge. No sales call required. No credit card.\n\nIf you look at the results and nothing surprises you, we haven't wasted each other's time. But most practice owners find at least one or two things worth addressing.\n\nClaim your free audit here:\n{{booking_link}}`,
        ctaText: "Run your free audit",
      },
      {
        id: "ms-5",
        stepNumber: 6,
        channel: "email",
        delayLabel: "Day 10",
        delayHours: 240,
        subject: "Closing the loop, {{first_name}}",
        previewText: "No pressure — just wanted to leave the door open.",
        body: `{{first_name}},\n\nI've sent a few notes about {{business_name}} and I don't want to keep showing up in your inbox if the timing isn't right.\n\nSo this is my last one.\n\nIf you ever want to see what a fully automated client acquisition, reputation, and fundability system looks like for an aesthetic practice — we'd be glad to show you.\n\nAnd the free audit is always available when you're ready: {{booking_link}}\n\nBest of luck with the practice. Hope to connect when the time is right.`,
        ctaText: "Reach out when ready",
      },
    ],
  },
];

export const PLUMBING_CAMPAIGNS: ClientCampaign[] = [
  {
    id: "plumb-missed-call",
    name: "Missed Call Rescue",
    niche: "Plumbing",
    objective: "Recover missed inbound leads before they call a competitor",
    trigger: "Lead enters Missed Call stage",
    triggerStage: "Missed Call",
    exitRules: [
      "Lead replies to any message",
      "Lead books an appointment",
      "Lead is marked as Lost",
    ],
    kpiTargets: { openRate: "40%+", clickRate: "15%+", conversionRate: "20%+" },
    mockMetrics: { contactsInSequence: 12, openRate: 43, conversionRate: 22 },
    steps: [
      {
        id: "mc-1",
        stepNumber: 1,
        channel: "sms",
        delayLabel: "Immediately",
        delayHours: 0,
        body: "Hey {{first_name}} — we just missed your call at {{business_name}}. We don't want to leave you without help. Reply here or call us back at {{phone_number}} — we'll pick up. What's going on with your plumbing?",
      },
      {
        id: "mc-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "10 minutes",
        delayHours: 0.17,
        subject: "We missed your call — still need help?",
        previewText: "We're here when you're ready.",
        body: `Hi {{first_name}},\n\nWe saw we just missed your call and we don't want to leave you in a tough spot.\n\nIf you're dealing with a plumbing issue — leak, blockage, water heater, anything — we're available and we can usually get someone out the same day.\n\nGive us a call back at {{phone_number}} or just reply to this email with what's going on. No pressure, no commitment — just let us know how we can help.\n\n— The {{business_name}} Team`,
        ctaText: "Call us back",
      },
      {
        id: "mc-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Next morning",
        delayHours: 16,
        subject: "{{first_name}}, still looking for a plumber?",
        previewText: "We're still here if you need us.",
        body: `Hi {{first_name}},\n\nWe tried reaching you yesterday after we missed your call. Wanted to follow up in case you're still looking for help with your plumbing.\n\nWe've been serving {{location}} homeowners for years and our customers consistently tell us we show up when we say we will, do clean work, and price fairly.\n\nIf you're still sorting this out, give us a call at {{phone_number}} or reply here. We'd love to help.\n\n— {{business_name}}`,
        ctaText: "Book now",
      },
      {
        id: "mc-4",
        stepNumber: 4,
        channel: "task",
        delayLabel: "Day 2",
        delayHours: 48,
        body: "Call {{first_name}} back — missed call with no response to SMS or email. Check CRM for notes before calling.",
        isInternal: true,
      },
    ],
  },
  {
    id: "plumb-estimate-recovery",
    name: "Estimate Recovery",
    niche: "Plumbing",
    objective: "Convert estimates into booked jobs",
    trigger: "Lead in Estimate Sent for 24+ hours with no booking",
    triggerStage: "Estimate Sent",
    exitRules: ["Lead books an appointment", "Lead declines the estimate"],
    kpiTargets: { openRate: "35%+", clickRate: "12%+", conversionRate: "25%+" },
    mockMetrics: { contactsInSequence: 8, openRate: 38, conversionRate: 28 },
    steps: [
      {
        id: "er-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Day 1",
        delayHours: 24,
        subject: "{{first_name}}, any questions about your estimate?",
        previewText: "We're happy to walk you through it.",
        body: `Hi {{first_name}},\n\nJust checking in on the estimate we sent over for {{service_type}}.\n\nIf you have any questions about the scope, the pricing, or how we'd approach the job — I'm happy to walk you through it.\n\nGive me a call at {{phone_number}} or just reply here.\n\n— {{business_name}}`,
        ctaText: "Reply with your questions",
      },
      {
        id: "er-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "Day 3",
        delayHours: 72,
        subject: "Here's what other {{location}} homeowners say about us",
        previewText: "A few words from people we've helped recently.",
        body: `{{first_name}},\n\nWhile you're thinking over the estimate, I wanted to share a few things recent customers have said:\n\n"Showed up on time, explained everything clearly, and the price matched the quote exactly." — Sarah T., {{location}}\n\n"Had a pipe burst on a Sunday. They were there within 2 hours. Saved our floors." — Mike D., {{location}}\n\n"Used three different plumbers over the years. These guys are the only ones I call now." — James R., {{location}}\n\nIf the estimate looks good and you're ready to move forward, here's the link to book: {{booking_link}}\n\n— {{business_name}}`,
        ctaText: "Book your appointment",
      },
      {
        id: "er-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 5",
        delayHours: 120,
        subject: "Still thinking it over? Here's what people usually ask us",
        previewText: "Common questions — answered honestly.",
        body: `{{first_name}},\n\nStill weighing the estimate? Here are the questions we get most often:\n\n"Can you do it for less?" Our pricing reflects the cost of doing the job right — quality parts, licensed technicians, and a warranty on the work.\n\n"How long will it take?" We'll give you a realistic timeframe before we start and keep you updated throughout.\n\n"What if something goes wrong after?" All our work is warranted. If anything isn't right, we come back and make it right.\n\nIf there's something specific holding you back, just reply and ask.\n\n{{booking_link}}\n\n— {{business_name}}`,
        ctaText: "Ask a question or book now",
      },
      {
        id: "er-4",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 7",
        delayHours: 168,
        subject: "{{first_name}}, this is my last follow-up on your estimate",
        previewText: "No pressure — just wanted to close the loop.",
        body: `{{first_name}},\n\nI've followed up a few times on your estimate for {{service_type}} and I don't want to keep sending emails if the timing isn't right.\n\nSo this is my last note on it.\n\nIf you decide to move forward — now or later — the estimate is still valid and we'd be glad to help. Just reply here or call {{phone_number}}.\n\n— {{business_name}}`,
        ctaText: "Book when you're ready",
      },
    ],
  },
  {
    id: "plumb-review-referral",
    name: "Completed Job Review + Referral",
    niche: "Plumbing",
    objective: "Generate reviews and referrals after completed jobs",
    trigger: "Job marked as complete",
    triggerStage: "Completed Job",
    exitRules: [
      "Review submitted",
      "Negative feedback received (triggers service recovery)",
    ],
    kpiTargets: {
      openRate: "55%+",
      clickRate: "20%+",
      conversionRate: "30% review rate",
    },
    mockMetrics: { contactsInSequence: 19, openRate: 58, conversionRate: 34 },
    steps: [
      {
        id: "rr-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Immediately",
        delayHours: 0,
        subject: "Thank you, {{first_name}} — how did we do?",
        previewText: "We'd love to hear from you.",
        body: `Hi {{first_name}},\n\nThank you for choosing {{business_name}}. We hope the job went smoothly and everything is working the way it should.\n\nQuick question: how would you rate your experience with us today?\n\nIf you're happy with the work, we'd really appreciate a quick Google review — it helps other homeowners in {{location}} find us when they need help.\n\nIf anything wasn't perfect, just reply to this email and let us know. We'll make it right.\n\nThank you again.\n— The {{business_name}} Team`,
        ctaText: "Leave a Google review",
      },
      {
        id: "rr-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "Day 2",
        delayHours: 48,
        subject: "{{first_name}}, would you share your experience?",
        previewText: "Takes less than 2 minutes.",
        body: `Hi {{first_name}},\n\nFollowing up on the job we completed for you. We hope everything is still working great.\n\nIf you had a good experience, we'd be really grateful if you'd take 2 minutes to leave us a review on Google. It makes a real difference for our business and helps other {{location}} homeowners find a plumber they can trust.\n\nHere's the direct link: {{booking_link}}\n\n— {{business_name}}`,
        ctaText: "Leave your review",
      },
      {
        id: "rr-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 7",
        delayHours: 168,
        subject: "Know anyone else who needs a plumber?",
        previewText: "We appreciate referrals more than you know.",
        body: `Hi {{first_name}},\n\nHope things are still running smoothly at your place.\n\nIf you know a neighbor, friend, or family member who needs a reliable plumber — we'd really appreciate the introduction. And as a thank-you, we offer a referral credit toward your next service call.\n\nJust have them mention your name when they call.\n\nThanks again for choosing {{business_name}}.\n— The Team`,
        ctaText: "Refer a neighbor",
      },
      {
        id: "rr-4",
        stepNumber: 4,
        channel: "task",
        delayLabel: "After Step 1",
        delayHours: 1,
        body: "Review Step 1 response — if customer indicated dissatisfaction, initiate service recovery protocol immediately. Flag for manager review.",
        isInternal: true,
      },
    ],
  },
];

export const MED_SPA_CAMPAIGNS: ClientCampaign[] = [
  {
    id: "spa-consult-nurture",
    name: "Consultation Booking Nurture",
    niche: "Med Spa",
    objective: "Convert new inquiries into booked consultations",
    trigger: "Lead enters Consultation Requested stage",
    triggerStage: "Consultation Requested",
    exitRules: ["Consultation booked", "Lead opts out"],
    kpiTargets: { openRate: "45%+", clickRate: "18%+", conversionRate: "30%+" },
    mockMetrics: { contactsInSequence: 14, openRate: 47, conversionRate: 31 },
    steps: [
      {
        id: "cn-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Immediately",
        delayHours: 0,
        subject: "Welcome to {{business_name}} — here's what to expect",
        previewText: "We're so glad you reached out.",
        body: `Hi {{first_name}},\n\nThank you for reaching out to {{business_name}}. We're looking forward to connecting with you.\n\nHere's what your consultation looks like: it's a private, no-pressure conversation where we take time to understand your goals and walk you through the treatments that are right for you — not just what's popular or what we have available.\n\nNo commitment required. No pressure. Just a clear, honest conversation with a practitioner who genuinely wants to help you get the results you're looking for.\n\nWe'll follow up shortly to confirm your preferred time. In the meantime, if you have any questions, just reply to this email.\n\nTalk soon,\nThe {{business_name}} Team`,
        ctaText: "Book your consultation",
      },
      {
        id: "cn-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "4 hours",
        delayHours: 4,
        subject: "Why clients choose {{business_name}} for their treatment",
        previewText:
          "Before your first visit, we want you to feel completely confident.",
        body: `{{first_name}},\n\nBefore your consultation, we want to share a bit about who we are and how we work.\n\n{{business_name}} was built on one principle: your results matter more than anything else. We don't rush consultations. We don't push treatments that aren't right for you. And we never sacrifice safety for speed.\n\nOur practitioners stay current on the latest techniques and protocols — not because it sounds good in marketing, but because our clients deserve care that's actually state-of-the-art.\n\nWe've helped hundreds of clients in {{location}} achieve results they're genuinely proud of. Many have been coming back for years.\n\nWe're looking forward to meeting you.\n— {{business_name}}`,
        ctaText: "Confirm your consultation",
      },
      {
        id: "cn-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 2",
        delayHours: 48,
        subject: "Answers to the questions we hear most",
        previewText: "Before your consultation — a few things worth knowing.",
        body: `{{first_name}},\n\nAs your consultation approaches, here are answers to the questions we hear most often from new clients:\n\n"How do I know if I'm a good candidate?" That's exactly what the consultation is for. We'll assess your goals and give you an honest recommendation.\n\n"What does it cost?" We'll go over all pricing during the consultation with no surprises. We also offer flexible payment options.\n\n"Is there downtime?" Depends on the treatment. We'll walk you through exactly what to expect.\n\n"How long before I see results?" We'll set realistic expectations based on the specific treatment and your goals.\n\nAny other questions? Just reply — we're happy to answer anything before you come in.\n\nSee you soon,\n{{business_name}}`,
        ctaText: "Book your spot",
      },
      {
        id: "cn-4",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 4",
        delayHours: 96,
        subject: "Real results from real clients at {{business_name}}",
        previewText: "The proof is in the people.",
        body: `{{first_name}},\n\nWe know that choosing where to go for aesthetic treatments is a personal decision. Trust matters more than anything.\n\nHere's what some of our clients in {{location}} have shared:\n\n"I was nervous going in. The team made me feel completely comfortable, explained every step, and the results were beyond what I hoped for." — Rachel M.\n\n"I've tried other places. {{business_name}} is the only one where I felt like they actually listened to what I wanted." — Dana K.\n\n"Three years of coming here. The consistency in results is what keeps me coming back." — Jennifer S.\n\nWe'd love to add your name to that list.\n\nYour consultation spot is still available: {{booking_link}}\n\n— The {{business_name}} Team`,
        ctaText: "Book now",
      },
      {
        id: "cn-5",
        stepNumber: 5,
        channel: "email",
        delayLabel: "Day 6",
        delayHours: 144,
        subject: "{{first_name}}, your consultation spot is still available",
        previewText: "We'd love to hold it for you.",
        body: `{{first_name}},\n\nYour consultation spot is still available — and once it's gone, our next availability may be a few weeks out.\n\nIf you're ready to take the next step, here's your booking link: {{booking_link}}\n\nIf you have any hesitation or questions, please just reply. We'd rather answer them than lose you to uncertainty.\n\nLooking forward to meeting you,\n{{business_name}}`,
        ctaText: "Book your consultation",
      },
    ],
  },
  {
    id: "spa-noshow-recovery",
    name: "No-Show / Canceled Consult Recovery",
    niche: "Med Spa",
    objective: "Re-engage and rebook missed consultations",
    trigger: "Lead enters No-Show stage",
    triggerStage: "No-Show",
    exitRules: ["Consultation rebooked", "Lead opts out after 2nd contact"],
    kpiTargets: { openRate: "38%+", clickRate: "14%+", conversionRate: "20%+" },
    mockMetrics: { contactsInSequence: 7, openRate: 41, conversionRate: 21 },
    steps: [
      {
        id: "ns-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Same day",
        delayHours: 2,
        subject: "We missed you today, {{first_name}}",
        previewText: "No worries — life happens.",
        body: `Hi {{first_name}},\n\nWe noticed you weren't able to make it in today for your consultation. No worries at all — we know schedules change.\n\nWhenever you're ready, we'd love to get you rescheduled. It only takes a moment:\n\n{{booking_link}}\n\nIf something came up or you have any questions, feel free to reply. We're here.\n\n— {{business_name}}`,
        ctaText: "Reschedule your consultation",
      },
      {
        id: "ns-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "Next day",
        delayHours: 24,
        subject: "{{first_name}}, your appointment slot is still open",
        previewText: "We'd love to hold it for you.",
        body: `{{first_name}},\n\nJust wanted to follow up — we still have availability and would love to get you in for your consultation.\n\nBooking takes less than a minute: {{booking_link}}\n\nIf the timing doesn't work right now, that's completely fine. Just reach out when you're ready.\n\n— The {{business_name}} Team`,
        ctaText: "Book your new time",
      },
      {
        id: "ns-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 3",
        delayHours: 72,
        subject: "What our clients say before their first visit (and after)",
        previewText:
          "Sometimes all it takes is hearing from someone who's been there.",
        body: `{{first_name}},\n\nWe know the first visit can feel like a big step. We hear that from clients all the time.\n\nHere's what they say on the other side of it:\n\n"I kept putting it off for almost a year. I wish I'd done it sooner." — Melissa T.\n\n"I was intimidated walking in. I left feeling seen and genuinely excited." — Carla M.\n\nThe consultation is just a conversation. No obligation. No pressure.\n\nWhenever you're ready: {{booking_link}}\n\n— {{business_name}}`,
        ctaText: "I'm ready to reschedule",
      },
      {
        id: "ns-4",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 5",
        delayHours: 120,
        subject: "Last chance to reschedule, {{first_name}}",
        previewText: "No pressure — just leaving the door open.",
        body: `{{first_name}},\n\nThis will be my last follow-up on your consultation.\n\nIf now isn't the right time, that's completely okay. We'd love to have you in whenever the timing works — just reach out and we'll make it happen.\n\nIf you'd like to reschedule now, here's the link: {{booking_link}}\n\nWishing you well,\n{{business_name}}`,
        ctaText: "Reschedule now",
      },
    ],
  },
  {
    id: "spa-rebook-membership",
    name: "Post-Visit Rebook / Membership Upsell",
    niche: "Med Spa",
    objective:
      "Drive rebooking and membership enrollment after completed visits",
    trigger: "Appointment marked as complete",
    triggerStage: "Appointment Completed",
    exitRules: [
      "Client rebooks",
      "Client enrolls in membership",
      "Client opts out",
    ],
    kpiTargets: {
      openRate: "52%+",
      clickRate: "22%+",
      conversionRate: "35% rebook rate",
    },
    mockMetrics: { contactsInSequence: 23, openRate: 54, conversionRate: 37 },
    steps: [
      {
        id: "rm-1",
        stepNumber: 1,
        channel: "email",
        delayLabel: "Immediately",
        delayHours: 0,
        subject: "Thank you for visiting {{business_name}}, {{first_name}}",
        previewText: "We hope you're already feeling the difference.",
        body: `Hi {{first_name}},\n\nThank you for choosing {{business_name}} for your {{service_type}} today. It was a pleasure having you in.\n\nWe hope you're already feeling — or seeing — the beginning of great results.\n\nOver the next day or two, we'll send you a few aftercare tips to help you get the most out of your treatment. In the meantime, if you have any questions or notice anything unexpected, please don't hesitate to reach out.\n\nWe're always here.\n— The {{business_name}} Team`,
        ctaText: "Contact us with questions",
      },
      {
        id: "rm-2",
        stepNumber: 2,
        channel: "email",
        delayLabel: "Day 3",
        delayHours: 72,
        subject: "Aftercare tips to extend your results",
        previewText: "A little care goes a long way.",
        body: `{{first_name}},\n\nFollowing up with a few aftercare reminders:\n\n• Stay hydrated — especially in the first 48–72 hours\n• Avoid direct sun exposure and use SPF daily\n• Don't touch or massage the treated area unless instructed\n• Avoid strenuous exercise for 24 hours if advised\n• Follow any specific instructions your practitioner gave you\n\nIf you have any questions, reach out immediately — we're always available.\n\nSee you for your next visit,\n{{business_name}}`,
        ctaText: "Book your follow-up",
      },
      {
        id: "rm-3",
        stepNumber: 3,
        channel: "email",
        delayLabel: "Day 14",
        delayHours: 336,
        subject: "{{first_name}}, it's almost time for your next visit",
        previewText: "Maintaining your results matters.",
        body: `{{first_name}},\n\nBased on your recent treatment, this is around the time most clients start thinking about their next visit to maintain and build on their results.\n\nWe'd love to get you scheduled before our calendar fills up.\n\nYour booking link: {{booking_link}}\n\nLooking forward to seeing you again,\n{{business_name}}`,
        ctaText: "Book your next appointment",
      },
      {
        id: "rm-4",
        stepNumber: 4,
        channel: "email",
        delayLabel: "Day 21",
        delayHours: 504,
        subject: "Have you considered a membership at {{business_name}}?",
        previewText: "Clients who join save an average of 20% per year.",
        body: `{{first_name}},\n\nMany of our regular clients have moved to a membership plan — and they consistently tell us it's one of the better decisions they've made.\n\nHere's why it works:\n\n• Priority booking — members get first access to our schedule\n• Exclusive pricing — members save 15–25% on every service\n• Monthly credits — use them on any treatment you choose\n• Loyalty perks — additional benefits that add up over the year\n\nIf you're coming in regularly anyway — or if you'd like to — a membership just makes financial sense.\n\nReply to this email or mention it at your next visit and we'll walk you through the options.\n\n— {{business_name}}`,
        ctaText: "Tell me about membership",
      },
      {
        id: "rm-5",
        stepNumber: 5,
        channel: "email",
        delayLabel: "Day 30",
        delayHours: 720,
        subject: "{{first_name}}, we'd love to see you again",
        previewText: "Your next visit is waiting.",
        body: `{{first_name}},\n\nIt's been a little while since your last visit and we've been thinking about you.\n\nWhether you're ready to rebook your regular treatment, curious about something new, or just want to come in for a consultation — we're here and we'd love to see you.\n\nBook at your convenience: {{booking_link}}\n\nSee you soon,\n{{business_name}}`,
        ctaText: "Book your visit",
      },
    ],
  },
];

export const ALL_CLIENT_CAMPAIGNS: ClientCampaign[] = [
  ...PLUMBING_CAMPAIGNS,
  ...MED_SPA_CAMPAIGNS,
];

export const PERSONALIZATION_TOKENS = [
  "{{first_name}}",
  "{{last_name}}",
  "{{business_name}}",
  "{{phone_number}}",
  "{{booking_link}}",
  "{{service_type}}",
  "{{appointment_date}}",
  "{{estimate_amount}}",
  "{{location}}",
];
