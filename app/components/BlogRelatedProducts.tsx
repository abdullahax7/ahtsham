import Link from 'next/link';
import { getProductBySlug } from '../../lib/db/repos';
import { skuToProductSlug } from '../../lib/products/sku-map';

type Props = {
  skus: string[];
  title?: string;
};

export default async function BlogRelatedProducts({ skus, title = 'Promoted Products' }: Props) {
  if (!skus || skus.length === 0) return null;

  const products = (
    await Promise.all(
      skus.map((sku) => getProductBySlug(skuToProductSlug(sku)).catch(() => null)),
    )
  ).filter((p): p is NonNullable<typeof p> => !!p && p.is_visible !== false);

  if (products.length === 0) return null;

  return (
    <section className="related-products-section" style={{ padding: '80px 48px', background: '#1a1b23' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '12px', color: '#fff' }}>
          {title}
        </h2>
        <p style={{ textAlign: 'center', color: 'var(--muted)', marginBottom: '40px', fontSize: '1rem' }}>
          Services mentioned in this article
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {products.map((p) => {
            const price = p.starting_price_pkr || p.starting_price_usd;
            return (
              <Link
                key={p.slug}
                href={`/${p.slug}`}
                className="hover-card"
                style={{
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '28px',
                  cursor: 'pointer',
                }}
              >
                <div
                  style={{
                    display: 'inline-block',
                    alignSelf: 'flex-start',
                    fontSize: '0.75rem',
                    color: 'var(--accent)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    background: 'rgba(248,87,39,0.1)',
                    padding: '4px 10px',
                    borderRadius: '32px',
                    marginBottom: '16px',
                  }}
                >
                  {p.category}
                </div>
                <h3
                  style={{
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--text)',
                    marginBottom: '8px',
                    lineHeight: 1.3,
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    color: 'var(--muted)',
                    fontSize: '0.92rem',
                    lineHeight: 1.55,
                    marginBottom: '20px',
                    flexGrow: 1,
                  }}
                >
                  {p.short_description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  {price ? (
                    <div>
                      <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Starting at</span>
                      <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>{price}</div>
                    </div>
                  ) : (
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>View details</span>
                  )}
                  <span
                    style={{
                      color: 'var(--accent)',
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    View &rarr;
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
