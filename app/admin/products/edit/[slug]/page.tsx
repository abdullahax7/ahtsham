import Link from 'next/link';
import { getProductBySlug } from '../../../../../lib/db/repos';
import ProductEditor from './ProductEditor';
import { deleteProductAction, saveProduct } from '../../../actions-content';

export const runtime = 'nodejs';
export const revalidate = 0;

export default async function EditProductPage({ params }: { params: { slug: string } }) {
  const isNew = params.slug === 'new';
  const product = isNew ? null : await getProductBySlug(params.slug);

  if (!isNew && !product) {
    return <div style={{ color: '#fff' }}>Product not found.</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '12px' }}>
        <div>
          <Link href="/admin/products" style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Back to Products</Link>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: '#fff', marginTop: '8px' }}>
            {isNew ? 'New Product' : `Edit: ${product!.name}`}
          </h1>
        </div>
        {!isNew && (
          <form action={deleteProductAction}>
            <input type="hidden" name="slug" value={product!.slug} />
            <button type="submit" className="btn-danger">Delete Product</button>
          </form>
        )}
      </div>

      <ProductEditor product={product} saveAction={saveProduct} />
    </div>
  );
}
