/* ==========================================================================
   VA TEMPLATE — CONTENT FILE
   Edit this file to make the site yours. No other file needs to change.
   - theme: "sage" | "blush" | "slate"
   - Leave an array empty ([]) to hide that block.
   - Photos: drop files into /assets and update the paths below.
   ========================================================================== */

window.SITE = {
  theme: "sage",

  meta: {
    title: "Maria Santos — Virtual Assistant",
    description:
      "Virtual assistant helping busy founders and small teams reclaim their time with calm, organized, reliable support."
  },

  brand: {
    monogram: "M",
    name: "Maria Santos"
  },

  nav: [
    { label: "About", href: "#about" },
    { label: "Services", href: "#services" },
    { label: "Tools", href: "#tools" },
    { label: "Work", href: "#work" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" }
  ],

  hero: {
    greeting: "Hello, I'm",
    firstName: "Maria",
    lastName: "Santos",
    role: "Virtual Assistant",
    intro:
      "I take the inbox, the calendar, and the busywork off your plate, so you can focus on the work only you can do.",
    cta: { label: "View my work", href: "#work" },
    photo: "assets/profile.png",
    photoAlt: "Portrait of Maria Santos",
    // Text that circles the round badge (keep it short; it repeats around the circle)
    badge: "Calm inbox · Clear calendar · Happy clients · ",
    stats: [
      { value: "5+", label: "Years experience" },
      { value: "40+", label: "Clients supported" },
      { value: "12k+", label: "Hours saved" },
      { value: "98%", label: "Client retention" }
    ]
  },

  about: {
    eyebrow: "Get to know me",
    title: "About Me",
    lead: "I'm the calm in your busiest week.",
    paragraphs: [
      "I'm a virtual assistant with five years of experience supporting founders, coaches and small teams. I started out managing one overflowing inbox and discovered I love turning chaos into systems that quietly run themselves.",
      "I work the way I'd want someone to work for me: I communicate clearly, anticipate what's next, and treat your business with the same care as my own. You'll always know what's done, what's in progress and what needs your attention."
    ],
    signature: "Maria Santos",
    photo: "assets/profile-square.png",
    photoAlt: "Maria Santos smiling",
    facts: [
      { label: "Based in", value: "Manila, Philippines" },
      { label: "Time zone", value: "Flexible; US, UK & AU overlap" },
      { label: "Languages", value: "English, Filipino" },
      { label: "Availability", value: "Part-time & full-time retainers" }
    ],
    cta: { label: "Say hello", href: "#contact" }
  },

  services: {
    eyebrow: "What I do",
    title: "Services",
    intro:
      "Reliable, hands-on support for founders, coaches and small teams. Pick one service or build a package that fits how you work.",
    link: { label: "Let's talk", href: "#contact" },
    // icon: "calendar" | "share" | "table" | "headset" | "checklist" | "search"
    items: [
      {
        icon: "calendar",
        title: "Inbox & Calendar",
        text: "Email triage, scheduling, travel booking, and reminders so nothing slips and your day stays protected."
      },
      {
        icon: "share",
        title: "Social Media Support",
        text: "Content calendars, post design and scheduling, community replies, and simple monthly reporting."
      },
      {
        icon: "table",
        title: "Data Entry & Admin",
        text: "Accurate data entry, spreadsheets, invoicing, bookkeeping prep, and tidy file organization."
      },
      {
        icon: "headset",
        title: "Customer Support",
        text: "Friendly, on-brand replies by email and chat, plus help-desk setup and a ready bank of answers."
      },
      {
        icon: "checklist",
        title: "Project & Task Management",
        text: "Boards, checklists, and deadlines kept on track, with a short weekly update so you always know where things stand."
      },
      {
        icon: "search",
        title: "Research & Documents",
        text: "Market and vendor research, lead lists, meeting notes, and polished decks, docs, and reports."
      }
    ]
  },

  tools: {
    eyebrow: "My toolkit",
    title: "Tools I Use",
    note: "…and I pick up whatever your team already uses, fast.",
    // abbr: 1–2 letters shown in the badge (defaults to the first letters of the name)
    // image: optional logo path, e.g. "assets/notion.svg" (replaces the letters)
    items: [
      { name: "Google Workspace", abbr: "G" },
      { name: "Notion", abbr: "N" },
      { name: "ClickUp", abbr: "Cu" },
      { name: "Slack", abbr: "Sl" },
      { name: "Canva", abbr: "Ca" },
      { name: "Zapier", abbr: "Z" },
      { name: "Calendly", abbr: "Cl" },
      { name: "Zoom", abbr: "Zm" }
    ]
  },

  projects: {
    eyebrow: "Selected",
    title: "Case Studies",
    viewAll: { label: "Work with me", href: "#contact" },
    // tone: "tint" | "dark" | "stone"      mock: "inbox" | "calendar" | "board"
    // image: optional path, e.g. "assets/case-1.jpg" (replaces the drawn mock-up)
    items: [
      {
        tone: "tint",
        mock: "inbox",
        image: "",
        client: "Aurelia Skincare",
        category: "Inbox & Calendar Management",
        result: "12 hrs/week saved",
        summary:
          "Took a founder from 400+ unread emails to a calm, sorted inbox with a calendar that finally protects focus time.",
        challenge:
          "The founder was answering emails until midnight, double-booking calls, and missing supplier follow-ups.",
        solution:
          "Built a labelling and templates system, set up scheduling links with buffers, and ran a daily 20-minute inbox sweep with a short end-of-day summary.",
        outcome:
          "Response time dropped from 2 days to under 4 hours, and the founder reclaimed about 12 hours every week.",
        tools: ["Gmail", "Google Calendar", "Calendly", "Notion"]
      },
      {
        tone: "dark",
        mock: "board",
        image: "",
        client: "Verdant Wellness",
        category: "Client Onboarding & Operations",
        result: "Onboarding in 2 days, not 9",
        summary:
          "Replaced a messy onboarding process with one clear, automated workflow that clients actually finish.",
        challenge:
          "New clients waited over a week to get started because forms, invoices, and welcome steps were handled by hand.",
        solution:
          "Mapped the full journey, built a checklist-driven board, and automated forms, contracts, invoices, and reminders.",
        outcome:
          "Average onboarding fell from 9 days to 2, with zero dropped handoffs in the first quarter.",
        tools: ["ClickUp", "Zapier", "DocuSign", "Stripe"]
      },
      {
        tone: "stone",
        mock: "calendar",
        image: "",
        client: "Northline Studio",
        category: "Social Media & Content Support",
        result: "30 days of content, planned",
        summary:
          "Turned scattered posting into a monthly content calendar with scheduled posts and a simple reporting routine.",
        challenge:
          "The studio posted only when someone remembered to, with no plan, no consistency, and no idea what worked.",
        solution:
          "Planned a monthly calendar, batch-designed posts, scheduled everything in advance, and sent a one-page monthly report.",
        outcome:
          "Posting went from sporadic to daily, and engagement grew 3x in three months.",
        tools: ["Canva", "Buffer", "Google Sheets", "Notion"]
      }
    ]
  },

  testimonials: {
    eyebrow: "Kind words",
    items: [
      {
        quote:
          "Maria is an exceptional assistant who truly understands our business and our customers. The results exceeded our expectations.",
        name: "James Carter",
        role: "CEO, Northline Studio",
        photo: ""
      },
      {
        quote:
          "I stopped dreading Monday mornings. My inbox is calm, my calendar makes sense, and nothing slips through the cracks anymore.",
        name: "Sofia Reyes",
        role: "Founder, Aurelia Skincare",
        photo: ""
      },
      {
        quote:
          "Reliable, proactive, and always one step ahead. Working with Maria felt like gaining a teammate, not hiring a contractor.",
        name: "Daniel Park",
        role: "Director, Verdant Wellness",
        photo: ""
      }
    ]
  },

  contact: {
    headingTop: "Let's create",
    headingBottom: "something amazing",
    text: "Have a project in mind? I'd love to hear about it.",
    button: { label: "Get in touch", href: "mailto:hello@example.com" },
    email: "hello@example.com",
    location: "Manila, Philippines",
    // icon: "linkedin" | "instagram" | "facebook" | "globe"
    socials: [
      { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/" },
      { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
      { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" }
    ]
  },

  footer: {
    tagline: "Organized support that leaves a lasting impression.",
    copyright: "Maria Santos. All rights reserved."
  }
};
