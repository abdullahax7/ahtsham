'use client';

import dynamic from 'next/dynamic';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FullBlogList from '../components/FullBlogList';
import HeroParticles from '../components/HeroParticles';

export default function BlogPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "QaziHost Blog",
    "description": "Expert tutorials, industry news, and technical guides to help you scale your digital infrastructure.",
    "url": "https://qazi.host/blog",
    "publisher": {
      "@type": "Organization",
      "name": "QaziHost",
      "logo": {
        "@type": "ImageObject",
        "url": "https://qazi.host/qazihost-logo-og.webp"
      }
    }
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Header />
      <section className="page-hero blur-in visible">
        <HeroParticles glowColor="rgba(248, 87, 39, 0.4)" />
        <div className="page-hero-content">
          <h1 className="delay-1">Resources & <span className="grad">Insights</span></h1>
          <p className="delay-2">Expert tutorials, industry news, and technical guides to help you scale your digital infrastructure.</p>
        </div>
      </section>

      <section className="blog-section" style={{ padding: '80px 0', background: 'var(--bg)', minHeight: '80vh' }}>
        <div className="container">
          <FullBlogList />
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
