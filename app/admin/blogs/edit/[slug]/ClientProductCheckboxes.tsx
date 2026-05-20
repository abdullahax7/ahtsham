'use client';

import { useState } from 'react';

type Product = { sku: string; name: string; category: string };

export function ClientProductCheckboxes({ allProducts, initialSelectedSkus }: { allProducts: Product[], initialSelectedSkus: string[] }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(initialSelectedSkus));

  const toggleProduct = (sku: string) => {
    const newSet = new Set(selected);
    if (newSet.has(sku)) newSet.delete(sku);
    else newSet.add(sku);
    setSelected(newSet);
  };

  return (
    <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', padding: '16px', maxHeight: '240px', overflowY: 'auto' }}>
      <input type="hidden" name="related_products" value={JSON.stringify(Array.from(selected))} />
      
      {allProducts.length === 0 && <span style={{ color: 'var(--muted)' }}>No products found in database.</span>}
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {allProducts.map(p => (
          <label key={p.sku} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', padding: '12px', background: selected.has(p.sku) ? 'rgba(248,87,39,0.1)' : 'rgba(255,255,255,0.03)', border: selected.has(p.sku) ? '1px solid rgba(248,87,39,0.3)' : '1px solid transparent', borderRadius: '8px', transition: 'all 0.2s' }}>
            <input 
              type="checkbox" 
              checked={selected.has(p.sku)} 
              onChange={() => toggleProduct(p.sku)}
              style={{ width: '18px', height: '18px', accentColor: '#f85727', cursor: 'pointer', marginTop: '2px' }}
            />
            <div>
              <span style={{ color: '#fff', fontWeight: 600, display: 'block', marginBottom: '2px' }}>{p.name}</span>
              <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{p.category} | {p.sku}</span>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
