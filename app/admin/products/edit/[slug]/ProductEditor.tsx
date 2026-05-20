'use client';

import { useState } from 'react';

type ProductPlan = {
  name: string;
  price: string;
  setup?: string;
  popular?: boolean;
  orderLink?: string;
  specs: { label: string; value: string }[];
};

type Product = {
  slug: string;
  name: string;
  category: string;
  short_description: string;
  long_description: string;
  icon: string | null;
  starting_price_usd: string | null;
  starting_price_pkr: string | null;
  order_url: string | null;
  is_featured: boolean;
  is_visible: boolean;
  sort_order: number;
  features: string[];
  plans: ProductPlan[];
  page_content: Record<string, any>;
};

export default function ProductEditor({
  product,
  saveAction,
}: {
  product: Product | null;
  saveAction: (fd: FormData) => Promise<void>;
}) {
  const [plans, setPlans] = useState<ProductPlan[]>(product?.plans ?? []);
  const [pageContentText, setPageContentText] = useState(
    product?.page_content ? JSON.stringify(product.page_content, null, 2) : '{}',
  );

  function addPlan() {
    setPlans((prev) => [
      ...prev,
      { name: 'New Plan', price: '', setup: '', popular: false, orderLink: '', specs: [] },
    ]);
  }
  function removePlan(i: number) {
    setPlans((prev) => prev.filter((_, idx) => idx !== i));
  }
  function updatePlan(i: number, patch: Partial<ProductPlan>) {
    setPlans((prev) => prev.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  }
  function addSpec(i: number) {
    setPlans((prev) =>
      prev.map((p, idx) =>
        idx === i ? { ...p, specs: [...p.specs, { label: 'Label', value: 'Value' }] } : p,
      ),
    );
  }
  function updateSpec(planIdx: number, specIdx: number, patch: Partial<{ label: string; value: string }>) {
    setPlans((prev) =>
      prev.map((p, i) =>
        i === planIdx
          ? { ...p, specs: p.specs.map((s, j) => (j === specIdx ? { ...s, ...patch } : s)) }
          : p,
      ),
    );
  }
  function removeSpec(planIdx: number, specIdx: number) {
    setPlans((prev) =>
      prev.map((p, i) => (i === planIdx ? { ...p, specs: p.specs.filter((_, j) => j !== specIdx) } : p)),
    );
  }

  return (
    <form action={saveAction} className="admin-card" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <input type="hidden" name="originalSlug" value={product?.slug ?? ''} />
      <input type="hidden" name="plans" value={JSON.stringify(plans)} />
      <input type="hidden" name="page_content" value={pageContentText} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <Field label="Name">
          <input className="admin-input" name="name" required defaultValue={product?.name ?? ''} />
        </Field>
        <Field label="Slug (URL)">
          <input className="admin-input" name="slug" required defaultValue={product?.slug ?? ''} placeholder="shared-hosting" />
        </Field>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Field label="Category">
          <select className="admin-select" name="category" defaultValue={product?.category ?? 'hosting'}>
            <option value="hosting">Hosting</option>
            <option value="dedicated">Dedicated</option>
            <option value="license">License</option>
            <option value="service">Service</option>
          </select>
        </Field>
        <Field label="Icon (lucide name)">
          <input className="admin-input" name="icon" defaultValue={product?.icon ?? ''} placeholder="Server" />
        </Field>
        <Field label="Sort Order">
          <input className="admin-input" name="sort_order" type="number" defaultValue={product?.sort_order ?? 0} />
        </Field>
      </div>

      <Field label="Short Description">
        <input className="admin-input" name="short_description" defaultValue={product?.short_description ?? ''} />
      </Field>

      <Field label="Long Description">
        <textarea className="admin-textarea" name="long_description" defaultValue={product?.long_description ?? ''} rows={4} />
      </Field>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16 }}>
        <Field label="Starting Price USD">
          <input className="admin-input" name="starting_price_usd" defaultValue={product?.starting_price_usd ?? ''} placeholder="$1.99" />
        </Field>
        <Field label="Starting Price PKR">
          <input className="admin-input" name="starting_price_pkr" defaultValue={product?.starting_price_pkr ?? ''} placeholder="499 PKR" />
        </Field>
        <Field label="Order URL">
          <input className="admin-input" name="order_url" defaultValue={product?.order_url ?? ''} placeholder="https://qazi.host/cart.php?..." />
        </Field>
      </div>

      <Field label="Features (one per line)">
        <textarea className="admin-textarea" name="features" defaultValue={(product?.features ?? []).join('\n')} rows={5} />
      </Field>

      <div style={{ display: 'flex', gap: 32 }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600 }}>
          <input type="checkbox" name="is_featured" defaultChecked={product?.is_featured ?? false} /> Featured
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600 }}>
          <input type="checkbox" name="hide" defaultChecked={product?.is_visible === false} /> Hide from site
        </label>
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#fff', fontWeight: 700, fontSize: '1.4rem', margin: 0 }}>Pricing Plans</h2>
        <button type="button" onClick={addPlan} className="btn-ghost">+ Add Plan</button>
      </div>

      {plans.map((plan, planIdx) => (
        <div key={planIdx} style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, padding: 20, display: 'flex', flexDirection: 'column', gap: 12, background: 'rgba(255,255,255,0.02)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h3 style={{ color: '#fff', margin: 0, fontWeight: 700 }}>Plan {planIdx + 1}</h3>
            <button type="button" onClick={() => removePlan(planIdx)} className="btn-danger" style={{ padding: '6px 12px' }}>Remove</button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <Field label="Plan Name">
              <input className="admin-input" value={plan.name} onChange={(e) => updatePlan(planIdx, { name: e.target.value })} />
            </Field>
            <Field label="Price">
              <input className="admin-input" value={plan.price} onChange={(e) => updatePlan(planIdx, { price: e.target.value })} />
            </Field>
            <Field label="Setup Fee">
              <input className="admin-input" value={plan.setup ?? ''} onChange={(e) => updatePlan(planIdx, { setup: e.target.value })} />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12 }}>
            <Field label="Order Link">
              <input className="admin-input" value={plan.orderLink ?? ''} onChange={(e) => updatePlan(planIdx, { orderLink: e.target.value })} />
            </Field>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#fff', fontWeight: 600, marginTop: 22 }}>
              <input type="checkbox" checked={!!plan.popular} onChange={(e) => updatePlan(planIdx, { popular: e.target.checked })} /> Mark as Most Popular
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8 }}>
            <strong style={{ color: '#fff' }}>Specifications</strong>
            <button type="button" onClick={() => addSpec(planIdx)} className="btn-ghost" style={{ padding: '6px 12px' }}>+ Add Spec</button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {plan.specs.map((s, sIdx) => (
              <div key={sIdx} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 8 }}>
                <input className="admin-input" placeholder="Label (e.g. NVMe Storage)" value={s.label} onChange={(e) => updateSpec(planIdx, sIdx, { label: e.target.value })} />
                <input className="admin-input" placeholder="Value (e.g. 10 GB)" value={s.value} onChange={(e) => updateSpec(planIdx, sIdx, { value: e.target.value })} />
                <button type="button" onClick={() => removeSpec(planIdx, sIdx)} className="btn-danger" style={{ padding: '8px 12px' }}>×</button>
              </div>
            ))}
          </div>
        </div>
      ))}

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.05)' }} />

      <Field label="Page Content (JSON — used by the product page for hero text, etc.)">
        <textarea
          className="admin-textarea"
          value={pageContentText}
          onChange={(e) => setPageContentText(e.target.value)}
          rows={8}
          style={{ fontFamily: 'monospace' }}
        />
      </Field>

      <div style={{ paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'flex-end' }}>
        <button type="submit" className="btn-accent">Save Product</button>
      </div>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ display: 'block', color: '#fff', fontWeight: 600, marginBottom: 8, fontSize: '0.9rem' }}>{label}</label>
      {children}
    </div>
  );
}
