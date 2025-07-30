// Logo.dev API - Free, fast company logo service
// No API key required - completely free to use!
// Documentation: https://logo.dev

// Cache for storing fetched logos to avoid repeated API calls
const logoCache = new Map<string, string>();

export interface CompanyLogo {
  name: string;
  logo: string;
}

/**
 * Try fetching logo with different name variations
 */
async function tryLogoDevWithNames(names: string[]): Promise<string> {
  for (const name of names) {
    // Logo.dev endpoint expects spaces and special chars replaced with ''
    const logoDevName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!logoDevName) continue;
    const logoUrl = `https://img.logo.dev/${logoDevName}?token=pk_X-1ZO13GSVOmBKdIeUvUgA&format=webp&size=128&retina=true&fallback=monogram`;
    try {
      const response = await fetch(logoUrl, { method: 'HEAD' });
      if (response.ok) return logoUrl;
    } catch {}
  }
  return '';
}

/**
 * Fetch company logo using Logo.dev API with robust name handling
 * Tries original, cleaned, and suffix-stripped names
 */
export async function fetchCompanyLogo(companyName: string): Promise<string> {
  if (logoCache.has(companyName)) {
    return logoCache.get(companyName)!;
  }

  // Prepare name variations
  const variations = [
    companyName, // original
    companyName.replace(/\b(inc|llc|corp|corporation|ltd|limited|co|company|technologies|solutions|systems|labs|networks|design|studio|group|industries|ventures|partners)\b/gi, '').trim(), // remove common suffixes
    companyName.replace(/[^a-zA-Z0-9]/g, ''), // remove non-alphanumeric
    companyName.split(' ')[0] // first word only
  ].filter((v, i, arr) => v && arr.indexOf(v) === i); // unique, non-empty

  let logoUrl = await tryLogoDevWithNames(variations);

  if (logoUrl) {
    logoCache.set(companyName, logoUrl);
    return logoUrl;
  }

  // Fallback: company initial
  const fallback = companyName.charAt(0).toUpperCase();
  logoCache.set(companyName, fallback);
  return fallback;
}

/**
 * Fetch company logo with multiple fallback strategies (for compatibility)
 */
export async function fetchCompanyLogoWithFallback(companyName: string): Promise<string> {
  return fetchCompanyLogo(companyName);
}

/**
 * Fetch multiple company logos in batch
 */
export async function fetchCompanyLogos(companyNames: string[]): Promise<CompanyLogo[]> {
  const promises = companyNames.map(async (name) => ({
    name,
    logo: await fetchCompanyLogoWithFallback(name)
  }));
  return Promise.all(promises);
}

/**
 * Clear logo cache (useful for testing or refreshing logos)
 */
export function clearLogoCache(): void {
  logoCache.clear();
}

/**
 * Get cached logo without making API call
 */
export function getCachedLogo(companyName: string): string | null {
  return logoCache.get(companyName) || null;
}

/**
 * Preload logos for better performance
 */
export async function preloadLogos(companyNames: string[]): Promise<void> {
  const uncachedCompanies = companyNames.filter(name => !logoCache.has(name));
  if (uncachedCompanies.length > 0) {
    await fetchCompanyLogos(uncachedCompanies);
  }
}
