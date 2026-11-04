/** Location-specific facts for city pages (min 2 per page in copy). */
export type CitySeoFacts = {
  displayName: string;
  population: string;
  climate: string;
  landmark: string;
  neighbourhood: string;
};

export const CITY_SEO: Record<string, CitySeoFacts> = {
  Calgary: {
    displayName: "Calgary",
    population: "about 1.3 million in the metro area",
    climate: "dry chinook thaws and hail storms that stress siding and lot surfaces",
    landmark: "storage yards near Stoney Trail and Springbank",
    neighbourhood: "Signal Hill and Mahogany",
  },
  Winnipeg: {
    displayName: "Winnipeg",
    population: "roughly 850,000 in the capital region",
    climate: "deep freeze/thaw cycles that crack entryways and canopies",
    landmark: "the Perimeter Highway and Red River corridor",
    neighbourhood: "St Boniface and Transcona",
  },
  Edmonton: {
    displayName: "Edmonton",
    population: "over one million in the metro",
    climate: "long winters and rapid spring melt that finds parking surfaces",
    landmark: "Yellowhead Trail and the Nisku industrial approaches",
    neighbourhood: "Mill Woods and Sherwood Park approaches",
  },
  Ottawa: {
    displayName: "Ottawa",
    population: "about 1.4 million in Ottawa–Gatineau",
    climate: "heavy spring rain and ice loading on retail plazas",
    landmark: "the 417 Queensway and Kanata tech corridor",
    neighbourhood: "Orleans and Nepean",
  },
  Montreal: {
    displayName: "Montreal",
    population: "roughly 4 million on the island and close suburbs",
    climate: "freeze–thaw and heavy summer storms on flat roof membranes",
    landmark: "Autoroute 40 and the South Shore crossings",
    neighbourhood: "Plateau and the West Island",
  },
  Laval: {
    displayName: "Laval",
    population: "about 450,000 on the north shore",
    climate: "road salt and slush spray during long Quebec winters",
    landmark: "Autoroute 15 and Curé-Labelle commercial strips",
    neighbourhood: "Chomedey and Vimont",
  },
  Hamilton: {
    displayName: "Hamilton",
    population: "over 750,000 in the Hamilton metro",
    climate: "lake-effect rain and humidity near the escarpment",
    landmark: "the QEW and Red Hill Valley Parkway",
    neighbourhood: "Stoney Creek and the Mountain",
  },
  "St Catharines": {
    displayName: "St. Catharines",
    population: "about 420,000 in the Niagara Region",
    climate: "wet shoulder seasons and vineyard-country humidity",
    landmark: "the QEW and Welland Canal approaches",
    neighbourhood: "Port Dalhousie and Merritton",
  },
  Markham: {
    displayName: "Markham",
    population: "over 350,000 in eastern GTA",
    climate: "summer downpours that test storefront glass on stored rigs",
    landmark: "Highway 7 and the 404 corridor",
    neighbourhood: "Unionville and Cornell",
  },
  "North York": {
    displayName: "North York",
    population: "roughly 670,000 in northern Toronto",
    climate: "urban heat and sudden storms along the 401 corridor",
    landmark: "Finch and York Mills corridors",
    neighbourhood: "Willowdale and Don Mills",
  },
  "London Ontario": {
    displayName: "London",
    population: "about 430,000 in Middlesex County",
    climate: "spring flooding risk and wet storage seasons",
    landmark: "Highway 401 and Veterans Memorial Parkway",
    neighbourhood: "Masonville and White Oaks",
  },
  "Surrey BC": {
    displayName: "Surrey",
    population: "over 600,000 in the Fraser Valley hub",
    climate: "coastal rain and mild wet winters that hide slow leaks",
    landmark: "King George Boulevard and the Trans-Canada (1)",
    neighbourhood: "Guildford and South Surrey",
  },
  Mississauga: {
    displayName: "Mississauga",
    population: "about 750,000 west of Toronto",
    climate: "lake-effect rain and hot humid summers in paved lots",
    landmark: "the 403/QEW interchange and Hurontario corridor",
    neighbourhood: "Erin Mills and Port Credit approaches",
  },
  Toronto: {
    displayName: "Toronto",
    population: "over 2.9 million in the city proper",
    climate: "dense urban storage and rapid temperature swings",
    landmark: "the Gardiner corridor and Don Valley routes",
    neighbourhood: "Scarborough and Etobicoke borders",
  },
  Halifax: {
    displayName: "Halifax",
    population: "about 480,000 in the regional municipality",
    climate: "Atlantic storms and salt air that attack exterior seals",
    landmark: "Bayers Lake and the Bedford Highway",
    neighbourhood: "Dartmouth and Clayton Park",
  },
  Regina: {
    displayName: "Regina",
    population: "roughly 260,000 in the capital region",
    climate: "prairie hail and dry summers followed by hard winter freeze",
    landmark: "Ring Road and Victoria Avenue corridors",
    neighbourhood: "Harbour Landing and Lakeview",
  },
  Vancouver: {
    displayName: "Vancouver",
    population: "about 2.6 million in the Metro Vancouver area",
    climate: "year-round rain that finds any failed building envelope",
    landmark: "Marine Drive and the Second Narrows approaches",
    neighbourhood: "Richmond approaches and East Vancouver",
  },
  Vaughan: {
    displayName: "Vaughan",
    population: "over 330,000 north of Toronto",
    climate: "snow load and spring melt on commercial sites in driveways",
    landmark: "Highway 400 and the 407 interchange",
    neighbourhood: "Woodbridge and Maple",
  },
  Etobicoke: {
    displayName: "Etobicoke",
    population: "about 365,000 in west Toronto",
    climate: "lakefront humidity and wind-driven rain",
    landmark: "the Queensway and Humber Valley routes",
    neighbourhood: "Islington and Mimico",
  },
  Barrie: {
    displayName: "Barrie",
    population: "roughly 220,000 on Kempenfelt Bay",
    climate: "heavy snow and spring thaw in cottage-country storage",
    landmark: "Highway 400 and the Big Bay Point corridor",
    neighbourhood: "Allandale and the south end industrial strips",
  },
  Woodbridge: {
    displayName: "Woodbridge",
    population: "part of Vaughan’s 330,000+ community",
    climate: "freeze–thaw along the Humber and 400 corridor",
    landmark: "Highway 7 and Islington approaches",
    neighbourhood: "Vellore and Pine Valley",
  },
  Thornhill: {
    displayName: "Thornhill",
    population: "about 110,000 between Vaughan and Markham",
    climate: "urban runoff and ice dams on winter-stored campers",
    landmark: "Yonge Street and the 407",
    neighbourhood: "Thornhill North and Promenade area",
  },
  Abbotsford: {
    displayName: "Abbotsford",
    population: "about 165,000 in the Fraser Valley east",
    climate: "wet coastal fronts and agricultural humidity",
    landmark: "Trans-Canada (1) and Sumas Way",
    neighbourhood: "Clearbrook and Mt Lehman",
  },
};

export function getCitySeoFacts(cityKey: string): CitySeoFacts {
  return (
    CITY_SEO[cityKey] ?? {
      displayName: cityKey,
      population: "a growing metro area",
      climate: "seasonal freeze–thaw and rain that stress commercial exteriors",
      landmark: "major regional highways",
      neighbourhood: "local districts and storage corridors",
    }
  );
}
