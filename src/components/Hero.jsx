import React from 'react';
import { Compass, ShieldCheck, Star, Users, Globe2, ArrowRight, Award } from 'lucide-react';

export default function Hero({ content, onBookClick }) {
  return (
    <header 
      style={{
        position: 'relative',
        minHeight: '94vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '140px 20px 80px',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Background Radial Aura */}
      <div 
        style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(200, 165, 91, 0.07) 0%, rgba(14, 18, 28, 0.2) 45%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Bespoke Sacred Sri Yantra Lineage Emblem */}
      <div 
        style={{
          position: 'relative',
          width: '88px',
          height: '88px',
          margin: '0 auto 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1
        }}
      >
        <div 
          style={{
            position: 'absolute',
            inset: '0',
            border: '1px solid var(--gold-border)',
            borderRadius: '50%',
            transform: 'rotate(45deg)'
          }}
        />
        <div 
          style={{
            position: 'absolute',
            inset: '8px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%'
          }}
        />
        <div 
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, rgba(200, 165, 91, 0.2) 0%, rgba(10, 14, 22, 0.9) 100%)',
            border: '1px solid var(--gold-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-light)'
          }}
        >
          <Award size={26} color="var(--gold-primary)" />
        </div>
      </div>

      {/* Editorial Badge */}
      <div style={{ zIndex: 1, marginBottom: '20px' }}>
        <span className="badge-editorial">
          {content.hero.badge}
        </span>
      </div>

      {/* Headline */}
      <div style={{ maxWidth: '960px', zIndex: 1, marginBottom: '22px' }}>
        <h1 
          className="font-serif"
          style={{
            fontSize: 'clamp(32px, 5.2vw, 62px)',
            lineHeight: 1.15,
            fontWeight: 800
          }}
        >
          {content.hero.titleStart}{' '}
          <span className="text-gold-gradient" style={{ display: 'block' }}>
            {content.hero.titleHighlight}
          </span>
        </h1>
      </div>

      {/* Subtitle */}
      <p 
        style={{
          maxWidth: '760px',
          color: 'var(--text-muted)',
          fontSize: 'clamp(15px, 1.8vw, 18px)',
          lineHeight: 1.75,
          marginBottom: '38px',
          zIndex: 1
        }}
      >
        {content.hero.subtitle}
      </p>

      {/* Call to Actions */}
      <div 
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          marginBottom: '60px'
        }}
      >
        <button 
          onClick={onBookClick}
          className="btn-gold" 
          style={{ padding: '15px 36px', fontSize: '14px' }}
        >
          <span>{content.hero.ctaPrimary}</span>
          <ArrowRight size={16} />
        </button>

        <a 
          href="#kundli" 
          className="btn-obsidian"
          style={{ padding: '15px 32px', fontSize: '14px' }}
        >
          <Compass size={16} color="var(--gold-primary)" />
          <span>{content.hero.ctaSecondary}</span>
        </a>
      </div>

      {/* Institutional Trust Metrics */}
      <div 
        className="container"
        style={{
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px'
        }}
      >
        {content.hero.stats.map((stat, i) => (
          <div 
            key={i} 
            className="glass-card" 
            style={{
              padding: '24px 20px',
              textAlign: 'center',
              border: '1px solid var(--border-card)'
            }}
          >
            <div 
              className="font-serif text-gold-gradient" 
              style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}
            >
              {stat.count}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: '12px', letterSpacing: '0.04em', textTransform: 'uppercase', fontWeight: 600 }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Global Presence */}
      <div 
        style={{
          width: '100%',
          maxWidth: '920px',
          marginTop: '45px',
          padding: '12px 24px',
          borderRadius: 'var(--radius-pill)',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-line)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          zIndex: 1
        }}
      >
        <Globe2 size={15} color="var(--gold-primary)" />
        <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 600 }}>
          {content.trustBanner.title}:
        </span>
        <span style={{ fontSize: '12px', color: 'var(--gold-light)', fontWeight: 500 }}>
          {content.trustBanner.cities}
        </span>
      </div>

    </header>
  );
}
