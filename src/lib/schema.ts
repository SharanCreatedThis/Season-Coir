/**
 * Schema.org structured data helpers for Season Coir website.
 * Returns plain objects — serialize with JSON.stringify when embedding in <script> tags.
 */

import type { Product } from '@/data';

const SITE_URL = 'https://seasoncoir.vercel.app';

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Chingoli P.O., Karthikappally',
  addressLocality: 'Alappuzha',
  postalCode: '690515',
  addressRegion: 'Kerala',
  addressCountry: 'IN',
};

export function getOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Season Coir Exports',
    url: SITE_URL,
    description:
      'Premium eco-friendly coir mat manufacturer and exporter from Alleppey, Kerala, India. Established 1980.',
    address: ADDRESS,
    telephone: '+91-94476-18500',
    email: 'info@seasoncoir.com',
    foundingDate: '1980',
    sameAs: [SITE_URL],
  };
}

export function getLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Season Coir Exports',
    url: SITE_URL,
    description:
      'Premium eco-friendly coir mat manufacturer and exporter from Alleppey, Kerala, India. Established 1980.',
    address: ADDRESS,
    telephone: '+91-94476-18500',
    email: 'info@seasoncoir.com',
    foundingDate: '1980',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
  };
}

export function getProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Season Coir',
    },
    image: `${SITE_URL}${product.image}`,
    keywords: product.tags.join(', '),
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Season Coir Exports',
      },
    },
  };
}
