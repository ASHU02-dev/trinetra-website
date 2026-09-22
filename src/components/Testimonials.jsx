import React from 'react';
import { Star, ShieldCheck, MessageSquareQuote, CheckCircle2 } from 'lucide-react';

export default function Testimonials({ content, lang }) {
  return (
    <section id="reviews" style={{ padding: '90px 20px', position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="badge-cosmic">
            <Star size={14} color="#D4AF37" />
            {content.reviews.badge}
          </span>
          <h2 className="font-cinzel">
            {content.reviews.title}
          </h2>
          <p>
            {content.reviews.subtitle}
          </p>
        </div>

        {/* 2x2 Grid of Testimonial Cards */}
        <div 
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {content.reviews.items.map((rev, i) => (
            <div 
              key={i} 
              className="glass-card" 
              style={{
                padding: '32px 28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                border: '1px solid rgba(212, 175, 55, 0.18)'
              }}
            >
              <div>
                {/* Rating Stars & Verification Tag */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '3px' }}>
                    {[...Array(rev.rating)].map((_, idx) => (
                      <Star key={idx} size={16} fill="#D4AF37" color="#D4AF37" />
                    ))}
                  </div>

                  <div 
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      fontSize: '11px',
                      color: '#22C55E',
                      background: 'rgba(34, 197, 94, 0.1)',
                      padding: '3px 10px',
                      borderRadius: '9999px',
                      fontWeight: 600
                    }}
                  >
                    <CheckCircle2 size={12} />
                    <span>{rev.date}</span>
                  </div>
                </div>

                {/* Consultation Topic Badge */}
                <div 
                  style={{
                    display: 'inline-block',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: 'var(--gold-primary)',
                    background: 'var(--gold-subtle)',
                    border: '1px solid var(--gold-border)',
                    padding: '4px 10px',
                    borderRadius: '6px',
                    marginBottom: '14px'
                  }}
                >
                  Topic: {rev.topic}
                </div>

                {/* Review Quote Text */}
                <p 
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '14px',
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    marginBottom: '22px'
                  }}
                >
                  "{rev.text}"
                </p>
              </div>

              {/* Author Info */}
              <div 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  borderTop: '1px solid var(--border-line)',
                  paddingTop: '16px'
                }}
              >
                <div 
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #7F0909 0%, #D4AF37 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    color: '#FFFFFF',
                    fontSize: '15px'
                  }}
                >
                  {rev.name.charAt(0)}
                </div>
                <div>
                  <h4 style={{ fontSize: '15px', color: 'var(--text-primary)', fontWeight: 700 }}>
                    {rev.name}
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--text-subtle)' }}>
                    📍 {rev.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
