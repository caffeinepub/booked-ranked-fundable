export const TENANTS = [
  {
    id: "tenant-oceanside",
    name: "Oceanside Clean & Restore",
    phone: "(760) 555-0101",
    website: "oceansideclean.com",
    address: "123 Pacific Ave, Oceanside, CA 92054",
    type: "Restoration",
  },
  {
    id: "tenant-plumbing",
    name: "North County Plumbing Pros",
    phone: "(760) 555-0202",
    website: "ncplumbingpros.com",
    address: "456 El Camino Real, Vista, CA 92084",
    type: "Plumbing",
  },
];

export const LEADS: Record<string, Lead[]> = {
  "tenant-oceanside": [
    {
      id: "l1",
      tenantId: "tenant-oceanside",
      name: "Maria Gonzalez",
      phone: "(760) 555-1001",
      email: "maria@email.com",
      source: "Google",
      status: "new",
      createdAt: Date.now() - 86400000,
    },
    {
      id: "l2",
      tenantId: "tenant-oceanside",
      name: "James Chen",
      phone: "(760) 555-1002",
      email: "james@email.com",
      source: "Referral",
      status: "contacted",
      createdAt: Date.now() - 172800000,
    },
    {
      id: "l3",
      tenantId: "tenant-oceanside",
      name: "Sarah Williams",
      phone: "(760) 555-1003",
      email: "sarah@email.com",
      source: "Website",
      status: "qualified",
      createdAt: Date.now() - 259200000,
    },
    {
      id: "l4",
      tenantId: "tenant-oceanside",
      name: "Robert Davis",
      phone: "(760) 555-1004",
      email: "robert@email.com",
      source: "Facebook",
      status: "closed",
      createdAt: Date.now() - 345600000,
    },
    {
      id: "l5",
      tenantId: "tenant-oceanside",
      name: "Linda Martinez",
      phone: "(760) 555-1005",
      email: "linda@email.com",
      source: "Google",
      status: "new",
      createdAt: Date.now() - 432000000,
    },
    {
      id: "l6",
      tenantId: "tenant-oceanside",
      name: "Michael Brown",
      phone: "(760) 555-1006",
      email: "mike@email.com",
      source: "Yelp",
      status: "contacted",
      createdAt: Date.now() - 518400000,
    },
  ],
  "tenant-plumbing": [
    {
      id: "p1",
      tenantId: "tenant-plumbing",
      name: "Karen Thompson",
      phone: "(760) 555-2001",
      email: "karen@email.com",
      source: "Google",
      status: "new",
      createdAt: Date.now() - 86400000,
    },
    {
      id: "p2",
      tenantId: "tenant-plumbing",
      name: "David Lee",
      phone: "(760) 555-2002",
      email: "david@email.com",
      source: "Website",
      status: "qualified",
      createdAt: Date.now() - 172800000,
    },
    {
      id: "p3",
      tenantId: "tenant-plumbing",
      name: "Jennifer White",
      phone: "(760) 555-2003",
      email: "jen@email.com",
      source: "Referral",
      status: "closed",
      createdAt: Date.now() - 259200000,
    },
    {
      id: "p4",
      tenantId: "tenant-plumbing",
      name: "Thomas Harris",
      phone: "(760) 555-2004",
      email: "thomas@email.com",
      source: "Facebook",
      status: "contacted",
      createdAt: Date.now() - 345600000,
    },
    {
      id: "p5",
      tenantId: "tenant-plumbing",
      name: "Patricia Clark",
      phone: "(760) 555-2005",
      email: "pat@email.com",
      source: "Google",
      status: "new",
      createdAt: Date.now() - 432000000,
    },
    {
      id: "p6",
      tenantId: "tenant-plumbing",
      name: "Christopher Lewis",
      phone: "(760) 555-2006",
      email: "chris@email.com",
      source: "Yelp",
      status: "contacted",
      createdAt: Date.now() - 518400000,
    },
  ],
};

export interface Lead {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email: string;
  source: string;
  status: "new" | "contacted" | "qualified" | "closed";
  createdAt: number;
}

export interface Review {
  id: string;
  tenantId: string;
  author: string;
  rating: number;
  comment: string;
  platform: "Google" | "Yelp" | "Facebook";
  date: string;
}

