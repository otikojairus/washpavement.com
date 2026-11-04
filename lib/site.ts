export const SITE = {
  name: "washpavement.com",
  tagline: "Commercial exterior pressure washing across Canada",
  domain: "washpavement.com",
  phoneDisplay: "1-888-555-9472",
  phoneTel: "+18885559472",
  hours: "Open 24 hours · 365 days a year",
  hoursNote: "Call anytime — we schedule crews by city and season.",
} as const;

export const SERVICE_BLURBS: Record<string, string> = {
  "commercial-pressure-washing-services":
    "Storefronts, plazas, and multi-tenant buildings — we remove grime, gum, and pollution staining without damaging paint or signage.",
  "industrial-pressure-washing":
    "Plants, warehouses, and equipment yards need safe pressure, hot water when required, and documented safety plans.",
  "parking-lot-pressure-washing":
    "Oil, salt, and tire marks make lots look neglected — we stripe edges carefully and recover drains before they clog.",
  "commercial-awning-cleaning":
    "Fabric and metal awnings need low-pressure chemistry, not raw PSI — we brighten brands without voiding warranties.",
  "building-exterior-pressure-washing":
    "Brick, EIFS, and composite siding each need the right tip and detergent — we test a small area first, every time.",
};

export const FEATURED_SLUGS = [
  "commercial-pressure-washing-services",
  "industrial-pressure-washing",
  "parking-lot-pressure-washing",
  "commercial-awning-cleaning",
  "building-exterior-pressure-washing",
] as const;
