export interface NicheEngine {
  headline: string;
  description: string;
}

export interface NicheStep {
  title: string;
  description: string;
}

export interface NicheFAQ {
  question: string;
  answer: string;
}

export interface NicheSEO {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
}

export interface NicheData {
  key: string;
  name: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroBullets: string[];
  painPoints: { title: string; description: string }[];
  engines: {
    booked: NicheEngine;
    ranked: NicheEngine;
    fundable: NicheEngine;
  };
  howItWorks: NicheStep[];
  auditHeadline: string;
  auditSubcopy: string;
  faqs: NicheFAQ[];
  finalCTAHeadline: string;
  finalCTASubtext: string;
  seo: NicheSEO;
  imagineLines: string[];
  icon: string;
  tagline: string;
}

const niches: Record<string, NicheData> = {
  plumbing: {
    key: "plumbing",
    name: "Plumbing",
    heroHeadline:
      "Stop Losing Emergency Calls to Competitors Who Show Up First on Google",
    heroSubheadline:
      "More booked calls, stronger local rankings, and a business built for funding — one system for plumbers who want to grow.",
    heroBullets: [
      "Capture after-hours and emergency leads automatically",
      "Rank above competitors on Google Maps",
      "Build 5-star trust that closes jobs on the first call",
      "Set up your business to qualify for growth capital",
    ],
    painPoints: [
      {
        title: "Missed Emergency Calls",
        description:
          "Every missed call after hours is a job going to a competitor. Customers with burst pipes don't wait — they call the next plumber.",
      },
      {
        title: "Weak Google Maps Presence",
        description:
          "If you're not in the top 3 on the Google Map Pack, you're invisible to the customers most likely to hire right now.",
      },
      {
        title: "Review Trust Gap",
        description:
          "Customers compare reviews before calling. A thin or inconsistent review profile loses jobs before you even pick up the phone.",
      },
      {
        title: "Slow Speed-to-Lead",
        description:
          "The first plumber to respond usually gets the job. If your follow-up is slow, you're handing jobs to faster competitors.",
      },
      {
        title: "No Clear Path to Funding",
        description:
          "Trucks, tools, and expansion cost money. Without a fundable business profile, you're locked out of the capital that could 2-3x your capacity.",
      },
    ],
    engines: {
      booked: {
        headline: "Capture More Calls — Including After Hours",
        description:
          "Our AI front desk captures every inquiry 24/7, responds instantly, and routes jobs into your pipeline — so you never lose a lead to voicemail again.",
      },
      ranked: {
        headline: "Win More Local Search When It Matters Most",
        description:
          "We audit your Google presence, monitor your reviews, and fix the visibility gaps that are costing you emergency calls right now.",
      },
      fundable: {
        headline: "Build a Business That Banks Will Fund",
        description:
          "Get a clear fundability roadmap so your plumbing business is ready for trucks, equipment, and expansion capital when you need it.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free Plumbing Growth Audit",
        description:
          "We analyze your website, Google Maps presence, reviews, and visibility gaps in under 60 seconds. You'll see exactly where calls are being lost.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on your AI booking assistant, reputation system, and fundability builder — configured specifically for plumbing businesses like yours.",
      },
      {
        title: "Watch More Jobs Come In",
        description:
          "More emergency calls captured, stronger Google rankings, and a business profile built for long-term funding and growth.",
      },
    ],
    auditHeadline:
      "Find Out What's Costing Your Plumbing Business Jobs Right Now",
    auditSubcopy:
      "Get a free audit of your website, Google presence, reviews, and local visibility. No signup, no credit card.",
    faqs: [
      {
        question: "Will this help me capture after-hours emergency calls?",
        answer:
          "Yes. The AI front desk responds to every inquiry 24/7 — including nights, weekends, and holidays — so you're never sending emergency leads to voicemail.",
      },
      {
        question: "How long before I start seeing more calls?",
        answer:
          "Most plumbing businesses see measurable improvement in lead capture within the first 30-60 days after activating the system. SEO improvements build over time.",
      },
      {
        question: "Does this replace my current marketing company?",
        answer:
          "It can complement existing marketing or stand on its own. The platform handles booking, reputation, local SEO, and fundability — areas most marketing companies don't fully cover.",
      },
      {
        question: "How does the fundability piece work?",
        answer:
          "We assess your business credit profile and give you a clear roadmap to qualify for equipment loans, business lines of credit, and growth capital at better rates.",
      },
      {
        question: "Do I need a new website?",
        answer:
          "No. The system works alongside your existing website. We'll identify what's hurting your rankings and fix it without rebuilding everything from scratch.",
      },
      {
        question: "Can I use this with my current CRM?",
        answer:
          "Yes. The platform integrates with most popular CRMs. If you're not using one, the built-in lead pipeline handles everything you need.",
      },
    ],
    finalCTAHeadline: "Ready to Stop Losing Emergency Calls to Competitors?",
    finalCTASubtext:
      "Get your free plumbing growth audit today. See exactly where calls are being lost and what it would take to fix it.",
    seo: {
      title:
        "Plumbing Growth Platform | More Calls, Better Rankings, Stronger Fundability",
      description:
        "Help your plumbing business capture more calls, improve Google visibility, strengthen reviews, and build a more fundable company.",
      ogTitle: "Plumbing Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Stop losing emergency calls to competitors. More bookings, better Google rankings, and a business built for funding.",
    },
    icon: "🔧",
    tagline: "Stop losing emergency calls to faster competitors.",
    imagineLines: [
      "your phone answered at 2am when the pipe bursts — every caller booked, no voicemail.",
      "every satisfied customer automatically asked for a review the moment the job is done.",
      "your Google Maps ranking climbing while you focus on the work.",
      "having the capital ready to add a second truck when the time is right.",
    ],
  },

  restoration: {
    key: "restoration",
    name: "Restoration",
    heroHeadline:
      "Capture High-Ticket Restoration Jobs Before Your Competitors Even Answer the Phone",
    heroSubheadline:
      "In water damage and restoration, the first company to respond wins the job. We make sure that company is yours.",
    heroBullets: [
      "Respond to emergency inquiries faster than any competitor",
      "Win high-ticket jobs with instant, credible follow-up",
      "Build the review trust that converts stressed homeowners",
      "Position your business for growth capital when you need crews and equipment",
    ],
    painPoints: [
      {
        title: "Speed-to-Lead in Crisis Situations",
        description:
          "A flooded basement doesn't wait. Homeowners call and hire the first company that responds. If you're not instant, you lose a $10K+ job to someone faster.",
      },
      {
        title: "High-Ticket Job Capture",
        description:
          "Restoration jobs are high-value but high-competition. Without strong local visibility and instant response, you're leaving five-figure jobs on the table.",
      },
      {
        title: "Reputation Under Pressure",
        description:
          "Customers in an emergency check reviews fast. A thin or mixed review profile pushes them to a competitor — even if your work is better.",
      },
      {
        title: "Review Sensitivity",
        description:
          "One unhappy customer can damage your reputation for months. Without a system to manage feedback, negative reviews pile up and erode trust.",
      },
      {
        title: "Scaling Crews and Equipment",
        description:
          "Storm season demand spikes require more crews and equipment fast. Without a fundable business profile, you can't move quickly enough to capitalize.",
      },
    ],
    engines: {
      booked: {
        headline: "Respond to Every Emergency Inquiry Instantly",
        description:
          "Our AI front desk captures restoration inquiries 24/7 and responds within seconds — so you're always the first company a stressed homeowner hears back from.",
      },
      ranked: {
        headline: "Win the Local Search That Happens at 2am",
        description:
          "Water damage doesn't happen on a schedule. We optimize your local visibility so you rank when emergencies happen — not just during business hours.",
      },
      fundable: {
        headline: "Scale Crews and Equipment When Demand Spikes",
        description:
          "Build a fundable business profile so you can access capital fast when storm season hits and you need to scale up overnight.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free Restoration Growth Audit",
        description:
          "We analyze your local visibility, review profile, and response speed gaps. You'll see exactly which emergency jobs you're losing and why.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on 24/7 emergency lead capture, reputation management, and your fundability builder — configured for restoration businesses.",
      },
      {
        title: "Capture More High-Ticket Jobs",
        description:
          "Faster response, stronger reviews, better local rankings, and a business built to scale when the big jobs come in.",
      },
    ],
    auditHeadline:
      "Find Out Which Emergency Jobs Your Restoration Company Is Missing",
    auditSubcopy:
      "Get a free audit of your response speed, local visibility, review trust, and fundability score. No signup required.",
    faqs: [
      {
        question:
          "Can this help restoration companies capture emergency leads faster?",
        answer:
          "Yes. The AI front desk responds to every inquiry within seconds, 24/7 — including storm events and after-hours emergencies when most companies are unreachable.",
      },
      {
        question:
          "How does the review management work for sensitive situations?",
        answer:
          "Unhappy customers are routed to a private feedback form before they ever see a review link. Staff are alerted so they can resolve issues before a negative review goes public.",
      },
      {
        question: "Will this work if I'm already using a marketing company?",
        answer:
          "Yes. The platform handles lead capture, reputation, local SEO, and fundability — areas most marketing agencies don't fully address.",
      },
      {
        question:
          "How does the fundability piece work for restoration companies?",
        answer:
          "We assess your business credit profile and provide a roadmap to qualify for equipment financing and business credit lines — so you can scale fast when demand spikes.",
      },
      {
        question: "Do I need to change my existing website?",
        answer:
          "No. The system works with your existing website and enhances it without requiring a full rebuild.",
      },
      {
        question:
          "Can this integrate with our current job management software?",
        answer:
          "Yes. The platform connects with most popular field service and CRM tools so leads flow directly into your existing workflow.",
      },
    ],
    finalCTAHeadline:
      "Ready to Be the First Restoration Company That Shows Up and Responds?",
    finalCTASubtext:
      "Get your free restoration growth audit today. See which emergency jobs you're losing and what it takes to win more of them.",
    seo: {
      title:
        "Restoration Growth Platform | Capture Emergency Leads & Build Trust",
      description:
        "Help your restoration company capture more emergency leads, improve online trust, and strengthen your business foundation for growth.",
      ogTitle: "Restoration Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Capture high-ticket water damage jobs faster. Better response, stronger reviews, built for scaling.",
    },
    icon: "💧",
    tagline: "Win high-ticket jobs before competitors even answer.",
    imagineLines: [
      "every emergency inquiry responded to in seconds — before any competitor even sees the notification.",
      "high-ticket water damage jobs captured automatically, 24/7.",
      "your review profile building trust while you focus on restoring homes.",
      "the funding in place to scale your crew when storm season hits.",
    ],
  },

  hvac: {
    key: "hvac",
    name: "HVAC",
    heroHeadline:
      "Never Miss a Call During Peak Season Again — More Jobs, Better Rankings, Stronger Business",
    heroSubheadline:
      "When your phone should be ringing off the hook in July and January, make sure every call turns into a booked job.",
    heroBullets: [
      "Capture every call during seasonal demand spikes",
      "Rank higher on Google when homeowners search for HVAC help",
      "Convert more leads into maintenance plan customers",
      "Build a fundable business ready for equipment and growth capital",
    ],
    painPoints: [
      {
        title: "Seasonal Demand Spikes You Can't Keep Up With",
        description:
          "Summer heat waves and winter freezes drive surges in calls. If your systems can't handle the volume, those jobs go to the competitor who can.",
      },
      {
        title: "Missed Emergency Same-Day Calls",
        description:
          "An AC down in August is an emergency. If you're not first to respond, a homeowner calls someone else — and those jobs rarely come back to you.",
      },
      {
        title: "Low Maintenance Plan Conversions",
        description:
          "Maintenance plans are your most profitable recurring revenue, but converting one-time customers into plan holders requires a consistent follow-up system most HVAC companies don't have.",
      },
      {
        title: "Weak Local Rankings During Peak Demand",
        description:
          "If you're not in the top results when someone searches 'HVAC repair near me' in the middle of summer, you're handing peak-season jobs to your competitors.",
      },
      {
        title: "No Plan for Equipment and Growth Funding",
        description:
          "New equipment, more technicians, and fleet expansion all require capital. Without a fundable business profile, you can't access what you need to scale.",
      },
    ],
    engines: {
      booked: {
        headline: "Capture Every Call — Even During Your Busiest Days",
        description:
          "Our AI front desk handles overflow during peak season, books emergency appointments, and follows up with maintenance plan offers — automatically.",
      },
      ranked: {
        headline: "Own the Local Search When Homeowners Need You Most",
        description:
          "We optimize your Google Maps presence and local SEO so you rank at the top during the exact moments homeowners are searching for HVAC help.",
      },
      fundable: {
        headline: "Get Ready for Equipment and Expansion Capital",
        description:
          "Build a fundable business profile so you can finance new equipment, add technicians, and expand your service area with confidence.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free HVAC Growth Audit",
        description:
          "We analyze your online visibility, review profile, and response gaps. You'll see exactly where peak-season calls are being lost.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on your 24/7 booking system, reputation management, and fundability builder — designed for HVAC companies that want to grow.",
      },
      {
        title: "Grow Your Revenue Year-Round",
        description:
          "More booked jobs, more maintenance plan conversions, stronger local rankings, and a business profile built for capital access.",
      },
    ],
    auditHeadline:
      "See What's Costing Your HVAC Business Calls During Peak Season",
    auditSubcopy:
      "Get a free audit of your local rankings, review presence, and lead capture system. No signup, no credit card.",
    faqs: [
      {
        question: "Will this help with after-hours emergency HVAC calls?",
        answer:
          "Yes. The AI front desk responds to every inquiry 24/7 — including weekend emergencies and peak-season overflow — so you never send a hot homeowner to voicemail.",
      },
      {
        question:
          "Can this help us convert more customers to maintenance plans?",
        answer:
          "Yes. The follow-up system is designed to automatically offer maintenance plans after completed jobs and keep your business top-of-mind for seasonal tune-ups.",
      },
      {
        question: "How quickly can we get ranked higher locally?",
        answer:
          "Local SEO improvements are ongoing, but most businesses see meaningful visibility improvements within 60-90 days of activating the system.",
      },
      {
        question: "Does this replace our current marketing?",
        answer:
          "It complements most marketing strategies. We handle the parts most agencies don't — booking systems, reputation management, and fundability.",
      },
      {
        question: "How does funding readiness work?",
        answer:
          "We score your business on the key factors lenders look at and give you a specific roadmap to qualify for equipment financing and business credit.",
      },
      {
        question: "Can we use this if we're already using a CRM?",
        answer:
          "Yes. The platform integrates with most CRM systems or works as a standalone lead management tool if you prefer to consolidate.",
      },
    ],
    finalCTAHeadline: "Ready to Capture Every Call This Peak Season?",
    finalCTASubtext:
      "Get your free HVAC growth audit today. We'll show you exactly what's costing you calls and how to fix it before the next seasonal rush.",
    seo: {
      title:
        "HVAC Growth Platform | More Calls During Peak Season, Better Rankings",
      description:
        "Help your HVAC business capture more calls during peak season, rank higher locally, convert more maintenance plans, and build funding readiness.",
      ogTitle: "HVAC Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Never miss a peak-season call again. More bookings, stronger Google rankings, built for HVAC growth.",
    },
    icon: "❄️",
    tagline: "Never miss a call during peak heating and cooling season.",
    imagineLines: [
      "your phones handled automatically during the summer heat wave — every call booked.",
      "maintenance plan offers going out automatically after every completed job.",
      "your Google ranking at the top when homeowners search for HVAC help in peak season.",
      "the capital ready to add a technician or buy new equipment when demand spikes.",
    ],
  },

  "carpet-cleaning": {
    key: "carpet-cleaning",
    name: "Carpet Cleaning",
    heroHeadline:
      "Turn More Local Searches Into Booked Jobs and Build a Business That Grows",
    heroSubheadline:
      "More booked appointments from local search, stronger before-and-after credibility, and a business foundation built for real growth.",
    heroBullets: [
      "Convert more local searches into booked appointments",
      "Build the review trust that makes customers choose you",
      "Follow up automatically so no quote request falls through",
      "Grow into commercial accounts or fleet expansion with funding support",
    ],
    painPoints: [
      {
        title: "Missed Local Leads",
        description:
          "Most carpet cleaning customers search locally and hire fast. If you're not showing up and responding quickly, those bookings go to whoever is.",
      },
      {
        title: "Quote Requests That Go Nowhere",
        description:
          "A customer fills out your form or calls — and never hears back fast enough. Manual follow-up is slow and inconsistent, and jobs slip away.",
      },
      {
        title: "Weak Before-and-After Credibility",
        description:
          "Carpet cleaning is a visual business. Without strong reviews and proof of results, prospects choose a competitor they trust more.",
      },
      {
        title: "No Consistent Review Generation",
        description:
          "Happy customers don't automatically leave reviews. Without a system to ask at the right moment, your review count stays flat while competitors build trust.",
      },
      {
        title: "No Clear Path to Scaling",
        description:
          "Growing into commercial accounts or adding a second truck requires capital. Without a fundable business profile, growth stays stuck.",
      },
    ],
    engines: {
      booked: {
        headline: "Never Let a Quote Request Slip Through the Cracks",
        description:
          "Our AI system responds to every local inquiry instantly, follows up automatically, and gets more quote requests converted into booked appointments.",
      },
      ranked: {
        headline: "Show Up When Local Customers Search for Carpet Cleaning",
        description:
          "We optimize your Google Maps presence and local visibility so you rank in front of homeowners who are ready to book — not just browsing.",
      },
      fundable: {
        headline:
          "Build the Foundation for Fleet Expansion and Commercial Growth",
        description:
          "Get a clear fundability roadmap so your carpet cleaning business is ready for a second truck, commercial accounts, or expansion into restoration services.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free Carpet Cleaning Growth Audit",
        description:
          "We analyze your local visibility, review strength, and follow-up gaps. You'll see exactly where bookings are being lost and how to recover them.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on your booking system, review automation, and fundability builder — configured for residential and commercial carpet cleaning operations.",
      },
      {
        title: "Book More Jobs Every Week",
        description:
          "More quote requests converted, more consistent 5-star reviews, better local rankings, and a business built for sustainable growth.",
      },
    ],
    auditHeadline: "Find Out Why Local Searches Aren't Turning Into Bookings",
    auditSubcopy:
      "Get a free audit of your local visibility, review profile, and lead capture system. No signup, no credit card.",
    faqs: [
      {
        question:
          "Will this help me get more residential bookings from local search?",
        answer:
          "Yes. We optimize your local Google presence and set up an instant-response system so more local searches become booked appointments.",
      },
      {
        question: "How does the review request system work?",
        answer:
          "After every completed job, the system automatically sends a review request via SMS and email. Happy customers get a direct link to Google. Unhappy customers are routed to private feedback so you can resolve the issue first.",
      },
      {
        question: "Can this help me grow into commercial carpet cleaning?",
        answer:
          "Yes. The system can target commercial search queries and the fundability builder prepares your business for the capital you'd need to handle larger commercial contracts.",
      },
      {
        question: "Do I need a new website to use this?",
        answer:
          "No. The platform works alongside your existing site and improves how it performs in local search without requiring a full rebuild.",
      },
      {
        question: "How does fundability help a carpet cleaning business?",
        answer:
          "We assess the key business credit factors lenders evaluate and give you a step-by-step roadmap to qualify for equipment financing, a second truck, or a business credit line.",
      },
      {
        question: "What if I'm already using a booking app or CRM?",
        answer:
          "We can integrate with most booking and CRM tools. Or if you prefer to consolidate, the built-in lead pipeline handles everything.",
      },
    ],
    finalCTAHeadline: "Ready to Turn More Local Searches Into Booked Jobs?",
    finalCTASubtext:
      "Get your free carpet cleaning growth audit today. See exactly which opportunities you're missing and how to capture them.",
    seo: {
      title: "Carpet Cleaning Growth Platform | More Bookings, Better Reviews",
      description:
        "Help your carpet cleaning business capture more local leads, improve review trust, convert more quote requests, and build fundability for growth.",
      ogTitle: "Carpet Cleaning Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Turn more local searches into booked jobs. Better reviews, stronger visibility, built for carpet cleaning growth.",
    },
    icon: "✨",
    tagline: "Turn more local searches into booked appointments.",
    imagineLines: [
      "every quote request followed up instantly — no more lost leads from slow response.",
      "5-star review requests going out automatically after every cleaning.",
      "local customers finding you first when they search for carpet cleaning near them.",
      "the fundability in place to add a second truck or expand into commercial accounts.",
    ],
  },

  roofing: {
    key: "roofing",
    name: "Roofing",
    heroHeadline:
      "Capture More Storm Leads, Win More Local Market, Build a Business Banks Will Fund",
    heroSubheadline:
      "High-ticket roofing jobs go to the companies with the strongest local presence and fastest response. We help you be that company.",
    heroBullets: [
      "Capture storm leads before competitors saturate your market",
      "Build a review profile that wins high-value jobs",
      "Rank at the top of local search in your territory",
      "Access growth capital for crews and marketing when demand spikes",
    ],
    painPoints: [
      {
        title: "Intense Local Competition",
        description:
          "Roofing markets get flooded with out-of-town crews after storms. If your local presence isn't dominant, you lose jobs on your own turf.",
      },
      {
        title: "High-Value Leads That Don't Convert",
        description:
          "A homeowner with insurance money and a damaged roof is a high-intent lead. If your follow-up is slow or your reviews are thin, they hire someone else.",
      },
      {
        title: "Storm Demand Spikes You're Not Ready For",
        description:
          "When a hail storm hits, the phone should be ringing. If you're not visible and responsive before and during the event, you miss the surge.",
      },
      {
        title: "Review Trust That Doesn't Match Your Quality",
        description:
          "Roofing is a major purchase. Homeowners research carefully. A weak review presence loses five-figure jobs to competitors with more visible social proof.",
      },
      {
        title: "No Capital for Scaling After Big Jobs",
        description:
          "Hiring more crews, buying materials for large contracts, and marketing during peak season all require capital. Without fundability, you can't move fast enough.",
      },
    ],
    engines: {
      booked: {
        headline: "Respond to Storm Leads Faster Than Any Competitor",
        description:
          "Our AI front desk captures roofing inquiries around the clock and responds within seconds — so you're first to every high-ticket opportunity, even after the storm hits at midnight.",
      },
      ranked: {
        headline:
          "Own Your Local Roofing Market Before the Storm Chasers Arrive",
        description:
          "We build and protect your local Google dominance so your business shows up first when homeowners search for roofing after a weather event.",
      },
      fundable: {
        headline: "Access Capital for Crews, Materials, and Growth",
        description:
          "Build a fundable business profile so you can move fast when big jobs come in — financing crews, materials, and marketing when you need it most.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free Roofing Growth Audit",
        description:
          "We analyze your local visibility, storm response readiness, review strength, and fundability score. You'll see exactly which leads you're losing and why.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on storm lead capture, reputation management, and your fundability builder — configured for roofing companies competing in local markets.",
      },
      {
        title: "Win More High-Value Roofing Jobs",
        description:
          "Faster response, dominant local rankings, stronger review trust, and a business built to scale when the big opportunities arrive.",
      },
    ],
    auditHeadline:
      "See What's Costing Your Roofing Business High-Value Jobs Right Now",
    auditSubcopy:
      "Get a free audit of your local visibility, review profile, and storm-season readiness. No signup, no credit card.",
    faqs: [
      {
        question: "Can this help us capture more storm leads quickly?",
        answer:
          "Yes. The AI front desk responds to every inquiry instantly 24/7, including during storm events when call volume spikes and most offices are overwhelmed.",
      },
      {
        question:
          "How does the review system protect against unhappy customers?",
        answer:
          "Dissatisfied customers are routed to a private feedback form before they see a review link. Your team gets alerted so you can resolve the issue before it becomes a public negative review.",
      },
      {
        question: "How do I compete against out-of-town storm chasers?",
        answer:
          "We strengthen your local Google presence, review profile, and brand trust so homeowners choose the local company they know over an unfamiliar out-of-town crew.",
      },
      {
        question: "How does fundability work for a roofing company?",
        answer:
          "We score your business credit health and give you a specific roadmap to qualify for materials financing, crew scaling loans, and business lines of credit.",
      },
      {
        question: "Does this work for both residential and commercial roofing?",
        answer:
          "Yes. The system works for both, with lead capture and ranking strategies that can target residential homeowners, property managers, and commercial clients.",
      },
      {
        question: "Do I need to change my existing marketing strategy?",
        answer:
          "Not necessarily. The platform fills gaps most roofing marketing doesn't cover — particularly booking systems, reputation management, and fundability.",
      },
    ],
    finalCTAHeadline:
      "Ready to Win More Roofing Jobs Before and After the Next Storm?",
    finalCTASubtext:
      "Get your free roofing growth audit today. See where high-value leads are going and what it takes to capture more of them.",
    seo: {
      title:
        "Roofing Growth Platform | Capture More Storm Leads, Win Local Market",
      description:
        "Help your roofing business capture more storm leads, dominate local search, build review trust, and access growth capital for crews and marketing.",
      ogTitle: "Roofing Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Capture more storm leads. Win your local market. Build a roofing business banks will fund.",
    },
    icon: "🏠",
    tagline: "Capture storm leads before competitors saturate your market.",
    imagineLines: [
      "capturing storm leads before out-of-town crews even know the weather event happened.",
      "high-value roofing inquiries responded to within seconds — every single one.",
      "your Google presence so dominant that local homeowners choose you without question.",
      "having the capital to hire crews and buy materials when a major storm event hits.",
    ],
  },

  "med-spa": {
    key: "med-spa",
    name: "Med Spa",
    heroHeadline:
      "Turn More Inquiries Into Consultations and Build a Med Spa That Scales",
    heroSubheadline:
      "More consult bookings, stronger online trust, and a business foundation built for growth — one system designed for med spas.",
    heroBullets: [
      "Convert more inquiries into booked consultations",
      "Build online trust that attracts premium clients",
      "Never miss a chat, call, or DM from a potential client",
      "Position your med spa for expansion with funding readiness",
    ],
    painPoints: [
      {
        title: "Low Inquiry-to-Consultation Conversion",
        description:
          "Most people who inquire never book a consult. Without a fast, professional follow-up system, those potential clients choose a competitor who responded first.",
      },
      {
        title: "Online Trust Gap",
        description:
          "Med spa clients do extensive research before booking. If your review profile doesn't reflect the quality of your work, high-value clients walk to the practice with better social proof.",
      },
      {
        title: "Local Visibility in a Competitive Market",
        description:
          "Med spas compete in dense local markets. If you're not appearing at the top when potential clients search for your services, you're invisible to your most qualified prospects.",
      },
      {
        title: "Missed Chats and After-Hours Inquiries",
        description:
          "A prospect browsing at 10pm who can't get a response moves on. Every missed inquiry is a potential client — and potential revenue — that went somewhere else.",
      },
      {
        title: "No System for Sustainable Growth",
        description:
          "Opening a second location or adding providers requires planning and capital. Without a fundable business profile, growth stays limited by cash flow.",
      },
    ],
    engines: {
      booked: {
        headline: "Convert More Inquiries Into Consultations",
        description:
          "Our AI front desk captures every web inquiry, chat, and after-hours contact — responding instantly and guiding prospects to book a consultation with your practice.",
      },
      ranked: {
        headline: "Show Up First When Clients Search for Your Services",
        description:
          "We optimize your Google presence, manage your reviews, and build the local visibility that puts your med spa in front of clients who are ready to book.",
      },
      fundable: {
        headline:
          "Build the Foundation for a Second Location or Provider Expansion",
        description:
          "Get a clear fundability roadmap so your med spa is ready for the capital you need to add providers, upgrade equipment, or open a second location.",
      },
    },
    howItWorks: [
      {
        title: "Run Your Free Med Spa Growth Audit",
        description:
          "We analyze your online visibility, review strength, inquiry response gaps, and fundability score. You'll see exactly where potential clients are slipping away.",
      },
      {
        title: "Activate Your Growth Engines",
        description:
          "Turn on your AI booking assistant, reputation management, and fundability builder — configured for med spa client acquisition and retention.",
      },
      {
        title: "Grow Your Practice With More Consultations",
        description:
          "More inquiries converted, stronger review presence, better local visibility, and a business built for confident expansion.",
      },
    ],
    auditHeadline:
      "See What's Preventing More Inquiries From Becoming Consultations",
    auditSubcopy:
      "Get a free audit of your local search presence, review trust, and inquiry response system. No signup, no credit card.",
    faqs: [
      {
        question:
          "How does this help convert more web inquiries into booked consultations?",
        answer:
          "The AI front desk responds to every inquiry within seconds — 24/7 — with a professional, on-brand message and a clear invitation to schedule a consultation. Faster follow-up means more conversions.",
      },
      {
        question: "How do you handle negative reviews for a med spa?",
        answer:
          "Clients who express dissatisfaction are routed to a private feedback form before they see a review link. Your team is alerted immediately so you can address the concern privately before it becomes a public issue.",
      },
      {
        question: "Can this help with after-hours inquiries from social media?",
        answer:
          "Yes. The system captures and responds to inquiries from your website and messaging channels around the clock, so potential clients always get a fast response.",
      },
      {
        question: "How does fundability work for a med spa?",
        answer:
          "We assess your business credit profile and provide a roadmap to qualify for equipment financing, provider expansion, and business lines of credit at favorable terms.",
      },
      {
        question: "Do I need to change my current marketing approach?",
        answer:
          "Not necessarily. The platform handles booking conversion, reputation, local SEO, and fundability — areas that complement most aesthetic practice marketing strategies.",
      },
      {
        question:
          "Will this work alongside my EMR or practice management software?",
        answer:
          "Yes. The platform works alongside your existing practice management tools and can integrate with many popular systems to streamline lead-to-patient workflows.",
      },
    ],
    finalCTAHeadline: "Ready to Convert More Inquiries Into Consultations?",
    finalCTASubtext:
      "Get your free med spa growth audit today. See exactly what's preventing more inquiries from turning into booked appointments.",
    seo: {
      title:
        "Med Spa Growth Platform | More Consultations, Better Online Presence",
      description:
        "Help your med spa convert more inquiries into consultations, build online trust, improve local visibility, and prepare for sustainable growth.",
      ogTitle: "Med Spa Growth Platform | Booked Ranked Fundable",
      ogDescription:
        "Turn more inquiries into consultations. Stronger reviews, better local visibility, built for med spa growth.",
    },
    icon: "💆",
    tagline: "Turn more inquiries into booked consultations.",
    imagineLines: [
      "every after-hours inquiry getting a professional, branded response within seconds.",
      "potential clients converting into booked consultations without manual follow-up.",
      "your review profile building the trust that premium clients require before booking.",
      "the funding in place to add a provider or open a second location when you're ready.",
    ],
  },
};

export const NICHE_KEYS = Object.keys(niches) as (keyof typeof niches)[];

export function getNiche(key: string): NicheData | undefined {
  return niches[key];
}

export default niches;