export const REVIEWS: Record<string, Review[]> = {
  "tenant-oceanside": [
    {
      id: "r1",
      tenantId: "tenant-oceanside",
      author: "Susan P.",
      rating: 5,
      comment:
        "Absolutely fantastic service! They restored our floors after flooding and they look brand new.",
      platform: "Google",
      date: "2026-03-10",
    },
    {
      id: "r2",
      tenantId: "tenant-oceanside",
      author: "Mark T.",
      rating: 5,
      comment:
        "Fast response, professional crew, and excellent results. Highly recommend!",
      platform: "Google",
      date: "2026-03-05",
    },
    {
      id: "r3",
      tenantId: "tenant-oceanside",
      author: "Amy L.",
      rating: 4,
      comment:
        "Great work overall. Minor scheduling hiccup but the results were worth it.",
      platform: "Yelp",
      date: "2026-02-28",
    },
    {
      id: "r4",
      tenantId: "tenant-oceanside",
      author: "Carlos M.",
      rating: 5,
      comment:
        "Used them twice now. Always professional and thorough. My go-to restoration company.",
      platform: "Google",
      date: "2026-02-15",
    },
    {
      id: "r5",
      tenantId: "tenant-oceanside",
      author: "Diana H.",
      rating: 4,
      comment:
        "Solid work on our mold remediation. Explained every step of the process.",
      platform: "Facebook",
      date: "2026-02-01",
    },
  ],
  "tenant-plumbing": [
    {
      id: "rp1",
      tenantId: "tenant-plumbing",
      author: "Kevin R.",
      rating: 5,
      comment:
        "Fixed our burst pipe at 10pm on a Sunday. Lifesavers! Fair price too.",
      platform: "Google",
      date: "2026-03-12",
    },
    {
      id: "rp2",
      tenantId: "tenant-plumbing",
      author: "Nancy S.",
      rating: 4,
      comment: "Good plumbers. Arrived on time and fixed the issue quickly.",
      platform: "Yelp",
      date: "2026-03-01",
    },
    {
      id: "rp3",
      tenantId: "tenant-plumbing",
      author: "Greg O.",
      rating: 4,
      comment: "Professional team. Got the water heater replaced same day.",
      platform: "Google",
      date: "2026-02-20",
    },
    {
      id: "rp4",
      tenantId: "tenant-plumbing",
      author: "Tina B.",
      rating: 5,
      comment: "Best plumbers in North County. Always reliable and honest.",
      platform: "Facebook",
      date: "2026-02-10",
    },
    {
      id: "rp5",
      tenantId: "tenant-plumbing",
      author: "Frank A.",
      rating: 3,
      comment:
        "Work was good but had to follow up a few times to get scheduled.",
      platform: "Yelp",
      date: "2026-01-25",
    },
  ],
};

export interface AuditData {
  tenantId: string;
  total: number;
  gmb: number;
  citations: number;
  website: number;
  backlinks: number;
  recommendations: { text: string; priority: "High" | "Medium" | "Low" }[];
}

export const AUDIT_SCORES: Record<string, AuditData> = {
  "tenant-oceanside": {
    tenantId: "tenant-oceanside",
    total: 68,
    gmb: 65,
    citations: 70,
    website: 72,
    backlinks: 55,
    recommendations: [
      {
        text: "Add 10 more photos to your Google Business Profile",
        priority: "High",
      },
      {
        text: "Fix 3 citation inconsistencies on Yelp and YellowPages",
        priority: "High",
      },
      {
        text: "Improve page load speed — currently 4.2s (target <2s)",
        priority: "Medium",
      },
      {
        text: "Build 5 more local backlinks from chamber of commerce and sponsors",
        priority: "Medium",
      },
      {
        text: "Respond to all Google reviews within 24 hours",
        priority: "Low",
      },
    ],
  },
  "tenant-plumbing": {
    tenantId: "tenant-plumbing",
    total: 72,
    gmb: 75,
    citations: 78,
    website: 68,
    backlinks: 67,
    recommendations: [
      {
        text: "Update website with service area pages for each city",
        priority: "High",
      },
      {
        text: "Add schema markup for local business to website",
        priority: "High",
      },
      {
        text: "Post weekly updates to Google Business Profile",
        priority: "Medium",
      },
      {
        text: "Get listed on 5 more plumbing-specific directories",
        priority: "Medium",
      },
      {
        text: "Add FAQ section to website targeting common search terms",
        priority: "Low",
      },
    ],
  },
};

