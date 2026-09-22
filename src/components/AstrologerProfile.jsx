import React from 'react';
import { Award, ShieldCheck, HeartHandshake, CheckCircle2, BookOpen } from 'lucide-react';

export default function AstrologerProfile({ content, onBookClick }) {
  return (
    <section style={{ padding: '100px 20px', position: 'relative', background: 'rgba(8, 10, 15, 0.5)' }}>
      <div className="container">
        
        <div 
          className="glass-card astrologer-grid" 
          style={{
            padding: '54px 44px',
            border: '1px solid var(--gold-border)',
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '50px',
            alignItems: 'center'
          }}
        >
          
          {/* Left Column: Visual Profile Card */}
          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div 
              style={{
                width: '220px',
                height: '220px',
                borderRadius: '50%',
                margin: '0 auto 26px',
                background: 'linear-gradient(135deg, rgba(200, 165, 91, 0.25) 0%, rgba(14, 18, 26, 0.95) 100%)',
                padding: '4px',
                border: '1px solid var(--gold-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                boxShadow: '0 0 35px rgba(200, 165, 91, 0.15)'
              }}
            >
              <div 
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '50%',
                  background: '#090B10',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--border-line)'
                }}
              >
                <Award size={48} color="var(--gold-primary)" style={{ marginBottom: '8px' }} />
                <span className="font-serif text-gold-gradient" style={{ fontSize: '17px', fontWeight: 800, letterSpacing: '0.06em' }}>
                  ACHARYA JI
                </span>
                <span style={{ fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
                  Vedic Astrologer
                </span>
              </div>

              {/* Verified Tag */}
              <div 
                style={{
                  position: 'absolute',
                  bottom: '6px',
                  background: '#121722',
                  border: '1px solid var(--gold-border)',
                  color: 'var(--gold-light)',
                  padding: '5px 14px',
                  borderRadius: 'var(--radius-pill)',
                  fontSize: '11px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px'
                }}
              >
                <CheckCircle2 size={13} color="var(--gold-primary)" />
                <span>Certified Vedic Lineage</span>
              </div>
            </div>

            {/* Accreditations */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 18px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gold-primary)', display: 'block' }}>15+</span>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Years Sadhana</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 18px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gold-primary)', display: 'block' }}>8,500+</span>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Charts Read</span>
              </div>
              <div style={{ background: 'rgba(255,255,255,0.02)', padding: '10px 18px', borderRadius: '10px', border: '1px solid var(--border-line)' }}>
                <span style={{ fontSize: '19px', fontWeight: 800, color: 'var(--gold-primary)', display: 'block' }}>35+</span>
                <span style={{ fontSize: '11px', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Countries</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Core Ethics */}
          <div>
            <span className="badge-editorial" style={{ marginBottom: '14px' }}>
              {content.astrologer.badge}
            </span>

            <h2 className="font-serif" style={{ fontSize: '32px', margin: '10px 0 8px', lineHeight: 1.25 }}>
              {content.astrologer.title}
            </h2>

            <p style={{ color: 'var(--gold-light)', fontSize: '15px', fontWeight: 600, marginBottom: '18px' }}>
              {content.astrologer.subtitle}
            </p>

            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', lineHeight: 1.8, marginBottom: '14px' }}>
              {content.astrologer.bio1}
            </p>

            <p style={{ color: 'var(--text-muted)', fontSize: '14px', lineHeight: 1.7, marginBottom: '28px' }}>
              {content.astrologer.bio2}
            </p>

            {/* 3 Core Ethical Pillars */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              {content.astrologer.pillars.map((pillar, i) => (
                <div 
                  key={i} 
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '14px',
                    background: 'rgba(255,255,255,0.02)',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    border: '1px solid var(--border-line)'
                  }}
                >
                  <div style={{ marginTop: '2px', color: 'var(--gold-primary)' }}>
                    {i === 0 ? <HeartHandshake size={18} /> : i === 1 ? <BookOpen size={18} /> : <ShieldCheck size={18} />}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 700, color: '#FFFFFF', marginBottom: '2px' }}>
                      {pillar.title}
                    </h4>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={onBookClick}
              className="btn-gold"
              style={{ padding: '14px 32px' }}
            >
              <span>Book Private Consultation with Acharya Ji</span>
            </button>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 860px) {
          .astrologer-grid {
            grid-template-columns: 1fr !important;
            padding: 34px 22px !important;
          }
        }
      `}</style>
    </section>
  );
}
