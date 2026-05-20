'use client';

import { useEffect, useState } from 'react';

type FaqItem = { id?: number; question: string; answer: string };

const FALLBACK: FaqItem[] = [
  { question: 'How does the WhatsApp checkout work?', answer: "When you click 'Order Now', we redirect you to a secure checkout page where you can review your order. Once confirmed, a pre-filled WhatsApp message opens with your order details." },
  { question: 'Do I need an account to place an order?', answer: 'No account is required on this website. You can place orders directly via WhatsApp and manage your services through our partner portal.' },
  { question: 'What payment methods do you accept?', answer: 'We accept bank transfers (HBL, UBL, Meezan), EasyPaisa, JazzCash, Payoneer, and cryptocurrency (USDT).' },
  { question: 'How fast is the provisioning?', answer: 'Shared hosting and licenses are activated within 1 hour of payment confirmation. Dedicated servers are provisioned within 6-24 hours.' },
  { question: 'Can I upgrade my plan later?', answer: 'Absolutely! You can upgrade at any time through your account dashboard or by messaging us on WhatsApp. We calculate pro-rated differences.' },
];

export default function FAQ() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FaqItem[]>(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/faqs')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data) && data.length) setFaqs(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq">
      <div className="container" style={{ maxWidth: '800px' }}>
        <div className="section-head fade-up" style={{ textAlign: 'center', margin: '0 auto 56px' }}>
          <div className="section-label">FAQ</div>
          <h2 className="section-title">Questions? Answered.</h2>
        </div>
        <div className="fade-up">
          {faqs.map((faq, i) => (
            <div key={faq.id ?? i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => toggleFaq(i)}>
                {faq.question}
                <span className="faq-icon">+</span>
              </button>
              <div className="faq-a">{faq.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
