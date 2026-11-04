const IMG = "/images";

export const SERVICE_IMAGES: Record<string, string> = {
  "commercial-pressure-washing-services": `${IMG}/service-commercial.jpg`,
  "industrial-pressure-washing": `${IMG}/service-industrial.jpg`,
  "parking-lot-pressure-washing": `${IMG}/service-parking.jpg`,
  "commercial-awning-cleaning": `${IMG}/service-awning.jpg`,
  "building-exterior-pressure-washing": `${IMG}/service-building.jpg`,
};

export const HERO_HOME_IMAGE = `${IMG}/hero-home.jpg`;
export const SITE_LOGO = `${IMG}/logo-summit-wash.jpg`;

export function serviceImage(slugBase: string): string {
  return SERVICE_IMAGES[slugBase] ?? SERVICE_IMAGES["commercial-pressure-washing-services"];
}

export function serviceIllustration(slugBase: string): string {
  return serviceImage(slugBase);
}

export function heroBackground(slugBase: string): string {
  const img = serviceImage(slugBase);
  return `linear-gradient(105deg, rgba(20, 24, 63, 0.88), rgba(20, 24, 63, 0.65)), url("${img}") center / cover no-repeat`;
}
