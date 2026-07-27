export type ServiceSlug = "auto" | "property-fire" | "life" | "hmo" | "memorial";

export interface ServiceDefinition {
  slug: ServiceSlug;
  label: string;
  href: string;
  tagline: string;
}

export const services: ServiceDefinition[] = [
  {
    slug: "auto",
    label: "Auto / Motor Insurance",
    href: "/services/auto",
    tagline: "Drive protected against accidents, theft, and calamities.",
  },
  {
    slug: "property-fire",
    label: "Property and Fire Insurance",
    href: "/services/property-fire",
    tagline: "Safeguard your home or business from fire, flood, and more.",
  },
  {
    slug: "life",
    label: "Life Insurance",
    href: "/services/life",
    tagline: "Secure your family's financial future, whatever happens.",
  },
  {
    slug: "hmo",
    label: "HMO Insurance",
    href: "/services/hmo",
    tagline: "Quality healthcare access for you, your family, or your team.",
  },
  {
    slug: "memorial",
    label: "Memorial Plans",
    href: "/services/memorial",
    tagline: "Ease your family's burden during life's hardest moments.",
  },
];

export interface NavItem {
  label: string;
  href: string;
  children?: ServiceDefinition[];
}

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services", children: services },
  { label: "About Us", href: "/about" },
  { label: "Claims and Assistance Center", href: "/claims" },
];
