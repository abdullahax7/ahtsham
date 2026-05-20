'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function RecentBlogs({ productSku }: { productSku?: string }) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const url = productSku
          ? `/api/public/blogs/recent?limit=3&product=${encodeURIComponent(productSku)}`
          : `/api/public/blogs/recent?limit=3`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setBlogs(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, [productSku]);

  if (!loading && blogs.length === 0) return null;

  return (
    <section className="recent-blogs-section alt-bg">
      <div className="container">
        <div className="section-head fade-up" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div className="section-label">Knowledge Base</div>
          <h2 className="section-title">Latest From Our Blog</h2>
          <p className="section-sub" style={{ margin: '0 auto', maxWidth: '600px' }}>
            Expert hosting tips, tutorials, and industry insights to help you succeed online.
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <svg className="animate-spin" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
          </div>
        ) : (
          <div className="grid-3x3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {blogs.map((blog, idx) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.slug}
                className={`hover-card fade-up visible delay-${idx + 1}`}
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '32px',
                  flexDirection: 'column',
                  width: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  width: 'calc(100% + 64px)',
                  height: '200px',
                  margin: '-32px -32px 24px',
                  borderRadius: '16px 16px 0 0',
                  overflow: 'hidden',
                  background: 'var(--surface2)',
                  position: 'relative'
                }}>
                  {blog.featured_image ? (
                    <img
                      src={blog.featured_image}
                      alt={blog.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(248,87,39,0.05))' }}>
                      <svg className="animate-spin" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56" /></svg>
                    </div>
                  )}
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '6px 14px',
                    background: 'rgba(15,17,23,0.8)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '32px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: 'var(--accent)',
                    border: '1px solid rgba(248,87,39,0.2)'
                  }}>
                    {blog.tag || 'Global'}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                  <span>{blog.date}</span>
                  <span>•</span>
                  <span>{Math.ceil((blog.content?.length || 1000) / 1000)} min read</span>
                </div>

                <h3 style={{ fontSize: '1.4rem', color: '#fff', marginBottom: '16px', lineHeight: 1.3, fontWeight: 700 }}>
                  {blog.title}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                  {blog.excerpt && blog.excerpt.length > 120 ? blog.excerpt.substring(0, 120) + '...' : blog.excerpt}
                </p>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem' }}>
                  Read Article
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="view-all-bar fade-up visible" style={{ marginTop: '56px', textAlign: 'center' }}>
          <Link href="/blog" className="btn btn-outline">View All Articles</Link>
        </div>
      </div>
    </section>
  );
}
