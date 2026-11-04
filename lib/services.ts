import { SERVICE_BLURBS } from "@/lib/site";

export const SERVICE_TITLES: Record<string, string> = {
  "commercial-pressure-washing-services": "Commercial pressure washing",
  "industrial-pressure-washing": "Industrial pressure washing",
  "parking-lot-pressure-washing": "Parking lot pressure washing",
  "commercial-awning-cleaning": "Commercial awning cleaning",
  "building-exterior-pressure-washing": "Building exterior washing",
};

export const SERVICE_CARD_TITLES: Record<string, string> = {
  "commercial-pressure-washing-services": "Storefronts & plazas",
  "industrial-pressure-washing": "Plants & warehouses",
  "parking-lot-pressure-washing": "Parking lots & garages",
  "commercial-awning-cleaning": "Awnings & canopies",
  "building-exterior-pressure-washing": "Building exteriors",
};

export const SERVICE_CARD_LINES: Record<string, string> = {
  "commercial-pressure-washing-services":
    "Gum, grease, and pollution on foot traffic areas — we schedule after hours when you need zero downtime.",
  "industrial-pressure-washing":
    "Safety plans, hot water when specs require it, and crews used to working around active sites.",
  "parking-lot-pressure-washing":
    "Line paint protected, drains checked first — salt and oil lifted without pushing grit into storm systems.",
  "commercial-awning-cleaning":
    "Logo colours stay true with fabric-safe chemistry — not a one-tip-fits-all blast.",
  "building-exterior-pressure-washing":
    "Brick, stucco, and cladding tested in a small zone before we touch the whole wall.",
};

export const SERVICE_ICONS: Record<string, string> = {
  "commercial-pressure-washing-services": "🏪",
  "industrial-pressure-washing": "🏭",
  "parking-lot-pressure-washing": "🅿️",
  "commercial-awning-cleaning": "⛱️",
  "building-exterior-pressure-washing": "🏢",
};

export const SERVICE_HIGHLIGHTS: Record<string, string[]> = {
  "commercial-pressure-washing-services": [
    "Sidewalks, entries, and plaza flatwork",
    "After-hours scheduling for retail tenants",
    "Gum, grease, and pollution staining",
    "Photo documentation on request",
  ],
  "industrial-pressure-washing": [
    "Plants, yards, and loading docks",
    "Hot water and degreasers when specs require",
    "Site safety and escort rules followed",
    "Equipment pads scoped separately from offices",
  ],
  "parking-lot-pressure-washing": [
    "Drains and line paint checked first",
    "Salt, oil, and tire marks on asphalt",
    "Perimeter-to-center wash pattern",
    "Reclaim where local rules require it",
  ],
  "commercial-awning-cleaning": [
    "Fabric, vinyl, and painted metal canopies",
    "Low-pressure passes — not lot settings",
    "Logo colours protected with test patches",
    "Street-facing panels prioritized",
  ],
  "building-exterior-pressure-washing": [
    "Brick, stucco, EIFS, and cladding",
    "Substrate test zone before full walls",
    "Weep holes and seals protected",
    "Pollution and organic growth removal",
  ],
};

export function serviceBlurb(slug: string): string {
  return SERVICE_BLURBS[slug] ?? SERVICE_BLURBS["commercial-pressure-washing-services"];
}
