import React from 'react';
import { Compass, ArrowRight } from 'lucide-react';

export default function Hero({ content, onBookClick }) {
  return (
    <header 
      style={{
        position: 'relative',
        minHeight: '62vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '112px 20px 48px',
        textAlign: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Editorial Badge */}
      <div style={{ zIndex: 1, marginBottom: '14px' }}>
        <span className="hero-kicker">
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
          marginBottom: '28px',
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
          marginBottom: '12px'
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
          href="#/kundli" 
          className="btn-obsidian"
          style={{ padding: '15px 32px', fontSize: '14px' }}
        >
          <Compass size={16} color="var(--gold-primary)" />
          <span>{content.hero.ctaSecondary}</span>
        </a>
      </div>

    </header>
  );
}
