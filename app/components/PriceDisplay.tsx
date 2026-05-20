'use client';

import React from 'react';

export default function PriceDisplay({ usd, pkr, period = '/month' }: { usd: string, pkr: string, period?: string }) {
  return (
    <div className="pricing-price">
      <span className="price" style={{ fontSize: '1.6rem' }}>{pkr}</span><span className="period" style={{ fontSize: '0.9rem', opacity: 0.8, marginLeft: '6px' }}>{period}</span>
    </div>
  );
}
