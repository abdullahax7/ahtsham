import React from 'react';

interface BlogSchemaProps {
  title: string;
  description?: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  authorName?: string;
  publisherName?: string;
  publisherLogo?: string;
  url: string;
}

export default function BlogSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  authorName = "QaziHost Team",
  publisherName = "QaziHost",
  publisherLogo = "https://qazi.host/qazihost-logo-og.webp",
  url
}: BlogSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description || title,
    "image": image || "https://qazi.host/qazihost-logo-og.webp",
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Organization",
      "name": authorName,
      "url": "https://qazi.host"
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
