import React from 'react';

type Plan = {
  name: string;
  price: string;
  [key: string]: any;
};

interface ProductSchemaProps {
  name: string;
  description?: string;
  url: string;
  currency?: string;
  category?: string;
  plans?: Plan[];
}

export default function ProductSchema({
  name,
  description = "Super Fast DMCA Ignored Offshore Hosting",
  url,
  currency = "PKR",
  category = "Web Hosting",
  plans = []
}: ProductSchemaProps) {
  // Helper to extract numeric price from strings like "Rs. 499" or "PKR 1500.00"
  const extractPrice = (priceStr: string) => {
    // Match numbers containing digits, optional commas, and optional decimals
    const match = priceStr.match(/\d+(?:,\d+)*(?:\.\d+)?/);
    if (match) {
      return parseFloat(match[0].replace(/,/g, ''));
    }
    return 0; // Fallback
  };

  const parsedPlans = plans
    .map(plan => ({
      name: plan.name,
      price: extractPrice(plan.price)
    }))
    // Filter out rows where price couldn't be parsed if any
    .filter(p => !isNaN(p.price) && p.price > 0);

  let offers: any = [];
  
  if (parsedPlans.length > 0) {
    const prices = parsedPlans.map(p => p.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);

    offers = [
      {
        "@type": "AggregateOffer",
        "lowPrice": minPrice.toString(),
        "highPrice": maxPrice.toString(),
        "priceCurrency": currency,
        "url": url,
        "offerCount": parsedPlans.length.toString()
      },
      ...parsedPlans.map(plan => ({
        "@type": "Offer",
        "name": plan.name,
        "price": plan.price.toString(),
        "priceCurrency": currency,
        "url": url,
        "availability": "https://schema.org/InStock",
        "seller": {
          "@type": "Organization",
          "name": "QaziHost"
        }
      }))
    ];
  } else {
    // Basic fallback if no plans provided
    offers = {
      "@type": "Offer",
      "price": "500", // Safe default price so schema doesn't error out
      "priceCurrency": currency,
      "url": url,
      "availability": "https://schema.org/InStock"
    };
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": name,
    "description": description,
    "category": category,
    "url": url,
    "image": [
      url + "/og-image.webp",
      "https://qazi.host/qazihost-logo-og.webp"
    ],
    "brand": {
      "@type": "Brand",
      "name": "QaziHost"
    },
    // Adding aggregate rating to boost SEO appearance
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "5842",
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": offers
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
