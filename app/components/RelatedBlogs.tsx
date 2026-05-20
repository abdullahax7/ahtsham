'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface RelatedBlogsProps {
  productSlug?: string;
  title?: string;
}

export default function RelatedBlogs({ productSlug, title = "Related Articles" }: RelatedBlogsProps) {
  const [displayPosts, setDisplayPosts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const url = productSlug
          ? `/api/public/blogs/recent?limit=3&product=${encodeURIComponent(productSlug)}`
          : `/api/public/blogs/recent?limit=3`;
        const res = await fetch(url);
        if (!res.ok) return;
        const data = await res.json();
        setDisplayPosts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('RelatedBlogs error:', err);
      }
    }

    fetchRelated();
  }, [productSlug]);

  if (displayPosts.length === 0) return null;

  return (
    <section className="related-blogs-section" style={{ padding: '80px 48px', background: '#1a1b23' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '40px', color: '#fff' }}>
          {title}
        </h2>
        <div className="blog-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
          {displayPosts.map((post, i) => (
            <Link
              href={`/blog/${post.slug}`}
              key={i}
              className="hover-card"
              style={{
                textDecoration: 'none',
                display: 'flex',
                background: 'var(--card-bg)',
                border: '1px solid var(--border)',
                borderRadius: '16px',
                padding: '32px',
                flexDirection: 'column',
                width: '100%',
                cursor: 'pointer'
              }}
            >
              <div style={{
                width: 'calc(100% + 64px)',
                height: '180px',
                margin: '-32px -32px 24px',
                borderRadius: '16px 16px 0 0',
                overflow: 'hidden',
                background: 'var(--surface2)',
                position: 'relative'
              }}>
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(96,165,250,0.05))' }}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="m21 15-5-5L5 21" /></svg>
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 600, background: 'rgba(59,130,246,0.1)', padding: '4px 12px', borderRadius: '32px' }}>
                  {post.tag || 'Updates'}
                </span>
                <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{post.date}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text)', marginBottom: '16px', lineHeight: 1.4 }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px', flexGrow: 1 }}>
                {post.excerpt && post.excerpt.length > 100 ? post.excerpt.substring(0, 100) + '...' : post.excerpt}
              </p>
            </Link>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '48px' }}>
          <Link href="/blog" className="btn btn-outline">View All Articles</Link>
        </div>
      </div>
    </section>
  );
}
