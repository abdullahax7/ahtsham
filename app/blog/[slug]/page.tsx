import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { notFound } from 'next/navigation';
import BlogSchema from '../../components/BlogSchema';
import BlogRelatedProducts from '../../components/BlogRelatedProducts';
import { getBlogBySlug, listBlogSlugs } from '../../../lib/db/repos';
const HeroParticles = dynamic(() => import('../../components/HeroParticles'), { ssr: false });

export const revalidate = 60;
export const runtime = 'nodejs';

export async function generateStaticParams() {
  const slugs = await listBlogSlugs();
  return slugs.map((row) => ({ slug: row.slug }));
}

function stripHtml(html: string | null | undefined): string {
  if (!html) return '';
  return html.replace(/<[^>]*>?/gm, '').replace(/\s+/g, ' ').trim();
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogBySlug(params.slug).catch(() => null);
  if (!post) {
    return {
      title: 'Post not found',
      robots: { index: false, follow: false },
    };
  }

  const description = (post.excerpt && post.excerpt.trim())
    ? post.excerpt.trim()
    : stripHtml(post.content).slice(0, 160);
  const canonical = `/blog/${post.slug}`;
  const ogImage = post.featured_image || '/logo.webp';
  const published = post.date || post.created_at;
  const modified = post.updated_at || published;

  return {
    title: post.title,
    description,
    alternates: { canonical },
    keywords: [post.tag, 'qazi.host', 'web hosting blog', 'hosting tutorial'].filter(Boolean) as string[],
    openGraph: {
      title: post.title,
      description,
      url: `https://qazi.host${canonical}`,
      type: 'article',
      siteName: 'Qazi.Host',
      images: [{ url: ogImage }],
      publishedTime: published || undefined,
      modifiedTime: modified || undefined,
      tags: post.tag ? [post.tag] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const baseUrl = "https://qazi.host";
  const postUrl = `${baseUrl}/blog/${post.slug}`;

  return (
    <main>
      <BlogSchema
        title={post.title}
        description={post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160)}
        image={post.featured_image || undefined}
        datePublished={post.date || post.created_at}
        url={postUrl}
      />
      <Header />
      <section className="page-hero" style={{ padding: '160px 48px 60px', textAlign: 'left', position: 'relative' }}>
        <HeroParticles glowColor="rgba(248, 87, 39, 0.4)" />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <span style={{ display: 'inline-block', padding: '6px 16px', background: 'rgba(248,87,39,0.1)', color: 'var(--accent)', borderRadius: '100px', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '24px' }}>
            {post.tag}
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#fff', marginBottom: '16px', lineHeight: 1.2 }}>
            {post.title}
          </h1>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span>{post.date}</span>
            <span>•</span>
            <span>5 min read</span>
          </div>
        </div>
      </section>

      <section className="blog-content-section" style={{ padding: '40px 48px 100px', background: '#0f1117' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          {post.featured_image && (
            <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img
                src={post.featured_image}
                alt={post.title}
                style={{ width: '100%', height: 'auto', display: 'block' }}
              />
            </div>
          )}
        </div>
        <div
          className="container blog-content"
          style={{ maxWidth: '800px', margin: '0 auto', color: 'var(--text)', fontSize: '1.05rem', lineHeight: 1.8 }}
        >
          {post.youtube_id && (
            <div style={{ marginBottom: '40px', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(0,0,0,0.5)', position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={`https://www.youtube.com/embed/${post.youtube_id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          <div dangerouslySetInnerHTML={{ __html: post.content }} />

          {(post.note_text || (post.code_snippets && post.code_snippets.length > 0)) && (
            <div className="blog-notes" style={{ marginTop: '48px', padding: '32px', background: 'var(--surface2)', borderRadius: '16px', border: '1px solid var(--border)' }}>
              <h3 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: 'var(--accent)' }}>📌</span> Tutorial Notes & Resources
              </h3>

              {post.note_text && (
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '24px', lineHeight: 1.6 }}>
                  {post.note_text}
                </p>
              )}

              {post.code_snippets?.map((snippet: any, idx: number) => (
                <div key={idx} style={{ marginBottom: '24px' }}>
                  {snippet.title && <div style={{ fontWeight: 600, color: '#e8eaed', marginBottom: '8px', fontSize: '0.9rem' }}>{snippet.title}</div>}
                  <div style={{ position: 'relative', background: '#0a0a0c', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 16px', background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span style={{ color: 'var(--muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{snippet.language}</span>
                    </div>
                    <pre style={{ margin: 0, padding: '16px', overflowX: 'auto' }}>
                      <code style={{ color: '#e8eaed', fontFamily: 'monospace', fontSize: '0.85rem' }}>
                        {snippet.code}
                      </code>
                    </pre>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{__html: `
        .blog-content h2 { font-size: 1.8rem; font-weight: 700; color: #fff; margin: 40px 0 20px; }
        .blog-content h3 { font-size: 1.4rem; font-weight: 600; color: #e8eaed; margin: 32px 0 16px; }
        .blog-content p { margin-bottom: 24px; color: var(--muted); }
      `}} />

      <BlogRelatedProducts skus={post.related_products || []} />

      <Footer />
    </main>
  );
}
