'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, SortDesc, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useToast } from './Toast';

const BLOGS_PER_PAGE = 9;

export default function FullBlogList({ productSku }: { productSku?: string }) {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const { showToast } = useToast();

  // Filter/Sort/Pagination state
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');
  const [page, setPage] = useState(1);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (query.trim()) params.set('q', query);
      if (activeTag !== 'All') params.set('tag', activeTag);
      if (productSku) params.set('product', productSku);
      params.set('sort', sortOrder);
      params.set('page', String(page));
      params.set('perPage', String(BLOGS_PER_PAGE));

      const res = await fetch(`/api/public/blogs?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { rows, total } = await res.json();
      setBlogs(rows || []);
      setTotalCount(total || 0);
    } catch (err: any) {
      console.error('Error fetching blogs:', err);
      showToast('Failed to load blogs. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  }, [query, activeTag, sortOrder, page, productSku, showToast]);

  useEffect(() => {
    const timer = setTimeout(fetchBlogs, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [fetchBlogs]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, activeTag, sortOrder]);

  const uniqueTags = useMemo(() => {
    return ['All', 'Hosting', 'Technology', 'Security', 'Company', 'Tips', 'Tutorials', 'Guides'];
  }, []);

  const totalPages = Math.ceil(totalCount / BLOGS_PER_PAGE);

  return (
    <div className="full-blog-list">
      {/* Controls Bar */}
      <div className="fade-up visible" style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '24px',
        marginBottom: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '16px',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', flex: '1', minWidth: '250px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            type="text"
            placeholder="Search our knowledge base..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 48px',
              background: 'var(--bg)',
              border: '1px solid var(--border)',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '0.95rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', width: 'auto' }}>
          {/* Tag Filter */}
          <div style={{ position: 'relative' }}>
            <Filter size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
            <select
              value={activeTag}
              onChange={(e) => setActiveTag(e.target.value)}
              style={{
                padding: '12px 16px 12px 44px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                minWidth: '140px'
              }}
            >
              {uniqueTags.map(tag => <option key={tag} value={tag}>{tag}</option>)}
            </select>
          </div>

          {/* Sort */}
          <div style={{ position: 'relative' }}>
            <SortDesc size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', pointerEvents: 'none' }} />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as any)}
              style={{
                padding: '12px 16px 12px 44px',
                background: 'var(--bg)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: '#fff',
                fontSize: '0.9rem',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                minWidth: '160px'
              }}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="alphabetical">A - Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Blog Grid */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '16px' }}>
          <Loader2 className="animate-spin" size={48} color="var(--accent)" />
          <p style={{ color: 'var(--muted)', fontWeight: 500 }}>Fetching technical resources...</p>
        </div>
      ) : blogs.length > 0 ? (
        <>
          <div className="grid-3x3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '28px' }}>
            {blogs.map((blog, idx) => (
              <Link
                href={`/blog/${blog.slug}`}
                key={blog.slug}
                className={`fade-up visible delay-${(idx % 3) + 1}`}
                style={{ textDecoration: 'none', display: 'flex' }}
              >
                <div style={{
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '20px',
                  padding: '32px',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  width: '100%',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-12px)';
                    e.currentTarget.style.borderColor = 'rgba(248,87,39,0.4)';
                    e.currentTarget.style.boxShadow = '0 24px 64px rgba(248,87,39,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border)';
                    e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
                  }}>
                  <div style={{
                    width: 'calc(100% + 64px)',
                    height: '240px',
                    margin: '-32px -32px 24px',
                    borderRadius: '20px 20px 0 0',
                    overflow: 'hidden',
                    background: 'var(--surface2)',
                    position: 'relative'
                  }}>
                    {blog.featured_image ? (
                      <img
                        src={blog.featured_image}
                        alt={blog.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.6s ease' }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(59,130,246,0.1), rgba(248,87,39,0.05))' }}>
                        <Loader2 size={32} color="rgba(255,255,255,0.05)" />
                      </div>
                    )}
                    <div style={{
                      position: 'absolute',
                      top: '16px',
                      left: '16px',
                      padding: '6px 14px',
                      background: 'rgba(15,17,23,0.85)',
                      backdropFilter: 'blur(10px)',
                      borderRadius: '32px',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      color: 'var(--accent)',
                      border: '1px solid rgba(248,87,39,0.2)'
                    }}>
                      {blog.tag || 'Updates'}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', color: 'var(--muted)', fontSize: '0.85rem' }}>
                    <span>{blog.date || (blog.created_at ? new Date(blog.created_at).toLocaleDateString() : '')}</span>
                    <span>•</span>
                    <span>{Math.ceil((blog.content?.length || 1000) / 1000)} min read</span>
                  </div>

                  <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '16px', lineHeight: 1.3, fontWeight: 800 }}>
                    {blog.title}
                  </h3>
                  <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '24px', flex: 1 }}>
                    {blog.excerpt && blog.excerpt.length > 150 ? blog.excerpt.substring(0, 150) + '...' : blog.excerpt}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent)', fontWeight: 700, fontSize: '0.95rem' }}>
                    Continue Reading
                    <ChevronRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="fade-up visible" style={{ marginTop: '64px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
              <button
                disabled={page === 1}
                onClick={() => setPage(p => p - 1)}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: page === 1 ? 'var(--muted)' : '#fff',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <div style={{ display: 'flex', gap: '8px' }}>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '14px',
                      background: page === i + 1 ? 'var(--accent)' : 'var(--surface)',
                      border: '1px solid' + (page === i + 1 ? 'var(--accent)' : 'var(--border)'),
                      color: '#fff',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: page === i + 1 ? '0 8px 24px rgba(248,87,39,0.3)' : 'none'
                    }}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                disabled={page === totalPages}
                onClick={() => setPage(p => p + 1)}
                style={{
                  padding: '14px',
                  borderRadius: '14px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  color: page === totalPages ? 'var(--muted)' : '#fff',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  transition: 'all 0.2s'
                }}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="fade-up visible" style={{
          textAlign: 'center',
          padding: '100px 40px',
          background: 'var(--surface)',
          borderRadius: '28px',
          border: '1px solid var(--border)'
        }}>
          <h3 style={{ fontSize: '1.8rem', color: '#fff', marginBottom: '16px' }}>No matches found</h3>
          <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '1.1rem' }}>We couldn&apos;t find any articles matching your current search parameters.</p>
          <button
            onClick={() => { setQuery(''); setActiveTag('All'); }}
            className="btn btn-primary"
            style={{ padding: '14px 32px' }}
          >
            Reset Filters
          </button>
        </div>
      )}

    </div>
  );
}
