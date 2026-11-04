const CITY_SLUG_MAP: Record<string, string> = {
  "St Catharines": "st-catharines",
  "London Ontario": "london-ontario",
  "Surrey BC": "surrey-bc",
  "North York": "north-york",
};

export function citySlugSuffix(city: string): string {
  return CITY_SLUG_MAP[city] ?? city.toLowerCase().replace(/ /g, "-");
}
