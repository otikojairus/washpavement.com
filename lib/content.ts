export function slugBase(slug: string, citySuffixes: string[]): string {
  for (const suf of [...citySuffixes].sort((a, b) => b.length - a.length)) {
    const token = `-${suf}`;
    if (slug.endsWith(token)) return slug.slice(0, -token.length);
  }
  return slug;
}