export interface FundabilityItem {
  id: string;
  tenantId: string;
  category: string;
  item: string;
  completed: boolean;
}

export const FUNDABILITY_SCORES: Record<string, number> = {
  "tenant-oceanside": 55,
  "tenant-plumbing": 71,
};

export const FUNDABILITY_ITEMS: Record<string, FundabilityItem[]> = {
  "tenant-oceanside": [
    {
      id: "f1",
      tenantId: "tenant-oceanside",
      category: "Business Foundation",
      item: "LLC or Corp registered",
      completed: true,
    },
    {
      id: "f2",
      tenantId: "tenant-oceanside",
      category: "Business Foundation",
      item: "EIN obtained from IRS",
      completed: true,
    },
    {
      id: "f3",
      tenantId: "tenant-oceanside",
      category: "Business Foundation",
      item: "Business address (not PO Box)",
      completed: true,
    },
    {
      id: "f4",
      tenantId: "tenant-oceanside",
      category: "Banking & Credit",
      item: "Dedicated business checking account",
      completed: true,
    },
    {
      id: "f5",
      tenantId: "tenant-oceanside",
      category: "Banking & Credit",
      item: "Business credit card",
      completed: false,
    },
    {
      id: "f6",
      tenantId: "tenant-oceanside",
      category: "Banking & Credit",
      item: "D-U-N-S Number (Dun & Bradstreet)",
      completed: false,
    },
    {
      id: "f7",
      tenantId: "tenant-oceanside",
      category: "Online Presence",
      item: "Professional website",
      completed: true,
    },
    {
      id: "f8",
      tenantId: "tenant-oceanside",
      category: "Online Presence",
      item: "Google Business Profile verified",
      completed: false,
    },
    {
      id: "f9",
      tenantId: "tenant-oceanside",
      category: "Documents",
      item: "2 years business tax returns",
      completed: false,
    },
    {
      id: "f10",
      tenantId: "tenant-oceanside",
      category: "Documents",
      item: "Business licenses current",
      completed: true,
    },
  ],
  "tenant-plumbing": [
    {
      id: "fp1",
      tenantId: "tenant-plumbing",
      category: "Business Foundation",
      item: "LLC or Corp registered",
      completed: true,
    },
    {
      id: "fp2",
      tenantId: "tenant-plumbing",
      category: "Business Foundation",
      item: "EIN obtained from IRS",
      completed: true,
    },
    {
      id: "fp3",
      tenantId: "tenant-plumbing",
      category: "Business Foundation",
      item: "Business address (not PO Box)",
      completed: true,
    },
    {
      id: "fp4",
      tenantId: "tenant-plumbing",
      category: "Banking & Credit",
      item: "Dedicated business checking account",
      completed: true,
    },
    {
      id: "fp5",
      tenantId: "tenant-plumbing",
      category: "Banking & Credit",
      item: "Business credit card",
      completed: true,
    },
    {
      id: "fp6",
      tenantId: "tenant-plumbing",
      category: "Banking & Credit",
      item: "D-U-N-S Number (Dun & Bradstreet)",
      completed: false,
    },
    {
      id: "fp7",
      tenantId: "tenant-plumbing",
      category: "Online Presence",
      item: "Professional website",
      completed: true,
    },
    {
      id: "fp8",
      tenantId: "tenant-plumbing",
      category: "Online Presence",
      item: "Google Business Profile verified",
      completed: true,
    },
    {
      id: "fp9",
      tenantId: "tenant-plumbing",
      category: "Documents",
      item: "2 years business tax returns",
      completed: true,
    },
    {
      id: "fp10",
      tenantId: "tenant-plumbing",
      category: "Documents",
      item: "Business licenses current",
      completed: false,
    },
  ],
};

export const MONTHLY_DATA = [
  { month: "Oct", leads: 6, reviews: 2 },
  { month: "Nov", leads: 8, reviews: 3 },
  { month: "Dec", leads: 5, reviews: 1 },
  { month: "Jan", leads: 9, reviews: 4 },
  { month: "Feb", leads: 11, reviews: 3 },
  { month: "Mar", leads: 12, reviews: 5 },
];
