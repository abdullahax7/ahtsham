'use client';

import { useEffect, useState } from 'react';

type Testimonial = {
  id?: number;
  author: string;
  role: string;
  text: string;
  stars: number;
  avatar?: string | null;
};

const FALLBACK: Testimonial[] = [
  { author: "Sohail Sardar", role: "Trainer / Senior Blogger", text: "As a professional blogger and trainer, I personally recommend QaziHost's services. Their support is just awesome. You will also love their services.", stars: 5, avatar: "https://i.imgur.com/2fq5q25.jpg" },
  { author: "Muhammad Faheem", role: "Senior Blogger", text: "If you are stucked at some techincal point in blogging, just call the QaziHost support, they will rescue you like 1122. Highly Recommended!", stars: 5, avatar: "https://i.imgur.com/Ghs00O4.jpg" },
  { author: "Rao Irfan", role: "Senior Blogger", text: "In 2022, when Copyright strikes were resulting as server suspension... Then I decided to try QaziHost DMCA Ignored service. performance is rocking up!", stars: 5, avatar: "https://i.imgur.com/GUORUhh.jpg" },
];

export default function Testimonials() {
  const [isHovered, setIsHovered] = useState(false);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    let alive = true;
    fetch('/api/public/testimonials')
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (alive && Array.isArray(data) && data.length) setTestimonials(data);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  return (
    <section className="testimonials-section">
      <div className="container" style={{ textAlign: 'center', marginBottom: '40px' }}>
        <div className="section-head fade-up">
          <div className="section-label">Testimonials</div>
          <h2 className="section-title">Our Client&apos;s Love</h2>
          <p className="section-sub" style={{ margin: '16px auto 0' }}>Hear it straight from the source – our valued clients! Real stories, real smiles. Your success story could be next!</p>
        </div>
      </div>
      <div
        className={`testi-slider-wrapper ${isHovered ? 'paused' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="testi-slider-track">
          {[...Array(2)].map((_, setIndex) => (
            <div className="testi-slider-set" key={setIndex} aria-hidden={setIndex === 1}>
              {testimonials.map((t, idx) => (
                <div className="testi" key={`${setIndex}-${idx}`}>
                  <div className="testi-stars">{'★'.repeat(Math.max(0, Math.min(5, t.stars || 5)))}</div>
                  <p>&quot;{t.text}&quot;</p>
                  <div className="testi-author">
                    <div className="avatar" style={t.avatar ? { backgroundImage: `url(${t.avatar})`, backgroundSize: 'cover' } : { background: 'linear-gradient(135deg, #f85727, #ff8c00)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff' }}>
                      {!t.avatar && t.author.charAt(0)}
                    </div>
                    <div className="author-info"><strong>{t.author}</strong><span>{t.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
