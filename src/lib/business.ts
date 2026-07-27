export const business = {
  name: "Insure PH",
  address: "I-356 Ivory Bldg. East Residences Ortigas Condominiums, Monaco St., Rosario, Pasig City",
  email: "info@insureph.org",
  website: "https://www.insureph.org",
} as const;

// The full official address above doesn't geocode precisely on Google's
// free (no-API-key) embed endpoint — the unit number and "Ivory Bldg."
// prefix cause it to fail matching and fall back to a zoomed-out city view,
// where "East Residences" ends up as one illegible pin among a dozen others.
// This simplified query (building + street + barangay + city, no unit
// number) resolves directly to the building and zooms in correctly.
const mapsQuery = "East Residences Ortigas, Monaco St, Rosario, Pasig City";

export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`;
