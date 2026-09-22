import React, { useState, useEffect } from 'react';
import { Globe, Menu, X, Sun, Moon, Award } from 'lucide-react';
import { CURRENCIES } from '../data/currencies';

export default function Navbar({ 
  lang, 
  setLang, 
  currency, 
  setCurrency, 
  theme,
  setTheme,
  content, 
  onBookClick 
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'services', label: content.nav.services, href: '#services' },
    { id: 'kundli', label: content.nav.kundli, href: '#kundli' },
    { id: 'milan', label: content.nav.milan, href: '#milan' },
    { id: 'horoscope', label: content.nav.horoscope, href: '#horoscope' },
    { id: 'pricing', label: content.nav.pricing, href: '#pricing' },
    { id: 'reviews', label: content.nav.reviews, href: '#reviews' },
    { id: 'faq', label: content.nav.faq, href: '#faq' }
  ];

  return (
    <nav 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 900,
        transition: 'all 0.35s ease',
        background: scrolled ? 'var(--nav-bg)' : 'linear-gradient(to bottom, var(--nav-bg), transparent)',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-line)' : '1px solid transparent',
        padding: scrolled ? '14px 0' : '20px 0'
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        
        {/* Brand Logo */}
        <a 
          href="#" 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
        >
          <div 
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, var(--gold-subtle) 0%, var(--bg-card) 100%)',
              border: '1px solid var(--gold-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--gold-primary)'
            }}
          >
            <Award size={20} color="var(--gold-primary)" />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="font-serif text-gold-gradient" style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '0.08em' }}>
                TRINETRA
              </span>
            </div>
            <span style={{ fontSize: '9px', color: 'var(--text-subtle)', letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block' }}>
              {content.tagline}
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '26px' }} className="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'color 0.2s',
                display: 'inline-block'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--gold-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Action Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          
          {/* Theme Toggle (Midnight Sapphire / Classical Ivory) */}
          <button
            onClick={() => setTheme(theme === 'midnight' ? 'ivory' : 'midnight')}
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-primary)',
              padding: '7px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
            title={theme === 'midnight' ? "Switch to Classical Ivory Theme" : "Switch to Midnight Sapphire Theme"}
          >
            {theme === 'midnight' ? <Sun size={14} /> : <Moon size={14} />}
            <span style={{ fontSize: '11px', display: 'inline-block' }}>
              {theme === 'midnight' ? 'Ivory Theme' : 'Midnight Theme'}
            </span>
          </button>

          {/* Currency */}
          <div style={{ position: 'relative' }}>
            <select
              value={currency.code}
              onChange={(e) => setCurrency(CURRENCIES[e.target.value])}
              style={{
                background: 'var(--bg-input)',
                border: '1px solid var(--border-line)',
                color: 'var(--gold-primary)',
                padding: '6px 10px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                outline: 'none'
              }}
            >
              {Object.values(CURRENCIES).map((curr) => (
                <option key={curr.code} value={curr.code}>
                  {curr.flag} {curr.code}
                </option>
              ))}
            </select>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
            style={{
              background: 'var(--gold-subtle)',
              border: '1px solid var(--gold-border)',
              color: 'var(--gold-primary)',
              padding: '6px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Globe size={13} />
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </button>

          {/* Book Session CTA */}
          <button 
            onClick={onBookClick}
            className="btn-gold" 
            style={{ padding: '10px 22px', fontSize: '12px' }}
          >
            <span>{content.nav.bookBtn}</span>
          </button>

          {/* Mobile Menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
              padding: '6px'
            }}
            className="mobile-hamburger-btn"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div 
          style={{
            background: 'var(--nav-bg)',
            borderBottom: '1px solid var(--gold-border)',
            padding: '24px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontSize: '15px',
                fontWeight: 600,
                borderBottom: '1px solid var(--border-line)',
                paddingBottom: '10px'
              }}
            >
              {item.label}
            </a>
          ))}
          <button 
            onClick={() => { setMobileMenuOpen(false); onBookClick(); }}
            className="btn-gold" 
            style={{ width: '100%', marginTop: '10px' }}
          >
            {content.nav.bookBtn}
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 980px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
