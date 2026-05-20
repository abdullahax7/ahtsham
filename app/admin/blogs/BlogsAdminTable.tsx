'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Search, Plus, Trash2, Eye, Edit3, ChevronLeft, ChevronRight,
  CheckSquare, Square, AlertTriangle, X, Loader2, SortAsc, SortDesc,
} from 'lucide-react';
import { useToast } from '../../components/Toast';
import { deleteBlogsBulk } from './edit/[slug]/actions';

type Blog = {
  id: number;
  slug: string;
  title: string;
  tag: string | null;
  created_at: string;
};

const ITEMS_PER_PAGE = 10;

export default function BlogsAdminTable({
  blogs,
  sortField,
  sortDir,
}: {
  blogs: Blog[];
  sortField: 'created_at' | 'title' | 'tag';
  sortDir: 'asc' | 'desc';
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [selectedSlugs, setSelectedSlugs] = useState<string[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState<{ show: boolean; slug: string | string[] | null }>({ show: false, slug: null });
  const [page, setPage] = useState(1);
  const { showToast } = useToast();

  const filteredBlogs = useMemo(() => {
    if (!search.trim()) return blogs;
    const lowerSearch = search.toLowerCase();
    return blogs.filter((b) =>
      b.title.toLowerCase().includes(lowerSearch) ||
      (b.tag || '').toLowerCase().includes(lowerSearch) ||
      b.slug.toLowerCase().includes(lowerSearch),
    );
  }, [blogs, search]);

  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredBlogs.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredBlogs, page]);

  const toggleSelectAll = () => {
    if (selectedSlugs.length === paginatedBlogs.length) setSelectedSlugs([]);
    else setSelectedSlugs(paginatedBlogs.map((b) => b.slug));
  };

  const toggleSelect = (slug: string) => {
    setSelectedSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  };

  const handleSort = (field: 'created_at' | 'title' | 'tag') => {
    const nextDir = sortField === field && sortDir === 'asc' ? 'desc' : 'asc';
    router.push(`/admin/blogs?sort=${field}&dir=${nextDir}`);
  };

  const handleDelete = async () => {
    const target = showDeleteModal.slug;
    if (!target) return;
    const slugs = Array.isArray(target) ? target : [target];
    const fd = new FormData();
    fd.set('slugs', JSON.stringify(slugs));
    startTransition(async () => {
      try {
        const res = await deleteBlogsBulk(fd);
        showToast(`Successfully deleted ${res?.count ?? slugs.length} post(s).`, 'success');
        setSelectedSlugs([]);
        setShowDeleteModal({ show: false, slug: null });
        router.refresh();
      } catch (err: any) {
        showToast('Delete failed: ' + (err?.message || 'unknown error'), 'error');
      }
    });
  };

  return (
    <div className="fade-in visible">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', gap: '20px', flexWrap: 'wrap' }}>
        <div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, marginBottom: '8px', color: '#fff', display: 'flex', alignItems: 'center', gap: '16px' }}>
            Manage Articles
            {isPending && <Loader2 className="animate-spin" size={24} color="var(--muted)" />}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Create, update, and manage your content library.</p>
        </div>
        <Link href="/admin/blogs/edit/new" style={{ background: 'var(--accent)', color: '#fff', padding: '14px 28px', borderRadius: '12px', border: 'none', fontWeight: 700, fontSize: '1rem', cursor: 'pointer', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(248,87,39,0.3)' }}>
          <Plus size={20} />
          Create New Post
        </Link>
      </div>

      <div style={{ background: 'var(--surface)', borderRadius: '16px', border: '1px solid var(--border)', padding: '20px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input type="text" placeholder="Search by title, tag, or slug..." value={search} onChange={(e) => setSearch(e.target.value)}
            style={{ width: '100%', padding: '12px 16px 12px 48px', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '12px', color: '#fff', fontSize: '0.95rem', outline: 'none' }} />
        </div>

        {selectedSlugs.length > 0 && (
          <button onClick={() => setShowDeleteModal({ show: true, slug: selectedSlugs })}
            style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '12px 20px', borderRadius: '12px', border: '1px solid rgba(239, 68, 68, 0.2)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <Trash2 size={18} />
            Delete Selected ({selectedSlugs.length})
          </button>
        )}
      </div>

      <div style={{ background: '#111218', borderRadius: '16px', border: '1px solid var(--border)', boxShadow: '0 8px 32px rgba(0,0,0,0.2)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid var(--border)' }}>
              <th style={{ padding: '20px 24px', width: '40px' }}>
                <button onClick={toggleSelectAll} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                  {selectedSlugs.length === paginatedBlogs.length && paginatedBlogs.length > 0 ? <CheckSquare size={20} /> : <Square size={20} color="var(--muted)" />}
                </button>
              </th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }} onClick={() => handleSort('title')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Article Details
                  {sortField === 'title' && (sortDir === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                </div>
              </th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }} onClick={() => handleSort('tag')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Tag
                  {sortField === 'tag' && (sortDir === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                </div>
              </th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer' }} onClick={() => handleSort('created_at')}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Created
                  {sortField === 'created_at' && (sortDir === 'asc' ? <SortAsc size={14} /> : <SortDesc size={14} />)}
                </div>
              </th>
              <th style={{ padding: '20px 24px', color: 'var(--muted)', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.length > 0 ? (
              paginatedBlogs.map((blog) => (
                <tr key={blog.slug} style={{ borderBottom: '1px solid var(--border)', background: selectedSlugs.includes(blog.slug) ? 'rgba(248,87,39,0.03)' : 'transparent' }}>
                  <td style={{ padding: '20px 24px' }}>
                    <button onClick={() => toggleSelect(blog.slug)} style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}>
                      {selectedSlugs.includes(blog.slug) ? <CheckSquare size={20} /> : <Square size={20} color="var(--muted)" />}
                    </button>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <div style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', marginBottom: '4px' }}>{blog.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--muted)', fontFamily: 'monospace' }}>/{blog.slug}</div>
                  </td>
                  <td style={{ padding: '20px 24px' }}>
                    <span style={{ display: 'inline-block', padding: '6px 14px', background: 'rgba(248, 87, 39, 0.1)', color: 'var(--accent)', borderRadius: '32px', fontSize: '0.8rem', fontWeight: 700, border: '1px solid rgba(248,87,39,0.1)' }}>
                      {blog.tag || '—'}
                    </span>
                  </td>
                  <td style={{ padding: '20px 24px', color: 'var(--muted)', fontSize: '0.9rem' }}>
                    {new Date(blog.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '20px 24px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <Link href={`/blog/${blog.slug}`} target="_blank" style={{ padding: '8px', color: 'var(--muted)' }} title="View Live"><Eye size={18} /></Link>
                      <Link href={`/admin/blogs/edit/${blog.slug}`} style={{ padding: '8px', color: '#3b82f6' }} title="Edit Post"><Edit3 size={18} /></Link>
                      <button onClick={() => setShowDeleteModal({ show: true, slug: blog.slug })}
                        style={{ background: 'none', border: 'none', padding: '8px', color: '#ef4444', cursor: 'pointer' }} title="Delete Post"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={5} style={{ padding: '60px 24px', textAlign: 'center', color: 'var(--muted)', fontSize: '1.2rem' }}>No articles match your criteria.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Showing {paginatedBlogs.length} of {filteredBlogs.length} articles
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button disabled={page === 1} onClick={() => setPage((p) => p - 1)}
              style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--border)', color: page === 1 ? 'var(--muted)' : '#fff', cursor: page === 1 ? 'not-allowed' : 'pointer' }}><ChevronLeft size={20} /></button>
            <button disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}
              style={{ padding: '10px', borderRadius: '10px', background: 'var(--surface)', border: '1px solid var(--border)', color: page === totalPages ? 'var(--muted)' : '#fff', cursor: page === totalPages ? 'not-allowed' : 'pointer' }}><ChevronRight size={20} /></button>
          </div>
        </div>
      )}

      {showDeleteModal.show && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000, padding: '24px' }}>
          <div className="scale-up visible" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '24px', padding: '32px', maxWidth: '450px', width: '100%', boxShadow: '0 32px 64px rgba(0,0,0,0.5)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><AlertTriangle size={24} /></div>
              <button onClick={() => setShowDeleteModal({ show: false, slug: null })} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '12px', color: '#fff' }}>Confirm Deletion</h3>
            <p style={{ color: 'var(--muted)', marginBottom: '32px', lineHeight: 1.6 }}>
              Are you sure you want to delete {Array.isArray(showDeleteModal.slug) ? `${showDeleteModal.slug.length} articles` : 'this article'}? This action is permanent and cannot be reversed.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <button onClick={() => setShowDeleteModal({ show: false, slug: null })} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleDelete} disabled={isPending} style={{ flex: 1, padding: '14px', borderRadius: '12px', background: '#ef4444', border: 'none', color: '#fff', fontWeight: 700, cursor: isPending ? 'not-allowed' : 'pointer', opacity: isPending ? 0.7 : 1 }}>{isPending ? 'Deleting…' : 'Delete Forever'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
